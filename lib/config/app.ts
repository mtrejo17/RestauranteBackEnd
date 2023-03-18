import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as mongoose from "mongoose";
import * as http from 'http';

import { DB_URL, PORT } from "./config";

export default class App {s
    private static _instance: App;
    public app: express.Aplication;
    public port: number = Number(PORT);
    private httpServer: http.Server;
    public io;
   

    private constructor() {
       this.app = express();
       this.configurar();
       this.httpServer = new http.Server(this.app);       
       this.configurarDB();
    }

    private configurar():void {
        this.app.use(bodyParser.json({limit: '8192mb'}));
        this.app.use(bodyParser.urlenconded({limit: '8192mb', extended: true}));
        this.app.use(function(req,res, next) {
            res.setHeader('Access-Controll-Allow-Origin','*');            
        });
        this.app.use(cors({origin: '*', credentials: false}));
        this.app.get('/', (req,res) => {
            res.status(200).json(
                {
                    ok: true,
                    port: PORT
                }
            )
        });
    }

    private configurarDB(): void {
        mongoose.connect(DB_URL, {
            socketTimeoutMS: 30000000,
            keepAlive: true
        }, (err) => {
            if (err) throw err;
            console.log('DataBase OnLine');
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}