import IEntity from "../IEntity"

export interface IProductCreateProps{
    name: string
    icon_item: string
    description: string[]
    price: number
    category: number
    rarity: number
    min_role?: number
}

export type IProductSearchProps = Partial<IProductCreateProps>

export interface IProduct extends IEntity, Required<IProductCreateProps>{
    created_at: Date
}