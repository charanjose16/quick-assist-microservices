export interface BookingRequest{
    id:number,
    userId:number,
    workerId:number,
    paymentId:number,
    serviceStatus:string,
    dateTime: string,
    homeAddress:string
}