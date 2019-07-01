export class Error {
    public code: ErrorCodes;
    public message: string;

    constructor(errorCode: ErrorCodes, errorMessage: string) {
        this.code = errorCode;
        this.message = errorMessage;
    }
}

export enum ErrorCodes {
    BadRequest = 'InvalidRequest',
    InternalServerError = 'InternalError',
}
