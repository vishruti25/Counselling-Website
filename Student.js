// import React, { useEffect, useState } from 'react'
// import pb from '../db'
// import { Link, useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'



// function Student() {
//     const[profile,setProfile] = useState({
        
        
//     })
//     const loadprofile =async()=>{
//         console.log(pb.authStore.model.id)
//         try {
//             const record = await pb.collection('student').getFirstListItem(`user='${pb.authStore.model.id}'`, {
//                 expand: 'user',

//             });
//             console.log(record);
//             setProfile(record)
//         } catch (error) {
//             console.log(error);
            
//         }
//     }

//     useEffect(()=>{
//         console.log(pb.authStore.model.id)
//         loadprofile()
        
//     })
//     const navigate=useNavigate()
//   const gotoprofile=()=>{
//     const record =  pb.collection('users').getOne('uname', {
//         expand: 'user',
//     });
//     navigate('/')
//   }

//   const [data,setData] =useState({
//     username:'',
// })
//   const handleSubmit = async(event) =>{
//     event.preventDefault(); 
//     try{
//         const authData = await pb.collection('users').authWithPassword(
//           data.username,
          
          
//       );
//       alert(" Successfully..")
//            if(pb.authStore.model.username=== data.username){
//             navigate('/go')
    
    
//            }
           
//            else{
//             navigate('/')
//            }
//       console.log(pb.authStore.isValid);
//       console.log(pb.authStore.token);
//       console.log(pb.authStore.model);
//     }
//       catch(err){
//         alert(err)
//       }
//     }    
    
    
//   return (
//     <>
//     <div class="container">
//         <p>{JSON.stringify(profile)}</p>
    
//     </div>
//     <form action="" class="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
//     <div class="container">
//       <div class="row">
//         <div class="col-md-6 offset-md-3">
//             <div class="data_form"></div>
//             <div class="mb-3 col-md-12">
//                 <label>uname<span class="text-danger">*</span>
//                 </label>
//                 <input 
//                 type="text" 
//                 name="uname" 
//                 class="form-control" 
//                 placeholder="Enteryour username "
//                 onChange={e => setData({...data, username: e.target.value})}
//                 />
//             </div>
//             <Button variant="outline-success" type='button'onClick={gotoprofile}>go</Button>            
            
//         </div>
//       </div>
//     </div>
//     </form>
//     </>
//   )
// }


// export default Student
// import React, { useState } from 'react';
// import pb from '../db';
// import { useNavigate } from 'react-router-dom';




// const Student=() =>{
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate()

//     const handleVerification = async (e) => {
//         e.preventDefault();

//         try {
//             //  const collection = role === 'student' ? 'students' : 'teachers';
//             //  const record = await pb.records.getOne(collection, id);
//              const record = await pb.collection('users').getOne(username, {
//                 expand: 'user',
//              });

//             if (pb.user.record.username === username) {
//                 alert("Verification Success");
//                 navigate('/') 
//                 console.log(record)
//                 onSuccess(record)// Pass the user record to the parent component or next page
//             } else {
//                 console.log("Verification Failed");
//                 // Handle verification failure
//             }
//         } catch (error) {
//             alert(error);
//             // Handle errors
//         }
        
//     };


//     return (
//         <form onSubmit={handleVerification}>
//             <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 required
//             />
//             <button type="submit">Verify</button>
//         </form>
//     );
// }
// export default Student
// StudentDashboard.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import pb from '../db';


export default function StudentDashboard() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const verifyUsername = async (e) => {
        e.preventDefault();
        

        try {
            // Replace 'students' with your actual collection name
            const records = await pb.collection('student').getList( 1, 50, { filter: `username='${username}'` });

            if (records.items.length > 0) {
                // Username verified, navigate to the details page for the first matching record
                 navigate(`/student-details/${records.items[0].id}`);
                
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

