export interface IClientReturnObject {
    error: boolean;
    errorMessage?: any;
    sucessMessage?: any;
    data?: any;
    trace?: any;
    statusCode: number;
}