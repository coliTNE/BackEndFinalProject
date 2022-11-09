// Needs

import fs from "fs/promises";
import path from "path";

// Config

const jsonPath = path.resolve(__dirname, "../../products.json");

interface Product {
  timestamp: number;
  name: string;
  descrip: string;
  url: string;
  price: number;
  stock: number;
}

interface FinalProduct extends Product {
  id: number;
}

// Class

class ProductsApi {
  route: string;
  list: FinalProduct[];
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

  async save(obj: Product) {
    const list = this.list;
    try {
      if (list.length <= 0) {
        const newId: number = 1;
        const date = new Date();
        const timestamp = date.getTime();
        const newObj: FinalProduct = {
          ...obj,
          id: newId,
          timestamp: timestamp,
        };
        this.list = [newObj];
        await this.write();
        return newId;
      }
      const lastElement: FinalProduct = list[list.length - 1];
      const newId: number = lastElement.id + 1;
      const date = new Date();
      const timestamp = date.getTime();
      const newObj: FinalProduct = {
        ...obj,
        id: newId,
        timestamp: timestamp,
      };
      this.list = [...list, newObj];
      await this.write();
      return newId;
    } catch (error) {
      return `Error al guardar el producto ${error}`;
    }
  }

  async getById(id: string) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexObj = list.findIndex((o) => o.id === parseId);
      if (indexObj === -1) {
        return null;
      }
      return list[indexObj];
    } catch (error) {
      return `Error al buscar el producto ${error}`;
    }
  }

  async getAll() {
    try {
      return this.list;
    } catch (error) {
      return `Error al buscar la lista de productos ${error}`;
    }
  }

  async updateById(id: string, obj: object) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexObj = list.findIndex((o) => o.id === parseId);
      const newObj: FinalProduct = { ...list[indexObj], ...obj };
      this.list = [...list, newObj];
      await this.write();
      return newObj;
    } catch (error) {
      return `Hubo un error al actualizar el elemento ${error}`;
    }
  }

  async deleteById(id: string) {
    try {
      const list = this.list;
      const parseId: number = parseInt(id);
      const indexObj = list.findIndex((o) => o.id === parseId);
      this.list.splice(indexObj, 1);
      await this.write();
      return `Se borro el elemento con id: ${parseId}`;
    } catch (error) {
      return `Hubo un error al borrar el elemento ${error}`;
    }
  }
}

//Inst & Export

const instProducts = new ProductsApi(jsonPath);
instProducts.init();

export { instProducts, FinalProduct };
