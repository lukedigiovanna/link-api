"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = exports.ErrorCode = void 0;
var ErrorCode = /** @class */ (function () {
    function ErrorCode() {
    }
    ErrorCode.Unauthorized = "Unauthorized";
    ErrorCode.NotFound = "Not Found";
    ErrorCode.BadRequest = "Bad Request";
    ErrorCode.InternalServerError = "Internal Server Error";
    ErrorCode.NotImplemented = "Not Implemented";
    ErrorCode.NotAcceptable = "Not Acceptable";
    ErrorCode.UnsupportedMediaType = "Unsupported Media Type";
    ErrorCode.Conflict = "Conflict";
    ErrorCode.UnprocessableEntity = "Unprocessable Entity";
    ErrorCode.TooManyRequests = "Too Many Requests";
    ErrorCode.Unknown = "Unknown Server Error";
    return ErrorCode;
}());
exports.ErrorCode = ErrorCode;
var ErrorException = /** @class */ (function (_super) {
    __extends(ErrorException, _super);
    function ErrorException(code, meta) {
        if (code === void 0) { code = ErrorCode.Unknown; }
        if (meta === void 0) { meta = {}; }
        var _this = _super.call(this, code) || this;
        _this.meta = meta;
        _this.status = 500;
        switch (code) {
            case ErrorCode.Unauthorized:
                _this.status = 401;
                break;
            case ErrorCode.NotFound:
                _this.status = 404;
                break;
            case ErrorCode.BadRequest:
                _this.status = 400;
                break;
            case ErrorCode.InternalServerError:
                _this.status = 500;
                break;
            case ErrorCode.NotImplemented:
                _this.status = 501;
                break;
            case ErrorCode.NotAcceptable:
                _this.status = 406;
                break;
            case ErrorCode.UnsupportedMediaType:
                _this.status = 415;
                break;
            case ErrorCode.Conflict:
                _this.status = 409;
                break;
            case ErrorCode.UnprocessableEntity:
                _this.status = 422;
                break;
            case ErrorCode.TooManyRequests:
                _this.status = 429;
                break;
            default:
                _this.status = 500;
                break;
        }
        return _this;
    }
    return ErrorException;
}(Error));
exports.ErrorException = ErrorException;
