import { ROOT_PASSWORD, SEDD } from '../../../config/config';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
                    let token = jwt.sign(
                        {
                            usuario: usuarioEncontrado
                        }, SEDD, {expiresIn: '2h'}
                    );
                    res.status(200).json(
                        {
                            ok: true,
                            usuario: usuarioEncontrado,
                            token
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

    public crearUsuario = (req: Request, res: Response) => {
        
    }

    public ObtenerUsuarios = (req: Request, res: Response) => {
        Usuario.find()
        .then(usuarios => {
            res.status(200).json(
                {
                    ok: true,
                    usuarios
                }
            )
        })
        .catch(error => {

        })
    }

    public validarUserName = (req: Request, res: Response) => {
        Usuario.findOne({userName: req.params.userName})
        .then(usuarioEncontrado => {
            if (usuarioEncontrado) {
                res.status(200).json(
                    {
                        ok: true,
                        existe: true
                    }
                );
            } else {
                res.status(200).json(
                    {
                        ok: true,
                        existe: false
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
        })
    }
}