import React from 'react';
import { compare, todayDate } from '../Pages/Homepage';
import Tasklist from './Tasklist';

const UpcomingTasks = (props) => {
   
    const upcomingArr = props.taskList.filter(i =>  new Date(i.date) > new Date(todayDate))

    const onDelete = (id) => {
        props.setTaskId(id)         
        props.setOpenModal(true)
    }


    return (
        <Tasklist onDelete={onDelete} list={upcomingArr.sort( compare )}
                    {...props} />
    )
}

export default UpcomingTasks
