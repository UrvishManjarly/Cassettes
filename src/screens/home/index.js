import React , { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import Library from '../library';
import Feed from '../feed/feed';
import Trending from '../trending/trending';
import Player from '../player/player';
import Favorites from '../favorites/favorites';
import "./home.css";
import Login from '../auth/login';
import { setClientToken } from '../../spotify';
import Search from '../search';


export default function Home() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;

    window.location.hash = "";
    if(!token && hash){ 
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token); 
    }
    else{
      setToken(token);
      setClientToken(token); 
    }
    

  }, [])
  return (!token?
    
    <Login />:
  <Router>
    <div className="main-body">

     
     <Sidebar />
      
      <Routes>
                   
             <Route path="/" element={<Library/>}/>
             <Route path="/feed" element={<Feed />} />
             <Route path="/trending" element={<Trending />} />
             <Route path="/player" element={<Player />} />
             <Route path="/favorites" element={<Favorites />} />
             <Route path="/search" element={<Search />} />

      </Routes>
    </div>
    

  </Router>

  ); 
  
}
