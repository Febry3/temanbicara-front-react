/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const useUser = () => { return useContext(UserContext) };

export const UserProvider = ({ children }) => {
     const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('USER')) || null;
    });

    const [token, setToken] = useState(
        () => {
            return localStorage.getItem('TOKEN') || null;
        }
    );

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const loginUser = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('USER', JSON.stringify(user));
        localStorage.setItem('TOKEN', token);
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('USER');
        localStorage.removeItem('TOKEN');
    }

    return <UserContext.Provider value={{ user, setUser, token, setToken, loginUser, logoutUser, isSidebarOpen, setIsSidebarOpen }}>
        {children}
    </UserContext.Provider>;
};
