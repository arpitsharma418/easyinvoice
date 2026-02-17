import React from "react";
import { useNavigate } from "react-router-dom";

export default function InvoiceList({ invoices, onEdit, onDelete }) {
  const navigate = useNavigate();
  const handlePreview = (inv) => {
    localStorage.setItem("invoice_preview", JSON.stringify(inv));
    navigate("/preview");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">All Invoices</h3>
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-black/10">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-left">Invoice #</th>
                <th className="py-2 px-3 text-left">Client</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Due</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Total</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv._id}
                  className="border border-black/10 hover:bg-gray-50"
                >
                  <td className="py-2 px-3 font-medium">{inv.invoiceNumber}</td>
                  <td className="py-2 px-3">{inv.toBusiness?.name || "-"}</td>
                  <td className="py-2 px-3">
                    {inv.invoiceDate
                      ? new Date(inv.invoiceDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-3">
                    {inv.dueDate
                      ? new Date(inv.dueDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={
                        inv.status === "paid"
                          ? "bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                          : inv.status === "sent"
                            ? "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                            : "bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                      }
                    >
                      {inv.status || "draft"}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-semibold">
                    ₹{inv.total?.toFixed(2) || "-"}
                  </td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      onClick={() => onEdit(inv)}
                      className=" px-2 py-1 rounded text-xs cursor-pointer"
                      title="Edit Invoice"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(inv._id)}
                      className="px-2 py-1 rounded text-xs cursor-pointer"
                      title="Delete Invoice"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#EA3323"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handlePreview(inv)}
                      className=" px-2 py-1 rounded text-xs cursor-pointer"
                      title="Preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm133.5-124.5Q269-369 240-440q29-71 93.5-115.5T480-600q82 0 146.5 44.5T720-440q-29 71-93.5 115.5T480-280q-82 0-146.5-44.5Zm248.5-42q46-26.5 72-73.5-26-47-72-73.5T480-540q-56 0-102 26.5T306-440q26 47 72 73.5T480-340q56 0 102-26.5ZM480-440Zm42.5 42.5Q540-415 540-440t-17.5-42.5Q505-500 480-500t-42.5 17.5Q420-465 420-440t17.5 42.5Q455-380 480-380t42.5-17.5Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
