import React, { useEffect, useState } from 'react'
import '../Style.css'
import pb from '../db';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import './feedback.css'


function Feedback() {

    const {studentId}=useParams();
    const navigate =useNavigate();

    const [studentDetails, setStudentDetails] = useState();
    // {id:'', name: '', email: '', image: '' ,dob:'',contactno:'',studentnumber:'',sem:'',year:'',department:'',parent_contact:'',parent_occupation:'',parent_income_annual:'',present_address:'',permenent_address:'',lastschool_name:'',lastschool_address:'',physics_marks:'',chemistry_marks:'',english_marks:'',maths_marks:'',
    // weaknesses:'',strengths:'',carrier_plan:'',hobby:'',other:'',
    // blood_group:'',health_issue:'',others:'',}
    

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const record = await pb.collection('student').getOne(studentId, {
                    expand: 'user'
                });
                console.log(record)
                setStudentDetails(record)
                
                
            } catch (error) {
                console.error("Error fetching student details:", error);
                alert("An error occurred while fetching the student details.");
            }
        };

        fetchStudentDetails();
    }, [studentId]);
    

    if (!studentDetails) {
        return <div>Loading...</div>;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('studentdetails',studentDetails)
            await pb.collection('student').update( studentId, studentDetails);
            alert("Your Feedback is Submited ");
            navigate(`/test-form/${studentId}`)
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    const handleChange = (e) => {
        setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
    };
  return (
    <div className='container mt-4 p-5 shadow-lg bg-secondary'>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <h2 className=''>Contact us</h2>
                <p className=''>we would love to hear your thoughts,concerns or problem with anything so we can improve!</p><hr></hr>
                <form onSubmit={handleSubmit}>
                    <h4>Thank,you</h4>
                    <div className='form-group mt-3 mb-3'>
                    <label class='form-label'>Name</label>
                    <input type='text' value={studentDetails.username} className='form-control' disabled/>

                    </div>
                    <div class='form-group mb-2'>
                        <label className='form-label'>Email</label>
                        <input type='email' value={studentDetails.email} className='form-control' disabled/>
                    </div>
                    <div class='form-group mb-2'>
                        <label className='form-label'>Describe Feedback</label>
                        <textarea rows={4} value={studentDetails.feedback} className='form-control'required placeholder='your feedback is important for Us'onChange={handleChange}></textarea>

                    </div><br></br>
                    <button type='submit' className='btn btn-primary'>Submit Feedback</button>
                    
                </form>
                <br></br>
                <Button onClick={() => navigate(`/student-details/${studentId}`)} className='text-white' >Back</Button>
            </div>
        </div>

    </div>
       
        
   
  )
}

export default Feedback