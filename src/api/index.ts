import { Router } from "express";

import user from "./routes/user/user";
import users from "./routes/user/users";

export default () => {
  const app = Router();

  user(app);
  users(app);

  app.get("/", (_, res) =>
    res.send("✌️ Welcome to node-express-typescript-boilerplate API! ✌️")
  );

  return app;
};
