import React from 'react'
import { compare, todayDate } from '../Pages/Homepage';
import Tasklist from './Tasklist';


const TodaysTasks = (props) => {

    const todaysArr = props.taskList.filter((i) =>  {
       let date1 =  new Date(i.date) 
       let date2 =  new Date(todayDate) 
        return date1.toDateString() === date2.toDateString()
    })

    const onDelete = (id) => {
        props.setTaskId(id)         
        props.setOpenModal(true)
    }    

    return (
        <Tasklist onDelete={onDelete} list={todaysArr.sort( compare )}
                    {...props}  admin={false}  />
    )
}

export default TodaysTasks
