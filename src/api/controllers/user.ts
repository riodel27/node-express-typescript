import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import AuthService from "../../services/auth";
import UserService from "../../services/user";

export default {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug("calling create user endpoint with body: ", req.body);

    try {
      const authServiceInstance = Container.get(AuthService);

      const { user, token } = await authServiceInstance.SignUp(req.body);

      logger.info(`${req.method} ${req.originalUrl} ${201}`);

      return res.status(201).json({
        message: "User Created",
        data: { user, token },
      });
    } catch (error) {
      return next(error);
    }
  },
  getUser: async (_: Request, res: Response, __: NextFunction) => {
    return res.json({ data: { name: "it's me" } });
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const logger: any = Container.get("logger");
    logger.debug(`calling update user endpoint`);
    try {
      const { id } = req.params;
      const { body: userInput } = req;

      const userServiceInstance = Container.get(UserService);

      const user = await userServiceInstance.UpdateUser(id, userInput);

      logger.info(`${req.method} ${req.originalUrl} ${200}`);
      return res.status(200).json({ message: "User Updated", data: user });
    } catch (error) {
      return next(error);
    }
  },
};
