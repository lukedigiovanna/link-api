"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var posts_1 = __importDefault(require("../../controllers/posts"));
var PostsRouter = /** @class */ (function () {
    function PostsRouter() {
        this.path = '/posts';
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.controller = new posts_1.default();
        this.initializeRoutes();
    }
    PostsRouter.prototype.initializeRoutes = function () {
        this.router.get("/", this.controller.allPosts);
        this.router.post("/", this.controller.createPost);
    };
    return PostsRouter;
}());
exports.default = PostsRouter;
