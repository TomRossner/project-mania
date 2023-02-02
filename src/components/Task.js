import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Task = () => {
    const {id, task_id} = useParams();

    const getTask = async () => {
        console.log(id, task_id)
        const {data} = await axios.post("/tasks", {id, task_id});
        console.log(data);
    }

    useEffect(() => {
        getTask()
    }, [])

  return (
    <div>Task</div>
  )
}

export default Task;