import { ROOT_PASSWORD } from '../../../config/config';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';

import Usuario from '../models/usuario.model';


export class UsuarioController {
    public crearUsuarioRoot = (req: Request, res: Response) => {
        const UsuarioRoot = new Usuario(
            {
                apellidoPaterno: 'root',
                apellidoMaterno: 'root',
                nombre: 'root',
                userName: 'root',
                password: bcrypt.hashSync(ROOT_PASSWORD,10),
                role: 'root'
            }
        );
        UsuarioRoot.save()
        .then(usuarioCreado => {
            res.status(201).json(
                {
                    ok: true,
                    message: 'usuario root creado con exito'
                }
            )
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error
                }
            )
        });

    }
}