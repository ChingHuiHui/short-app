import {useState, Suspense } from 'react'
import './App.css'
import VideoList from './components/VideoList'


export default function App() {
  const [start, setStart] = useState(false)
  return (
    <div>
      {
        !start &&
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
          <button className='p-1 text-3xl hover:bg-white hover:text-black' onClick={() => setStart(true)}> VIEW THE SHORTS (CLICK ME)</button>
        </div>
      }
      <Suspense fallback={<div className='flex justify-center items-center h-[100dvh]'>Loading...</div>}>
        <VideoList />
      </Suspense>
    </div>
  )
}
