import { ROLES } from '../../../config/config';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const validRoles = {
    values: ROLES,
    message: '{VALUES} no es un role valido'
};

export interface IUsuario extends mongoose.Document {
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombre: string;
    userName: string;
    password: string;
    role: string;
}

const UsuarioSchema =  new Schema(
    {
        apellidoPaterno: {
            type: String,
            required: [true, 'apellidoPaterno requerido']
        },
        apellidoMaterno: {
            type: String,
            required: [true, 'apellidoMaterno requerido']
        },
        nombre: {
            type: String,
            required: [true, 'nombre requerido']
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'userName requerido']
        },
        password: {
            type: String,
            required: [true, 'password requerido']
        },
        role : {
            type: String,
            enum: validRoles,
            required: [true, 'role requerido']
        }
    }    
);

UsuarioSchema.methods.toJSON = function() {
    let usuario =  this;
    let usuarioObject = usuario.toObject();    
    delete usuarioObject['password'];
    return usuarioObject;
}


UsuarioSchema.plugin(uniqueValidator, {message: '{PATH} ya fue registrado'});

const Usuario = mongoose.model<IUsuario>("Usuario", UsuarioSchema);
export default Usuario;




