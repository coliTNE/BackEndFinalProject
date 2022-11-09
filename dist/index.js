"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Needs
const index_1 = __importDefault(require("./config/index"));
const server_1 = __importDefault(require("./services/server"));
// Init
server_1.default.listen(index_1.default.port, () => {
    console.log(`Servidor express en funcionamiento http://localhost:${index_1.default.port}`);
});
