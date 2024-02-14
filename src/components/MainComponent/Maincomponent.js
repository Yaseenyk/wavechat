import React from 'react'
import './Maincomponent.scss';
import ProfileComponent from './LeftContainer/ProfileComponent';
const Maincomponent = () => {
  return (
    <div className='Maincomponent'>
        <div className='left-container'>
            <ProfileComponent/>
        </div>
        <div className='center-container'></div>
        <div className='right-container'></div>
      
    </div>
  )
}

export default Maincomponent;
