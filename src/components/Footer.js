import React from 'react';
import IconContainer from './common/IconContainer';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
        <p>ProjectMania&copy; {new Date().getFullYear()} | Tom Rossner | All rights reserved</p>
        <a href='https:/www.linkedin.com/in/tom-rossner' className='link'><IconContainer additionalClass={'blue'} icon={<BsLinkedin className='icon large blue'/>}/></a>
        <a href='https://github.com/TomRossner' className='link'><IconContainer additionalClass={'black'} icon={<BsGithub className='icon large'/>}/></a>
    </footer>
  )
}

export default Footer;