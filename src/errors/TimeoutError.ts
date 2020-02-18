export class TimeoutError extends Error{
    constructor(errorMessage: string){
        super(errorMessage);
    }
}