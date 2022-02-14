import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API call
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
      // save the token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/')
  }
  else{

      alert("Valid credentails - please enter with correct email and password")
  }




  }


  const onChange = (e) => {
    // console.log("onchange", credentials);
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return <div className='container'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Enter name</label>
        <input type="text" className="form-control" name='name' id="name" onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm your Password</label>
        <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={5} required/>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>;
}
