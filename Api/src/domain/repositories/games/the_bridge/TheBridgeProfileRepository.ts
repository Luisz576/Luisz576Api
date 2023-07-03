export interface ITheBridgeProfileRepository{
    store(): void
    updateProfileUsingMatch(): void
    searchMatches(): void
    search(): void
}