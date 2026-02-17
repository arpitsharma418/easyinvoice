import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="lg:p-10 w-[85%] mx-auto mt-28 md:mt-12">
        {/* Hero Section */}
        <div className="lg:flex mt-5">
          <div className="left w-full lg:w-[50%]">

            <div className="mt-5 space-y-10">
              <h1 className="text-7xl font-extrabold">
                Create Professional Invoices in Seconds
              </h1>
              <p className="text-lg opacity-80">
                Enter your details, add items, and download your invoice
                instantly. No complexity. Just straightforward invoicing for
                freelancers and small businesses.
              </p>
            </div>

            <div className="mt-8 flex gap-2 md:gap-4 w-full">
              <Link
                to="/register"
                className="w-[50%] py-5 bg-blue-600 rounded-xl font-semibold text-white cursor-pointer hover:bg-blue-700 transition-all duration-200 text-center"
              >
                Get Started free
              </Link>
              <button className="w-[50%] py-5 bg-white shadow text-black rounded-xl font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-3">
                Explore features{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M480-80 200-360l56-56 184 183v-647h80v647l184-184 56 57L480-80Z" />
                </svg>
              </button>
            </div>
            <div className="flex gap-10 mt-16 md:mt-10 justify-evenly md:justify-between">
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#000000"
                  className="bg-white p-2 rounded-xl shadow"
                >
                  <path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z" />
                </svg>
                <p>Invoice Preview</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#000000"
                  className="bg-white p-2 rounded-xl shadow"
                >
                  <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                </svg>{" "}
                <p>Lighting fast</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#000000"
                  className="bg-white p-2 rounded-xl shadow"
                >
                  <path d="M480-340q33 0 56.5-23.5T560-420q0-33-23.5-56.5T480-500q-33 0-56.5 23.5T400-420q0 33 23.5 56.5T480-340ZM160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                </svg>{" "}
                <p>Professional</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[10%]"></div>

          <div className="mt-16 md:mt-8 lg:mt-0 w-full lg:w-[40%] bg-white rounded-2xl p-5 lg:p-10 shadow-sm text-sm h-fit">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-semibold">
                  AC
                </div>
                <div>
                  <p className="font-semibold text-base">Acme Corporation</p>
                  <p className="text-gray-400 text-xs">GST: 27AAAPL1234C1ZV</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">INVOICE</p>
                <p className="font-semibold">#INV-1024</p>
              </div>
            </div>

            <hr className="mb-4 opacity-10" />

            <div className="space-y-4 mb-4 opacity-60">
              <div className="flex justify-between">
                <span>Website Design & Development</span>
                <span>₹15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Consultation (2 hours)</span>
                <span>₹3,000</span>
              </div>
              <div className="flex justify-between">
                <span>Premium Hosting Setup</span>
                <span>₹2,500</span>
              </div>
            </div>

            <hr className="mb-4 opacity-10" />

            <div className="space-y-2 mb-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹20,500</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹3,240</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-base mb-6 mt-6">
              <span>Total Amount</span>
              <span className="text-blue-600 font-bold text-4xl opacity-70">
                ₹23,740
              </span>
            </div>

            <div className="flex gap-3 mt-5">
              <button className="w-1/2 rounded-xl py-4 bg-white shadow">
                Preview
              </button>
              <button className="w-1/2 bg-blue-600 text-white rounded-xl py-2">
                Download as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
