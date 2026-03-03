import React, { useState, useEffect } from "react";

export default function InvoiceForm({ onSave, onCancel, initialData }) {
  const [invoice, setInvoice] = useState(
    initialData || {
      invoiceNumber: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: "",
      fromBusiness: { name: "", email: "", phone: "", address: "" },
      toBusiness: { name: "", email: "", phone: "", address: "" },
      taxRate: 0,
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
      status: "draft",
      subtotal: 0,
      taxAmount: 0,
      total: 0,
    }
  );

  useEffect(() => {
    const subtotal = invoice.items.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0
    );

    const taxAmount = (subtotal * Number(invoice.taxRate || 0)) / 100;
    const total = subtotal + taxAmount;

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
    }));
  }, [invoice.items, invoice.taxRate]);

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
      i === idx ? { ...item, [e.target.name]: e.target.value } : item
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            {initialData ? "Edit Invoice" : "Create Invoice"}
          </h3>
          <p className="text-sm text-slate-500">
            Fill in the invoice details below
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="Invoice Number" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleChange} required />
        <Input type="date" label="Invoice Date" name="invoiceDate" value={invoice.invoiceDate} onChange={handleChange} />
        <Input type="date" label="Due Date" name="dueDate" value={invoice.dueDate} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BusinessSection
          title="From (Your Business)"
          data={invoice.fromBusiness}
          onChange={(e) => handleBusinessChange("fromBusiness", e)}
          requiredName
        />
        <BusinessSection
          title="To (Client)"
          data={invoice.toBusiness}
          onChange={(e) => handleBusinessChange("toBusiness", e)}
          requiredName
        />
      </div>

      <Input
        label="Tax Rate (%)"
        name="taxRate"
        type="number"
        value={invoice.taxRate}
        onChange={handleChange}
      />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-slate-800">Invoice Items</h4>
          <button
            type="button"
            onClick={addItem}
            className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {invoice.items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-slate-50 p-4 rounded-xl"
            >
              <Input
                label="Description"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(idx, e)}
                required
              />
              <Input
                label="Qty"
                name="quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(idx, e)}
                required
              />
              <Input
                label="Unit Price"
                name="unitPrice"
                type="number"
                min="0"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(idx, e)}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                disabled={invoice.items.length === 1}
                className="h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right space-y-2">
        <p>Subtotal: ₹ {invoice.subtotal.toFixed(2)}</p>
        <p>Tax: ₹ {invoice.taxAmount.toFixed(2)}</p>
        <p className="font-bold text-lg">Total: &#8377; {invoice.total.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={invoice.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {initialData ? "Update Invoice" : "Create Invoice"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-xl font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function BusinessSection({ title, data, onChange, requiredName }) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
      <h4 className="font-semibold text-slate-800">{title}</h4>

      <input
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={onChange}
        required={requiredName}
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
      />
      <input
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={data.phone}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
      />
      <input
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-2"
      />
    </div>
  );
}