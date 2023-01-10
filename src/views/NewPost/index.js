import React, { useState } from "react";
import validator from 'validator'
import {useNavigate} from 'react-router-dom';

function NewPost() {
  const [emailError, setEmailError] = useState("");
  const [state, setState] = React.useState({
    emailTo: "",
    subject: "",
    detail: "",
  })

  const navigate = useNavigate();
  function sendPost(){

    if (validator.isEmail(state.emailTo)) {
      setEmailError('Valid Email :)')
      if (!localStorage.emails.includes(localStorage.email)){
        //No esta el destino, se manda pero no agrega nada
        alert("Post sent successfully!")
      }
      else{     
        alert("Post sent successfully agregar!")
        if(JSON.parse(localStorage.getItem('email')) === state.emailTo){
          const idSaved = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === (JSON.parse(localStorage.getItem('email'))))).id
          const newPost = {userId: idSaved, id: 1, title: state.subject, body: state.detail}
          var posts = JSON.parse(localStorage.getItem('posts') || "[]")
          posts.push(newPost)
          localStorage.setItem('posts', JSON.stringify(posts))
        }
        navigate('/ListedPosts')
      }
    } else {
      setEmailError('Please, enter valid Email!')
    }    
  };

  function handleOnChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  return (
    <div className="home">
        <h2>Compose post</h2>
          <label htmlFor="emailTo" className="label"> Email:</label>
          <input type="text" name="emailTo" value={state.emailTo} onChange={handleOnChange} placeholder="email"/>
          <label htmlFor="subject" className="label"> Subject:</label>
          <input type="text" name="subject" value={state.subject} onChange={handleOnChange} placeholder="subject"/>
          <label htmlFor="detail" className="label"> Detail:</label>
          <textarea type="text" name="detail" value={state.detail} onChange={handleOnChange} placeholder="detail"/>
          <button onClick={sendPost}>Sent</button>
          <p className="emailError">{emailError}</p>
    </div>
  );
}

export default NewPost;