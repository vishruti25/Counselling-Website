import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbaar from './Navbaar'
import { Link, useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import pb from '../db'
import axios from 'axios'


function Admint() {

  

    const[data,setData] = useState([])
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchData = async () => {
          try {
            const records = await pb.collection('teacher').getFullList({
              
          })
          setData(records)
          console.log(records)

        //   const record = await pb.collection('teacher').getFirstListItem( {
        //     expand: 'department',
            
        // });
        // console.log(record)
        // setData(record)
              
          } catch (error) {
              console.error("Error fetching student details:", error);
              alert("An error occurred while fetching the student details.");
          }
      };
  
      fetchData();
  }, []);

  function handleDelete(id){
    const confirm = window.confirm("would you like to delete this data?");
    if(confirm){
  
    axios.delete('http://localhost:8090/api/collections/teacher/records/'+id)
    .then(res =>{
        alert("record deleted successfully...")
        navigate('/admint')
        window.location.reload();
    })
    }
  }
  



  return (
    <div className='d-flex'>
        <div className='w-auto'>
          <Sidebar/>
        </div>
        <div className='col '>
          <Navbaar/>
          <div className='container mt-5' >
          <h2>Teachers Information</h2>
      <Link to="/createteacher" className='btn btn-success my-3'>create +</Link>
      
      <Table striped   className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    {/* <th>Department</th> */}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { data && data.map((d,i) => (
                    <tr key={i}>
                        <td>{d.id}</td>

                        <td>{d.name}</td>
                        {/* <td>{d.expand?.department?.dept_name}</td> */}
                        <td >
                            <Link  className='text-decoration-none btn btn-sm btn-success' to={`/updateteacher/${d.id}`}>Update</Link>
                            <button  className='text-decoration-none btn btn-sm btn-danger'onClick={e => handleDelete(d.id)}  >Delete</button>
                            <Link  className='text-decoration-none btn btn-sm btn-primary' to={`/readteacher/${d.id}`}>Read</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
            
        </div>
    </div>
    
        
  )
}

export default Admint