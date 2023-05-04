import React from 'react';

const SearchBar = ({placeholderText = "Search", fn, refValue, value, icon, type, styles}) => {

  return (
    <div className={styles ? `search-bar-container ${styles}` : 'search-bar-container'} ref={refValue}>
      <input
        type={type}
        placeholder={placeholderText}
        value={value}
        onChange={fn}
      />
      {icon? icon : null}
    </div>
  )
}

export default SearchBar;