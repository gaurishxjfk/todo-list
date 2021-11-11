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
                    checkDone={props.checkDone} 
                    updateTask={props.updateTask}
                    setOpenModal={props.setOpenModal}                                            
                    handleClose={props.handleClose}
                    deleteTask={props.deleteTask}
                    openModal={props.openModal}
                    taskId={props.taskId} 
                    setTaskId={props.setTaskId}
                    isDoneFilter={props.isDoneFilter} />
    )
}

export default UpcomingTasks
