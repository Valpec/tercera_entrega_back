import { Router } from 'express';
import { passportCall , authorization} from '../utils.js';

import { postCartController, getCartIdController, postCartIdController, deleteCartProdIdController, deleteCartProdsController, putCartController, putCartQtyController, getPurchaseController} from '../controllers/carts.controller.js'

const router = Router();

router.post('/', postCartController)

router.get('/:cid', authorization('user'), getCartIdController)

// POST de cada producto en el carrito. En el caso de ya existir, aumenta su cantidad en uno
router.post('/:cid/product/:pid', authorization('user'), postCartIdController)

//DELETE del producto seleccionado del carrito
router.delete('/:cid/product/:pid', authorization('user'), deleteCartProdIdController)

//DELETE de todos los prods del carrito
router.delete('/:cid', authorization('user'), deleteCartProdsController)

//PUT actualiza el carrito con un arreglo de prods con el formato de paginacion
router.put('/:cid', authorization('user'), putCartController)

//PUT actualiza SOLO la cant de ejemplares del prod por cualquier cant pasada desde el req.body
router.put('/:cid/product/:pid', authorization('user'), putCartQtyController)

router.get('/:cid/purchase', passportCall('jwt'), authorization('user'), getPurchaseController)




export default router;
