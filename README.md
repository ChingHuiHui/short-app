## APP

Check the APP: [click here](https://chinghuihui.github.io/short-app/)

- Use GitHub Actions for deployment
- Deploy on GitHub Pages

FLOW：Loading (fetch videos) -> Click to start -> View video (Infinite Scrolling)

## HOW TO OPEN?

### Clone

1. git clone
2. cd ~/short-app
3. yarn && yarn dev
4. open http://localhost:5173/short-app/

### Docker

1. cd ~/short-app
2. docker build -t short-app .
3. docker run -p 5173:5173 short-app
4. open http://localhost:5173/short-app/

## FEATURES

> Create YouTube Short Page (**DESKTOP WEBSITE**) using **React**

- APP

  - [x] Fetch all shorts from [「THE FIRST TAKE」](https://www.youtube.com/@The_FirstTake) channel
  - [x] Loading Page
  - [x] Starting Page

- Video List

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

  - [x] deploy the website

- FIXME

  - [x] When touch the target element will load multi times.
    - Remember to disconnect the observer on cleanup
    - Forgot to set empty array on useEffect
  - [x] Video stored current time, when back to the video and done playing, the video will play from the current time not from the beginning
  - [ ] Autoplay on mobile need to mute the video

- TODO(FUTURE)
  - [x] light / dark mode (NOW: only dark mode)
  - [x] Error handling (e.g. video is not available)
  - [x] Controls for changing video (prev/next)
  - [ ] Responsive. (for mobile)
  - [ ] Get real content for each action of video.
  - [ ] Customize the video player (remove the default info)
  - [ ] Enter id query on url can access the video directly
  - [ ] User can search different short list of different channel

## TOOLS

- [React](https://github.com/facebook/react) + [TypeScript](https://github.com/microsoft/TypeScript)
- [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) css library
- [react-player](https://github.com/CookPete/react-player) for YouTube Player
- [zustand](https://github.com/pmndrs/zustand) for state management
- [react-router](https://github.com/remix-run/react-router) for get/set url params
