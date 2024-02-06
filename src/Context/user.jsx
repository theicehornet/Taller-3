import { createContext, useState } from "react";

//se crea el contexto
export const UserContext = createContext();

//exporto el contexto
export function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")))
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}