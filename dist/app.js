"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(routes) {
        var _this = this;
        this.port = Number(process.env.PORT) || 4000;
        this.app = (0, express_1.default)();
        routes.forEach(function (route) {
            _this.app.use(route.path, route.router);
        });
    }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Listening on port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
