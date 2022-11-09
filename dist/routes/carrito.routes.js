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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controller/cart");
//Config
const cartRouter = (0, express_1.Router)();
//EndPoints
cartRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = { list: yield cart_1.instCart.getAllCarts() };
    res.render("carts", carts);
}));
cartRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_1.instCart.createCart();
    res.status(201).json({
        msg: "Carrito creado",
        data: cart,
    });
}));
cartRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cart = yield cart_1.instCart.deleteCartById(id);
    res.status(201).json({
        msg: cart,
    });
}));
cartRouter.get("/:id/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const products = yield cart_1.instCart.getProductsCart(id);
    res.status(200).json({
        msg: `productos del carrito con id ${id}`,
        data: products,
    });
}));
cartRouter.post("/:id/productos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const productos = req.body;
    yield cart_1.instCart.saveProductCart(id, productos);
    res.status(200).json({
        msg: `producto agregado en el carrito con id ${id}`,
        data: productos,
    });
}));
cartRouter.delete("/:id/productos/:id__prod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const id__prod = req.params.id__prod;
    yield cart_1.instCart.deleteProductCart(id, id__prod);
    res.status(200).json({
        msg: `producto eliminado en el carrito con id ${id}`,
    });
}));
//Export
exports.default = cartRouter;
