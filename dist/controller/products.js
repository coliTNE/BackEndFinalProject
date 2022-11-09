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
exports.instProducts = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Config
const jsonPath = path_1.default.resolve(__dirname, "../../products.json");
// Class
class ProductsApi {
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
    save(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = this.list;
            try {
                if (list.length <= 0) {
                    const newId = 1;
                    const date = new Date();
                    const timestamp = date.getTime();
                    const newObj = Object.assign(Object.assign({}, obj), { id: newId, timestamp: timestamp });
                    this.list = [newObj];
                    yield this.write();
                    return newId;
                }
                const lastElement = list[list.length - 1];
                const newId = lastElement.id + 1;
                const date = new Date();
                const timestamp = date.getTime();
                const newObj = Object.assign(Object.assign({}, obj), { id: newId, timestamp: timestamp });
                this.list = [...list, newObj];
                yield this.write();
                return newId;
            }
            catch (error) {
                return `Error al guardar el producto ${error}`;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexObj = list.findIndex((o) => o.id === parseId);
                if (indexObj === -1) {
                    return null;
                }
                return list[indexObj];
            }
            catch (error) {
                return `Error al buscar el producto ${error}`;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.list;
            }
            catch (error) {
                return `Error al buscar la lista de productos ${error}`;
            }
        });
    }
    updateById(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexObj = list.findIndex((o) => o.id === parseId);
                const newObj = Object.assign(Object.assign({}, list[indexObj]), obj);
                this.list = [...list, newObj];
                yield this.write();
                return newObj;
            }
            catch (error) {
                return `Hubo un error al actualizar el elemento ${error}`;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = this.list;
                const parseId = parseInt(id);
                const indexObj = list.findIndex((o) => o.id === parseId);
                this.list.splice(indexObj, 1);
                yield this.write();
                return `Se borro el elemento con id: ${parseId}`;
            }
            catch (error) {
                return `Hubo un error al borrar el elemento ${error}`;
            }
        });
    }
}
//Inst & Export
const instProducts = new ProductsApi(jsonPath);
exports.instProducts = instProducts;
instProducts.init();
