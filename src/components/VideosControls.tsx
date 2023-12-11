import ArrowUpIcon from '../assets/arrow-up.svg?react'
import ArrowDownIcon from '../assets/arrow-down.svg?react'
import { Direction } from '../type.ts'

interface VideosControlsProps {
  scrollTo: (direction: Direction) => void
  isFirst: boolean
  isLast: boolean
}

export default function VideosControls({ scrollTo, isFirst, isLast }: VideosControlsProps){
  return (
    <section className='fixed top-0 bottom-0 right-0 flex-col justify-between px-4 py-2 hidden md:flex'>
        <button 
          disabled={isFirst} 
          style={{ opacity: isFirst ? '0' : '100'}} 
          className="rounded-btn lg-btn opacity-0" 
          onClick={() => scrollTo(Direction.PREV)}
        >
          <ArrowUpIcon />
        </button>
        <button 
          disabled={isLast} 
          style={{ opacity: isLast ? '0' : '100'}} 
          className="rounded-btn lg-btn" 
          onClick={() => scrollTo(Direction.NEXT)}
        >
          <ArrowDownIcon />
        </button>
      </section>
  )
}