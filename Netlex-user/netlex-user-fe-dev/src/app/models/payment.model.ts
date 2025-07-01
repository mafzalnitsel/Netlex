export class PaymentModel{
    constructor(
        public userName: string,
        public Amount: string,
        public paymentDate: Date ,
        public paymentMethod: string
    ){}
}
