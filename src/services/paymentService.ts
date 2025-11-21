export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    amount: number;
}

export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

export const paymentService = {
    processPayment: async (details: PaymentDetails): Promise<PaymentResult> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Basic validation mock
        if (details.cardNumber.length < 16) {
            return {
                success: false,
                error: 'Invalid card number'
            };
        }

        // Mock success
        return {
            success: true,
            transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`
        };
    }
};
