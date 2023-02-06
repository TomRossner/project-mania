import React from 'react';

const Input = ({type, value, onChange, name, id, text}) => {

  return (
    <div className='input-container'>
        <label htmlFor={name}>{text}</label>
        <input type={type} value={value} onChange={onChange} name={name} id={id}/>
    </div>
  )
}

export default Input;