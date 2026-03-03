import express from "express";
import {
  createInvoice,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  downloadInvoice
} from "../controllers/invoiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateInvoice from "../middleware/validateInvoice.js";

const router = express.Router();

router.post("/", authMiddleware, validateInvoice, createInvoice);
router.get("/", authMiddleware, getAllInvoices);
router.put("/:id", authMiddleware, validateInvoice, updateInvoice);
router.delete("/:id", authMiddleware, deleteInvoice);
router.get("/:id",authMiddleware, downloadInvoice);

export default router;
