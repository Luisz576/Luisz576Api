import { ITheBridgeGame, ITheBridgeGameCreateProps, ITheBridgeGameSearchProps } from "../../../models/games/the_bridge/TheBridgeGame"

export type ITheBridgeGameOrError<ID> = ReturnOrErrorPromise<ITheBridgeGame<ID>>
export type MaybeITheBridgeGameOrError<ID> = ReturnOrErrorPromise<ITheBridgeGame<ID> | null>
export type ITheBridgeGamesOrError<ID> = ReturnOrErrorPromise<ITheBridgeGame<ID>[]>

export interface ITheBridgeRepository<ID>{
    store(data: ITheBridgeGameCreateProps): ITheBridgeGameOrError<ID>
    searchMatch(filter: ITheBridgeGameSearchProps): MaybeITheBridgeGameOrError<ID>
    searchMatches(filter: ITheBridgeGameSearchProps): ITheBridgeGamesOrError<ID>
}