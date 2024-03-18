import Joi from "joi";

const registerUserValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.email": "Alamat email tidak valid",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password harus memiliki minimal 8 karakter",
  }),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Konfirmasi password harus sesuai dengan password",
  }),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerUserValidation, loginUserValidation };
