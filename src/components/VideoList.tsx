import { useEffect, useMemo, useRef} from 'react'
import { useVideos } from '../hooks/useVideos'
import VideoPlayer from './VideoPlayer'
import { Direction } from '../type.ts'
import VideosControls from './VideosControls'

export default function VideoList() {
  const { activeId, setActiveId, displayVideos, load, videos, videoIndexDir } = useVideos()

  const list = useRef<{[key: string]: HTMLDivElement}>({})

  useEffect(() => {
    const options =  {
      rootMargin: "0px",
      threshold: 0.75
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(!entry.isIntersecting) return

          const id = (entry.target as HTMLDivElement).dataset.id as string

          setActiveId(id)
        });
    }, options);

    Object.entries(list.current).forEach(([, section]) => {
      observer.observe(section);
    });


    return () => {
      observer && observer.disconnect()
    }
  }, [displayVideos])

  const loadMoreTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadObserver = new IntersectionObserver(
      (entries) => {
        if(!entries[0].isIntersecting) return
          
        load()
      },      
    )

    loadObserver.observe(loadMoreTarget.current as HTMLDivElement)

    return () => {
      loadObserver && loadObserver.disconnect()
    }
  }, [])


  const currIndex = useMemo(() => videoIndexDir[activeId], [videoIndexDir, activeId])

  function scrollTo(direction: Direction) {
    if(!currIndex && currIndex !== 0) return

    const targetIndex = direction === Direction.PREV ? currIndex - 1 : currIndex + 1    
    const targetId = videos[targetIndex]?.videoId
    const target = list.current[targetId]

    if(!target) return
    
    target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main> 
      <VideosControls
        scrollTo={scrollTo} 
        isLast={currIndex === videos.length -1 } 
        isFirst={currIndex === 0}
      />
      {
        displayVideos.map((short) => (
          <section key={short.videoId} className="section">
            <div 
              ref={ref => list.current[short.videoId] = ref as HTMLDivElement} 
              data-id={short.videoId}>
                <VideoPlayer 
                  thumbnail={short.thumbnails[0].url} 
                  id={short.videoId} 
                  isActive={activeId === short.videoId}
                  title={short.title}
                /> 
            </div>
          </section>
      ))}
      <div ref={loadMoreTarget} className='h-10'></div>
    </main>
  )
}
