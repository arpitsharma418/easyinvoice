import React, { useState } from "react";

export default function InvoiceForm({ onSave, onCancel, initialData }) {
  const [invoice, setInvoice] = useState(
    initialData || {
      invoiceNumber: "",
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      fromBusiness: { name: "", email: "", phone: "", address: "" },
      toBusiness: { name: "", email: "", phone: "", address: "" },
      taxRate: 0,
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
      status: "draft",
    },
  );

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleBusinessChange = (type, e) => {
    setInvoice({
      ...invoice,
      [type]: { ...invoice[type], [e.target.name]: e.target.value },
    });
  };

  const handleItemChange = (idx, e) => {
    const items = invoice.items.map((item, i) =>
      i === idx ? { ...item, [e.target.name]: e.target.value } : item,
    );
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", quantity: 1, unitPrice: 0 }],
    });
  };

  const removeItem = (idx) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(invoice);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold sm:text-lg mb-1">
          {initialData ? "Edit Invoice" : "Create Invoice"}
        </h3>
        <button onClick={onCancel} className="cursor-pointer bg-gray-200 p-2 rounded-xl hover:bg-gray-300 transition-all duration-150">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <div>
          <label className="block font-medium mb-0.5">Invoice Number</label>
          <input
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleChange}
            required
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium mb-0.5">Invoice Date</label>
          <input
            name="invoiceDate"
            type="date"
            value={invoice.invoiceDate}
            onChange={handleChange}
            required
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium mb-0.5">Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={invoice.dueDate}
            onChange={handleChange}
            required
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div>
          <label className="block font-medium mb-0.5">
            From (Your Business)
          </label>
          <input
            name="name"
            placeholder="Name"
            value={invoice.fromBusiness.name}
            onChange={(e) => handleBusinessChange("fromBusiness", e)}
            required
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="email"
            placeholder="Email"
            value={invoice.fromBusiness.email}
            onChange={(e) => handleBusinessChange("fromBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={invoice.fromBusiness.phone}
            onChange={(e) => handleBusinessChange("fromBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="address"
            placeholder="Address"
            value={invoice.fromBusiness.address}
            onChange={(e) => handleBusinessChange("fromBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
        </div>
        <div>
          <label className="block font-medium mb-0.5">To (Client)</label>
          <input
            name="name"
            placeholder="Name"
            value={invoice.toBusiness.name}
            onChange={(e) => handleBusinessChange("toBusiness", e)}
            required
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="email"
            placeholder="Email"
            value={invoice.toBusiness.email}
            onChange={(e) => handleBusinessChange("toBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={invoice.toBusiness.phone}
            onChange={(e) => handleBusinessChange("toBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
          <input
            name="address"
            placeholder="Address"
            value={invoice.toBusiness.address}
            onChange={(e) => handleBusinessChange("toBusiness", e)}
            className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
          />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-0.5">Tax Rate (%)</label>
        <input
          name="taxRate"
          type="number"
          value={invoice.taxRate}
          onChange={handleChange}
          required
          className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1 mb-1"
        />
      </div>
      <div>
        <label className="block font-medium mb-0.5">Items</label>
        <div className="space-y-1">
          {invoice.items.map((item, idx) => (
            <div key={idx} className="flex gap-1 mb-1">
              <input
                name="description"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(idx, e)}
                required
                className="w-full flex-2 border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
              />
              <input
                name="quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(idx, e)}
                required
                className="w-full flex-1 border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
              />
              <input
                name="unitPrice"
                type="number"
                min="0"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(idx, e)}
                required
                className="w-full flex-1 border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                disabled={invoice.items.length === 1}
                className="px-2 rounded disabled:opacity-50 text-xs cursor-pointer "
                title="Delete Item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs mt-1 cursor-pointer hover:bg-blue-200 transition-all duration-150"
          >
            Add Item
          </button>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-0.5">Notes</label>
        <textarea
          name="notes"
          value={invoice.notes}
          onChange={handleChange}
          className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-medium mb-0.5">Status</label>
        <select
          name="status"
          value={invoice.status}
          onChange={handleChange}
          className="w-full border border-black/10 outline-0 focus:ring-3 ring-black/20 transition-all duration-150 rounded px-2 py-1"
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold text-xs sm:text-sm flex-1"
        >
          {initialData ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded font-semibold text-xs sm:text-sm flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
