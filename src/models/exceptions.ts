import { StatusCode } from "./statusEnum";

export abstract class AppExcption{
    readonly message: string;
    readonly status: number;

    constructor(message, status){
        this.message = message;
        this.status = status;
    }
}

export class ValidationError extends AppExcption{
    constructor(message: string){
        super(message, StatusCode.BadRequest);
    }
}

export class NotFoundError extends AppExcption {
    constructor(message: string){
        super(message, StatusCode.NotFound);
    }
}