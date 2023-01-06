import React, { useEffect, useState } from "react";
import validator from 'validator'


function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailValidation = () => {

    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Please, enter valid Email!')
    }    
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="home">
      <div className="header">
        <h2>Email Validation</h2>
      </div>
      <div className="card">
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
    </div>
  );
}

export default Home;