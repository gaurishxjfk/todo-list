import React, { useReducer } from 'react'

const errTaskReducer = () => {

}

const Context = () => {
    const [errTaskState, errTaskDispatch] = useReducer(errTaskReducer, {
        max : 'Task name should'
    })
    return (
        <div>
            
        </div>
    )
}

export default Context
