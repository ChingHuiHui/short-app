import YouTube from "react-youtube"
import {useState } from "react"
import useVideo from "./useVideo"
import PlayIcon from '../assets/play.svg?react'
import PauseIcon from '../assets/pause.svg?react'

import VolumeOn from '../assets/volume-on.svg?react'
import VolumeOff from '../assets/volume-off.svg?react'
import VideoActions from "./VideoActions"

export default function VideoPlayer({ id }: { id: string }) {
  const { player, pause, play, mute, unMute, ready, opts } = useVideo()

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  function togglePlaying() {
    setIsPlaying((prev) => !prev)

    if (isPlaying) {
      pause()
      return 
    }
    
    play()
  }

  function toggleVolume() {
    setIsMuted((prev) => !prev)

    if(isMuted) {
      unMute()
      return 
    }

    mute()
  }

  return (
    <div className="flex items-end mb-10 space-x-4">
      <section className="w-[20rem] relative">
        <nav className="p-4 pt-8 absolute bottom-0 w-full text-white bg-gradient-to-t from-black/70 to-transparent rounded-lg">
          <ul className="flex justify-between">
            <li>
              <button className="w-6 h-6" onClick={togglePlaying}>
                {isPlaying ? <PauseIcon/> : <PlayIcon />}
              </button>
            </li>
            <li>
              <button className="w-6 h-6" onClick={toggleVolume}>
                {isMuted ? <VolumeOff /> : <VolumeOn/>}
              </button>
            </li>
          </ul>
        </nav>
        {/* TODO: Customize the style of the player(iframe) */}
        <YouTube ref={player} videoId={id} onReady={ready} opts={opts} iframeClassName="video-wrapper"/>
      </section>
      <section>
        <VideoActions />  
      </section>
    </div>
  )
}