import CustomError from "./customError";

export default class BadRequestError extends CustomError {
    protected _statusCode: number = 400;
    protected _context: any = [];
    protected _logging: boolean = true;

    constructor(params: {message: string, statusCode?: number, logging?: boolean, context?: any}) {
        const {message, statusCode, logging, context} = params;
        super(message);
        this._statusCode = statusCode || 400;
        this._logging = logging ? logging : true;
        this._context = context;
    }

    public statusCode(): number {
        return this._statusCode;
    }
    
    public errors() {
        return {
            message: this.message,
            context: this._context
        }
    }
    public logging(): boolean {
        return this._logging;
    }
    
}