export type Either<L, R> = Left<L> | Right<R>

class Left<L>{
    value: L
    constructor(value: L){
        this.value = value
    }
    isLeft(): Boolean{
        return true
    }
    isRight(): Boolean{
        return false
    }
}

class Right<R>{
    value: R
    constructor(value: R){
        this.value = value
    }
    isLeft(): Boolean{
        return false
    }
    isRight(): Boolean{
        return true
    }
}

export const left = <L, R>(l: L): Either<L, R> => {
    return new Left(l)
}

export const right = <L, R>(r: R): Either<L, R> => {
    return new Right(r)
}