import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import pb from '../db';
import { Breadcrumb, Button, Col, FloatingLabel, Form, Nav, NavDropdown, Row, Table } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { data } from 'autoprefixer';



 function StudentDetails() {
  
    const { studentId } = useParams();
    const {stu_id}=useParams();
    
    const navigate=useNavigate();
    const [studentDetails, setStudentDetails] = useState({id:'', name: '', email: '', image: '' ,dob:'',contactno:'',studentnumber:'',sem:'',year:'',department:'',parent_contact:'',parent_occupation:'',parent_income_annual:'',present_address:'',permenent_address:'',lastschool_name:'',lastschool_address:'',physics_marks:'',chemistry_marks:'',english_marks:'',maths_marks:'',
                                                        weaknesses:'',strengths:'',carrier_plan:'',hobby:'',other:'',
                                                        blood_group:'',health_issue:'',others:'',mid1_sub1:'',mark1_1:"",mid1_sub2:'',mark1_2:'',mid1_sub3:'',mark1_3:"",mid1_sub4:'',mark1_4:"",mid1_sub5:'',mark1_5:"",mid1_sub6:'',mark1_6:"",cpi1:'',spi1:'',tb1:'',cb1:''});

    
    const [activityList,setActivityList]=useState()   ;
    const [performanceList,setPerformanceList]=useState()   ;
    const [faculty,setFaculty]=useState()   ;
    const data = {
      "event_name": "",
      "your_role": "",
      "level": "",
      "sem": "",
      "stu_id": studentId
  };
      
    // const handleAdd=()=>{
    //     // const abc=[...activityList,[]]
    //     // setActivityList(abc)

    // }

    // const handleAdd =async()  => {
        
    //     try {
    //         console.log('studentdetails',activityList)
    //         await pb.collection('activity').create();
    //         alert("Student record updated successfully.");
    //     } catch (error) {
    //         console.error("Error updating student:", error);
    //     }
    // };
    const handleAdd =async() =>{

        const record = await pb.collection('activity').create(data);
        const abc=[...activityList,[]]
        setActivityList(abc)
        console.log(record)
        // axios.post('http://localhost:8090/api/collections/activity/records')
        // .then(res => {
        //   alert("New Activity created Successfully!")
          
    
    
    
    
        // })
    
      }

    

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const record = await pb.collection('student').getOne(studentId, {
                    expand: 'user,department'
                });
                console.log(record)
                
                const activityrecord = await pb.collection('activity').getFullList({filter:`stu_id='${studentId}'`})
                setStudentDetails(record);
                setActivityList(activityrecord)
                console.log(activityList)

                

                const performancerecord = await pb.collection('performance').getFullList({filter:`stu_id='${studentId}'`})
                setStudentDetails(record);
                setPerformanceList(performancerecord)
                console.log(performanceList)

                const faculty = await pb.collection('allocation').getFirstListItem( `student='${studentId}'`,{
                    expand:'counsellor'

                });
                console.log(faculty)
                setFaculty(faculty?.expand?.counsellor?.name)

                
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
    const imageUrl =  `http://localhost:8090/api/files/student/${studentId}/image/${studentDetails.image}` ;
    
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log('studentdetails',studentDetails)
            await pb.collection('student').update( studentId, studentDetails);
            alert("Student record updated successfully.");
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    const handleActivity = async () => {
        
        try {
            console.log('activity',activityList)
            await pb.collection('activity').update(studentId,activityList)
            alert(" activity is Updated ")
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log('studentdetails',studentDetails)
          await pb.collection('student').update( studentId, studentDetails);
          alert("Student record updated successfully.");
      } catch (error) {
          console.error("Error updating student:", error);
      }
  };






    const handleDelete = async () => {
        try {
            await pb.records.delete('student', studentId);
            alert("Student record deleted.");
            navigate('/studendetails')
           
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("An error occurred while deleting student record.");

        }
    };
    


    const handleChange = (e) => {
        setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
    };
  //   const handleChan = (e) => {
  //     setStudentDetails({ ...activityList, [e.target.name]: e.target.value });
  // };
    const handleChan =(onChangeactivityList,i)=>{
        const inputdata =[...activityList]
        inputdata[i]=onChangeactivityList.target.value;
        setActivityList(inputdata)
    }
    // const handleActivity=(e)=>{
    //     setActivityList({...activityList,[e.target.name]:e.target.value})

    // }

    return (
        
    <div className='container mt-5 mb-5 row col-md-8 offset-md-2 card card-header ' >
        <Nav variant="tabs" transition className='justify-content-start '>
      {/* <Nav.Item>
        <Nav.Link  onClick={() => navigate(`/test-form/${studentId}`)}>
          Counselling meeting 1
        </Nav.Link>
      </Nav.Item> */}
      {/* <Nav.Item>
        <Nav.Link  onClick={() => navigate(`/feedback/${studentId}`)}>
          Feedback
        </Nav.Link>
      </Nav.Item> */}
      {/* <Nav.Item>
        <Nav.Link  disabled>
          NavLink 3 content
        </Nav.Link>
      </Nav.Item> */}
      <NavDropdown title="Conselling " id="nav-dropdown">
        <NavDropdown.Item >
        <Nav.Link  onClick={() => navigate(`/test-form/${studentId}`)}>
          Counselling 1
        </Nav.Link>
        </NavDropdown.Item>
        <NavDropdown.Item >Counselling 2</NavDropdown.Item>
        <NavDropdown.Item >Counselling 3</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item >Counselling 4</NavDropdown.Item>
      </NavDropdown>
      
      <Nav.Item className='justify-content-end ms-auto '>
      <Button variant="outline-success" onClick={() => navigate(`/student-details/${studentId}`)} ><i class="bi bi-house m-2"></i>Home</Button>

        <Button variant="outline-success" onClick={() => navigate(`/`)} ><i class="bi bi-box-arrow-left m-2"></i>Logout</Button>
        
      </Nav.Item>
      
      
      
    </Nav>

    
        {/* <button onClick={() => navigate(`/test-form/${studentId}`)}>Take Test</button>
        <Breadcrumb>
      <Breadcrumb.Item href="/test-form/${record.items[0].id}">Take test</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb> */}

    
        <div className='card-body'>
            
        <h1 className='mb-4 text-primary text-center'>Student Profile</h1><hr></hr>
        
        <Form onSubmit={handleUpdate}>
            <div className=''>
            <p >Hello,<span className='text-primary' >{studentDetails.username} </span>Your Counsellor is<span className='text-primary' > {faculty}</span></p><hr></hr>
            <label className='form-label'>ID:</label>
            
            <input  className='form-control' type="text" value={studentDetails.id} disabled />
            </div>
            <div className=''>
            <label>Full Name:</label>
            <input type="text" className='form-control' name="name" value={studentDetails.username} onChange={handleChange} /><br />
            </div>
            <Row className='mb-3'>
            <Col>
            <label>Email:</label>
            <input 
                                type="email" 
                                name="email" 
                                className='form-control'
                                 
                                placeholder="Enter email"
                                onChange={e => setStudentDetails({...studentDetails, email: e.target.value})}
                                />
                                </Col>
            {/* <input type="email" name="email" value={studentDetails.email} onChange={handleChange} /><br /> */}
            {/* <label>Photo:</label>
            <input type="file" name="image" value={studentDetails.image} onChange={handleChange} /><br /> */}
            <Col>
            <label>DOB:</label>
            {/* <DateTimePicker onChange={handleChange} value={studentDetails.dob} */}
         <input type="text" className='form-control' name="dob" value={studentDetails.dob} onChange={handleChange} /><br /> 
            </Col>
            </Row>
            <Row className='mb-3'>
            <Col>   
            <label>CONTACT:</label>
            <input type="text" className='form-control' name="contactno" value={studentDetails.contactno} onChange={handleChange} /><br />
            </Col> 
            <Col>
            <label>EN-NO:</label>
            <input type="text"  className='form-control' name="studentnumber" value={studentDetails.studentnumber} onChange={handleChange} /><br />
            </Col> 
            <Col>
            <label>sem:</label>
            <input type="number" className='form-control' name="sem" value={studentDetails.sem} onChange={handleChange} /><br />
            </Col> 
            </Row>
            <Row>
            <Col>
            <label>Department:</label>
            <input type="text"  className='form-control' name="department" value={studentDetails?.expand?.department?.dept_name} onChange={handleChange} disabled/><br />
            </Col>
            <Col>
            <label>parent_contact:</label>
            <input type="number" className='form-control' name="parent_contact" value={studentDetails.parent_contact} onChange={handleChange} /><br />
            </Col>
            <Col>
            <label>parent_occupation:</label>
            <input type="text" className='form-control' name="parent_occupation" value={studentDetails.parent_occupation} onChange={handleChange} /><br />
            </Col> 
            <Col>
            <label>parent_income_annual:</label>
            <input type="number" className='form-control' name="parent_income_annual" value={studentDetails.parent_income_annual} onChange={handleChange} placeholder='in LPA' /><br />
            </Col> 
            </Row>
            {/* <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control   as="textarea"    placeholder="Leave a comment here"    style={{ height: '100px' }}   />
            </FloatingLabel> */}
            <label>present_address:</label>
            <textarea type="textarea" className='form-control' name="present_address" value={studentDetails.present_address} onChange={handleChange} /><br />
            <label>permenent_address:</label>
            <textarea type="text" className='form-control' name="permenent_address" value={studentDetails.permenent_address} onChange={handleChange} /><br />
            <label>lastschool_name:</label>
            <input type="text" className='form-control' name="lastschool_name" value={studentDetails.lastschool_name} onChange={handleChange} /><br />
            <label>lastschool_address:</label>
            <textarea type="text" className='form-control' name="lastschool_address" value={studentDetails.lastschool_address} onChange={handleChange} /><br />
            <Row>
            <Col>
            <label>physics_marks:</label>
            <input type="number"className='form-control'  name="physics_marks" value={studentDetails.physics_marks} onChange={handleChange} /><br />
            </Col>
            <Col>
            <label>chemistry_marks:</label>
            <input type="number" className='form-control' name="chemistry_marks" value={studentDetails.chemistry_marks} onChange={handleChange} /><br />
            </Col>
            <Col>
            <label>maths_marks:</label>
            <input type="number" className='form-control' name="maths_marks" value={studentDetails.maths_marks} onChange={handleChange} /><br />
            </Col>
            <Col>
            <label>english_marks:</label>
            <input type="number" className='form-control' name="english_marks" value={studentDetails.english_marks} onChange={handleChange} /><br />
            </Col>
            </Row>
            <hr></hr>
            <h1 className='mb-4 text-primary text-center'>About</h1><hr></hr>
            <label>strengths:</label>
            <input type="text" className='form-control' name="strengths" value={studentDetails.strengths} onChange={handleChange} /><br />
            <label>weaknesses:</label>
            <input type="text" className='form-control' name="weaknesses" value={studentDetails.weaknesses} onChange={handleChange} /><br />
            <label>carrier_plan:</label>
            <select type="select" className='form-control' name="carrier_plan" value={studentDetails.carrier_plan} onChange={handleChange} ><br />
               <option>Business</option>
               <option>Further Study</option>
               <option>Job</option>
            </select>
            <label>hobby:</label>
            <input type="text" className='form-control' name="hobby" value={studentDetails.hobby} onChange={handleChange} /><br />
            <label>other:</label>
            <input type="text" className='form-control' name="other" value={studentDetails.other} onChange={handleChange} /><br />


               <br></br>
               <br></br>
               <hr></hr>
            <h1 className='mb-4 text-primary text-center'>Medical Information</h1><hr></hr>
            <label>bloodgroup:</label>
            <input type="text" className='form-control' name="blood_group" value={studentDetails.blood_group} onChange={handleChange} /><br />
             <label>Health_Isuue:</label>
            <input type="check" className='form-control' name="health_isuue" value={studentDetails.health_issue} onChange={handleChange} /><br /> 
            {/* <div class="form-check form-switch">
            <input class="form-check-input" name="health_issue" value={studentDetails.health_issue}type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label class="form-check-label" for="flexSwitchCheckDefault">Health_Isuue</label>
            </div> */}
            <label>Others:</label>
            <input type="text" className='form-control' name="others" value={studentDetails.others} onChange={handleChange} /><br />
               
               <div className="d-grid gap-2">
               <Button type="submit"size='lg' className='btn btn-success float-end '>Update</Button>
               </div>
               <br></br><br></br>
               </Form>

               <hr></hr>
               <Form >
            <h1 className='mb-4 text-primary text-center'>Activity</h1><hr></hr>
            {
                activityList && activityList?.map(activity =>(
                    <>
                    <Row>
                    <Col>
                    <label>event_name:</label>
                    <input type="text"  className='form-control' name="event_name" value={activity?.event_name} onChange={handleChan} /><br />
                    </Col>
                    <Col>
                    <label>your_role:</label>
                    <input type="text"  className='form-control' name="your_role" value={activity?.your_role} onChange={handleChan} /><br />
                    </Col>
                    <Col>
                    <label>level:</label>
                    <input type="text"  className='form-control' name="level" value={activity?.level} onChange={handleChan} /><br />
                    </Col>
                    <Col>
                    <label>semester:</label>
                    <input type="text"  className='form-control' name="sem" value={activity?.sem} onChange={handleChan}/><br />
                    </Col>
                    </Row>   
                       <br></br>
                       </>
         
                ))
            }    
        <div className="mr-2 float-end">
            
        <Button variant="primary" size="lg" onClick={()=>handleAdd()} className='p-2 m-2'  >
          Add Activity
        </Button>
        <Button  className='btn btn-success p-2 m-2 float-end'size='lg' onClick={()=>handleActivity()} >set</Button>

        {/* {activityList.map((activity,i)=>{
            return(
                <div>
                    <label>event_name:</label>
                    <input type="text"  className='form-control' name="event_name" value={activity?.event_name} onChange={e=>handleChan(e,i)} /><br />
                    <label>your_role:</label>
                    <input type="text"  className='form-control' name="your_role" value={activity?.your_role} onChange={e=>handleChan(e,i)} /><br />
                    <label>level:</label>
                    <input type="text"  className='form-control' name="level" value={activity?.level} onChange={e=>handleChan(e,i)} /><br />
                    <label>sem:</label>
                    <input type="text"  className='form-control' name="sem" value={activity?.sem} onChange={e=>handleChan(e,i)} /><br />
                </div>
            )
        })} */}
                 
        
        </div>
        </Form>    
        <br></br>
        <br></br>
               {/* onChange={handleChange} */}
               {/* onClick={e => handleDelete(d.id)} */}
               <hr></hr>
            <h1 className='mb-4 text-primary text-center'>Performance</h1><hr></hr><br></br>
        {/* <Form>
         {
                performanceList && performanceList?.map(performance =>(
                    <>
                    <Row>
                    <Col>
                    <label>exam_type:</label>
                    <selct    name="exam_type" value={performance?.exam_type} onChange={handleChange} >
                    <option>{performance.exam_type}</option>
                    </selct><br />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <label>sub_name:</label>
                    <input type="text"  className='form-control' name="sub_name" value={performance?.sub_name}  /><br />
                    </Col>
                    <Col>
                    <label>marks:</label>
                    <input type="number"  className='form-control' name="marks" value={performance?.marks} onChange={handleChange} /><br />
                    </Col>
                    
                    <Col>
                    <label>semester:</label>
                    <input type="text"  className='form-control' name="semester" value={performance?.semester} onChange={handleChange} /><br />
                    </Col>
                    </Row>
                      <br></br>
                       <br></br>
                       </>


         
                ))
            } 
            </Form>    */}
<Form >
    <Table  class="table table-sm" bordered  border={1} hover>
      <thead>
        <tr class="text-center">
          <th colSpan={3}>1st SEMESTER</th>
        </tr>
        <tr class="text-center">
          <th colSpan={3}>MID SEM EXAM RESULT</th>
        </tr>
        <tr class="text-center">
          <th>SR.NO</th>
          <th >SUBJECT NAME</th>
          <th>MARKS</th>          
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td>1</td>
          <td>{<input type='text' name="mid1_sub1" className='form-control'value={studentDetails.mid1_sub1} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_1" className='form-control'value={studentDetails.mark1_1} onChange={handleChange}/>}</td>
        </tr>
        <tr class="text-center">
          <td>2</td>
          <td>{<input type='text' name="mid1_sub2" className='form-control'value={studentDetails.mid1_sub2} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_2" className='form-control'value={studentDetails.mark1_2} onChange={handleChange}/>}</td>
        </tr>
        <tr class="text-center">
          <td>3</td>
          <td>{<input type='text' name="mid1_sub3" className='form-control'value={studentDetails.mid1_sub3} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_3" className='form-control'value={studentDetails.mark1_3} onChange={handleChange}/>}</td>
        </tr>
        <tr class="text-center">
          <td>4</td>
          <td>{<input type='text' name="mid1_sub4" className='form-control'value={studentDetails.mid1_sub4} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_4" className='form-control'value={studentDetails.mark1_4} onChange={handleChange}/>}</td>
        </tr>
        <tr class="text-center">
          <td>5</td>
          <td>{<input type='text' name="mid1_sub5" className='form-control'value={studentDetails.mid1_sub5} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_5" className='form-control'value={studentDetails.mark1_5} onChange={handleChange}/>}</td>
        </tr>
        <tr class="text-center">
          <td>6</td>
          <td>{<input type='text' name="mid1_sub6" className='form-control'value={studentDetails.mid1_sub6} onChange={handleChange}/>}</td>
          <td>{<input type='number' name="mark1_6" className='form-control'value={studentDetails.mark1_6} onChange={handleChange}/>}</td>
        </tr>
      </tbody>
    </Table>
    <Table class="table table-sm" bordered  border={1} hover>   
    <tbody>
    <tr class="text-center">
      <th colSpan={4}>GTU RESULT</th>
    </tr>
    <tr class="text-center" >
      <td>CPI</td>
      <td>{<input type='number' name="cpi1" className='form-control'value={studentDetails.cpi1} onChange={handleChange}/>}</td>
      <td>SPI</td>
      <td>{<input type='number' name="spi1" className='form-control'value={studentDetails.spi1} onChange={handleChange}/>}</td>
    </tr>
    <tr class="text-center">
      <th colSpan={4}>GTU EXAM BACKLOG DETAILS</th>
    </tr>
    <tr class="text-center" >
      <td>CURRENT BACKLOG</td>
      <td>{<input type='number' name="cb1" className='form-control'value={studentDetails.cb1} onChange={handleChange}/>}</td>
      <td>TOTAL BACKLOG</td>
      <td>{<input type='number' name="tb1" className='form-control'value={studentDetails.tb1} onChange={handleChange}/>}</td>
    </tr>
    </tbody>
    </Table>
</Form>
    <br></br>
    <div className="d-grid gap-2">
    <Button  size='lg' className='btn btn-success float-end 'onClick={handleSubmit}>Update</Button>
    </div>

    <hr></hr>
            






            
            {/* <button type="button" onClick={handleDelete}>Delete</button> */}
            
            
        
        </div>
        </div>
        


        
       
    );
}
export default StudentDetails













 // <div>
        //     <div className='container mt-5'>
        //     <table className='table'>
        //     <thead>
        //         <tr className='content-align-center'>
        //             <th>Student Information</th>
                    
        //         </tr>
        //     </thead>
        //     <tbody>
            
        //     </tbody>
        //     </table>
                
            
            
            
        //     <tr>Name: {studentDetails.username}</tr>
        //     <tr>student_Number: {studentDetails.studentnumber}</tr>
        //     <tr>user_id: {studentDetails.user}</tr>
        //     <tr>student_id: {studentDetails.id}</tr>
        //     <tr>contact no: {studentDetails.contactno}</tr>
        //     <tr>dob {studentDetails.dob}</tr>
        //     <tr>image: {studentDetails.image}</tr>
        //     <p>Email: {studentDetails.email}</p>
        //     <p>Branch: {studentDetails.branch}</p> 
        //     <img src={imageUrl} alt="Student" />
        //     </div>
        // </div>

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import pb from '../db';

// function StudentDetails() {
//     const { studentId } = useParams();
//     const navigate = useNavigate();
//     const [studentInfo, setStudentInfo] = useState(null);
//     const [aboutInfo, setAboutInfo] = useState(null);
//     const [activityInfo, setActivityInfo] = useState(null);
//     const [medicalInfo, setMedicalInfo] = useState(null);

//     useEffect(() => {
//         const fetchStudentDetails = async () => {
//             try {
//                 // Fetch student information
//                 const student = await pb.collection('student').getOne(studentId, {
//                     expand: 'user',
//                                     });
//                                     setStudentInfo(student);

//                 // Fetch about information
//                 const about = await pb.collection('about').getOne(studentId, { filter: `studentNumber='${student.studentnumber}'` });
//                 setAboutInfo(about);

//                 // Fetch activity information
//                 const activity = await pb.collection('activity').getOne(studentId, { filter: `studentNumber='${student.studentnumber}'` });
//                 setActivityInfo(activity);

//                 // Fetch medical information
//                 const medical = await pb.collection('medical').getOne(studentId, { filter: `studentNumber='${student.studentNumber}'` });
//                 setMedicalInfo(medical);
//             } catch (error) {
//                 console.error('Error fetching student details:', error);
//                 alert('Failed to fetch student details.');
//             }
//         };

//         fetchStudentDetails();
//     }, [studentId]);

//     const handleUpdate = async () => {
//         try {
//             // Update student information
//             await pb.collection('student').update('students', studentInfo.id, studentInfo);
//             // Update about information
//             await pb.collection('about').update('about', aboutInfo.id, aboutInfo);
//             // Update activity information
//             await pb.collection('activity').update('activity', activityInfo.id, activityInfo);
//             // Update medical information
//             await pb.collection('medical').update('medical', medicalInfo.id, medicalInfo);
//             alert('Student details updated successfully.');
//         } catch (error) {
//             console.error('Error updating student details:', error);
//             alert('Failed to update student details.');
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             // Delete student information
//             await pb.collection('student').delete('students', studentId);
//             // Delete about information
//             await pb.collection('about').delete('about', aboutInfo.id);
//             // Delete activity information
//             await pb.collection('activity').delete('activity', activityInfo.id);
//             // Delete medical information
//             await pb.collection('medical').delete('medical', medicalInfo.id);
//             alert('Student details deleted successfully.');
//             navigate('/');
//         } catch (error) {
//             console.error('Error deleting student details:', error);
//             alert('Failed to delete student details.');
//         }
//     };

//     if (!studentInfo || !aboutInfo || !activityInfo || !medicalInfo) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Student Details</h2>
//             <p>ID: {studentInfo.id}</p>
//             <p>Name: {studentInfo.name}</p>
//             <p>Email: {studentInfo.email}</p>
//             <p>Student Number: {studentInfo.studentNumber}</p>
//             <p>About: {aboutInfo.about}</p>
//             <p>Activity: {activityInfo.activity}</p>
//             <p>Medical: {medicalInfo.medical}</p>
//             {/* Add more fields as needed */}
//             <button onClick={handleUpdate}>Update</button>
//             <button onClick={handleDelete}>Delete</button>
//         </div>
//     );
// }

// export default StudentDetails;
