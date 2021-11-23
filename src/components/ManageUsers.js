import { Container } from '@mui/material';
import React from 'react'
import { UserState } from '../context'
import UserCard from './UserCard'

const ManageUsers = (props) => {

    const {users,setUsers} = UserState();

    const delUser = (id) => {        
        const result = users.filter(i => i.id !== id)
        setUsers(result)
        localStorage.removeItem(`task-${id}`)
    }  

    return (
        <Container sx={{display : 'flex' , flexWrap : 'wrap' , justifyContent : 'space-around', marginTop: 2}}>
        {(Array.isArray(users) && users.length) && users.map((user) => (            
                <UserCard First_name={user.First_name} 
                            Last_name={user.Last_name} 
                            Username={user.Username}
                            Avatar={user.Avatar}
                            uID={user.id}
                            delUser={delUser}
                            {...props}/>
        ))}
        </Container>
    )
}

export default ManageUsers
