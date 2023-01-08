import React, { useEffect, useState } from "react";
 
function ListedPosts() {
  const [data, getData] = useState([]);
  const [email, setEmail] = useState('');
  const getDataEmail = () => {
    return localStorage.getItem('email');
  }
  const URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetchData();
    setEmail(getDataEmail());
  }, []);
  
  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())
      
      .then((response) => {
        console.log(response);
        getData(response);
      });
  };

  const idSaved = ((JSON.parse(localStorage.getItem('emails'))).find(p => p.email === (JSON.parse(localStorage.getItem('email'))))).id
  console.log("data:",data)
  console.log("Id saved:", idSaved)
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Posts list of {email}</h2>
      <tbody>
        <tr>
          <th>Subject</th>
          <th>Descripation</th>
        </tr>
        {data.filter(post => post.userId === idSaved).map((item, i) => (
          <tr key={i}>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}
 
export default ListedPosts;