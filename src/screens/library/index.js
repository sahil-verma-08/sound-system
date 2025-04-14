import React from 'react'
import APIKit from "../../spotify"
import { useState,useEffect } from 'react';
import "./library.css"
import { IconContext } from 'react-icons';
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function Library() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
     setPlaylists(response.data.items);
    });
  }, []);
  const navigate= useNavigate();

  const playPlaylist=(id)=>{
    navigate("/player",{state:{id:id}})
  }
  return (
 
    <div className='screen-container'>
      <div className='library-body'>
    {playlists?.map((playlist)=> 
      (<div className='playlist-card' key={playlist.id} 
      onClick={()=>playPlaylist(playlist.id)}>
        <img 
        src={playlist.images[0].url} 
        className='playlist-images'
         alt='playlist-Art'/>

        <p className='playlist-title'> {playlist.name}</p>
        <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>
        <div className='playlist-fade'>
          <IconContext.Provider value={{size: "40px" , color: "#EC8305" }}>
          <FaPlayCircle />
          </IconContext.Provider>
        </div>

        
     </div>))}
     </div>
  
  </div>
  )
  
};
