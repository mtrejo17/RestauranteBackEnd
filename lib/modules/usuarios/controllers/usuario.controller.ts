import { ROLES, ROOT_PASSWORD, SEDD, USER_PASSWORD } from '../../../config/config';
import * as _ from 'lodash';
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
        Usuario.findOne(
            {
                $and: [
                    {userName : req.body.userName},
                    {activo: true}
                ]
            }            
        )
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
        const nuevoUsuario = new Usuario(
            {
                apellidoPaterno: req.body.apellidoPaterno,
                apellidoMaterno: req.body.apellidoMaterno,
                nombre: req.body.nombre,
                userName: req.body.userName,
                password: bcrypt.hashSync(USER_PASSWORD,10),
                role: req.body.role
            }
        );
        nuevoUsuario.save()
        .then(usuarioCreado => {
            res.status(201).json(
                {
                    ok: true,
                    usuario: usuarioCreado,
                    message: 'Usuario creado'
                }
            );
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

    public actualizarUsuario = (req: Request, res: Response) => {
        Usuario.findByIdAndUpdate(req.params.id,req.body)
        .then(usuarioActualizado => {
            res.status(200).json(
                {
                    ok: true,
                    usuario: usuarioActualizado,
                    message: 'Usuario actualizado'
                }
            );
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error,
                    message: 'Usuarios no actualizado'
                }
            )
        });
    }

    public activarUsuario = (req: Request, res: Response) => {
        Usuario.findByIdAndUpdate(req.params.id, {activo: true})
        .then(usuarioActividado => {
            res.status(200).json(
                {
                    ok: true,
                    message: 'Usuario activado'
                }
            );
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error,
                    message: 'Usuario no activado'
                }
            );
        })
    }

    public desactivarUsuario = (req: Request, res: Response) => {
        Usuario.findByIdAndUpdate(req.params.id, {activo: false})
        .then(usuarioActividado => {
            res.status(200).json(
                {
                    ok: true,
                    message: 'Usuario desactivado'
                }
            );
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error,
                    message: 'Usuario no desactivado'
                }
            );
        })
    }

    public reestablecarPassword = (req: Request, res: Response) => {
        Usuario.findByIdAndUpdate(req.params.id, {password: bcrypt.hashSync(USER_PASSWORD,10)})
        .then(usuarioActualizado => {
            res.status(200).json(
                {
                    ok: true,
                    message: 'Contrasena reestablecida'
                }
            );
        })
        .catch(error => {
            res.status(400).json(
                {
                    ok: false,
                    error,
                    message: 'Contrasena no reestablecida'

                }
            )
        });
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

    public getRoles = (req: Request, res: Response) => {
        let roles = _.cloneDeep(ROLES);
        roles.shift();
        res.status(200).json(
            {
                ok: true,
                roles
            }
        )
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
    
    public checkToken  = (req: Request, res: Response) => {
        res.json({
            ok: true,
            message: 'Token valido'
        })
    }
}