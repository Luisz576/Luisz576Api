export default {
    /*
    MEMBER(0, "MEMBRO", "MEMBER", "MIEMBRO"),
    SUB(5, "SUB", "SUB", "SUB"),
    VIP(10, "VIP", "VIP", "VIP"),
    MVP(15, "MVP", "MVP", "MVP"),
    ADMIN(99, "ADM", "ADM", "ADM");
    */
    isRole(id: number): boolean{
        return id == 0 || id == 5 || id == 10 || id == 15 || this.isAdmin(id)
    },
    isAdmin(id: number): boolean{
        return id == 99
    }
}