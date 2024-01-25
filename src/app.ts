import { AppRoutes } from './applications/routes/routes';
import { Server } from './applications/server';
import { envs } from './config/envs';

( async () => {

    main();

})();

function main() {
    const server = new Server({
        port: envs.PORT, 
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });
    server.start();
}