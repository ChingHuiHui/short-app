import ArrowUpIcon from '../assets/arrow-up.svg?react'
import ArrowDownIcon from '../assets/arrow-down.svg?react'
import { Direction } from '../type.d.ts'

export default function VideosControls({ scrollTo }: { scrollTo: (direction: Direction) => void}) {
  return (
    <section className='fixed top-0 bottom-0 right-0 flex flex-col justify-between px-4 py-2'>
        <button className="rounded-btn lg-btn" onClick={() => scrollTo(Direction.PREV)}>
          <ArrowUpIcon />
        </button>
        <button className="rounded-btn lg-btn" onClick={() => scrollTo(Direction.NEXT)}>
          <ArrowDownIcon />
        </button>
      </section>
  )
}