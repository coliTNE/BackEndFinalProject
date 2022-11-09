"use strict";
// Needs
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// EJS
const viewsFolderPath = path_1.default.resolve(__dirname, "../../views");
app.set("view engine", "ejs");
app.set("views", viewsFolderPath);
// Routes
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/api", index_routes_1.default);
// Export
exports.default = app;
