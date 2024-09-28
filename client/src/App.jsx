//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';



function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
