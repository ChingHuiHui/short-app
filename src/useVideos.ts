import useSWR from 'swr'
import { useState, useMemo } from 'react'
import { useVideosStore } from './stores/useVideosStore'

export function useVideos() {
  const fetcher = useVideosStore((state) => state.fetch)
  useSWR('/videos', fetcher, { suspense: true })

  const videos = useVideosStore((state) => state.videos)

  const [loadMore, setLoadMore] = useState(0)
  const LOAD_MORE_PER_TIME = 10

  const displayVideos = useMemo(() => {
    return videos.slice(0, loadMore + LOAD_MORE_PER_TIME / 2)
  }, [videos, loadMore])

  const load = () => {
    setLoadMore((prev) => {
      return prev + LOAD_MORE_PER_TIME
    })
  }

  const activeId = useVideosStore((state) => state.activeId)
  const changeActiveVideo = useVideosStore((state) => state.changeActiveVideo)

  return { displayVideos, load, activeId, changeActiveVideo }
}
