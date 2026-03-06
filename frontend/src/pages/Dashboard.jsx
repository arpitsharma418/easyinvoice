import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import InvoiceForm from "../components/InvoiceForm.jsx";
import InvoiceList from "../components/InvoiceList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = `${import.meta.env.VITE_API_URL}/api/invoices`;
const PAGE_LIMIT = 10;

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalInvoices: 0,
    limit: PAGE_LIMIT,
    startInvoice: 0,
    endInvoice: 0,
  });
  const { logout } = useAuth();

  const fetchInvoices = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        withCredentials: true,
        params: { page, limit: PAGE_LIMIT },
      });
      setInvoices(res.data.data || []);
      const apiPagination = res.data.pagination;
      setPagination(apiPagination);
      setCurrentPage(apiPagination?.currentPage || page);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch invoices");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices(currentPage);
  }, [currentPage]);

  const handleSave = async (invoice) => {
    setLoading(true);
    try {
      const {
        _id: _INVOICE_ID,
        user: _USER,
        __v: _VERSION,
        ...invoiceWithoutIdUserV
      } = invoice;
      const cleanInvoice = {
        ...invoiceWithoutIdUserV,
        items: invoice.items.map((item) => {
          const normalizedItem = { ...item };
          delete normalizedItem._id;
          return normalizedItem;
        }),
      };

      if (editInvoice) {
        await axios.put(`${API_URL}/${editInvoice._id}`, cleanInvoice, {
          withCredentials: true,
        });
        toast.success("Invoice updated successfully!");
        fetchInvoices(currentPage);
      } else {
        await axios.post(API_URL, cleanInvoice, {
          withCredentials: true,
        });
        toast.success("Invoice created successfully!");
        if (currentPage === 1) {
          fetchInvoices(1);
        } else {
          setCurrentPage(1);
        }
      }

      setEditInvoice(null);
      setModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save invoice");
    }
    setLoading(false);
  };

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
    fetchInvoices(currentPage);
  };

  const openModal = (invoice = null) => {
    setEditInvoice(invoice);
    setModal(true);
  };

  const closeModal = () => {
    setEditInvoice(null);
    setModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Invoices Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, manage and track all your invoices
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => openModal()}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
            >
              Create Invoice
            </button>

            <button
              onClick={logout}
              className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <span className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          </div>
        ) : (
          <InvoiceList
            invoices={invoices}
            onEdit={openModal}
            onDelete={handleDelete}
            pagination={pagination}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 sm:p-10">
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
