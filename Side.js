import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Style.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import pb from '../db';
function Side() {

    const [active ,setActive]=useState(1);
    

  const { TeacherId } = useParams();
  const navigate=useNavigate();
  const[studentDetails, setStudentDetails] = useState();
  const[teacherDetails, setTeacherDetails] = useState();

  
  const[faculty,setFaculty] = useState()   ;


  useEffect(() => {
    const fetchTeacherDetails = async () => {
      
      try {
              const record = await pb.collection('teacher').getOne(TeacherId, {
                  expand: 'user,student'
              });
              console.log(record)
              
  
              
  
              
              
              const faculty = await pb.collection('faculty').getFullList( {filter:`counsellor='${TeacherId}'`,expand: 'student'} ,);
              console.log(faculty)
              setTeacherDetails(faculty)
              
  
              
          } catch (error) {
              console.log( error);
          }
      };
  
      fetchTeacherDetails();
  }, [TeacherId]);
  return (
    <div class='text-white'>
    <div className=' sidebar d-flex justify-content-between flex-column text-white bg-dark p-4 vh-100'  >
        <div class='text-white'>
            <a href="" class='text-white text-decoration-none p-3'>
                <i className='bi bi-code-slash fs-4 me-4 '></i>
                <span class='fs-4'>SVIT</span>
            </a>
            <hr className='text-secondary mt-2  '/>
            <ul className='nav nav-pills flex-column mt-3  text-white'>
                <li className={active ===1 ? 'active nav-item p-2':"nav-item p-2"} onClick={e=>setActive(1)}>
                    <Link  onClick={() => navigate(`/teacher/${TeacherId}`)} class='text-decoration-none p-1'>

                        <i className='bi bi-speedometer2 me-3 fs-4'></i>
                        <span className='fs-4'><strong>Dashboard</strong></span>
                    </Link>
                </li>
                {/* <li className={active ===2 ? 'active nav-item p-2':"nav-item p-2"} onClick={e=>setActive(2)} >
                    <Link to='/teacher1' class='text-decoration-none p-1'>
                        <i className='bi bi-view-list me-3 fs-4'></i>
                        <span className='fs-4'><strong>1</strong></span>
                    </Link>
                </li>
                <li className={active ===3 ? 'active nav-item p-2':"nav-item p-2"} onClick={e=>setActive(3)}>
                    <Link to='/' class='text-decoration-none p-1'>
                        <i className='bi bi-mortarboard me-3 fs-4'></i>
                        <span className='fs-4'><strong>2</strong></span>
                    </Link>
                </li> */}
                {/* <li className={active ===4 ? 'active nav-item p-2':"nav-item p-2"} onClick={e=>setActive(4)}>
                    <span class='text-decoration-none p-1'>
                        <i className='bi bi-envelope-paper-heart me-3 fs-4'></i>
                        <span className='fs-4'><strong>Feedback</strong></span>
                    </span>
                </li> */}
                {/* <li className={active ===5 ? 'active nav-item p-2':"nav-item p-2"} onClick={e=>setActive(5)}>
                    <Link to='/'class='text-decoration-none p-1'>
                    <i class="bi bi-person-lines-fill me-3 fs-4"></i>
                    <span className='fs-4'><strong>3 </strong></span>
                    </Link>
                </li> */}
            </ul>
        </div>
        <div className='user'>
            <hr className='text-secondary'/>
            <div className='nav-item p-2'>
            {/* a href='' */}
                    <span class='text-decoration-none p-1'>
                        <i className='bi bi-person-circle me-3 fs-5'></i>
                        <span className='fs-4'><strong>Teacher</strong></span>
                    </span>
                </div>
        </div>
    </div>
    </div>
  )
}

export default Side