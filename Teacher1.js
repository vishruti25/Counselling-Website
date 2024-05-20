import React from 'react'
import Side from './Side'
import NavBar from './NavBar'

function Teacher1() {
  return (
    <div className='d-flex'>
        <div className='w-auto'>
          <Side/>
        </div>
        <div className='col '>
          <NavBar/>
          
          
        </div>
    </div>
  )
}

export default Teacher1