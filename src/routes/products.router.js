import { Router } from "express";
import { authorization } from "../utils.js";
import { getProductsController , getProdIdController, postProductsController, putProdIdController, deleteProductController } from '../controllers/products.controller.js'


const router = Router();


router.get('/', getProductsController)

router.get('/:pid', getProdIdController)

router.post('/', authorization('admin'), postProductsController)

router.put('/:pid', authorization('admin'), putProdIdController)

router.delete('/:pid', authorization('admin'), deleteProductController)

export default router