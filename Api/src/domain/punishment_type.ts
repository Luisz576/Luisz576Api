export default {
    isValidPunishment(id: number, duration = 0){
        return id == 1 || this.isValidBan(id, duration)
    },
    isBanPunishment(id: number){
        return id == 2 || id == 3
    },
    isValidBan(id: number, duration = 0){
        return id == 3 || (id == 2 && duration > 0)
    },
    isPunishmentWithDuration(id: number){
        return id == 2
    }
}