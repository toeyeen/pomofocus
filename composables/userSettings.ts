export type OldFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ColorMode = 'light' | 'dark' | 'system'


export interface pomodoroInterface {
  workDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,
}

export interface preferencesInterface {


}

export interface userSettingsInterface {
  fontSize: OldFontSize,
  colorScheme: ColorMode,
  language: string,
  pomodoroDuration: pomodoroInterface
}


const userPreference = ref<Partial<userSettingsInterface>>({
  pomodoroDuration: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  },
  fontSize: 'md',
  language: 'en',
})


const userSettings = () => {
  const storage = useLocalStorage('preference', userPreference)


  return {
    storage
  }
}

export default userSettings 
