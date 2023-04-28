import React from 'react';
import Loader from "../../assets/loader.svg";

const Spinner = ({width}) => {
  return (
    <div className='spinner-container'>
        <img src={Loader} alt="loading" width={width ? width : null}/>
    </div>
  )
}

export default Spinner;