"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/user", route);
    route.get("/", (_, res) => res.json({ data: { name: "it's me" } }));
};
//# sourceMappingURL=user.js.map