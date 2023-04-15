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

    public login = (req: Request, res: Response) => {
        Usuario.findOne({userName : req.body.userName})
        .then(usuarioEncontrado => {
            if (usuarioEncontrado) {
                if(bcrypt.compareSync(req.body.password,usuarioEncontrado.password)) {
                    res.status(200).json(
                        {
                            ok: true,
                            message: 'Usuario idenficado exitosamente'
                        }
                    )

                } else {
                    res.status(400).json(
                        {
                            ok: false,
                            message: 'Password no valido'
                        }
                    );    
                }

            } else {
                res.status(400).json(
                    {
                        ok: false,
                        message: 'Usuario no valido'
                    }
                );
            }
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error
                }
            );
        });       
    }
}