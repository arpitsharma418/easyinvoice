import userSchema from "../validators/userValidation.js";

const validateUser = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: true });

    if (error) {

      return res.status(422).json({message: "validation Error", error: error.details[0].message});
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default validateUser;
