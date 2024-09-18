//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/signIn';

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
