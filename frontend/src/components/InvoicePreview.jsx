import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function InvoicePreview() {
  const [previewInv, setPreviewInv] = useState(null);
  const contentRef = useRef();
  const navigate = useNavigate();

  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    setPreviewInv(JSON.parse(localStorage.getItem("invoice_preview") || null));
  }, []);

  {
    if (previewInv == null) {
      return <div>Loading</div>;
    }
  }
  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="w-250 px-28 pb-28 mt-5 mx-auto">
        <div className="mb-10 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg w-fit hover:bg-blue-700">
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Invoice Preview</h1>
            <p>See & Download</p>
          </div>

          <button
            className="text-sm bg-blue-600 px-3 py-2 flex items-center gap-2 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
            onClick={reactToPrintFn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#FFFFFF"
            >
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
            Download PDF
          </button>
        </div>

        <div
          className="mt-8 bg-white border border-black/10 p-12 rounded-xl"
          ref={contentRef}
        >
          {/* Main Invoice header */}
          <div className="flex justify-between">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="45px"
                viewBox="0 -960 960 960"
                width="45px"
                fill="#FFFFFF"
                className="bg-teal-700 p-2 rounded-xl"
              >
                <path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
              </svg>
              <h1 className="text-2xl font-bold mt-3">
                {previewInv.fromBusiness.name}
              </h1>
              <div className="opacity-70 text-sm">
                <p>{previewInv.fromBusiness.address}</p>
                <p>{previewInv.fromBusiness.phone}</p>
                <p>{previewInv.fromBusiness.email}</p>
              </div>
            </div>
            <div className="text-end space-y-1">
              <h1 className="text-5xl font-extrabold">INVOICE</h1>
              <p className="text-sm font-bold">{previewInv.invoiceNumber}</p>
              <p className="text-sm opacity-70">
                Issued {formatDate(previewInv.invoiceDate)}
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="bg-black/5 h-px mt-5"></div>

          {/* second */}
          <div className="flex justify-between py-7">
            <div>
              <h1 className="text-xs font-semibold opacity-70">BILL TO</h1>
              <div className="text-sm mt-2 opacity-90">
                <h1 className="font-bold">{previewInv.toBusiness.name}</h1>
                <p>{previewInv.toBusiness.address}</p>
                <p>{previewInv.toBusiness.email}</p>
                <p>{previewInv.toBusiness.phone}</p>
              </div>
            </div>

            <div>
              <h1 className="text-xs font-semibold opacity-70">SHIP TO</h1>
            </div>

            <div className="text-[10px] font-semibold space-y-2 bg-gray-50 p-4 rounded-xl">
              <p>
                <span className="opacity-70 mr-5 tracking-widest font-bold">
                  DUE DATE:
                </span>
                <span className="text-sm text-red-500">
                  {formatDate(previewInv.dueDate)}
                </span>
              </p>
              <p>
                <span className="opacity-70 mr-5 tracking-widest font-bold">
                  PAYEMENT STATUS:
                </span>
                <span className="bg-gray-200 font-extrabold px-2 py-1 text-[10px] rounded opacity-80 tracking-widest text-teal-800">
                  {previewInv.status.toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-black/5 h-px mt-5"></div>

          {/* item table */}
          <div>
            <table className="w-full mt-8 text-sm">
              <thead className="border-b-2">
                <tr className="text-gray-500 text-xs">
                  <th className="text-left py-2">DESCRIPTION</th>
                  <th className="text-center">QTY</th>
                  <th className="text-center">RATE</th>
                  <th className="text-right">AMOUNT</th>
                </tr>
              </thead>

              {previewInv.items.map((inv, idx) => {
                return (
                  <tbody key={idx}>
                    <tr className="border-t border-black/10">
                      <td className="py-3">
                        <p className="font-medium">{inv.description}</p>
                      </td>
                      <td className="text-center">{inv.quantity}</td>
                      <td className="text-center"> &#8377; {inv.unitPrice}</td>
                      <td className="text-right">&#8377; {inv.total}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>

          {/* subtotal */}
          <div className="flex items-end gap-3 flex-col mt-8 text-sm">
            <div className="flex w-64 justify-between">
              <span className="font-semibold opacity-70">Subtotal</span>
              <span className="font-bold">&#8377; {previewInv.subtotal}</span>
            </div>
            <div className="flex w-64 justify-between">
              <span className="font-semibold opacity-70">Tax {previewInv.taxRate} %</span>
              <span className="font-bold">&#8377; {previewInv.taxAmount}</span>
            </div>

            <div className="bg-black/10 h-px w-full mt-5"></div>

            <div className="flex w-64 justify-between items-end">
              <span className="font-semibold">TOTAL DUE</span>
              <span className="font-bold text-teal-700 text-3xl">
                &#8377; {previewInv.total}
              </span>
            </div>
          </div>

          {previewInv.notes &&  <div className="text-xs opacity-70">{previewInv.notes}</div> }

          {/* fourth */}

        </div>
      </div>
    </>
  );
}
