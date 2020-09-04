import { Router, Request, Response, NextFunction } from "express";
import { celebrate as validate, Joi } from "celebrate";

import UserController from "../../controllers/user";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/", UserController.getUser);

  route.post(
    "/",
    validate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    UserController.createUser
  );

  // this will update the user via id
  route.put("/", (_: Request, res: Response, __: NextFunction) => {
    return res.json({ data: { name: "update user" } });
  });

  route.put("/:id", UserController.updateUser);
};
