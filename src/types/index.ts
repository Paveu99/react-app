export type Calculation = {
    id: string,
    amount: number,
    term: number,
    rate: number,
    payment: number,
    userId: string
}

export type CalculationDto = {
    amount: number,
    term: number,
    rate: number,
    payment: number,
    userId: string
}

export type UserDto = {
    email: string,
    password: string
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}