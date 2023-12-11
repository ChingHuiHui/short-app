## HOW TO OPEN?

1. git clone
2. cd ~/short-app
3. yarn && yarn dev

## FEATURES

> Create YouTube Short Page (**DESKTOP WEBSITE**) using **React**

- Video List
  - [x] Fetch all shorts from [「THE FIRST TAKE」](https://www.youtube.com/@The_FirstTake) channel
  - [x] Load More (Infinite Scrolling)
  - Scroll and change active video
    - [x] One swing scroll one section.
    - [x] Play next video and pause current one
- Short(video)

  - [x] Basic layout
  - [x] Sidebar for action buttons
  - player
    - [x] Play / Pause
    - [x] Mute / UnMute
    - [x] Loop
    - [x] Store / Resume the current time

- Deployment

  - [ ] deploy the website

- FIXME

  - [x] When touch the target element will load multi times.
    - Remember to disconnect the observer on cleanup
    - Forgot to set empty array on useEffect
  - [x] Video stored current time, when back to the video and done playing, the video will play from the current time not from the beginning

- TODO(FUTURE)
  - [x] light / dark mode (NOW: only dark mode)
  - [x] Error handling (e.g. video is not available)
  - [ ] Get real content for each action of video.
  - [ ] Customize the video player (remove the default info)
  - [ ] Enter id query on url can access the video directly.
  - [ ] User can search different short list of different channel.

## TOOLS

- [React](https://github.com/facebook/react) + [TypeScript](https://github.com/microsoft/TypeScript)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) css library
- [react-player](https://github.com/CookPete/react-player) for YouTube Player
- [zustand](https://github.com/pmndrs/zustand) for state management
- [react-router](https://github.com/remix-run/react-router) for get/set url params
