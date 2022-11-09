// Needs

import { Router, Request, Response, NextFunction } from "express";
import { instCart } from "../controller/cart";

//Config

const cartRouter = Router();

//EndPoints

cartRouter.get("/", async (req: Request, res: Response) => {
  const carts: object = { list: await instCart.getAllCarts() };
  res.render("carts", carts);
});

cartRouter.post("/", async (req: Request, res: Response) => {
  const cart = await instCart.createCart();
  res.status(201).json({
    msg: "Carrito creado",
    data: cart,
  });
});

cartRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const cart = await instCart.deleteCartById(id);
  res.status(201).json({
    msg: cart,
  });
});

cartRouter.get("/:id/productos", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const products = await instCart.getProductsCart(id);
  res.status(200).json({
    msg: `productos del carrito con id ${id}`,
    data: products,
  });
});

cartRouter.post("/:id/productos", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const productos = req.body;
  await instCart.saveProductCart(id, productos);
  res.status(200).json({
    msg: `producto agregado en el carrito con id ${id}`,
    data: productos,
  });
});

cartRouter.delete(
  "/:id/productos/:id__prod",
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const id__prod: string = req.params.id__prod;
    await instCart.deleteProductCart(id, id__prod);
    res.status(200).json({
      msg: `producto eliminado en el carrito con id ${id}`,
    });
  }
);

//Export

export default cartRouter;
