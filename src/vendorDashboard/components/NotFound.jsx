import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='link-container'>
        <Link to='/'>go back</Link>
        <h1>404</h1>
        <p>Page Not Found</p>
    </div>
  )
}

export default NotFound