import { validate } from "../validation/validation.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/auth.js";
import prisma from "../application/database.js";
import ResponseError from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { JWT_SECRET_KEY } = process.env;

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "email sudah terdaftar!");
  }

  user.password = await bcrypt.hash(user.password, 10);

  delete user.confirmpassword;

  return prisma.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "email atau password anda salah!");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "email atau password anda salah!");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = await jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

export default {
  register,
  login,
};
