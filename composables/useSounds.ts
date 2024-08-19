export function useSounds() {
  const start = (path = 'sounds/start.mp3') => {
    const audio = new Audio(path)
    audio.play()
  }

  const end = (path = 'sounds/end.mp3') => {
    const audio = new Audio(path)
    audio.play()
  }



  return {
    start,
    end
  }


}
