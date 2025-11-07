
export type TimerState = 'running' | 'paused' | 'stopped'
export type FocusState = 'focusMode' | 'shortBreak' | 'longBreak'
export type View = 'home' | 'primary'
export type AudioState = 'play' | 'pause'

export interface SoundScape {
  name: string
  iconName: string
  tracks: Tracks[] | any[]
}

export interface Tracks {
  uuid: string
  name: string
  iconName: number
  url: string
  volume?: number
}

export interface AudioManager {
  audio: (action: 'play' | 'pause') => void
  setTracks: (soundScape: SoundScape) => void
  audioState: Ref<AudioState>
  masterVolume: Ref<number>
}
