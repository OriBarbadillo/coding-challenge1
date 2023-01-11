import React, { useState } from "react";
import validator from 'validator'
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      setEmailError('Valid email:)')
      //The email address is not on the Local Storage, so it is send but not incluided on the post list
      if (!((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === state.emailTo))){
        alert("Post sent successfully!")
        navigate('/ListedPosts')
      }
      else{     
        const idEmailTo = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === state.emailTo)).id
        const newPost = {userId: idEmailTo, id: 1, title: state.subject, body: state.detail}
        var posts = JSON.parse(localStorage.getItem('posts') || "[]")
        posts.push(newPost)
        localStorage.setItem('posts', JSON.stringify(posts))
        alert("Post sent successfully!")
        navigate('/ListedPosts')
      }
    } else {
      setEmailError('Please, enter valid email!')
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
    <html>
      <Form >
        <div>
          <h2 class="mt-5 row justify-content-center">Compose post</h2>
        </div>
        <Form.Group className="newPost" class="col-lg-4 offset-lg-4" controlId="formBasicEmail" column="sm">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" name="emailTo" placeholder="Enter email" value={state.emailTo} onChange={handleOnChange} />
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" name="subject" placeholder="Enter subject" value={state.subject} onChange={handleOnChange} />
          <Form.Label>Body</Form.Label>
          <textarea class="form-control" name="detail" rows="3" placeholder="Enter details" value={state.detail} onChange={handleOnChange} />
          <div class="d-grid gap-2 col-6 mx-auto mt-4">
            <Button class="btn btn-primary" onClick={sendPost}>Sent</Button>
            <Button class="btn btn-secondary" onClick={close}>Close</Button>
            <p className="emailError">{emailError}</p>
          </div>
        </Form.Group>

      </Form>
    </html>
  );
}

export default NewPost;