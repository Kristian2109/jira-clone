export default abstract class CustomError extends Error {
    abstract statusCode(): number;
    abstract errors(): any; 
    abstract logging(): boolean;


    constructor(message: string) {
        super(message);
    
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
      }

}