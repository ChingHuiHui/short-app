import { useState, useMemo } from 'react'
import { useVideosStore } from '../stores/useVideosStore'
import { useSearchParams } from 'react-router-dom'
import useSWR from 'swr'

const LOAD_MORE_PER_TIME = 5

export function useVideos() {
  const videos = useVideosStore((state) => state.videos)

  const [loadMore, setLoadMore] = useState(1)

  const displayVideos = useMemo(() => {
    return videos.slice(0, loadMore * LOAD_MORE_PER_TIME)
  }, [videos, loadMore])

  const load = () => {
    if (displayVideos.length === videos.length) return

    setLoadMore((prev) => {
      return prev + 1
    })
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const activeId = useMemo(() => searchParams.get('id'), [searchParams])
  function setActiveId(id: string) {
    setSearchParams({ id })
  }

  return { displayVideos, load, activeId, setActiveId, useFetchVideos, videos }
}

export function useFetchVideos() {
  const fetcher = useVideosStore((state) => state.fetcher)
  const { isLoading } = useSWR('/videos', fetcher)

  return { isLoading }
}
