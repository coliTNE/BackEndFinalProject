// Needs

import { Router } from "express";
import productsRouter from "./products.routes";
import cartRouter from "./carrito.routes";

// Config

const indexRouter = Router();

// Routes

indexRouter.use("/productos", productsRouter);
indexRouter.use("/carrito", cartRouter);

// Export

export default indexRouter;
