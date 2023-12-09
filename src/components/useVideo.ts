import { useRef } from 'react'
import type { YouTubeProps } from 'react-youtube'
import YouTube from 'react-youtube'

export default function useVideo() {
  const player = useRef<YouTube>(null)

  // TODO: store and change start time when change to another video.
  const opts: YouTubeProps['opts'] = {
    height: '580',
    width: '320',
    playerVars: { rel: 0, controls: 0, start: 0 },
  }

  async function ready() {
    console.log('THE VIDEO IS READY')
  }

  function play() {
    player.current?.internalPlayer.playVideo()
  }

  function pause() {
    player.current?.internalPlayer.pauseVideo()
  }

  // const currentTime = useRef<number>(0)
  // async function storeTime() {
  //   currentTime.current = await player.current?.internalPlayer.getCurrentTime()
  // }

  function mute() {
    player.current?.internalPlayer.mute()
  }

  function unMute() {
    player.current?.internalPlayer.unMute()
  }

  return { player, ready, play, pause, mute, unMute, opts }
}
