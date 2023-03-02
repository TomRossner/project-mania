import React, { useState } from 'react';
import {BsSearch} from "react-icons/bs";
import IconContainer from './IconContainer';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

  return (
    <div className='search-bar-container'>
    <input type="text" placeholder='Search for anything' value={searchValue} onChange={handleSearchChange}/>
    <IconContainer icon={<BsSearch className='icon'/>}/>
    </div>
  )
}

export default SearchBar