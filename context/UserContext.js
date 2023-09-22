import { createContext, useContext } from "react";

export const UserContext = createContext();
export const [user, setUser] = useContext({ userUID: null });
