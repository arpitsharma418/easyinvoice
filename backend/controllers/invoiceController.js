import Invoice from "../models/Invoice.js";

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

    const invoices = await Invoice.find({ user: id });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found" });
    }

    return res.status(200).json({
      message: "Fetched All Invoices",
      data: invoices,
      totalInvoices: invoices.length,
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
      return res.status(403).json({ message: "Unauthorized to delete this invoice" });
    }

    await Invoice.findByIdAndDelete(id);

    return res.status(200).json({ message: "Invoice Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
