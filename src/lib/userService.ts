export interface User {
    id: string;
    name: string;
    email: string;
    role: 'professional' | 'client';
}

const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Dr. Sarah Chen',
        email: 'therapist@example.com',
        role: 'professional'
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'client@example.com',
        role: 'client'
    }
];

export async function login(email: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
}

export async function getUser(email: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
}
