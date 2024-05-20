import React from 'react'
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../Style.css'
import map from '../svitlogo.png'
function Contactus() {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_4o0ex3n', 'template_ak2fnd3', form.current, {
        publicKey: 'pyIvetR8gPaedK05s',
      })
      .then(
        (result) => {
          console.log(result.text)
          console.log('SUCCESS!');
        },
        (error) => {
          console.log(error.text);
        },
      );
  };


  return (
    <div class="contact3 m-5 py-5">
      <div class='row no-gutters'>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 " >
              <div class="card-shodow">
                <img src={map} width={300} class="mx-auto d-block " />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="contact-box ml-3">
                <h1 class="font-weight-light mt-2">Quick Contact</h1>
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
                  <label>Message</label>
                  <textarea class="form-control"  name="message" />
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
            <div class="col-lg-12">
          <div class="card mt-4 border-0 mb-4">
            <div class="row bg-light">
              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail pl-0">
                  <div class="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Address</h6>
                    <p class=""> S.T. Bus Depo,Anand District

                      <br/> Vasad, Gujarat 388306</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail">
                  <div class="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Phone</h6>
                    <p class=""> +91 95107 82981 / 82
                      <br/> +91 9510782983 / 84</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <div class="card-body d-flex align-items-center c-detail">
                  <div class="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"/>
                  </div>
                  <div class="">
                    <h6 class="font-weight-medium">Email</h6>
                    <p class="">
                    contact@svitvasad.ac.in
                      <br/>contact@svitvasad.ac.in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          

  )
}

export default Contactus
