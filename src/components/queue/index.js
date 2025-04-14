import React from 'react'
import "./queue.css"
export default function Queue({tracks,setcurrentIndex}) {
 console.log(tracks)
  return (
    <div className='Queue-container flex'>
      <div className='queue flex'>
        <p className='upnext'>UP NEXT</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => setcurrentIndex(index)}
            >
              <p className="track-name">{track?.track?.name}</p>
              <p>0:30</p>
            </div>
          ))
        }
          

        </div>
      </div>

    </div>
  )
}
