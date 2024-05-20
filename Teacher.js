// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import pb from '../db'
// import axios from 'axios'
// import { Nav, NavDropdown, Table } from 'react-bootstrap'

// function Teacher() {
//   const[data,setData] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const records = await pb.collection('student').getFullList({
            
//         })
//         setData(records)
//         console.log(records)
            
            
          
            
            
//         } catch (error) {
//             console.error("Error fetching student details:", error);
//             alert("An error occurred while fetching the student details.");
//         }
//     };

//     fetchData();
// }, []);

// // const handleDelete = async () => {
// //   try {
// //       await pb.records.delete('student', id);
// //       alert("Student record deleted.");
// //       navigate('/studendetails')
     
// //   } catch (error) {
// //       console.error("Error deleting student:", error);
// //       alert("An error occurred while deleting student record.");

// //   }
// // };
// function handleDelete(id){
//   const confirm = window.confirm("would you like to delete this data?");
//   if(confirm){


//   axios.delete('http://localhost:8090/api/collections/student/records/'+id)
//   .then(res =>{
//       alert("record deleted successfully...")
//       navigate('/home')
//   })
//   }
// }



//   return (
//     <div className='container mt-5' >
//       <Nav variant="pills" activeKey="1" >
//       <Nav.Item>
//         <Nav.Link eventKey="1" href="#/home">
//           NavLink 1 content
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="2" title="Item">
//           NavLink 2 content
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="3" disabled>
//           NavLink 3 content
//         </Nav.Link>
//       </Nav.Item>
//       <NavDropdown title="Dropdown" id="nav-dropdown">
//         <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
//         <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
 
//       <h2>Student Information</h2>
//       <Link to="/make" className='btn btn-success my-3'>create +</Link>
      
//       <Table striped   className='table'>
//             <thead>
//                 <tr>
//                     <th>Id</th>
//                     <th>Username</th>
//                     <th>Email</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 { data && data.map((d,i) => (
//                     <tr key={i}>
//                         <td>{d.id}</td>
//                         <td>{d.username}</td>
//                         <td>{d.email}</td>
//                         <td >
//                             <Link  className='text-decoration-none btn btn-sm btn-success' to={`/update/${d.id}`}>Update</Link>
//                             <button  className='text-decoration-none btn btn-sm btn-danger'onClick={e => handleDelete(d.id)}  >Delete</button>
//                             <Link  className='text-decoration-none btn btn-sm btn-primary' to={`/read/${d.id}`}>Read</Link>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     </div>
//   )
// }
// export default Teacher
// this is set for admin 


import React from 'react'
import NavBar from './NavBar'
import Side from './Side'
import HoMe from './HoMe'

function Teacher() {
  return (
    <div className='d-flex'>
        <div className='w-auto'>
          <Side/>
        </div>
        <div className='col '>
          <NavBar/>
          <HoMe/>
        </div>
    </div>
  )
}

export default Teacher