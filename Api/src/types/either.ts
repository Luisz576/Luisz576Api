export type Either<L, R> = Left<L, R> | Right<L, R>
export type PromiseEither<L, R> = Promise<Either<L, R>>

class Left<L, R>{
    value: L
    constructor(value: L){
        this.value = value
    }
    isLeft(): this is Left<L, R> {
        return true
    }
    isRight(): this is Right<L, R>{
        return false
    }
}

class Right<L, R>{
    value: R
    constructor(value: R){
        this.value = value
    }
    isRight(): this is Right<L, R>{
        return true
    }
    isLeft(): this is Left<L, R>{
        return false
    }
}

export const left = <L, R>(l: L): Either<L, R> => {
    return new Left(l)
}

export const right = <L, R>(r: R): Either<L, R> => {
    return new Right(r)
}

export type OnlyExecutePromise<E = any> = PromiseEither<E, null>

export type ReturnOrErrorPromise<R, E = any> = PromiseEither<E, R>