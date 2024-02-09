import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';

interface Options {
    port: number;
    routes: Router;
    publicPath?: string;
}

export class Server {

    public readonly app = express();
    private serverListen: any;
    private readonly port : number;
    private readonly publicPath : string;
    private readonly routes : Router;


    constructor(options: Options) {
        const { port, publicPath, routes } = options;
        this.port = port;
        this.publicPath = publicPath || 'public';
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());
        
        //* Public folder
        this.app.use(express.static(`src/${this.publicPath}`));

        //* Routes
        this.app.use(this.routes);
        
        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.serverListen = this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    public close() {
        this.serverListen.close();
    }
}