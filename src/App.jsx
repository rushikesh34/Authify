
  import React from 'react'
  import { ToastContainer } from 'react-toastify';
  import { Route, Routes } from 'react-router-dom';
  // import './App.css'
  import Home from './Pages/Home';
  import EmailVerify from './Pages/EmailVerify';
  import ResetPassword from './Pages/ResetPassword';
  import Login from './Pages/Login';

  function App() {
    return (
      <>
      <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/email-verify'element={<EmailVerify/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
      </div>
      </>
    )
  }

  export default App

