import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pb from '../db';
import { Button } from 'react-bootstrap';


function TestForm() {
    const {studentId}=useParams();
    const navigate =useNavigate();

    const [studentDetails, setStudentDetails] = useState({id:'', name: '', email: '', image: '' ,dob:'',contactno:'',studentnumber:'',sem:'',year:'',department:'',parent_contact:'',parent_occupation:'',parent_income_annual:'',present_address:'',permenent_address:'',lastschool_name:'',lastschool_address:'',physics_marks:'',chemistry_marks:'',english_marks:'',maths_marks:'',
    weaknesses:'',strengths:'',carrier_plan:'',hobby:'',other:'',
    blood_group:'',health_issue:'',others:'',feedback:'',Q1:'',Q2:'',Q3:'',Q4:'',Q5:'',Q6:'',Q7:'',Q8:'',Q9:'',Q10:''});
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
            navigate(`/student-details/${studentId}`)
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };
    const handleChange = (e) => {
        setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
    };


  return (
    <div>
        <div className='container mt-4 p-5 shadow-lg '>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
                <h1 className='text-primary'>Counselling Session 1</h1>
                <p className=''>we would love to hear your thoughts,concerns or problem with anything so we can improve!</p><hr></hr>
                <form onSubmit={handleSubmit}>
                    <h4>Counselling Questions</h4>
                    <div className='form-group mt-3 mb-3'>
                    <label class='form-label'>Name</label>
                    <input type='text' value={studentDetails.username} className='form-control' disabled/>

                    </div>
                    <div class='form-group mb-2'>
                        <label className='form-label'>Email</label>
                        <input type='email' value={studentDetails.email} className='form-control' disabled/>
                    </div>
                    <div class='form-group mb-2'>
                        <label >Q1.How are you adjusting to the pace of college coursework compared to high school?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q1} name="Q1"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>

                        <label >Q2.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q2} name="Q2"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>

                        <label >Q3.Are you participating in any extracurricular activities or clubs? How are they influencing your college experience?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q3} name="Q3"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q4.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q4} name="Q4"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q5.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q5} name="Q5"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q6.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q6} name="Q6"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q7.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q7} name="Q7"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q8.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q8} name="Q8"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q9.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q9} name="Q9"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>
                        <label >Q10.What are your academic goals for this semester?</label>
                        <textarea type='text' rows={3} value={studentDetails.Q10} name="Q10"className='form-control' placeholder=''onChange={handleChange}></textarea><br></br>



                    </div><br></br>
                    <button type='submit' className='btn btn-primary'>Submit </button>
                    
                </form>
                <br></br>
                <Button onClick={() => navigate(`/student-details/${studentId}`)} className='text-white' >Back</Button>
            </div>
        </div>

    </div>
       
        
    </div>
  )
}

export default TestForm