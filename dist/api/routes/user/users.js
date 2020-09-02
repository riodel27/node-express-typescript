"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/users", route);
    route.get("/", (req, res) => {
        const logger = typedi_1.Container.get("logger");
        logger.debug("Calling get users endpoint");
        logger.info(`${req.method} ${req.originalUrl} ${200}`);
        res.json({ data: [] });
    });
};
//# sourceMappingURL=users.js.map