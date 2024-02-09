import { AppRoutes } from "../src/applications/routes/routes";
import { Server } from "../src/applications/server";
import { envs } from "../src/config/envs";


export const testServer = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
});