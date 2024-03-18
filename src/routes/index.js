import express from "express";
import auth from "./auth.js";
const router = express.Router();

// list api
router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Welcome this is API template",
  });
});

export default () => {
  auth(router);
  return router;
};
