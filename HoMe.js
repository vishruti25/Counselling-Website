import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import pb from '../db';
import { Form, Table } from 'react-bootstrap';
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import './index.html'



function HoMe() {


    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_4o0ex3n', 'template_9no6hos', form.current, {
        publicKey: 'pyIvetR8gPaedK05s',
        // privateKey:'1QgPR7jXhKu6pOYP4RPkR'
      })
      .then(
        (result) => {
          console.log(result.text)
          console.log('SUCCESS!');
          alert('email sent successfully.')
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

    

    // const[formState,setFormState]=useState({});

    


    // const changeHandler=(event)=>{
    //     setFormState({...formState,[event.target.name]:event.target.value})
    // }
    // const submitHandler=(event)=>{
    //    event.preventDefault();
    //     const config={
    //         Username:'vyasvishruti200@gmail.com',
    //         Password: 'CA18642FEC459FF1ABAE1EC9B4BC00392CB3',
    //         Host:'smtp.elasticemail.com',
    //         Port: 2525,
    //         To : 'vishruti.200410107075@gmail.com',
    //         From : "vyasvishruti200@gmail.com",
    //         Subject : "This is the subject",
    //         Body : "And this is the body"
    
    //     }
    //    if(window.Email){
    //     window.Email.send(config);
    //    } 
    // }

  const { TeacherId } = useParams();
  const { studentId } = useParams();
  const [studentDetails, setStudentDetails] = useState({})
  const navigate=useNavigate();
  const[teacherDetails, setTeacherDetails] = useState();
  
  const[faculty,setFaculty] = useState()   ;


useEffect(() => {
  const fetchTeacherDetails = async () => {
    
    try {
            const record = await pb.collection('teacher').getOne(TeacherId, {
                expand: 'user,student'
            });
            console.log(record)
            
            

            

            
            
            const faculty = await pb.collection('allocation').getFullList( {filter:`counsellor='${TeacherId}'`,expand: 'student'} ,);
            console.log(faculty)
            setTeacherDetails(faculty)
            

            
        } catch (error) {
            console.log( error);
        }
    };

    fetchTeacherDetails();
}, [TeacherId]);
useEffect(() => {
    const fetchStudentDetails = async () => {
        try {
            const records = await pb.collection('student').getOne(studentId, {
                expand: 'user'
            });
            console.log(records)
            setStudentDetails(records)
            
        } catch (error) {
            console.error("Error fetching student details:", error);
            // alert("An error occurred while fetching the student details.");
        }
    };


    fetchStudentDetails();
}, [studentId]);






    
  return (

    <div className='m-5'>
        <h2 className='text-secondary'>Student List   <span>{}</span></h2>
        <br></br>

        <Table striped  hover className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { teacherDetails && teacherDetails.map((d,i) => (
                    <tr key={i}>
                        <td>{d.student}</td>
                        <td>{d?.expand?.student?.username}</td>
                        <td>{d?.expand?.student?.email}</td>
                        <td >
                            {/* <Link  className='text-decoration-none btn btn-sm btn-success' to={`/update/${d.id}`}>Update</Link>
                            <button  className='text-decoration-none btn btn-sm btn-danger'  >Delete</button>
                            <Link  className='text-decoration-none btn btn-sm btn-primary' to={`/read/${d.id}`}>Read</Link> */}
                            <Link  className='text-decoration-none btn btn-sm btn-primary' to={`/observation/${d.student}`}>Observation</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <hr></hr>
      <div className=''>
       <h2 className='text-secondary'>Schedule a Meeting</h2> 


       {/* <form className='flex flex-col justify-center items-center' onSubmit={submitHandler}>
        <input type='text' name='name' value={formState.name || ''} placeholder='Enter Your Name Here'onChange={changeHandler} className=' form-control border border-blue-900'/>
        <input type='email' name='email' value={formState.email || ''} placeholder='Enter Your Email Here ' className='form-control border border-blue-900' onChange={changeHandler} />
        <input class='form-control' type='submit' value='send Email'/>
       </form> */}
       <form class="mt-4" ref={form} onSubmit={sendEmail}>
                <div class="row">
                <div class="col-lg-12">
                <div class="form-group mt-2">
                  <label>Name</label>
                  <input class="form-control"  type="text" name="user_name" />
                </div>
                </div>
                <div class="col-lg-12">
                <div class="form-group mt-2">
                  <label>Email</label>
                  <input class="form-control"  type="email" name="user_email" />
                </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group mt-2">
                  <label>Date</label>
                  <textarea class="form-control"type='text'  name="date" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group mt-2">
                  <label>Time</label>
                  <textarea class="form-control"type='text'  name="time" />
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group mt-2">
                  <label>Message</label>
                  <textarea class="form-control" type='text' name="message" />
                  </div>
                </div>                
                <br></br>
                <hr></hr>
                <div class="col-lg-12 -success">
                  <input type="submit" value="Send" />
                  </div>
                </div>
                </form>
      
      </div>

    </div>

  )
}
// onClick={e => handleDelete(d.id)}
export default HoMe