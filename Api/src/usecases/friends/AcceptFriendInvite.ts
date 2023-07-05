import { PromiseEither, left, right } from "../../types/either";

type AcceptFriendInviteRequest = {

}

export default class AcceptFriendInvite{
    constructor(

    ){}
    async execute(data: AcceptFriendInviteRequest): PromiseEither<any, null>{
        try{
            //TODO
            return right(null)
        }catch(err){
            return left(err)
        }
    }
}