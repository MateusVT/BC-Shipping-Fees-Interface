export type Product = {
    idProduct: number,
    description: string,
    weight: number
}

export type Company = {
    idCompany: number,
    name: number,
    fixedFee: number,
    kmByKgFee: number
}


export type HAL =
    {
        _embedded: any,
        _links: {
        }
    }