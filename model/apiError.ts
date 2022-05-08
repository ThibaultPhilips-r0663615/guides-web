export class ApiError {
    id: string;
    HttpStatus: string;
    message: string;
    errors: string[];
    timeStamp: number;
    date: Date;
    time: any;
    timeZone: string;

    constructor() {

    }
}