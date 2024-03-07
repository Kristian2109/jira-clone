import CustomError from "./customError";

export default class BadRequestError extends CustomError {
    constructor(params: {message: string, statusCode?: number, logging?: boolean, context?: any}) {
        const {message, statusCode, logging, context} = params;
        super(message);
        this.statusCode = statusCode || 400;
        this.logging = logging ? logging : true;
        this.errors = {
            message: this.message,
            context
        }
    }
}