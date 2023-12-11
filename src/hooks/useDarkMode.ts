import { useEffect } from 'react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export default function useDarkMode() {
  useEffect(() => {
    if (
      localStorage.theme === Theme.DARK ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add(Theme.DARK)
      return
    }

    document.documentElement.classList.remove(Theme.DARK)
  }, [])
}
