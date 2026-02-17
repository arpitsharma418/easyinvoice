import Joi from "joi";

const invoiceJoiSchema = Joi.object({
  invoiceNumber: Joi.string().required(),

  invoiceDate: Joi.date().optional(),
  dueDate: Joi.date().required(),

  fromBusiness: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),

  toBusiness: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),

  items: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        quantity: Joi.number().positive().required(),
        unitPrice: Joi.number().positive().required(),
        total: Joi.number().positive().optional(),
      }),
    )
    .min(1)
    .required(),

  subtotal: Joi.number().positive().optional(),
  taxRate: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  total: Joi.number().positive().optional(),

  notes: Joi.string().allow(""),

  status: Joi.string().valid("draft", "sent", "paid").optional(),

  createdAt: Joi.date().optional(),
});

export default invoiceJoiSchema;