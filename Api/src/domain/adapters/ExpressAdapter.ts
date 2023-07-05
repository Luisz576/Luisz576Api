import { NextFunction, Request, Response } from "express";
import IHttpContext from "../interfaces/IHttpContext";
import IResponse from "../interfaces/IResponse";
import IRequest from "../interfaces/IRequest";

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