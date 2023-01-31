import React, { useContext } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'

const Input = () => {
    const {select, setInput, input} = useContext(ProjectContext);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

  return (
    <div className='input-container'>
        <label htmlFor='input'>Choose a title</label>
        <input type="text" value={input} onChange={handleInputChange} name='input'/>
    </div>
  )
}

export default Input;