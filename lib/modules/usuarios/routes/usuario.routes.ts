import { verificarToken } from "../../../midlewares/midlewares";
import { UsuarioController } from "../controllers/usuario.controller"

export class UsuarioRoutes {
    private usuarioController: UsuarioController = new UsuarioController();
    public routes(app): void {
        app.route('/usuarioRoot')
        .post(this.usuarioController.crearUsuarioRoot);
        app.route('/login')
        .post(this.usuarioController.login);
        app.route('/usuario')
        .get(this.usuarioController.ObtenerUsuarios)
        .post(this.usuarioController.crearUsuario);   
        app.route('/validarUserName/:userName')
        .get(this.usuarioController.validarUserName);
        app.route('/roles')
        .get(this.usuarioController.getRoles);
        app.route('/usuario/:id')
        .put(this.usuarioController.actualizarUsuario);
        app.route('/usuario/activar/:id')
        .put(this.usuarioController.activarUsuario);
        app.route('/usuario/desactivar/:id')
        .put(this.usuarioController.desactivarUsuario);
    }
}