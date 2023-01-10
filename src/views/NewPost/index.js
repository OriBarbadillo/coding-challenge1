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
        //The email address is not on the Local Storage, so it is send but not incluided on the post list
        alert("Post sent successfully!")
      }
      else{     
        const idEmailTo = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === state.emailTo)).id
        console.log("ID Email to:", idEmailTo)
        const newPost = {userId: idEmailTo, id: 1, title: state.subject, body: state.detail}
        var posts = JSON.parse(localStorage.getItem('posts') || "[]")
        posts.push(newPost)
        localStorage.setItem('posts', JSON.stringify(posts))
        alert("Post sent successfully!")
        navigate('/ListedPosts')
      }
    } else {
      setEmailError('Please, enter valid Email!')
    }    
  };
  function close(){ navigate('/ListedPosts')}

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
          <button onClick={close}>Close</button>
          <p className="emailError">{emailError}</p>
    </div>
  );
}

export default NewPost;