type Params = {
    [key: string]: string;
}
type Headers = {
    [P in string]: any;
}

export default interface IRequest{
    params: Params,
    headers: Headers,
    body: any
}