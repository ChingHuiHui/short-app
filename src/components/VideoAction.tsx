import { ReactElement } from "react";

export default function VideoAction({ children, content, helper }: { children: ReactElement ,content?: string, helper?: string }) {
  return (
    <div className="relative group">
      <div className="flex justify-center">
        { children }
      </div>
      { content && <p className='text-center text-sm text-white pt-1'>{content}</p> }
      {
        helper && (
          <div className='pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-[calc(100%+0.5rem)] w-210 top-1/2 -translate-y-1/2 bg-gray-500/80 px-1 py-2 rounded'>
            <p className='text-xs text-white whitespace-nowrap'>{helper}</p>
          </div>
        )
      }
    </div>
  )
}