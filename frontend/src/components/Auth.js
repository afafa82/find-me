import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const login = (token, role) => {
        localStorage.setItem("find_me_token", token);
        localStorage.setItem("find_me_role", role);
    };

    const logout = () => {
        localStorage.removeItem("find_me_token");
        localStorage.removeItem("find_me_role");
    };

    const getToken = () => {
        return localStorage.getItem("find_me_token");
    };

    const getRole = () => {
        return localStorage.getItem("find_me_role");
    };

    return <AuthContext.Provider value={{ login, logout, getToken, getRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
