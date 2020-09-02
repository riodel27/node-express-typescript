import { Request, Router, Response } from "express";
import { Container } from "typedi";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/", (req: Request, res: Response) => {
    const logger: any = Container.get("logger");
    logger.debug("Calling get users endpoint");

    logger.info(`${req.method} ${req.originalUrl} ${200}`);
    res.json({ data: [] });
  });
};
