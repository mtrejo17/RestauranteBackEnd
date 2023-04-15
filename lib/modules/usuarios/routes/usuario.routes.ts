import { UsuarioController } from "../controllers/usuario.controller"

export class UsuarioRoutes {
    private usuarioController: UsuarioController = new UsuarioController();
    public routes(app): void {
        app.route('/usuarioRoot')
        .post(this.usuarioController.crearUsuarioRoot);
        app.route('/login')
        .post(this.usuarioController.login);
    }
}