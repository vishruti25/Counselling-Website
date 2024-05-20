import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css';
import pb from '../db';
import { useNavigate } from 'react-router-dom';
import '../Style.css'



function NavBar() {
    const navigate =useNavigate();

    const logout=()=>{
        pb.authStore.clear();
        navigate('/')
      }

  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Student Counselling System</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class=" hello collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                
            {/* <li class="nav-item mx-1 text-white border rounded">
                    <a class="nav-link text-white " aria-current="page" href="/">
                      <i className='bi bi-box-arrow-right'></i>  Logout
                    </a>
                </li> */}


                <li class="nav-item text-white mx-1 border rounded">
                    <a class="nav-link text-white" aria-current="page" href="/teacher">
                      <i  className='bi bi-house'></i>  Home
                    </a>
                </li>
                {/* <li class="nav-item mx-1 border rounded">
                    <a class="nav-link " aria-current="page" href="#">account</a>
                </li> */}
                <li class="nav-item mx-1 text-white border rounded">
                    <a class="nav-link text-white " aria-current="page"onClick={logout} href="#">
                      <i className='bi bi-box-arrow-right'></i>  Logout
                    </a>
                </li>
                
                
            </ul>
            </div>
        </div>
    </nav>
</div>
  );
}

export default NavBar;