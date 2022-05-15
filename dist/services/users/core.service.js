"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var firestore_1 = require("firebase-admin/firestore");
var auth_1 = require("firebase-admin/auth");
var error_type_1 = require("../../types/error.type");
var CoreUserService = /** @class */ (function () {
    function CoreUserService() {
        this.prisma = new client_1.PrismaClient();
        this.firestore = (0, firestore_1.getFirestore)();
        this.auth = (0, auth_1.getAuth)();
    }
    CoreUserService.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findMany({
                        // all
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    CoreUserService.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var users, firebaseUser, firestoreUser, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findFirst({
                            where: {
                                username: user.name
                            }
                        })];
                    case 1:
                        users = _a.sent();
                        if (users) {
                            throw new error_type_1.ErrorException(error_type_1.ErrorCode.Conflict, { "message": "User ".concat(user.name, " already exists") });
                        }
                        return [4 /*yield*/, this.auth.createUser({
                                email: user.email,
                                emailVerified: false,
                                password: user.password
                            })];
                    case 2:
                        firebaseUser = _a.sent();
                        return [4 /*yield*/, this.firestore.collection('users').doc(firebaseUser.uid).set({
                                name: user.name,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                avatarURL: user.avatarURL,
                                createdAt: new Date()
                            })];
                    case 3:
                        firestoreUser = _a.sent();
                        return [4 /*yield*/, this.prisma.user.create({
                                data: {
                                    id: firebaseUser.uid,
                                    username: user.name
                                }
                            })];
                    case 4:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser.id];
                }
            });
        });
    };
    CoreUserService.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userDoc, info, infoData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDoc = this.firestore.collection("users").doc(userId);
                        return [4 /*yield*/, userDoc.get()];
                    case 1:
                        info = _a.sent();
                        infoData = info.data();
                        if (!infoData) { // will not receive this data if there is no user associated with the ID
                            throw new error_type_1.ErrorException(error_type_1.ErrorCode.NotFound, { "message": "User ".concat(userId, " not found") });
                        }
                        console.log(infoData);
                        // convert firestore data to user data
                        infoData.created_at = infoData.created_at.toDate();
                        return [2 /*return*/, __assign({}, infoData)];
                }
            });
        });
    };
    return CoreUserService;
}());
exports.default = new CoreUserService();
