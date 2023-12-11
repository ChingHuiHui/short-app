import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Short } from '../type'

interface VideosState {
  videos: Short[]
  videoIndexDir: Record<Short['videoId'], number>
  fetcher: () => Promise<Short[]>
}

const CHANNEL_ID = 'UC9zY_E8mcAo_Oq772LEZq8Q'
const URL = `https://yt.lemnoslife.com/channels?part=shorts&id=${CHANNEL_ID}`

export const useVideosStore = create<VideosState>()(
  devtools((set) => ({
    videos: [],
    videoIndexDir: {},
    fetcher: async () => {
      const data = await fetch(URL)
      const res = await data.json()

      const videos = (res?.items[0]?.shorts as Short[]).map((short: Short) => ({
        ...short,
        currentTime: 0,
      }))

      const videoIndexDir = videos.reduce(
        (acc, cur, index) => ({ ...acc, [cur.videoId]: index }),
        {}
      )

      set({
        videos,
        videoIndexDir,
      })

      return videos
    },
  }))
)
