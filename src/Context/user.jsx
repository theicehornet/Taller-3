import { createContext, useState } from "react";

//se crea el contexto
export const UserContext = createContext();

//exporto el contexto
export function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")))
    const [error, setError] = useState('')
    const LoggedIn = (username,password) => {
        //fetch("https://calcount.develotion.com/login.php", {
        //    method: "POST",
        //    headers: {
        //        "Content-type":"application/json",
        //    },
        //    body: JSON.stringify({ "usuario": username, "password": password })
        //})
        //    .then(res => {
        //        if (!res.ok) {
        //            Promise.reject("No se pudo iniciar Session")
        //        }
        //        return res.json()
        //    })
        //    .then(data => {
        //        console.log(data);
        //        setUser(data);
        //        localStorage.setItem("userData", JSON.stringify(data))
        //    })
        //    .catch(err => setError(err))
        setUser({ "apiKey": "a5c61edd5c386893f9af3ed2cb669eb0", "id": 1161, "caloriasDiarias": 2000 })
        localStorage.setItem("userData", JSON.stringify({ "apiKey": "a5c61edd5c386893f9af3ed2cb669eb0", "id": 1161, "caloriasDiarias": 2000 }))
    }

    const LoggedOut = () => {
        localStorage.clear();
        setUser(undefined);
    }

    
    return (
        <UserContext.Provider value={{ user, error, LoggedIn, LoggedOut }}>
            {children}
        </UserContext.Provider>
    )
}