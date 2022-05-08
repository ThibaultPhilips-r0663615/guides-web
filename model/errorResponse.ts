export enum ErrorTypes {
    connectionError,
    generalError
}

export class ErrorResponse {
    id?: string;
    date?: string;
    message?: string
    errorType: ErrorTypes
}