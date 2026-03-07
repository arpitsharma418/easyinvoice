import React from "react";
import { Link } from "react-router-dom";

const quickStats = [
  { label: "Invoice Creation Time", value: "<5s" },
  { label: "PDF Download", value: "1 Click" },
  { label: "Manual Formatting", value: "0 Required" },
];

const invoiceItems = [
  { name: "Brand Identity & Guidelines", amount: "1,800" },
  { name: "Website UX Audit", amount: "950" },
  { name: "Monthly Support", amount: "450" },
];

export default function Hero() {
  return (
    <section className="mt-20 p-10 text-center sm:text-start">

      <h1 className="text-center text-xs opacity-80 border border-black/20 w-fit mx-auto px-2 py-1 rounded-full text-red-600 bg-white mb-5">Backend may take ~60s to wake (Render free tier).</h1>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-black/90 sm:text-5xl lg:text-6xl">
            Create invoices quickly, download them instantly.
          </h1>
          <p className="mt-6 max-w-2xl text-black/70 sm:text-lg">
            EasyInvoice lets you create, manage, and download invoices as professional PDF files.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row text-sm">
            <Link
              to="/register"
              className="border px-4 py-3 text-white bg-black/90 rounded-lg hover:bg-black/80 transition"
            >
              Start for Free
            </Link>
            <a
              href="#features"
              className="border px-4 py-3 text-white bg-black/90 rounded-lg hover:bg-black/80 transition"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-black/10 bg-white px-4 py-4"
              >
                <p className="text-xl font-bold text-black/90">{item.value}</p>
                <p className="mt-1 text-xs tracking-wide text-black/80">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

          <div className="sm:p-7">
            <div className="rounded-lg border border-black/10 bg-white p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase text-black/80">
                    Invoice
                  </p>
                  <p className="mt-1 text-xl font-bold text-black/80">#INV-2026-001</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                  Paid
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">From</p>
                  <p className="mt-1 font-semibold text-slate-800">EasyInvoice Studio</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Bill To</p>
                  <p className="mt-1 font-semibold text-slate-800">Northlane Labs</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                {invoiceItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between border-b border-black/5 px-3 py-2"
                  >
                    <p>&#8377; {item.name}</p>
                    <p> &#8377; {item.amount}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-black/3 px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Total Amount</p>
                  <p className="text-2xl"> &#8377; 3,200</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="w-1/2 rounded-lg bg-black px-3 py-2 text-xs sm:text-sm text-white">
                    Update
                  </button>
                  <button className="w-1/2 rounded-lg bg-blue-700 px-3 py-2 text-xs text-white sm:text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
