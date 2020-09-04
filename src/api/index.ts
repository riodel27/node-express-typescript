import { Router } from "express";

import user from "./routes/user";

export default () => {
  const app = Router();

  user(app);

  app.get("/", (_, res) =>
    res.send("✌️ Welcome to node-express-typescript-boilerplate API! ✌️")
  );

  return app;
};
