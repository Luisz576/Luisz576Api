const FriendInvite = require('../../models/friends/FriendInvite')

module.exports = {
    async create({sender_uuid, receiver_uuid}){
        return await FriendInvite.create({
            sender: sender_uuid,
            receiver: receiver_uuid,
        })
    },
    async findAllValids({receiver_uuid}){
        const friendInvites = await this.find({
            receiver: receiver_uuid,
            valid_invite: true,
            accepted: false
        })
        const invites = []
        // procura convite valido
        for(let i in friendInvites){
            if(friendInvites[i].stillValid().isValid){
                invites.push(friendInvites[i])
            }else{
                this.expiresInvite({
                    friend_invite: friendInvites[i]
                })
            }
        }
        return invites
    },
    async findValid({sender_uuid, receiver_uuid}){
        const friendInvites = await FriendInvite.find({
            sender: sender_uuid,
            receiver: receiver_uuid,
            valid_invite: true,
            accepted: false
        })
        for(let i in friendInvites){
            if(friendInvites[i].stillValid().isValid){
                return friendInvites[i]
            }else{
                this.expiresInvite({
                    friend_invite: friendInvites[i]
                })
            }
        }
        return undefined
    },
    async expiresInvite({friend_invite}){
        friend_invite.expires()
        await friend_invite.save()
    },
    async acceptInvite({friend_invite}){
        friend_invite.accept()
        await friend_invite.save()
    },
}