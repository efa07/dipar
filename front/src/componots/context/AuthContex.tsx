import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null); // Store user data here
    const [loading, setLoading] = useState(true);

    // Mock authentication function (you can replace this with your actual API calls)
    const login = async (email: string, password: string): Promise<boolean> => {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        const result = await response.json();
    
        if (response.ok) {
            const userData = { email, role: result.role };
            setUser(userData);
            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } else {
            throw new Error(result.error || 'Login failed');
        }
    };
    

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);  // Important: Set loading to false once done
    }, []);
    

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
