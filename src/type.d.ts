export type Short = {
  videoId: string
  title: string
  thumbnails: { url: string; width: string; height: string }[]
  string: string
  channelHandle: string
  channelId: string
  currentTime?: number
}

export enum Direction {
  PREV,
  NEXT,
}
