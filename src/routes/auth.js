import auth from "../controller/auth.js";

export default (router) => {
  router.post("/auth/register", auth.register);
  router.post("/auth/login", auth.login);
};
