import ThumbUpIcon from '../assets/thumb-up.svg?react'
import ThumbDownIcon from '../assets/thumb-down.svg?react'
import MessageIcon from '../assets/message.svg?react'
import ShareIcon from '../assets/share.svg?react'
import MoreIcon from '../assets/more.svg?react'
import VideoAction from './VideoAction'

// FUTURE: Modify real content for each action
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

export default function VideoActions({title}: {title: string}) {
  return (
    <section>
      <nav>
        <ul className='space-y-4'>
          {
            ACTIONS.map((action) => (
              <li key={action.name}>
                <VideoAction 
                  content={action.content} 
                  helper={action.helper}>
                  <button className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-500 w-12 h-12 rounded-full">
                    <div className='w-6 h-6'>{action.icon}</div>
                  </button>
                </VideoAction>
              </li>
            ))
          }
          <li>
            <VideoAction helper={title}>
              <button className='w-10 h-10 bg-gray-500 rounded-lg mx-auto'></button>
            </VideoAction>
          </li>
        </ul>
      </nav>
    </section>
  )
}