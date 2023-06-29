module.exports = {
    isValidPunishment(id, duration = 0){
        return id == 1 || this.isValidBan(id, duration)
    },
    isBanPunishment(id){
        return id == 2 || id == 3
    },
    isValidBan(id, duration = 0){
        return id == 3 || (id == 2 && duration > 0)
    },
    isPunishmentWithDuration(id){
        return id == 2
    }
}