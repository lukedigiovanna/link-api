"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("./config");
var app_1 = __importDefault(require("./app"));
var users_1 = __importDefault(require("./routes/users"));
var posts_1 = __importDefault(require("./routes/posts"));
var reactions_1 = __importDefault(require("./routes/reactions"));
exports.app = new app_1.default([
    new users_1.default(),
    new posts_1.default(),
    new reactions_1.default()
]);
exports.app.listen();
