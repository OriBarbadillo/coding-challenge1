import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function ListedPosts() {
  const [data, getData] = useState([]);
  const [email, setEmail] = useState('');
  const [newPost] = useState(false);
  const getDataEmail = () => {
    return localStorage.getItem('email');
  }
  const navigate = useNavigate();
  const URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetchData();
    setEmail(getDataEmail());
  }, []);
  function navigateNewPost() {if(!newPost){navigate('/newPost')}}
  function logOut() {navigate('/')}
  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      
      .then((response) => {
        //console.log(response);
        getData(response);
      });
  };
  var posts = JSON.parse(localStorage.getItem('posts') || "[]")
  const dataPost = data.concat(posts);
  const idSaved = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === (JSON.parse(localStorage.getItem('email'))))).id

  return (
    <html>
      
      <body>
      <Navbar bg="light" expand="lg">
      <Container >
        <Navbar.Brand >Welcome!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={logOut}>Log out</Button>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <Container>
        <h5>Inbox post list of {email}</h5>
        <Button variant="info" onClick={navigateNewPost}>Compose</Button>
      </Container>
      <Container>
        <Table striped>
          <thead >
            <tr >
            <th>Subject</th>
            <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {dataPost.filter(post => post.userId === idSaved).reverse().map((item, i) => (
            <tr key={i}>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Container>

    
      </body>

    </html>

  );
}
 
export default ListedPosts;