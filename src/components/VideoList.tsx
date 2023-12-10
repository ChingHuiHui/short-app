import { useEffect, useRef} from 'react'
import { useVideos } from '../useVideos'
import VideoPlayer from './VideoPlayer'

export default function VideoList() {
  const { activeId, setActiveId, displayVideos, load } = useVideos()

  const list = useRef<{[key: string]: HTMLDivElement}>({})
  useEffect(() => {
    function observeActiveVideo() {
      const options =  {
        rootMargin: "0px",
        threshold: 0.75
      }
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if(!entry.isIntersecting) return
  
            const id = (entry.target as HTMLDivElement).dataset.id as string

            changeActiveVideo(id)
          });
      }, options);
  
      Object.entries(list.current).forEach(([, section]) => {
        observer.observe(section);
      });
    }

    observeActiveVideo()
  }, [displayVideos])

  const loadMoreTarget = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function observeLoadMoreTarget() {
      const loadObserver = new IntersectionObserver(
        (entries) => {
          if(!entries[0].isIntersecting) return
  
          // FIXME: load too many times
          load()
        },
        {
          rootMargin: "0px",
          threshold: 0.75
        }
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
              /> 
              {short.videoId}
            </div>
          </section>
      ))}
          ))
        }
        <div ref={loadMoreTarget} className='h-[10rem] bg-black'></div>
      </main>
    </main>
  )
}
