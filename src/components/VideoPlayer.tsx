import ReactPlayer from 'react-player'
import { useEffect, useState, memo } from "react"

import PlayIcon from '../assets/play.svg?react'
import PauseIcon from '../assets/pause.svg?react'

import VolumeOn from '../assets/volume-on.svg?react'
import VolumeOff from '../assets/volume-off.svg?react'
import VideoActions from "./VideoActions"

export default memo(
  function VideoPlayer({ id, thumbnail, isActive }: { id: string, thumbnail: string, isActive:boolean}) {  
    const [isPlaying, setIsPlaying] = useState(true)
    const [volume, setVolume] = useState(0)

    console.log('render VideoPlayer')
    
    useEffect(() => {      
      if(!isActive) {
        return 
      } 
      
      setIsPlaying(true)
    }, [isActive])
    
    function togglePlaying() {
      setIsPlaying((prev) => !prev)
    }

    function toggleVolume() {
      setVolume((prev) => !prev ? 1 : 0)
    }  

    function ready() {
      console.log('video is ready')
    }
    
    return (
      // TODO: Customize the video player (remove the title)
      // TODO: When the video is end then play the next video
      <div className="flex items-end mb-10 space-x-4">
        <div className='group'>
          <div className="aspect-[4/7] w-[20rem] relative rounded-lg overflow-hidden">
            <div  className='absolute inset-0' style={{backgroundImage: `url(${thumbnail})`, display: isActive ? 'none': 'block'}}></div>
            <div className='absolute inset-0'>
              {
                isActive && (
                  <ReactPlayer  
                    playing={isPlaying}
                    volume={volume}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0, rel: 0, start: 0 }
                      },
                    }}
                    controls={false}
                    width='100%'
                    height='100%'
                    url={`https://www.youtube.com/watch?v=${id}`}
                    onReady={ready} 
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                )
              }
            </div>
            <nav className="opacity-0 group-hover:opacity-100 p-4 pt-8 absolute bottom-0 w-full text-white bg-gradient-to-t from-black/70 to-transparent rounded-lg">
              <ul className="flex justify-between">
                <li>
                  <button className="w-6 h-6" onClick={togglePlaying}>
                    {isPlaying ? <PauseIcon/> : <PlayIcon />}
                  </button>
                </li>
                <li>
                  <button className="w-6 h-6" onClick={toggleVolume}>
                    {volume === 0 ? <VolumeOff /> : <VolumeOn/>}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          </div>
        <div>
          <VideoActions />  
        </div>
      </div>
  )
})

