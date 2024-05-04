
// import { cartService } from '../services/dao/factory.js'
import { cartService } from "../services/service.js";

const postCartController = async(req, res) => {
    try{
        await cartService.createCart()
        res.status(201).send({message: "Cart creado con exito"});
    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo crear el carrito"});
    }   
}

const getCartIdController = async(req,res) => {
    try{
        let cid = req.params.cid
        res.send(await cartService.listCartProds(cid))
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    } 
}

const postCartIdController = async(req,res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        await cartService.addToCart(cid, pid)
        res.status(201).send({message: "Producto agregado con exito"});
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
    
}

const deleteCartProdIdController = async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        await cartService.deleteProdFromCart(cid, pid)
        res.status(200).send({ message: "Producto eliminado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const deleteCartProdsController = async(req, res) => {
    try{
        let cid = req.params.cid
        await cartService.deleteCart(cid)
        res.status(200).send({ message: "Carrito eliminado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const putCartController = async(req, res) => {
    try{
        let cid = req.params.cid
        await cartService.updateCart(cid)

        res.status(200).send({ message: "Carrito actualizado con exito" });
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const putCartQtyController =  async(req, res) => {
    try{
        let cid = req.params.cid
        let pid = req.params.pid
        let qty = req.body.qty

        await cartService.updateCartQty(cid, pid, qty)
        res.status(200).send({ message: "Carrito actualizado con exito" });

    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
}

const viewCartController = async (req, res) => {
    try {
        let cid = req.params.cid
        let cart = await cartService.listCartProds(cid)
        let user = req.user
        let data = {cart, user}

        console.log(cart)
        console.log(data)
        req.user ? res.render('cart', data) : res.send('Debe estar loguado para ver este contenido')

    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando el carrito" })
    }
}

export { postCartController, getCartIdController, postCartIdController, deleteCartProdIdController, deleteCartProdsController, putCartController, putCartQtyController, viewCartController}