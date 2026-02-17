import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import InvoiceForm from "../components/InvoiceForm.jsx";
import InvoiceList from "../components/InvoiceList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = `${import.meta.env.VITE_API_URL}/api/invoices`;

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [modal, setModal] = useState(false);
  const { logout } = useAuth();

  // Fetch invoices
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { withCredentials: true });
      setInvoices(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch invoices");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Create or update invoice
  const handleSave = async (invoice) => {
    setLoading(true);
    try {
      // Remove _id from each item if present
      const { _id, user, __v, ...invoiceWithoutIdUserV } = invoice;
      const cleanInvoice = {
        ...invoiceWithoutIdUserV,
        items: invoice.items.map(({ _id, ...rest }) => rest),
      };
      if (editInvoice) {
        await axios.put(`${API_URL}/${editInvoice._id}`, cleanInvoice, {
          withCredentials: true,
        });
        toast.success("Invoice updated successfully!");
      } else {
        await axios.post(API_URL, cleanInvoice, {
          withCredentials: true,
        });
        toast.success("Invoice created successfully!");
      }
      fetchInvoices();
      setEditInvoice(null);
      setModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save invoice");
    }
    setLoading(false);
  };

  // Delete invoice
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      toast.success("Invoice deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete invoice");
    }
    setLoading(false);
    fetchInvoices();
  };

  // Modal for create/edit
  const openModal = (invoice = null) => {
    setEditInvoice(invoice);
    setModal(true);
  };
  const closeModal = () => {
    setEditInvoice(null);
    setModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center mb-6 justify-between">
        <div>
          <h2 className="font-bold text-3xl text-gray-800">
        Invoices Dashboard
      </h2>
        </div>
        <div>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-sm rounded-lg text-white font-medium cursor-pointer hover:bg-red-700 transition-all">Logout</button>
        </div>
      </div>
      <button
        onClick={() => openModal()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold mb-6 shadow"
      >
        Create Invoice
      </button>
      {loading ? (
        <div className="flex justify-center my-4 mt-28">
          <span className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <InvoiceList
          invoices={invoices}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      )}
      {modal && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-30 z-50 flex items-center justify-center p-2 overflow-y-auto max-h-screen">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-4 sm:p-8 my-8">
            <InvoiceForm
              onSave={handleSave}
              onCancel={closeModal}
              initialData={editInvoice}
            />
          </div>
        </div>
      )}
    </div>
  );
}
