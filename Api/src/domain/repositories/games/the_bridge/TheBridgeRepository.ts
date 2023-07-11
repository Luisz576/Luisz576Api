import { ITheBridgeGame, ITheBridgeGameCreateProps, ITheBridgeGameSearchProps } from "../../../models/games/the_bridge/TheBridgeGame"

export interface ITheBridgeRepository<ID>{
    store(data: ITheBridgeGameCreateProps): Promise<ITheBridgeGame>
    searchMatch(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGame | null>
    searchMatches(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGame[]>
}