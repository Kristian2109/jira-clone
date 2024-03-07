export default abstract class CustomError extends Error {
    public statusCode: number;
    public errors: any; 
    public logging: boolean;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.logging = true;
    
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
      }

}