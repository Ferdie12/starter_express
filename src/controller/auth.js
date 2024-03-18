import authService from "../service/auth.js";

export default class Auth {
  static register = async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json({
        status: true,
        message: "register succes",
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };

  static login = async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      if (result.id) {
        return res.status(200).json(result);
      }
      return res.status(200).json({
        status: true,
        message: "login succes",
        data: {
          token: result,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}
