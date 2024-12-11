

export interface Booking{
    id:number,
    userId:number,
    workerId:number,
    bookingStatus:string,
    review:string,
    date: string,
    time: string,
    serviceId:number,
    paymentId:number,
    verifyCode:string
}