import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  email: Joi.string().email().lowercase().trim().required(),

  password: Joi.string().min(6).required(),
});

export default userSchema;