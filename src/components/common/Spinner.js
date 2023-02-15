import React from 'react';
import Loader from "../../assets/loader.svg";

const Spinner = () => {
  return (
    <div className='spinner-container'>
        <img src={Loader} alt="loading"></img>
    </div>
  )
}

export default Spinner;