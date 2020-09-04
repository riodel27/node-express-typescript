"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const user_1 = __importDefault(require("../../controllers/user"));
const route = express_1.Router();
exports.default = (app) => {
    app.use("/user", route);
    route.get("/", user_1.default.getUser);
    route.post("/", celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), user_1.default.createUser);
    route.put("/", (_, res, __) => {
        return res.json({ data: { name: "update user" } });
    });
    route.put("/:id", user_1.default.updateUser);
};
//# sourceMappingURL=user.js.map