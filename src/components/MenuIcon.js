import React from 'react';
import IconContainer from './common/IconContainer';
import { MdMenu } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setNavOpen } from '../store/globalStates/globalStates.actions';

const MenuIcon = () => {
    const dispatch = useDispatch();

    const handleMenuClick = () => {
        // Open nav
        dispatch(setNavOpen(true));
    }

  return (
    <button className='btn white menu' onClick={handleMenuClick}>
        <IconContainer icon={<MdMenu className='icon menu'/>}/>
    </button>
  )
}

export default MenuIcon;