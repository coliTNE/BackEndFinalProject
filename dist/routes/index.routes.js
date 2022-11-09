"use strict";
// Needs
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_routes_1 = __importDefault(require("./products.routes"));
const carrito_routes_1 = __importDefault(require("./carrito.routes"));
// Config
const indexRouter = (0, express_1.Router)();
// Routes
indexRouter.use("/productos", products_routes_1.default);
indexRouter.use("/carrito", carrito_routes_1.default);
// Export
exports.default = indexRouter;
