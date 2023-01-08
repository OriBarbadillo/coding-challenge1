import React, { useState } from "react";
import validator from 'validator'
import {useNavigate} from 'react-router-dom';

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
        console.log("No estaba, se agrega nuevo id")
        const newEmail = {id: getNewId(), email:email}
        
        console.log("Email despues:", newEmail)
        emails.push(newEmail)
        localStorage.setItem('emails', JSON.stringify(emails));
        alert("Has guardado tu email")
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
    <div className="home">
        <h2>Email Validation</h2>
        <label htmlFor="email" className="label">
          Email:
        </label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleOnChange}
          />
          <button onClick={emailValidation}>Check</button>
          <p className="emailError">{emailError}</p>
    </div>
  );
}

export default Home;