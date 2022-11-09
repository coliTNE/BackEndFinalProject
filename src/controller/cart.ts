// Needs

import fs from "fs/promises";
import path from "path";
import { FinalProduct } from "./products";

// Config

const jsonPath = path.resolve(__dirname, "../../cart.json");

interface Cart {
  id: number;
  timestamp: number;
  products: FinalProduct[];
}

// Class

class CartApi {
  route: string;
  list: Cart[];
  constructor(route: string) {
    this.route = route;
    this.list = [];
  }

  async init() {
    try {
      const data = await fs.readFile(this.route, "utf-8");
      this.list = JSON.parse(data);
    } catch (error) {
      return `Error al cargar los datos ${error}`;
    }
  }

  async write() {
    try {
      const str: string = JSON.stringify(this.list);
      await fs.writeFile(this.route, str);
    } catch (error) {
      return `Error al escribir archivo ${error}`;
    }
  }

  async createCart() {
    const list = this.list;
    try {
      if (list.length <= 0) {
        const newId: number = 1;
        const date = new Date();
        const timestamp = date.getTime();
        const newCart: Cart = {
          id: newId,
          timestamp: timestamp,
          products: [],
        };
        this.list = [newCart];
        await this.write();
        return newId;
      }
      const lastCart = list[list.length - 1];
      const newId: number = lastCart.id + 1;
      const date = new Date();
      const timestamp = date.getTime();
      const newCart: Cart = {
        id: newId,
        timestamp: timestamp,
        products: [],
      };
      this.list = [...list, newCart];
      await this.write();
      return newId;
    } catch (error) {
      return `Error al crear el carrito ${error}`;
    }
  }

  async getAllCarts() {
    try {
      const list = this.list;
      return list;
    } catch (error) {
      return `Error al listar los carritos ${error}`;
    }
  }

  async getCartById(id: number) {
    try {
      const list = this.list;
      const indexCart = list.findIndex((o) => o.id === id);
      return indexCart;
    } catch (error) {
      return NaN;
    }
  }

  async deleteCartById(id: string) {
    try {
      const parseId: number = parseInt(id);
      const indexCart = await this.getCartById(parseId);
      if (indexCart === NaN) {
        return `Carrito inexistente`;
      }
      this.list.splice(indexCart, 1);
      await this.write();
      return `Se borro el carrito con id: ${parseId}`;
    } catch (error) {
      return `Hubo un error al borrar el carrito ${error}`;
    }
  }

  async getProductsCart(id: string) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexCart = await this.getCartById(parseId);
      if (indexCart === NaN) {
        return `Carrito inexistente`;
      }
      const cart = list[indexCart];
      return cart.products;
    } catch (error) {
      return `Hubo un error al listar los productos del carrito ${error}`;
    }
  }

  async saveProductCart(id: string, obj: FinalProduct) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexCart = await this.getCartById(parseId);
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
        const newObj: FinalProduct = {
          ...obj,
          id: newId,
          timestamp: timestamp,
        };
        products.push(newObj);
        await this.write();
        return newId;
      }
      const newId: number = 1;
      const date = new Date();
      const timestamp = date.getTime();
      const newObj: FinalProduct = {
        ...obj,
        id: newId,
        timestamp: timestamp,
      };
      products.push(newObj);
      await this.write();
      return newId;
    } catch (error) {
      `Error al guardar el producto ${error}`;
    }
  }

  async deleteProductCart(id: string, id__prod: string) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexCart = await this.getCartById(parseId);
      if (indexCart === NaN) {
        return `Carrito inexistente`;
      }
      const cart = list[indexCart];
      const products = cart.products;
      const parseId__prod: number = parseInt(id__prod);
      const indexProd = products.findIndex((o) => o.id === parseId__prod);
      products.splice(indexProd, 1);
      await this.write();
      return `Se borro el producto con id: ${parseId__prod} del carrito con id ${parseId}`;
    } catch (error) {
      return `Hubo un error al borrar el elemento ${error}`;
    }
  }
}

//Inst & Export

const instCart = new CartApi(jsonPath);
instCart.init();

export { instCart };
