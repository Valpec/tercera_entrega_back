import ProductService from "./dao/db/products.service.js";
import CartService from "./dao/db/carts.service.js";
import UserService from "./dao/db/user.service.js";


import ProductsRepository from "./repository/products.repository.js";
import CartsRepository from "./repository/carts.repository.js";
import UserRepository from "./repository/user.repository.js";

const productsDao = new ProductService()
const cartsDao = new CartService()
const userDao = new UserService()

export const productService = new ProductsRepository(productsDao)
export const cartService = new CartsRepository(cartsDao)
export const userService = new UserRepository(userDao)



