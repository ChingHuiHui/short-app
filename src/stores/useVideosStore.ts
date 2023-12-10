import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { Short } from '../type'

interface VideosState {
  videos: Short[]
  fetch: () => Promise<Short[]>
}

const CHANNEL_ID = 'UC9zY_E8mcAo_Oq772LEZq8Q'
const URL = `https://yt.lemnoslife.com/channels?part=shorts&id=${CHANNEL_ID}`

export const useVideosStore = create<VideosState>()(
  devtools(
    persist(
      (set) => ({
        videos: [],
        fetch: async () => {
          const data = await fetch(URL)
          const res = await data.json()

          const videos = (res?.items[0]?.shorts as Short[]).map(
            (short: Short) => ({
              ...short,
              currentTime: 0,
            })
          )

          set({
            videos,
          })

          return videos
        },
      }),
      {
        name: 'videos-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
