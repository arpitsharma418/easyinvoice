function generateInvoiceHTML(invoice) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #1f2937;
      }

      .container {
        width: 794px;
        min-height: 1123px;
        padding: 48px;
        box-sizing: border-box;
      }

      h1 {
        margin: 0;
      }

      .flex {
        display: flex;
        justify-content: space-between;
      }

      .mt-6 { margin-top: 24px; }
      .mt-8 { margin-top: 32px; }
      .mt-10 { margin-top: 40px; }
      .mt-20 { margin-top: 80px; }

      .text-sm { font-size: 14px; }
      .text-lg { font-size: 18px; }
      .font-bold { font-weight: bold; }
      .font-semibold { font-weight: 600; }

      .divider {
        border-top: 1px solid rgba(0,0,0,0.1);
        margin-top: 32px;
      }

      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
        margin-top: 40px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 32px;
        font-size: 14px;
      }

      th {
        text-align: left;
        padding: 8px 0;
        border-bottom: 2px solid rgba(0,0,0,0.3);
      }

      td {
        padding: 12px 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }

      .text-right { text-align: right; }

      .totals {
        width: 288px;
        margin-left: auto;
        margin-top: 40px;
        font-size: 14px;
      }

      .totals-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .totals-divider {
        border-top: 1px solid rgba(0,0,0,0.3);
        margin: 12px 0;
      }

      .grand-total {
        font-weight: bold;
        font-size: 18px;
      }

      .footer {
        margin-top: 80px;
        font-size: 12px;
        color: #4b5563;
      }
    </style>
  </head>

  <body>
    <div class="container">

      <!-- HEADER -->
      <div>
        <h1 style="font-size:24px; font-weight:bold;">INVOICE</h1>

        <div class="flex text-sm mt-6">
          <div>
            <div class="font-semibold">From</div>
            <div>${invoice.fromBusiness.name}, ${invoice.fromBusiness.address}</div>
            <div>${invoice.fromBusiness.email}</div>
            <div>${invoice.fromBusiness.phone}</div>
          </div>

          <div>
            <div class="flex">
              <span class="font-semibold">Invoice #</span>
              <span>${invoice.invoiceNumber}</span>
            </div>

            <div class="flex">
              <span class="font-semibold">Invoice Date</span>
              <span>${new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}</span>
            </div>

            <div class="flex">
              <span class="font-semibold">Due Date</span>
              <span>${new Date(invoice.dueDate).toLocaleDateString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BILL / SHIP -->
      <div class="grid-2 text-sm">
        <div>
          <div class="font-semibold" style="margin-bottom:8px;">Bill To</div>
          <div>${invoice.toBusiness.name}</div>
          <div>${invoice.toBusiness.address}</div>
          <div>${invoice.toBusiness.email}</div>
          <div>${invoice.toBusiness.phone}</div>
        </div>

        <div>
          <div class="font-semibold" style="margin-bottom:8px;">Ship To</div>
          <div>${invoice.toBusiness.name}</div>
          <div>${invoice.toBusiness.address}</div>
          <div>${invoice.toBusiness.email}</div>
          <div>${invoice.toBusiness.phone}</div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- TABLE -->
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Description</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${item.quantity}</td>
              <td>${item.description}</td>
              <td class="text-right">₹ ${item.unitPrice.toFixed(2)}</td>
              <td class="text-right">₹ ${item.total.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- TOTALS -->
      <div class="totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>₹ ${invoice.subtotal.toFixed(2)}</span>
        </div>

        <div class="totals-row">
          <span>GST ${invoice.taxRate}%</span>
          <span>₹ ${invoice.taxAmount.toFixed(2)}</span>
        </div>

        <div class="totals-divider"></div>

        <div class="totals-row grand-total">
          <span>Total</span>
          <span>₹ ${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div style="font-weight:600;">Terms & Conditions</div>
        <div>Payment is due within 15 days. Thank you for your business.</div>

        ${invoice.notes ? `
          <div style="margin-top:12px;">
            <strong>Notes:</strong> ${invoice.notes}
          </div>
        ` : ""}
      </div>

    </div>
  </body>
  </html>
  `;
}

export default generateInvoiceHTML;