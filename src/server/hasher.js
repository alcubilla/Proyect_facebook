import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const SALT_ROUND =  12;
const TOKEN_EXPIRATION = 60 * 60;
const TOKEN_SECRET = 'hola';

export const matchHash = (plain, hashed) => bcryptjs.compareSync(plain, hashed);

export const createToken = data => jwt.sign(data, TOKEN_SECRET,{expiresIn: TOKEN_EXPIRATION});//crea un token

export const validateToken = token => jwt.verify(token, TOKEN_SECRET);  //verifica el token con la palabra secreta