//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Discover from './pages/Discover';
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Callback from './components/Callback.jsx';
import Chat from "./components/Chat";




function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path ='/Discover' element={<Discover/>}/>
        <Route path ='/Chat' element={<Chat groupId="DevConnect" user="Arnav-Panchal"/>}/>
        <Route path ='/callback' element={<Callback/>}/>
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
