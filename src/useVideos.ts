import useSWR from 'swr'
import { useState, useMemo } from 'react'
import { useVideosStore } from './stores/useVideosStore'
import { useSearchParams } from 'react-router-dom'

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

  const [searchParams, setSearchParams] = useSearchParams()
  const activeId = useMemo(() => searchParams.get('id'), [searchParams])
  function setActiveId(id: string) {
    setSearchParams({ id })
  }

  return { displayVideos, load, activeId, setActiveId }
}
