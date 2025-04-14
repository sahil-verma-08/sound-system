import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Favorites from '../favorites'
import  Library from '../library'
import Player from '../player'
import Tranding from '../tranding'

import Feed from '../feed'
import "./home.css"
import Sidebar from '../../components/sidebar'
import { Login } from '../auth/login'
import { setClientToken } from '../../spotify'

export default function Home() {
  const [token,setToken]=useState("")
  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
  
    if (!localToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);            
      setClientToken(_token);      
    } else if (localToken) {
      setToken(localToken);        
      setClientToken(localToken);  
    }
  }, []);
  
  return !token ? (<Login/>) :(
    <Router>
      <div className="main-body">
      
         <Sidebar/> 
         
       <Routes>
        <Route path='/' element={<Library />} />
       
        <Route path='/feed' element={<Feed/>} />
        <Route path='/tranding' element={<Tranding/>} />
        <Route path='/player' element={<Player/>} />
        <Route path='/favorites' element={<Favorites/>} />

      </Routes>
      </div>
    </Router>
  )
}

