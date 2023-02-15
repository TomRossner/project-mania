import React, { useContext, useState, useEffect, createContext } from 'react';

export const UserContext = createContext({
    user: null,
    setUser: () => {}
})

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) return console.log("No user connected");
        else console.log(user);
    })

    const value = {user, setUser};
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserProvider;