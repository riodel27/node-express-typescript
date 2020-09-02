import { Router, Response } from "express";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  //TODO: CRUD operations

  route.get("/", (_, res: Response) => res.json({ data: { name: "it's me" } }));
};
