import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id='not-found'>
        <h1>404 Page not found</h1>
        <button className='btn white'>
            <Link className='link' to={'/'}>Back to homepage</Link>
        </button>
    </div>
  )
}

export default PageNotFound;