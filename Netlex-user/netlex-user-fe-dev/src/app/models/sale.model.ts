export class SaleModel {
    constructor(
        public userId: string,
        public salesAmount: string,
        public salesAt: string,
        public paymentMethod: string,
        public businessType: string,
        public status: string,
        public lawyerId: string
        
    ) {}
}
