import React from 'react';
import Loader from "../../assets/small_spinner.svg";

const ButtonSpinner = ({spinnerWidth}) => {
  return (
    <div className='spinner-container small'>
        <img src={Loader} alt="loading" width={spinnerWidth ? spinnerWidth : null}/>
    </div>
  )
}

export default ButtonSpinner;