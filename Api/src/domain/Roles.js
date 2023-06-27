module.exports = {
    /*
    MEMBER(0, "MEMBRO", "MEMBER", "MIEMBRO"),
    SUB(5, "SUB", "SUB", "SUB"),
    VIP(10, "VIP", "VIP", "VIP"),
    MVP(15, "MVP", "MVP", "MVP"),
    ADMIN(99, "ADM", "ADM", "ADM");
    */
    isRole(id){
        return id == 0 || id == 5 || id == 10 || id == 15 || id == 99
    },
    isAdmin(id){
        return id == 99
    }
}