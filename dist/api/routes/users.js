"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/users", route);
    route.get("/", (_, res) => res.json({ data: [] }));
};
//# sourceMappingURL=users.js.map