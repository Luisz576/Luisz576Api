import { NextFunction, Request, Response } from "express";
import IHttpContext from "../../domain/interfaces/IHttpContext";
import IRequest from "../../domain/interfaces/IRequest";
import IResponse from "../../domain/interfaces/IResponse";

export default class ExpressAdapter implements IHttpContext{
    private req
    private res
    private nextFunction
    
    constructor(
        req: Request,
        res: Response,
        nextFunction: NextFunction
    ){
        this.req = req
        this.res = res
        this.nextFunction = nextFunction
    }

    getRequest(): IRequest {
        return this.req
    }
    
    getResponse(): IResponse {
        return this.res
    }

    next() {
        this.nextFunction()
    }
}