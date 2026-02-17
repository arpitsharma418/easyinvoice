import invoiceSchema from "../validators/invoiceValidator.js";

const validateInvoice = (req, res, next) => {
  try {
    const { error } = invoiceSchema.validate(req.body, { abortEarly: true });

    if(!error){
      return next();
    }


    if (error) {
      return res
        .status(422)
        .json({ error: error.details.map((d) => d.message) });
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default validateInvoice;
