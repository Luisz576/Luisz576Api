import IRequest from '../../../domain/adapters/IRequest'
import IResponse from '../../../domain/adapters/IResponse'
import validator from '../../../services/validator'

export default class TheBridgeController {
    // TODO colocar redis nos controllers?
    //      ou nos repositoies e ai quando chamar a funcao save no model salva no redis?
    //      ou criar uma camada de cache?
    async store(req: IRequest, res: IResponse){
        return res.sendStatus(501)
    }
    async searchProfile(req: IRequest, res: IResponse){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            return res.sendStatus(501)
        }
        return res.sendStatus(400)
    }
    async searchProfileMatches(req: IRequest, res: IResponse){
        const { uuid } = req.params
        if(validator.validateUUID(uuid)){
            return res.sendStatus(501)
        }
        return res.sendStatus(400)
    }
}