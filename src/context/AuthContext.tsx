'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User } from '@/lib/userService';
import { UserSession } from '@/lib/UserSession';

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize the session instance so it doesn't change on re-renders
    const session = useMemo(() => new UserSession(), []);

    useEffect(() => {
        const initSession = async () => {
            try {
                const restoredUser = await session.init();
                setUser(restoredUser);
            } catch (error) {
                console.error('Failed to initialize auth session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initSession();
    }, [session]);

    const login = async (email: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const loggedInUser = await session.login(email);
            if (loggedInUser) {
                setUser(loggedInUser);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        session.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
