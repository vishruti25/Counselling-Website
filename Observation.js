import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import pb from '../db';
import { Button, Table, Form } from 'react-bootstrap';

function Observation() {
    const {studentId}=useParams();
  const { TeacherId } = useParams();
  const[teacherDetails, setTeacherDetails] = useState();

    const navigate =useNavigate();
    const [studentDetails, setStudentDetails] = useState({id:'', name: '', email: '',Regularity:'',Sincerity:'',Discipline:'',Academic_Performance:'',Participaion:'',Academic_Problem:'',Personal_Problem:'',Any_Problem:'',Action_By_Councellor:'',Name_Of_Counsellor:''});

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
// useEffect(() => {
//         const fetchTeacherDetails = async () => {
          
//           try {
//                   const record = await pb.collection('teacher').getOne(TeacherId, {
//                       expand: 'user,student'
//                   });
//                   console.log(record)
                  
                  
      
                  
      
                  
                  
//                   const faculty = await pb.collection('allocation').getFullList( {filter:`counsellor='${TeacherId}'`,expand: 'student'} ,);
//                   console.log(faculty)
//                   setTeacherDetails(faculty)
                  
      
                  
//               } catch (error) {
//                   console.log( error);
//               }
//           };
      
//           fetchTeacherDetails();
//       }, [TeacherId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('studentdetails',studentDetails)
            await pb.collection('student').update( studentId, studentDetails);
            alert("Your Observation details is Submited ");
            // navigate(`/student-details/${studentId}`)
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
            <div className='form-group mt-3 mb-3'>
                    <label class='form-label'>Name</label>
                    <input type='text' value={studentDetails.username} className='form-control' disabled/>
                    </div>
                    <div class='form-group mb-2'>
                    <label className='form-label'>Email</label>
                    <input type='email' value={studentDetails.email} className='form-control' disabled/>
                    </div> 
                <h1 className='text-primary'>OBSERVATION/REMARKS OF COUNSELOR</h1>                
                     

                    <Form>
                        <Table  class="table table-sm" bordered  border={1} hover>
                            <thead>
                                
                                <tr class="text-center">
                                
                                <th >PARAMETERS</th>
                                <th>REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center">
                                <td>Regularity</td>
                                <td>{<input type='text' name="Regularity" className='form-control'value={studentDetails.Regularity} onChange={handleChange}/>}</td>
                                </tr>
                                <tr class="text-center">
                                <td>Sincerity</td>
                                <td>{<input type='text' name="Sincerity" className='form-control'value={studentDetails.Sincerity} onChange={handleChange}/>}</td>
                                </tr>
                                <tr class="text-center">
                                <td>Discipline</td>
                                <td>{<input type='text' name="Discipline" className='form-control'value={studentDetails.Discipline} onChange={handleChange}/>}</td>
                                </tr>
                                <tr class="text-center">
                                <td>Academic_Performance</td>
                                <td>{<input type='text' name="Academic_Performance" className='form-control'value={studentDetails.Academic_Performance} onChange={handleChange}/>}</td>
                                </tr>
                                <tr class="text-center">
                                <td>Participaion</td>
                                <td>{<input type='text' name="Participaion" className='form-control'value={studentDetails.Participaion} onChange={handleChange}/>}</td>
                                </tr>
                                
                            </tbody>
    </Table>
    <Table class="table table-sm" bordered  border={1} hover>   
    <tbody>
    <tr class="text-center">
      <th colSpan={2}>PROBLEMS COMMUNICATED BY STUDENTS</th>
    </tr>
    <tr class="text-center" >
      <td>Academic_Problem</td>
      <td>{<input type='text' name="Academic_Problem" className='form-control'value={studentDetails.Academic_Problem} onChange={handleChange}/>}</td>
    </tr>    
    <tr class="text-center" >
      <td>Personal_Problem</td>
      <td>{<input type='text' name="Personal_Problem" className='form-control'value={studentDetails.Personal_Problem} onChange={handleChange}/>}</td>
    </tr>
    <tr class="text-center" >
      <td>Any_Problem</td>
      <td>{<input type='text' name="Any_Problem" className='form-control'value={studentDetails.Any_Problem} onChange={handleChange}/>}</td>
    </tr>

    <tr class="text-center">
      <th colSpan={2} >ACTION/STEP TAKEN BY COUNSELOR</th>
    </tr>
    <tr>
        <td colSpan={2}>{<textarea type='text' rows={3} value={studentDetails.Action_By_Councellor} name="Q3"className='form-control' placeholder=''onChange={handleChange}/>}</td>
    </tr>

    <tr class="text-center" >
      <td>Name Of Counselor</td>
      <td>{<input type='text' name="Name_Of_Counsellor" className='form-control'value={studentDetails.Name_Of_Counsellor} onChange={handleChange}/>}</td>
    </tr>
    </tbody>
        
          
        
      
    </Table>
    </Form>
    <br></br>
    <div className="d-grid gap-2">
    <Button  size='lg' className='btn btn-success float-end 'onClick={handleSubmit}>Update</Button>
    <Button  size='lg' className='btn btn-primary float-end ' >Back</Button>
    {/* onClick={() => navigate(`/teacher/${TeacherId}`)} */}

    </div>

    <hr></hr>              
            </div>
        </div>

    </div>
       
        
    </div>
  )
}

export default Observation