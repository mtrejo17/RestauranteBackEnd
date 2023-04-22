import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { SEDD } from '../config/config'  

interface IUsuario {

    apellidoPaterno: String;
    apellidoMaterno: String;
    nombre: String;
    userName: String;    
    role: String;
    _id: String;
}

export interface IUsuarioRequest extends Request {
    usuario: IUsuario
}

export const verificarToken = (req: Request, res: Response, next) => {
    let token = req.get('Authorization');
    if(!token) {
        token = req.get('x-token')
    }
    jwt.verify(token, SEDD, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'invalid token'
                }
            })
        }
        req.usuario = decoded.usuario;
        next();
    });
}