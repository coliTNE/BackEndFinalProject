// Needs

import { Router, Request, Response, NextFunction } from "express";
import { instProducts as productsController } from "../controller/products";
import config from "../config/index";

// Config

const productsRouter = Router();
const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!config.admin) {
    return res.status(401).json({
      msg: "No estas autorizado",
    });
  }
  next();
};

//EndPoints

productsRouter.get("/", async (req: Request, res: Response) => {
  const products: object = {
    list: await productsController.getAll(),
  };
  res.render("list", products);
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const productExists = await productsController.getById(id);
  if (!productExists) {
    res.status(404).json({
      msg: "El producto no existe",
    });
    return;
  }
  const products: object = {
    product: await productsController.getById(id),
  };
  res.render("product", products);
});

productsRouter.post("/", checkAdmin, async (req: Request, res: Response) => {
  await productsController.save(req.body);
  res.status(201).json({
    msg: "Producto guardado",
    data: req.body,
  });
});

productsRouter.put("/:id", checkAdmin, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const productExists = await productsController.getById(id);
  if (!productExists) {
    res.status(404).json({
      msg: "El producto no existe",
    });
    return;
  }
  const updatedProduct = await productsController.updateById(id, req.body);
  res.status(202).json({
    msg: "El producto fue actualizado",
    data: updatedProduct,
  });
});

productsRouter.delete(
  "/:id",
  checkAdmin,
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const productExists = await productsController.getById(id);
    if (!productExists) {
      res.status(404).json({
        msg: "El producto no existe",
      });
      return;
    }
    await productsController.deleteById(id);
    res.status(200).json({
      msg: "El producto fue eliminado",
    });
  }
);

//Export

export default productsRouter;
