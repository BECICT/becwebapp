import { IClientReturnObject } from "src/interface/IclientReturnObj";

export function clientFeedback(option: IClientReturnObject): IClientReturnObject {
    return {
        error: option.error,
        statusCode: option.statusCode,
        errorMessage: option.errorMessage || null,
        sucessMessage: option.sucessMessage || null,
        data: option.data || null,
        trace: option.trace || null
    }
}
