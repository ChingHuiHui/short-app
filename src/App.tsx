import { useState, Suspense } from 'react'
import './App.css'
import VideoList from './components/VideoList'
import useDarkMode from './hooks/useDarkMode'

export default function App() {
  useDarkMode()

  const [start, setStart] = useState(false)
  
  return (
    <div>
      {
        start ?
          <Suspense fallback={<div className='flex justify-center items-center h-[100dvh]'>Loading...</div>}>
            <VideoList />
          </Suspense>
        : (
          <div className="fixed inset-0 dark:bg-black z-50 flex justify-center items-center">
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
