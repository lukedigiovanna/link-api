export class ErrorCode {
    public static readonly Unauthorized = "Unauthorized";
    public static readonly NotFound = "Not Found";
    public static readonly BadRequest = "Bad Request";
    public static readonly InternalServerError = "Internal Server Error";
    public static readonly NotImplemented = "Not Implemented";
    public static readonly NotAcceptable = "Not Acceptable";
    public static readonly UnsupportedMediaType = "Unsupported Media Type";
    public static readonly Conflict = "Conflict";
    public static readonly UnprocessableEntity = "Unprocessable Entity";
    public static readonly TooManyRequests = "Too Many Requests";
    public static readonly Unknown = "Unknown Server Error"; 
}

export class ErrorException extends Error {
    public meta: any;
    public status: number;

    constructor(code: string = ErrorCode.Unknown, meta: any = {}) {
        super(code);
        this.meta = meta;
        this.status = 500;
        
        switch (code) {
            case ErrorCode.Unauthorized:
                this.status = 401;
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                break;
            case ErrorCode.BadRequest:
                this.status = 400;
                break;
            case ErrorCode.InternalServerError:
                this.status = 500;
                break;
            case ErrorCode.NotImplemented:
                this.status = 501;
                break;
            case ErrorCode.NotAcceptable:
                this.status = 406;
                break;
            case ErrorCode.UnsupportedMediaType:
                this.status = 415;
                break;
            case ErrorCode.Conflict:
                this.status = 409;
                break;
            case ErrorCode.UnprocessableEntity:
                this.status = 422;
                break;
            case ErrorCode.TooManyRequests:
                this.status = 429;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}