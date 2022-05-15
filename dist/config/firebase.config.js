"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
// const config = {
// 	type: process.env.FIREBASE_TYPE,
// 	project_id: process.env.FIREBASE_PROJECT_ID,
// 	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
// 	private_key: process.env.FIREBASE_PRIVATE_KEY!.split("\\n").join("\n"), // Formatting fix for Docker Image with Github Secrets
// 	client_email: process.env.FIREBASE_CLIENT_EMAIL,
// 	client_i: process.env.FIREBASE_CLIENT_I,
// 	auth_uri: process.env.FIREBASE_AUTH_URI,
// 	token_uri: process.env.FIREBASE_TOKEN_URI,
// 	auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
// 	client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
// } as ServiceAccount;
var config = require("../../link-b2a31-firebase-adminsdk-n8mr4-cbd450538c.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
