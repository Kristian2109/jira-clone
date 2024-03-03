export default class DuplicateResourceException extends Error {
    constructor(message: string) {
        super(message);
    }
}