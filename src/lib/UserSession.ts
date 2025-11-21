import { User, login as apiLogin, getUser as apiGetUser } from './userService';

export class UserSession {
    private user: User | null = null;
    private readonly STORAGE_KEY = 'user_email';

    constructor() {
        // We can't access localStorage in constructor if it runs on server
        // But this class will likely be instantiated in a client component or effect
    }

    public async init(): Promise<User | null> {
        if (typeof window === 'undefined') return null;

        const email = localStorage.getItem(this.STORAGE_KEY);
        if (email) {
            try {
                // Verify the user still exists/is valid
                const user = await apiGetUser(email);
                if (user) {
                    this.user = user;
                    return user;
                } else {
                    // Invalid session
                    this.logout();
                }
            } catch (error) {
                console.error('Failed to restore session:', error);
            }
        }
        return null;
    }

    public async login(email: string): Promise<User | null> {
        try {
            const user = await apiLogin(email);
            if (user) {
                this.user = user;
                if (typeof window !== 'undefined') {
                    localStorage.setItem(this.STORAGE_KEY, user.email);
                }
                return user;
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
        return null;
    }

    public logout(): void {
        this.user = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    public getUser(): User | null {
        return this.user;
    }

    public isAuthenticated(): boolean {
        return this.user !== null;
    }
}
