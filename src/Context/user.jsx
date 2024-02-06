import { createContext, useState } from "react";

export const UserContext = createContext();


export function UserProvider({ children }) {
    const [user, setUser] = useState({ apiKey: '', id: 0, caloriasDiarias: 0 })
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}