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
        .post(verificarToken,this.usuarioController.crearUsuario);
        
    }
}