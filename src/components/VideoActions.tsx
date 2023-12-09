import ThumbUpIcon from '../assets/thumb-up.svg?react'
import ThumbDownIcon from '../assets/thumb-down.svg?react'
import MessageIcon from '../assets/message.svg?react'
import ShareIcon from '../assets/share.svg?react'
import MoreIcon from '../assets/more.svg?react'

// TODO: modify action's content for different video
const ACTIONS = [
  {
    name: 'thumbs-up',
    helper: '我喜歡',
    content: '1000',
    icon: <ThumbUpIcon />
  },
  {
    name: 'thumbs-down',
    helper: '我不喜歡',
    content: '不喜歡',
    icon: <ThumbDownIcon />
  },
  { 
    name: 'message',
    helper: '留言',
    content: '20',
    icon: <MessageIcon />
  },
  {
    name: 'share',
    helper: '分享',
    content: '分享',
    icon: <ShareIcon />
  },
  {
    name: 'more',
    helper: '',
    content: '',
    icon: <MoreIcon />
  },
]


export default function VideoActions() {
  return (
    <section>
      <nav>
        <ul className='space-y-4'>
          {
            ACTIONS.map((action) => (
              <li className='relative group'>
                <button className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-500 w-12 h-12 rounded-full">
                  <div className='w-6 h-6'>{action.icon}</div>
                </button>
                { action.content && <p className='text-center text-sm text-white pt-1'>{action.content}</p> }
                {
                  action.helper && (
                    <div className='pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-[calc(100%+0.5rem)] w-210 top-1/2 -translate-y-1/2 bg-gray-500/80 px-1 py-2 rounded'>
                      <p className='text-xs text-white whitespace-nowrap'>{action.helper}</p>
                     </div>
                  )
                }
              </li>
            ))
          }
        </ul>
      </nav>
    </section>
  )
}