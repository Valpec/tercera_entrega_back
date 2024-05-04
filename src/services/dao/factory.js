import MongoSingleton from "../../config/mongodb-singleton.js";
import config from "../../config/config.js";

let cartService
let productService

async function initializeMongoService() {
    console.log('Iniciando servicio para MongoDB');
    try {
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error('Error al iniciar MongoDB:', error);
        process.exit(1); 
    }
}

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService()
        const { default: CartService } = await import('./db/carts.service.js')
        cartService = new CartService()
        console.log('Servicio de carritos cargado')
        console.log(cartService)

        const { default: ProductService } = await import('./db/products.service.js')
        productService = new ProductService()
        console.log('Servicio de prods cargado')
        console.log(productService)
        break;
    
    case 'files':
        const { default: CartManager } = await import('./fileSystem/CartManager.js')
        cartService = new CartManager()
        console.log('Servicio de carritos cargado')
        console.log(cartService)


        const { default: ProductManager } = await import('./fileSystem/ProductManager.js')
        productService = new ProductManager()
        console.log('Servicio de prods cargado')
        console.log(productService)
        break;
    default:
        break;
}


export { cartService, productService}