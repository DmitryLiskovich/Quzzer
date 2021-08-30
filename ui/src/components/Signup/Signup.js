import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Requests } from '../../requests/requests';
import { useSpinner } from '../../hooks/spinner';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const requests = new Requests();

export function Signup() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
    password_r: '',
    f_name: '',
    l_name: '',
    company: '',
    position: ''
  });
  const [Spinner, setSpinner] = useSpinner();
  const [response, setResponse] = useState({status: false, message: ''});

  function showToast(type, message) {
    setResponse({status: true, type, message});
    setTimeout(() => {
      setResponse({
        status: false,
      })
    }, 2000)
  }

  async function createNewUser(e) {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await requests.registerNewUser(fields);
      setSpinner(false);
      showToast('success', response.data.message);
    } catch(error) {
      showToast('error', error.response.data.message);
      setSpinner(false);
    }
  }

  function change(e) {
    e.persist();
    const newFields = {...fields};
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  } 

  return(
    <div className='signin'>
      <Snackbar open={response.status}>
        <Alert severity={response.type}>
          {response.message}
        </Alert>
      </Snackbar>
      {Spinner && <Spinner/>}
      <h2>Create a new account</h2>
      <form onSubmit={createNewUser}>
        <label htmlFor='email'>Email</label>
        <input onChange={change} value={fields.email} name='email' type='text' id='email'></input>
        <label htmlFor='password'>Password</label>
        <input onChange={change} value={fields.password} name='password' type='password' id='password'></input>
        <label htmlFor='password_r'>Repeat Password</label>
        <input onChange={change} value={fields.password_r} type='password' name='password_r' id='password_r'></input>
        <label htmlFor='f_name'>First Name</label>
        <input onChange={change} value={fields.f_name} name="f_name" type='text' id='f_name'></input>
        <label htmlFor='l_name'>Last Name</label>
        <input onChange={change} value={fields.l_name} name="l_name" type='text' id='l_name'></input>
        <label htmlFor='company'>Company Name</label>
        <input onChange={change} value={fields.company} name="company" type='text' id='company'></input>
        <label htmlFor='position'>Your Position</label>
        <input onChange={change} value={fields.position} name="position" type='text' id='position'></input>
        <button type='submit'>Create</button>
      </form>
      <p>Already have an account? <Link to='/signin'>Signin</Link></p>
    </div>
  )
}