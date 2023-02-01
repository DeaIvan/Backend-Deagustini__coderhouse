import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));

const products = await productManager.getAll();

app.get('/products', async (req, res) => {
    const limit = Number(req.query.limit)
    if(!limit) return res.send({products});

    const filterLimit = products.filter(p => products.length = limit)

    res.send({filterLimit})   
})



app.get('/products/:id', (req, res) => {
    const idProducto = Number(req.params.id);

    const product = products.find(u=>u.id === idProducto);
    if(!product) return res.send({error: 'Producto no encontrado'});
    res.send(product);
});

app.listen(8080,()=>console.log("Listening on 8080"))