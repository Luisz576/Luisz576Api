import IRequest from "./IRequest";
import IResponse from "./IResponse";

export default interface IHttpContext{
    getRequest(): IRequest
    getResponse(): IResponse
    next(): void
}