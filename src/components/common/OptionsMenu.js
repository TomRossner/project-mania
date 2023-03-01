import React from 'react';

const OptionsMenu = ({options, fn, boolean, fn_arg}) => {
  return (
    <div className={boolean === true ? "options-menu open" : "options-menu"}>
        {options.map(opt => <p key={opt} onClick={() => fn(fn_arg, opt)}>{opt}</p>)}
    </div>
  )
}

export default OptionsMenu;