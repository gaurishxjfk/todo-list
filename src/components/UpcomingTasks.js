import React from 'react';
import { compare, todayDate } from '../Pages/Homepage';
import Tasklist from './Tasklist';
import arrayCheck from '../Pages/Homepage';

const UpcomingTasks = (props) => {
   
    const upcomingArr = arrayCheck(props.taskList) && props.taskList.filter(i =>  new Date(i.date) > new Date(todayDate))

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
