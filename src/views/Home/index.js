import React, { useState } from "react";
import validator from 'validator'
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import messiWorldcup from '../../assets/img/messiWorldcup.jpg';

function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  
  function getNewId(){
    let lastEmailId = localStorage.getItem('lastEmailId') || '0';
    let newEmailId = JSON.parse(lastEmailId) + 1;
    localStorage.setItem('lastEmailId', JSON.stringify(newEmailId))
    return newEmailId;
  }

  function emailValidation(){

    if (validator.isEmail(email)) {
      var emails = JSON.parse(localStorage.getItem('emails') || "[]")
      setEmailError('Valid Email :)')
      setEmail(email)
      localStorage.setItem('email', JSON.stringify(email));
      
      if(localStorage.emails === undefined){
        localStorage.setItem('emails', JSON.stringify(emails));
      }
      if (localStorage.emails.includes(localStorage.email)){
        navigate('/ListedPosts')
      }
      else{
        const newEmail = {id: getNewId(), email:email}
        emails.push(newEmail)
        localStorage.setItem('emails', JSON.stringify(emails));
        navigate('/ListedPosts')
      }
    } else {
      setEmailError('Please, enter valid Email!')
    }    
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
      <Form >
        <div>
          <h2  className="mt-5 row justify-content-center">Testhub coding challenge</h2>
        </div>
        <Form.Group className="col-lg-4 offset-lg-4" controlId="formBasicEmail" column="sm">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleOnChange} />
        </Form.Group> 
        <Form.Group className="mt-3 col-lg-4 offset-lg-4">
          <Button className="btn btn-primary d-grid gap-2 col-4 mx-auto mt-4" onClick={emailValidation}>Log in</Button>
          <p className="emailError">{emailError}</p>
          <img src={messiWorldcup} alt='' className="d-grid gap-2 col-6 mx-auto mt-4"/>
        </Form.Group>
      </Form>
          
  );
}

export default Home;