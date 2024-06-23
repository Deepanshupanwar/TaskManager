import { createContext, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({children}){

    const [userInfo,setUserInfo] = useState(null);
    const [todos, setTodos] = useState([]);
    return (
        <userContext.Provider value={{userInfo,setUserInfo,todos, setTodos }}>
            {children}
        </userContext.Provider>
        
    );
}