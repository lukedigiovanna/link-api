"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("../../controllers/users"));
var UsersRouter = /** @class */ (function () {
    function UsersRouter() {
        this.path = '/users';
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.controller = new users_1.default();
        this.initializeRoutes();
    }
    UsersRouter.prototype.initializeRoutes = function () {
        this.router.get("/", this.controller.allUsers);
        this.router.post("/", this.controller.createUser);
        this.router.get("/:username", this.controller.getUser);
    };
    return UsersRouter;
}());
exports.default = UsersRouter;
