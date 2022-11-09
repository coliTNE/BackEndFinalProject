"use strict";
// Needs
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controller/products");
const index_1 = __importDefault(require("../config/index"));
// Config
const productsRouter = (0, express_1.Router)();
const checkAdmin = (req, res, next) => {
    if (!index_1.default.admin) {
        return res.status(401).json({
            msg: "No estas autorizado",
        });
    }
    next();
};
//EndPoints
productsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = {
        list: yield products_1.instProducts.getAll(),
    };
    res.render("list", products);
}));
productsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productExists = yield products_1.instProducts.getById(id);
    if (!productExists) {
        res.status(404).json({
            msg: "El producto no existe",
        });
        return;
    }
    const products = {
        product: yield products_1.instProducts.getById(id),
    };
    res.render("product", products);
}));
productsRouter.post("/", checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_1.instProducts.save(req.body);
    res.status(201).json({
        msg: "Producto guardado",
        data: req.body,
    });
}));
productsRouter.put("/:id", checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productExists = yield products_1.instProducts.getById(id);
    if (!productExists) {
        res.status(404).json({
            msg: "El producto no existe",
        });
        return;
    }
    const updatedProduct = yield products_1.instProducts.updateById(id, req.body);
    res.status(202).json({
        msg: "El producto fue actualizado",
        data: updatedProduct,
    });
}));
productsRouter.delete("/:id", checkAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productExists = yield products_1.instProducts.getById(id);
    if (!productExists) {
        res.status(404).json({
            msg: "El producto no existe",
        });
        return;
    }
    yield products_1.instProducts.deleteById(id);
    res.status(200).json({
        msg: "El producto fue eliminado",
    });
}));
//Export
exports.default = productsRouter;
