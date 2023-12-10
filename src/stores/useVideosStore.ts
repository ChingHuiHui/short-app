import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type { Short } from '../type'

interface VideosState {
  videos: Short[]
  videoViewedDict: Record<Short['videoId'], number>
  activeId: string
  fetch: () => Promise<Short[]>
  changeActiveVideo: (id: string) => void
  setActiveId: (id: string) => void
  changeIdQuery: (id: string) => void
  storeCurrentTime: (id: string, currentTime: number) => void
}

const CHANNEL_ID = 'UC9zY_E8mcAo_Oq772LEZq8Q'
const URL = `https://yt.lemnoslife.com/channels?part=shorts&id=${CHANNEL_ID}`

export const useVideosStore = create<VideosState>()(
  devtools(
    persist(
      (set, get) => ({
        activeId: '',
        videos: [],
        videoViewedDict: {},
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
            activeId: videos[0]?.videoId || '',
          })

          return videos
        },
        storeCurrentTime: (id: string, currentTime: number) => {
          const videoViewedDict = {
            ...get().videoViewedDict,
            [id]: currentTime,
          }

          set({
            videoViewedDict,
          })
        },
        changeActiveVideo: (id: string) => {
          get().setActiveId(id)
          get().changeIdQuery(id)
        },
        setActiveId: (id: string) => {
          set({ activeId: id })
        },
        changeIdQuery: (id: string) => {
          const searchParams = new URLSearchParams(window.location.search)
          searchParams.set('id', id)

          const newURL =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?' +
            searchParams.toString()

          window.history.pushState({ path: newURL }, '', newURL)
        },
      }),
      {
        name: 'videos-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
