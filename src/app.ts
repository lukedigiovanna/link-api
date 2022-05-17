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
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}

export default App;