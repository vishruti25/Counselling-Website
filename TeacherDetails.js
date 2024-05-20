

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import pb from '../db';


export default function TeacherDetails() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const verifyUsername = async (e) => {
        e.preventDefault();
        

        try {
            // Replace 'students' with your actual collection name
            const records = await pb.collection('teacher').getList( 1, 50, { filter: `name='${name}'` });

            if (records.items.length > 0) {
                // Username verified, navigate to the details page for the first matching record
                 navigate(`/teacher/${records.items[0].id}`);
                
                // navigate('/navbar',{ state: { username: username}})
            } else {
                alert("Username does not match any records.");
            }
        } catch (error) {
            console.log( error);
            
        }
    };

    return (
        // <form onSubmit={verifyUsername}>
        //     <label htmlFor="username">Enter your username:</label>
        //     <input
        //         id="username"
        //         type="text"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //         required
        //     />
        //     <button type="submit">Verify Username</button>
        // </form>

    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="signup-form">
                
                <form action="" class="mt-5 border p-4 bg-light shadow" onSubmit={verifyUsername}>
                    <h4 class="mb-5 text-secondary">Verification With Username</h4>
                    {/* {
                    valid ? <></> :
                    <span className='text-danger'>
                        {errors.email}; {errors.password}
                    </span>
                    } */}
                    <div class="row">                                                
                        
                        <div class="mb-3 col-md-12">
                            <label htmlFor="username">Username </label>
                            <input 
                                
                                id="username"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                class="form-control"
                                placeholder="Enter Username"
                                required

                                
                                 
                                
                                />
                        </div>
                        
                        {/* <div class="mb-3 col-md-12">
                            <label>Password<span class="text-danger">*</span></label>
                            <input 
                              type="password" 
                              name="password" 
                              class="form-control" 
                              placeholder="Enter Password"
                              onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                        </div>                         */}
                        <div class="col-md-12">
                           <button class="btn btn-primary float-end" type='submit'>Verify</button>
                        </div>
                    </div>
                </form>
                {/* <p class="text-center mt-3 text-secondary">If you don't have account, Please <Link to={"/sturegistration"}>Registration</Link></p> */}
            </div>
        </div>
    </div>
</div>
    );
}

