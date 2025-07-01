export class PaymentModel{

    constructor(

        public transaction_Id: string,
        public userId: string,
        public documentId: String,
        public userName: String,
        public amount: String,
        public paymentDate: Date,
        public paymentMethod: String,
        public status: String,

    ){}




}