import React from 'react';

const OptionsMenu = ({options, fn, boolean, fn_arg, toggleTaskOptions}) => {

  const handleClick = (fn_arg, opt) => {
    if (toggleTaskOptions) toggleTaskOptions();
    fn(fn_arg, opt);
  }

  return (
    <div className={boolean === true ? "options-menu open" : "options-menu"}>
        {options.map(opt => <p key={opt} onClick={() => handleClick(fn_arg, opt)}>{opt}</p>)}
    </div>
  )
}

export default OptionsMenu;