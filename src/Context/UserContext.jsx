import React, { createContext, useState } from 'react'

export const UserContext = createContext();

const UserContextProvider = (props) => {
  
  const [user, setUser] = useState(null)
  React.useEffect(() => {
    const availableUser = JSON.parse(localStorage.getItem('user'));
    setUser(availableUser)
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider