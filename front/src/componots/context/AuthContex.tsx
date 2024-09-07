import { createContext, useEffect, useReducer, ReactNode } from "react";
import AuthReducer from "./AuthReducer";

interface AuthState {
    currentUser: any;
}

interface AuthContextProps {
    currentUser: any;
    dispatch: React.Dispatch<any>;
}

const INITIAL_STATE: AuthState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser") as string) || null,
};

export const AuthContext = createContext<AuthContextProps>({
    currentUser: INITIAL_STATE.currentUser,
    dispatch: () => null,
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};