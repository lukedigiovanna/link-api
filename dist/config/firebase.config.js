"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var config = require("../../firebase-service-account.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
