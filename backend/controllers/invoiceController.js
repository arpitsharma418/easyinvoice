import Invoice from "../models/Invoice.js";
import puppeteer from "puppeteer";
import generateInvoiceHTML from "../utils/generatePDF.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Calculate Invoice
const calculateInvoice = (items, taxRate) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, total };
};

// Create Invoice
export const createInvoice = async (req, res) => {
  const { items, taxRate, invoiceNumber } = req.body;

  const { subtotal, taxAmount, total } = calculateInvoice(items, taxRate);

  try {
    const isExist = await Invoice.findOne({ invoiceNumber, user: req.userId });

    if (isExist) {
      return res
        .status(409)
        .json({ message: "Invoice already exists with this invoice number" });
    }

    const invoiceData = {
      ...req.body,
      user: req.userId,
      items: items.map((i) => ({
        ...i,
        total: i.quantity * i.unitPrice,
      })),
      subtotal,
      taxAmount,
      total,
    };

    const newInvoice = new Invoice(invoiceData);

    await newInvoice.save();

    return res.status(201).json({ message: "Invoice Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get All invoices by user id
export const getAllInvoices = async (req, res) => {
  try {
    const id = req.userId;
    const parsedPage = Number.parseInt(req.query.page, 10);
    const parsedLimit = Number.parseInt(req.query.limit, 10);

    const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    const limit =
      Number.isNaN(parsedLimit) || parsedLimit < 1
        ? 10
        : Math.min(parsedLimit, 100);

    const filter = { user: id };
    const totalInvoices = await Invoice.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(totalInvoices / limit));
    const currentPage =
      totalInvoices === 0 ? 1 : Math.min(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const invoices = await Invoice.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const startInvoice = totalInvoices === 0 ? 0 : skip + 1;
    const endInvoice = totalInvoices === 0 ? 0 : skip + invoices.length;

    return res.status(200).json({
      message: "Fetched All Invoices",
      data: invoices,
      pagination: {
        currentPage,
        totalPages,
        totalInvoices,
        limit,
        startInvoice,
        endInvoice,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Invoice
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, taxRate, invoiceNumber } = req.body;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this invoice" });
    }

    if (invoice.invoiceNumber != invoiceNumber) {
      return res
        .status(409)
        .json({ message: "Invoice already exists with this invoice number" });
    }

    const { subtotal, taxAmount, total } = calculateInvoice(items, taxRate);

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        ...req.body,
        items: items.map((i) => ({
          ...i,
          total: i.quantity * i.unitPrice,
        })),
        subtotal,
        taxAmount,
        total,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "Invoice Updated Successfully!",
      data: updatedInvoice,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this invoice" });
    }

    await Invoice.findByIdAndDelete(id);

    return res.status(200).json({ message: "Invoice Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to download this invoice" });
    }

    const html = generateInvoiceHTML(invoice);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const backendRoot = path.resolve(__dirname, "..");
    const executablePath = resolveChromeExecutablePath(backendRoot);

    const pdf = await generatePdfWithLaunchFallback(html, executablePath);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
    });

    res.send(pdf);
  } catch (error) {
    console.error("Puppeteer PDF Error:", error);
    res.status(500).json({
      message: "PDF generation failed",
      error: error.message,
    });
  }
};

async function generatePdfWithLaunchFallback(html, executablePath) {
  const launchOptions = getLaunchOptions(executablePath);
  let lastError = null;

  for (const options of launchOptions) {
    let browser = null;

    try {
      browser = await puppeteer.launch(options);
      const pdf = await renderPdf(browser, html);
      await browser.close();
      return pdf;
    } catch (error) {
      lastError = error;
      if (browser) await browser.close().catch(() => {});
    }
  }

  throw lastError || new Error("Unable to launch browser for PDF generation");
}

async function renderPdf(browser, html) {
  let lastError = null;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const page = await browser.newPage();

    try {
      await page.setContent(html, {
        waitUntil: "networkidle0",
        timeout: 45000,
      });
      await page.emulateMediaType("screen");
      await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      await page.close();
      return pdf;
    } catch (error) {
      lastError = error;
      await page.close().catch(() => {});

      if (!isTargetClosedError(error) || attempt === 2) {
        break;
      }
    }
  }

  throw lastError || new Error("PDF rendering failed");
}

function getLaunchOptions(executablePath) {
  const args = ["--disable-dev-shm-usage", "--disable-gpu"];

  if (process.platform === "linux") {
    args.push("--no-sandbox", "--disable-setuid-sandbox");
  }

  const options = [
    {
      headless: "new",
      args,
      protocolTimeout: 60000,
      ...(executablePath ? { executablePath } : {}),
    },
    {
      headless: true,
      args,
      protocolTimeout: 60000,
      ...(executablePath ? { executablePath } : {}),
    },
    {
      headless: true,
      args,
      protocolTimeout: 60000,
    },
  ];

  return options;
}

function isTargetClosedError(error) {
  const message = `${error?.name || ""} ${error?.message || ""}`.toLowerCase();
  return message.includes("target closed");
}

function resolveChromeExecutablePath(backendRoot) {
  return (
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    findBundledChromePath(backendRoot) ||
    null
  );
}

function findBundledChromePath(backendRoot) {
  const chromeRoot = path.join(backendRoot, ".cache", "puppeteer", "chrome");
  if (!fs.existsSync(chromeRoot)) return null;

  const stack = [chromeRoot];
  const candidates = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      const normalized = fullPath.replace(/\\/g, "/");
      if (
        normalized.endsWith("/chrome-linux64/chrome") ||
        normalized.endsWith("/chrome-win64/chrome.exe") ||
        normalized.endsWith("/chrome-mac/Chromium.app/Contents/MacOS/Chromium")
      ) {
        candidates.push(fullPath);
      }
    }
  }

  if (candidates.length === 0) return null;

  // Pick the most recently modified downloaded browser.
  candidates.sort(
    (a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs,
  );

  return candidates[0];
}
