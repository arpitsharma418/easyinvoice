import Joi from "joi";

const invoiceJoiSchema = Joi.object({
  invoiceNumber: Joi.string().required(),

  invoiceDate: Joi.date().optional(),
  dueDate: Joi.date().required(),

  fromBusiness: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().allow("").optional(),
    phone: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
  }).required(),

  toBusiness: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().allow("").optional(),
    phone: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
  }).required(),

  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        quantity: Joi.number().positive().required(),
        unitPrice: Joi.number().positive().required(),
        total: Joi.number().optional(), // calculate server-side
      }),
    )
    .min(1)
    .required(),

  subtotal: Joi.number().optional(),
  taxRate: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  total: Joi.number().optional(),

  notes: Joi.string().allow("").optional(),

  status: Joi.string().valid("draft", "sent", "paid").optional(),

  createdAt: Joi.date().optional(),
});

export default invoiceJoiSchema;