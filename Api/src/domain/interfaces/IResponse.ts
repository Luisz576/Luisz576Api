export default interface IResponse{
    sendStatus(status: number): any
    json(json: any): any
}