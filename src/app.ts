import express from "express";
import RouteSource from "./types/route-source.type";

class App {
    public app: express.Application;
    public port: number;

    constructor(routes: RouteSource[]) {
        this.port = Number(process.env.PORT) || 4000;
        this.app = express();

        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}

export default App;