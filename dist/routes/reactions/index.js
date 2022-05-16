"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var reactions_1 = __importDefault(require("../../controllers/reactions"));
var ReactionsRouter = /** @class */ (function () {
    function ReactionsRouter() {
        this.path = '/reactions';
        this.router = (0, express_1.Router)({ mergeParams: true });
        this.controller = new reactions_1.default();
        this.initializeRoutes();
    }
    ReactionsRouter.prototype.initializeRoutes = function () {
        this.router.get("/", this.controller.allReactions);
        this.router.post("/", this.controller.createReaction);
        this.router.get("/:post_id", this.controller.getPostReactions);
    };
    return ReactionsRouter;
}());
exports.default = ReactionsRouter;
