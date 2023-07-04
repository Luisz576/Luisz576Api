import { ITheBridgeGame, ITheBridgeGameCreateProps, ITheBridgeGameSearchProps } from "../../../models/games/the_bridge/TheBridgeGame"

export interface ITheBridgeRepository<ID>{
    store(data: ITheBridgeGameCreateProps): Promise<ITheBridgeGame<ID>>
    searchMatch(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGame<ID> | null>
    searchMatches(filter: ITheBridgeGameSearchProps): Promise<ITheBridgeGame<ID>[]>
}