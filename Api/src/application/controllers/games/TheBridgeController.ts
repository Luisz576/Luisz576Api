import IHttpContext from '../../../domain/interfaces/IHttpContext'
import validator from '../../../services/validator'

export default class TheBridgeController {
    async store(httpContext: IHttpContext){
        return httpContext.getResponse().sendStatus(501)
    }
    async searchProfile(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            return httpContext.getResponse().sendStatus(501)
        }
        return httpContext.getResponse().sendStatus(400)
    }
    async searchProfileMatches(httpContext: IHttpContext){
        const { uuid } = httpContext.getRequest().params
        if(validator.validateUUID(uuid)){
            return httpContext.getResponse().sendStatus(501)
        }
        return httpContext.getResponse().sendStatus(400)
    }
}