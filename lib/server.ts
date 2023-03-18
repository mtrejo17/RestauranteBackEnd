import App from './config/app';

const serve = App.instance;

serve.start(()=> {
    console.log(`Servidor corriendo en el puerto ${serve.port}`);
});

