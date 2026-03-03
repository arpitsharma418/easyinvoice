import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/invoices`;

export default function InvoiceList({ invoices, onEdit, onDelete }) {
  const navigate = useNavigate();


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
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      responseType: "blob",
      withCredentials: true,
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const a = document.createElement("a");
    a.href = url;
    a.download = "Invoice.pdf";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Download failed");
  }
};

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-slate-800">All Invoices</h2>
        <p className="text-sm text-slate-500">
          Manage, edit and track your invoices
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
                        className="text-xs px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(inv._id)}
                        className="text-xs px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(inv._id)}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-white hover:bg-black transition"
                      >
                        Download
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
                className="border border-black/10 rounded-xl p-4 shadow-sm"
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
                  ₹{inv.total?.toFixed(2) || "-"}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => onEdit(inv)}
                    className="flex-1 text-xs px-3 py-2 rounded-lg bg-emerald-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(inv._id)}
                    className="flex-1 text-xs px-3 py-2 rounded-lg bg-red-600 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(inv._id)}
                    className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-800 text-white"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
