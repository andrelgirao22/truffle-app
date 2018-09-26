export interface PaymentDTO {

    paymentType: string
    authorizationCode: string
    portionNumber: number 
    value: number
    currency: string
    dataExpires: string

}