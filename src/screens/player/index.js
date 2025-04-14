import React, { useEffect, useState } from 'react'
import "./player.css"
import { useLocation  } from 'react-router-dom'
import apiClient from '../../spotify';
import Songcard from '../../components/songcard';
import Queue from '../../components/queue';
import  AudioPlayer from '../../components/audioPlayer';


export default function Player() {
  const location= useLocation();
  const [tracks,setTracks]=useState([])
  const [currentTrack,setcurrentTrack]= useState({});
  const [currentIndex, setcurrentIndex]=useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setcurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

   useEffect(()=>{
    setcurrentTrack(tracks[currentIndex]?.track);
   },[currentIndex, tracks])


  return (
    <div className='screen-container flex'>
      <div className='left-player-body'>
        <AudioPlayer 
        currentTrack={currentTrack}   
          currentIndex={currentIndex}
           setCurrentIndex={setcurrentIndex}
           tracks={tracks} />

       </div>
      <div className='right-player-body'>
       
      <Songcard album={currentTrack?.album} />
      <Queue tracks={tracks} setcurrentIndex={setcurrentIndex} />
      </div> 
    </div>
  )
}
