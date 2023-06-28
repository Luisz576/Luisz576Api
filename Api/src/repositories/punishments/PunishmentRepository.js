const Punishment = require('../../models/punishments/punishment')
const validator = require('../../services/validator')

module.exports = {
    async givePunishment({player_profile, applicator_profile_uuid, punishment_type, reason, duration, comment}){
        //TODO validar se ja nao tem essa punição
        player_profile.registerPunishment()
        const punishment = await Punishment.create({
            player_profile: player_profile.uuid,
            applicator_profile: applicator_profile_uuid,
            punishment_type,
            reason,
            duration,
            comment
        })
        await player_profile.save()
        return punishment
    },
    async searsh({player_profile_uuid, applicator_profile_uuid, deleted}){
        const filter = {
            player_profile: player_profile_uuid
        }
        if(applicator_profile_uuid){
            filter.applicator_profile = applicator_profile_uuid
        }
        if(validator.validateBoolean(deleted)){
            filter.deleted = deleted
        }
        return await Punishment.find(filter)
    },
    async pardonAll({player_profile_uuid}){
        // TODO
    }
}