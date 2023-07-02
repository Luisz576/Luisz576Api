function isValidPunishment(id: number, duration = 0){
    return id == 1 || isValidBan(id, duration)
}

function isBanPunishment(id: number){
    return id == 2 || id == 3
}

function isValidBan(id: number, duration = 0){
    return id == 3 || (id == 2 && duration > 0)
}

function isPunishmentWithDuration(id: number){
    return id == 2
}

export {
    isPunishmentWithDuration,
    isValidBan,
    isBanPunishment,
    isValidPunishment
}