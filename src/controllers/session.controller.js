import config from "../config/config.js";
import userModel from "../services/dao/db/models/user.js";
import UserDto from "../services/dao/dto/user.dto.js";
import CartService from "../services/dao/db/carts.service.js";

import { isValidPassword, generateJWToken } from '../utils.js'

const linkCart = async (user) => {
    const cartService = new CartService()
    if(!user.cart){
        let newCart = await cartService.createCart()
        user.cart = newCart
        // console.log(JSON.stringify(newCart))
        return newCart
    }
}


const getSessionGithubController = async (req, res) => {
    const user = req.user

    const tokenUser = new UserDto(user)
    const access_token = generateJWToken(tokenUser);

    res.cookie('jwtCookieToken', access_token,
        {
            maxAge: 60000,
            httpOnly: false
        }
    )
    res.redirect("/products")
}

const postSessionController = async (req, res) => {
    const { email, password } = req.body;

    try {
        let tokenUser 
        if (email === config.adminEmail && password === config.adminPassword) {
            tokenUser = {
                firstName: `Admin Coder`,
                email: email,
                age: '-',
                role: 'admin',
                cart: 'user.cart'
            };

        }
        let user = await userModel.findOne({ email: email });
        if (!user) {
            console.warn(`No existe usuario con username ${email}`);
            return res.status(204).send({ error: "Not found", message: `No existe usuario con username ${email}` });
        }
        if (!isValidPassword(user, password)) {
            console.warn(`Credenciales invalidas para usuairo ${email}`);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
      
        //le vinculo un cart al usuario
        const newCart = await linkCart(user)

        tokenUser = new UserDto(user)
        const access_token = generateJWToken(tokenUser);

        if (access_token) res.cookie('jwtCookieToken', access_token, {
            maxAge: 60000,
            httpOnly: false
        });
     
        res.send({ message: "Login successful!", access_token: access_token });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
    }

}

const getSessionLogoutController = (req, res) => {

    if (req.cookies['jwtCookieToken']) {
        res.clearCookie('jwtCookieToken').send({ message: "Logout successful" });
    } else {
        res.status(401).send({ error: "No JWT cookie found" });
    }
}


const getSessionCurrentController = (req, res) => {
    const currentUser = new UserDto(req.user)
    if (currentUser) {
        res.send(currentUser)
    } else {
        res.send(`no existe currentUser`)
    }
}

export { getSessionGithubController, postSessionController, getSessionCurrentController, getSessionLogoutController }