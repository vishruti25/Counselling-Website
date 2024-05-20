import React from 'react'
import Field2 from './Field2'
import Field1 from './Field1'

function Homee() {
  return (
    <div className='p-3 bg-light'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-between py-4 px-5 align-items-center bg-white border border-secondary shadow-sm'>
                        <i className='bi bi-people-fill fs-1 text-success'></i>
                        <span>
                            <p>Consellor</p>
                            <h2>2</h2>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-between py-4 px-5 align-items-center bg-white border border-secondary shadow-sm'>
                        <i className='bi bi-mortarboard-fill fs-1 text-secondary'></i>
                        <span>
                            <p>Students</p>
                            <h2>12</h2>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-between py-4 px-5 align-items-center bg-white border border-secondary shadow-sm'>
                        <i className='bi bi-suit-heart-fill fs-1 text-danger'></i>
                        <span>
                            <p>Feedback</p>
                            <h2>12</h2>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light'>
                    <div className='d-flex justify-content-between py-4 px-5 align-items-center bg-white border border-secondary shadow-sm'>
                        <i className='bi bi-people-fill fs-1'></i>
                        <span>
                            <p>Users</p>
                            <h2>12</h2>
                        </span>
                    </div>
                </div>
            </div>
            <div className='row m-3 pd-3'>
                <div className='col-12 col-md-8 p-3'>
                    <Field2/>

                </div>
                <div className='col-12 col-md-4 p-3'>
                    <Field1/>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Homee