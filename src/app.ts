import express from "express";
import RouteSource from "./types/route-source.type";
import bodyParser from "body-parser";

class App {
    public app: express.Application;
    public port: number;

    constructor(routes: RouteSource[]) {
        this.port = Number(process.env.PORT) || 4000;
        this.app = express();

        this.initializeMiddlewares();

        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }

    public initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}

export default App;