import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

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
  function navigateNewPost()
  {
    if(!newPost){
      navigate('/newPost')
    }
  }
  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      
      .then((response) => {
        //console.log(response);
        getData(response);
      });
  };
  const posts = JSON.parse(localStorage.getItem('posts'))
  const dataPost = data.concat(posts);
  const idSaved = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === (JSON.parse(localStorage.getItem('email'))))).id

  return (
    <table>
      <h1>Welcome!</h1>
      <h2>Posts list of {email}</h2>
      <button onClick={navigateNewPost}>Compose</button>
      <tbody>
        <tr>
          <th>Subject</th>
          <th>details</th>
        </tr>
        {dataPost.filter(post => post.userId === idSaved).reverse().map((item, i) => (
          <tr key={i}>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
 
export default ListedPosts;