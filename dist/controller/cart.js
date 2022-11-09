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
exports.instCart = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Config
const jsonPath = path_1.default.resolve(__dirname, "../../cart.json");
// Class
class CartApi {
    constructor(route) {
        this.route = route;
        this.list = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.route, "utf-8");
                this.list = JSON.parse(data);
            }
            catch (error) {
                return `Error al cargar los datos ${error}`;
            }
        });
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const str = JSON.stringify(this.list);
                yield promises_1.default.writeFile(this.route, str);
            }
            catch (error) {
                return `Error al escribir archivo ${error}`;
            }
        });
    }
    createCart() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = this.list;
            try {
                if (list.length <= 0) {
                    const newId = 1;
                    const date = new Date();
                    const timestamp = date.getTime();
                    const newCart = {
                        id: newId,
                        timestamp: timestamp,
                        products: [],
                    };
                    this.list = [newCart];
                    yield this.write();
                    return newId;
                }
                const lastCart = list[list.length - 1];
                const newId = lastCart.id + 1;
                const date = new Date();
                const timestamp = date.getTime();
                const newCart = {
                    id: newId,
                    timestamp: timestamp,
                    products: [],
                };
                this.list = [...list, newCart];
                yield this.write();
                return newId;
            }
            catch (error) {
                return `Error al crear el carrito ${error}`;
            }
        });
    }
    getAllCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                return list;
            }
            catch (error) {
                return `Error al listar los carritos ${error}`;
            }
        });
    }
    getCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const indexCart = list.findIndex((o) => o.id === id);
                return indexCart;
            }
            catch (error) {
                return NaN;
            }
        });
    }
    deleteCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parseId = parseInt(id);
                const indexCart = yield this.getCartById(parseId);
                if (indexCart === NaN) {
                    return `Carrito inexistente`;
                }
                this.list.splice(indexCart, 1);
                yield this.write();
                return `Se borro el carrito con id: ${parseId}`;
            }
            catch (error) {
                return `Hubo un error al borrar el carrito ${error}`;
            }
        });
    }
    getProductsCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexCart = yield this.getCartById(parseId);
                if (indexCart === NaN) {
                    return `Carrito inexistente`;
                }
                const cart = list[indexCart];
                return cart.products;
            }
            catch (error) {
                return `Hubo un error al listar los productos del carrito ${error}`;
            }
        });
    }
    saveProductCart(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexCart = yield this.getCartById(parseId);
                if (indexCart === NaN) {
                    return `Carrito inexistente`;
                }
                const cart = list[indexCart];
                const products = cart.products;
                if (products.length > 0) {
                    const lastElement = products[products.length - 1];
                    const newId = lastElement.id + 1;
                    const date = new Date();
                    const timestamp = date.getTime();
                    const newObj = Object.assign(Object.assign({}, obj), { id: newId, timestamp: timestamp });
                    products.push(newObj);
                    yield this.write();
                    return newId;
                }
                const newId = 1;
                const date = new Date();
                const timestamp = date.getTime();
                const newObj = Object.assign(Object.assign({}, obj), { id: newId, timestamp: timestamp });
                products.push(newObj);
                yield this.write();
                return newId;
            }
            catch (error) {
                `Error al guardar el producto ${error}`;
            }
        });
    }
    deleteProductCart(id, id__prod) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexCart = yield this.getCartById(parseId);
                if (indexCart === NaN) {
                    return `Carrito inexistente`;
                }
                const cart = list[indexCart];
                const products = cart.products;
                const parseId__prod = parseInt(id__prod);
                const indexProd = products.findIndex((o) => o.id === parseId__prod);
                products.splice(indexProd, 1);
                yield this.write();
                return `Se borro el producto con id: ${parseId__prod} del carrito con id ${parseId}`;
            }
            catch (error) {
                return `Hubo un error al borrar el elemento ${error}`;
            }
        });
    }
}
//Inst & Export
const instCart = new CartApi(jsonPath);
exports.instCart = instCart;
instCart.init();
