import ReactPlayer from 'react-player'
import { useEffect, useState, memo, useMemo, useRef } from "react"

import PlayIcon from '../assets/play.svg?react'
import PauseIcon from '../assets/pause.svg?react'

import VolumeOn from '../assets/volume-on.svg?react'
import VolumeOff from '../assets/volume-off.svg?react'
import VideoActions from "./VideoActions"

enum VOLUME {
  ON = 0.5,
  OFF = 0
}

enum STATE {
  PLAYING,
  PAUSED
}

const VideoPlayer = memo(
  ({ id, thumbnail, isActive, title }: { id: string, title: string, thumbnail: string, isActive: boolean }) => {  
    const [state, setState] = useState(STATE.PAUSED)
    const [volume, setVolume] = useState(VOLUME.OFF)
    
    const [currentTime, setCurrentTime] = useState(0)
    const [isReady, setIsReady] = useState(false)
    
    const player = useRef<ReactPlayer>(null)

    useEffect(() => {      
      if(!isActive) {
        return 
      } 
      
      setState(STATE.PLAYING)
    }, [isActive])

    const isPlaying = useMemo(() => state === STATE.PLAYING, [state])
    
    function toggleState() {
      setState((prev) => prev === STATE.PLAYING ? STATE.PAUSED : STATE.PLAYING)
    }

    function toggleVolume() {
      setVolume((prev) => !prev ? VOLUME.ON : VOLUME.OFF)
    }  

    function ready() {
      console.log('video is ready')
      setIsReady(true)
    }

    function track({ playedSeconds }: {playedSeconds: number}) {
      setCurrentTime(Math.floor(playedSeconds))
    }

    function replay() {
      setCurrentTime(0)
      player.current?.seekTo(0)
    }
    
    return (
      <div className="flex items-end mb-10 space-x-4">
        <div className='group'>
          <div className="aspect-[4/7] w-[20rem] relative rounded-lg overflow-hidden">
            <div  className='absolute inset-0' style={{backgroundImage: `url(${thumbnail})`, display: isActive && isReady ? 'none': 'block'}}></div>
            <div className='absolute inset-0'>
              {
                isActive && (
                  <ReactPlayer  
                  ref={player}
                    playing={isPlaying}
                    volume={volume}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0, rel: 0, start: currentTime }
                      },
                    }}
                    controls={false}
                    loop={false}
                    width='100%'
                    height='100%'
                    url={`https://www.youtube.com/watch?v=${id}`}
                    onReady={ready} 
                    onPlay={() => setState(STATE.PLAYING)}
                    onPause={() => setState(STATE.PAUSED)}
                    onProgress={track} 
                    onEnded={replay}
                  />
                )
              }
            </div>
            {isReady && <nav className="opacity-0 group-hover:opacity-100 p-4 pt-8 absolute bottom-0 w-full text-white bg-gradient-to-t from-black/70 to-transparent rounded-lg">
              <ul className="flex justify-between">
                <li>
                  <button className="w-6 h-6" onClick={toggleState}>
                    {isPlaying ? <PauseIcon/> : <PlayIcon />}
                  </button>
                </li>
                <li>
                  <button className="w-6 h-6" onClick={toggleVolume}>
                    {volume === 0 ? <VolumeOff /> : <VolumeOn/>}
                  </button>
                </li>
              </ul>
            </nav>}
          </div>
          </div>
        <div>
          <VideoActions title={title}/>  
        </div>
      </div>
  )
})

export default VideoPlayer