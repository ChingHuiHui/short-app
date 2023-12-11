import { useEffect, useRef} from 'react'
import { useVideos } from '../hooks/useVideos'
import VideoPlayer from './VideoPlayer'

export default function VideoList() {
  const { activeId, setActiveId, displayVideos, load } = useVideos()

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
    function observeLoadMoreTarget() {
      const loadObserver = new IntersectionObserver(
        (entries) => {
          if(!entries[0].isIntersecting) return
            
          load()
        },
        { threshold: 0.5 }
      )
  
      loadObserver.observe(loadMoreTarget.current as HTMLDivElement)
    }

    observeLoadMoreTarget()
  })

  return (
    <main> 
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
      {/* FIXME: load times */}
      <div ref={loadMoreTarget} className='bg-red-100 h-[100px]'></div>
    </main>
  )
}
