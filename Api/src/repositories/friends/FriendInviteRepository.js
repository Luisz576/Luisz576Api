const FriendInvite = require('../../models/friends/FriendInvite')

module.exports = {
    async create({sender_uuid, receiver_uuid}){
        return await FriendInvite.create({
            sender: sender_uuid,
            receiver: receiver_uuid,
        })
    },
    async findValid({sender_uuid, receiver_uuid}){
        const friendInvites = await FriendInvite.find({
            sender: sender_uuid,
            receiver: receiver_uuid,
            valid_invite: true,
            accepted: false
        })
        // procura convite valido
        for(let i in friendInvites){
            if(friendInvites[i].stillValid().isValid){
                return friendInvites[i]
            }
        }
        return undefined
    },
    async acceptInvite({friendInvite}){
        // TODO aceita por aqui ou pelo FriendsList ou como?
    },
}