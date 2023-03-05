import React from 'react';

const Input = ({type, value, onChange, name, id, text, optional}) => {

  return (
    <div className='input-container'>
        <label htmlFor={name}>{text} {optional ? <span>{optional}</span> : null}</label>
        <input type={type} value={value} onChange={onChange} name={name} id={id}/>
    </div>
  )
}

export default Input;