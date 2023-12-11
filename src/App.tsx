import { useState } from 'react'
import './App.css'
import VideoList from './components/VideoList'
import useDarkMode from './hooks/useDarkMode'
import { useFetchVideos } from './hooks/useVideos'

export default function App() {
  useDarkMode()
  
  const { isLoading } = useFetchVideos()
  
  const [start, setStart] = useState(false)


  if(isLoading) {
    return <div className='full-screen-center'>Loading...</div>
  }
  

  return (
    <div>
      {
        start ?
          <VideoList />
        : (
          <div className="full-screen-center">
            <button 
              className='p-1 text-3xl hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white' 
              onClick={() => setStart(true)}> 
                VIEW THE SHORTS (CLICK ME)
              </button>
          </div>
        )
      }
    </div>
  )
}
