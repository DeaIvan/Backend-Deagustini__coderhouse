import { promises } from 'fs';
import fs from 'fs';
export default class ProductManager {

  constructor() {
    this.products = [];

    this.ruta = './productos.json';
  }

  async save(obj) {
    const products = await this.getAll();
        if (products.length === 0) {
            obj.id = 1;
        } else {
            obj.id = products[products.length -1].id + 1;
        }
        products.push(obj);
        
        await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, '\t'));
        return obj;
  }

  async getById(id) {
      let productoFind = this.products.findIndex(e=>e.id === id);

        if (productoFind === undefined) {
            console.log('Not found');
            return;
        }else{
          const data = await fs.promises.readFile(this.ruta, 'utf-8');
          let products = JSON.parse(data);
          const find = products.find(e => e.id === id)
          console.log('Producto buscado:');
          console.log(find);
          return find;
        }
  }

  async getAll() {
    try {
      const products = await promises.readFile(this.ruta, 'utf-8');
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteById(id) {
        const products = await this.getAll();
        const productIndex = products.findIndex(e=>e.id === id);
    
            if (productIndex === -1) {
                console.log('Producto no encontrado');
                return;
            }else{
                let borrado = products.filter((item => item.id != id));
                await fs.promises.writeFile(this.ruta, JSON.stringify(borrado, null, '\t'));
                console.log('Producto Borrado');
                console.log(borrado);
            }
  }

  async deleteAll() {
        let borradoAll = [];
        await fs.promises.writeFile(this.ruta, JSON.stringify(borradoAll, null, '\t'));
  }
}