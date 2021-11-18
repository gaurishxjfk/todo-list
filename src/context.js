import React, {  createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext();

const Context = ({children}) => {

    const getUser = () => {
        return JSON.parse(localStorage.getItem('users'));    
    }

    
    const [userList,setUserList] = useState(getUser());
    const [isLoggedIn, setIsLoggedIn] = useState(userList !== null ? userList.isLoggedIn : false);
    const [userID, setUserId] = useState(userList !== null ? userList.id : '');
    const [isAdmin,setIsAdmin] = useState(userList !== null ? userList.isAdmin : '');
    const [isDoneFilter, setIsDoneFilter] = useState(false);
    const [isEdit, setIsEdit] = useState('');

    useEffect(() => {
        if(userList !== null){
            localStorage.setItem('users',JSON.stringify(userList));   
            setIsAdmin(userList.isAdmin)    
        }   
            
    }, [userList,setIsAdmin]); 
    

    return (
        <userContext.Provider value={{isLoggedIn, setIsLoggedIn,
                                        userID, setUserId,
                                        userList,setUserList,
                                        isAdmin,setIsAdmin,
                                        isDoneFilter, setIsDoneFilter,
                                        isEdit, setIsEdit}}>
            {children}
        </userContext.Provider>
    )
}

export default Context;

export const UserState = () => {
    return useContext(userContext);
}
