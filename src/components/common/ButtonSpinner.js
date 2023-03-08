import React from 'react';
import Loader from "../../assets/small_spinner.svg";

const Spinner = () => {
  return (
    <div className='spinner-container small'>
        <img src={Loader} alt="loading"></img>
    </div>
  )
}

export default Spinner;