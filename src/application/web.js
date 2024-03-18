import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { connectToDatabase } from "./database.js";
import router from "../routes/index.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

dotenv.config();
connectToDatabase();
export const web = express();
web.use(cors());
web.use(helmet());
web.use(morgan("dev"));
web.use(express.json());
web.use(express.urlencoded({ extended: true }));

web.use(router());

web.use(errorMiddleware);
