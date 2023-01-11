import React, { useState } from "react";
import validator from 'validator'
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    <html>
      <Form >
        <div>
          <h2 class="mt-5 row justify-content-center">Testhub coding challenge</h2>
        </div>
        <Form.Group className="home" class="col-lg-4 offset-lg-4" controlId="formBasicEmail" column="sm">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleOnChange} />
        </Form.Group> 
        <Form.Group class="mt-3 col-lg-4 offset-lg-4">
          <Button class="btn btn-primary" onClick={emailValidation}>Log in</Button>
          <p className="emailError">{emailError}</p>
        </Form.Group>
      </Form>
    </html>
  );
}

export default Home;