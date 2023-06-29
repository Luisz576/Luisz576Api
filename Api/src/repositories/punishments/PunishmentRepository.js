const Punishment = require('../../models/punishments/punishment')
const validator = require('../../services/validator')

module.exports = {
    async givePunishment({player_profile, applicator_profile_uuid, punishment_type, reason, duration, comment}){
        const punishment = await Punishment.create({
            player_profile: player_profile.uuid,
            applicator_profile: applicator_profile_uuid,
            punishment_type,
            reason,
            duration,
            comment
        })
        player_profile.punishment = true
        await player_profile.save()
        return punishment
    },
    async getById({punishment_id}){
        return await Punishment.findById(punishment_id)
    },
    async search({player_profile_uuid, applicator_profile_uuid, deleted, is_valid}){
        const filter = {
            player_profile: player_profile_uuid
        }
        if(applicator_profile_uuid){
            filter.applicator_profile = applicator_profile_uuid
        }
        if(validator.validateBoolean(deleted)){
            filter.deleted = deleted
        }
        if(validator.validateBoolean(is_valid)){
            filter.is_valid = is_valid
        }
        return await Punishment.find(filter)
    },
    async pardon({punishment, punishment_id}){
        // punishment
        if(punishment){
            punishment.is_valid = false
            await punishment.save()
            return
        }
        // punishment_id
        const p = await Punishment.findById(punishment_id)
        if(p){
            p.is_valid = false
            await p.save()
        }
        // TODO: que tal passar para typescript e tratar com Either?
        throw 'Punishment not founded'
    },
    async pardonAll({player_profile_uuid}){
        const punishments = await this.search({player_profile_uuid, deleted: false, is_valid: true})
        for(let i in punishments){
            punishments[i].deleted = true
            punishments[i].is_valid = false
            await punishments[i].save()
        }
    }
}