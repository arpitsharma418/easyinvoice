import { useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/invoices`;

export default function InvoiceList({
  invoices,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
}) {
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700";
      case "sent":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDownloadInvoice = async (id) => {
    setDownloadingInvoiceId(id);

    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        responseType: "blob",
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );

      const a = document.createElement("a");
      a.href = url;
      a.download = "Invoice.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      let message = "Download failed";

      if (error.response?.data instanceof Blob) {
        try {
          const errorText = await error.response.data.text();
          const parsedError = JSON.parse(errorText);
          message = parsedError.message || message;
        } catch {
          // Keep fallback message if response is not JSON
        }
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      console.error(error);
      alert(message);
    } finally {
      setDownloadingInvoiceId((current) => (current === id ? null : current));
    }
  };

  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalInvoices = pagination?.totalInvoices || 0;
  const startInvoice = pagination?.startInvoice || 0;
  const endInvoice = pagination?.endInvoice || 0;

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i += 1) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-slate-800">All Invoices</h2>
        <p className="text-sm text-slate-500">
          Showing {startInvoice}-{endInvoice} of {totalInvoices} invoices
        </p>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No invoices found.
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-black/10">
                  <th className="py-3">Invoice</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Due</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv._id}
                    className="border-b border-black/5 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 font-medium">#{inv.invoiceNumber}</td>
                    <td>{inv.toBusiness?.name || "-"}</td>
                    <td>
                      {inv.invoiceDate
                        ? new Date(inv.invoiceDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {inv.dueDate
                        ? new Date(inv.dueDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          inv.status,
                        )}`}
                      >
                        {inv.status || "draft"}
                      </span>
                    </td>
                    <td className="font-semibold">
                      &#8377; {inv.total?.toFixed(2) || "-"}
                    </td>
                    <td className="text-right space-x-2">
                      <button
                        onClick={() => onEdit(inv)}
                        className="text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(inv._id)}
                        className="text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(inv._id)}
                        disabled={downloadingInvoiceId === inv._id}
                        className="text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {downloadingInvoiceId === inv._id
                          ? "Downloading..."
                          : "Download"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {invoices.map((inv) => (
              <div
                key={inv._id}
                className="border border-black/10 rounded-xl p-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">#{inv.invoiceNumber}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      inv.status,
                    )}`}
                  >
                    {inv.status || "draft"}
                  </span>
                </div>

                <p className="text-sm text-slate-600">
                  {inv.toBusiness?.name || "-"}
                </p>

                <div className="text-xs text-slate-500 mt-2 space-y-1">
                  <div>
                    Date:{" "}
                    {inv.invoiceDate
                      ? new Date(inv.invoiceDate).toLocaleDateString()
                      : "-"}
                  </div>
                  <div>
                    Due:{" "}
                    {inv.dueDate
                      ? new Date(inv.dueDate).toLocaleDateString()
                      : "-"}
                  </div>
                </div>

                <div className="mt-3 font-semibold text-slate-800">
                  &#8377;{inv.total?.toFixed(2) || "-"}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => onEdit(inv)}
                    className="flex-1 text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(inv._id)}
                    className="flex-1 text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(inv._id)}
                    disabled={downloadingInvoiceId === inv._id}
                    className="flex-1 text-white px-4 py-2 bg-black rounded-lg text-xs cursor-pointer hover:bg-black/80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {downloadingInvoiceId === inv._id
                      ? "Downloading..."
                      : "Download"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm rounded-lg border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`min-w-9 px-3 py-2 text-sm rounded-lg border transition ${
                      page === currentPage
                        ? "bg-black text-white border-black"
                        : "border-black/20 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-sm rounded-lg border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
