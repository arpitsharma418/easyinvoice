import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Easy Invoice Creation",
    description:
      "Quickly create professional invoices by adding client details, items, and pricing in a simple form.",
  },
  {
    title: "Manage Your Invoices",
    description:
      "Edit, update, or delete invoices anytime with a clean and straightforward interface.",
  },
  {
    title: "Instant PDF Download",
    description:
      "Export invoices as clean, professional PDF files ready to send to clients.",
  },
];

const steps = [
  {
    index: "01",
    title: "Enter Details",
    text: "Add business, client, and invoice information.",
  },
  {
    index: "02",
    title: "Generate Invoice",
    text: "The system formats your invoice automatically.",
  },
  {
    index: "03",
    title: "Download PDF",
    text: "Save the invoice as a PDF.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="border border-black/20 inline-block px-4 py-1 text-sm rounded-full opacity-70 font-semibold">
            Why teams choose easyinvoice
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black text-black/90 sm:text-4xl lg:text-5xl">
            Clean invoicing for modern workflows.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="border border-black/10 p-4 rounded-xl bg-black/2"
            >
              <h3 className="text-xl font-bold text-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/90 sm:text-base">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-white/70 bg-black/90 text-white p-6 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-2xl font-black sm:text-3xl">
                From draft to client-ready in three steps.
              </h3>
              <p className="mt-3 mb-6 max-w-xl text-sm text-slate-300 sm:text-base">
                No spreadsheets, no design tool switching, and no formatting
                bugs. EasyInvoice keeps your billing workflow simple and fast.
              </p>
              <Link
                to="/register"
                className="border px-5 py-3 text-sm rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Create Your First Invoice
              </Link>
            </div>
            <div className="grid gap-3">
              {steps.map((step) => (
                <div
                  key={step.index}
                  className="border p-3 rounded-xl bg-white text-black"
                >
                  <p className="font-semibold">{step.index}</p>
                  <p className="mt-1 text-base font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-black/80">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
