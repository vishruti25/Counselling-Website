import React from 'react'
import Sidebar from './Sidebar'
import Navbaar from './Navbaar';
// import 'bootstrap/dist/css/bootstrap.min.css ';
import Homee from './Homee';
function Admin() {
  return (
    <div className='d-flex'>
        <div className='w-auto'>
          <Sidebar/>
        </div>
        <div className='col '>
          <Navbaar/>
          <Homee/>
        </div>
    </div>
  )
}

export default Admin