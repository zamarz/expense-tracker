import { useState } from "react";
import { UserContext } from "./context/UserContext";

export default App = () => {
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@email.com",
    uid: null,
  });
  return <UserContext.Provider value={user}></UserContext.Provider>;
};
