export interface MessageData {
    therapistId: string;
    subject: string;
    email: string;
    message: string;
    createAccount: boolean;
}

export async function sendMessage(data: MessageData): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Message sent:', data);
    return Promise.resolve();
}
