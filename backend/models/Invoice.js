import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  // Owner of invoice
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Invoice basic info
  invoiceNumber: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  
  // From section (Who is sending the invoice)
  fromBusiness: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  
  // To section (Who receives the invoice)
  toBusiness: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  
  // Line items (Products or services being invoiced)
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      total: Number, // quantity * unitPrice
    }
  ],
  
  // Money calculations
  subtotal: Number,
  taxRate: Number, // percentage like 10 for 10%
  taxAmount: Number,
  total: Number,
  
  // Extra info
  notes: String,
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid'], // Invoice status
    default: 'draft',
  },
  
  // Track when invoice was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Invoice model from schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
