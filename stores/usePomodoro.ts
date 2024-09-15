import type { FocusState, TimerState } from "~/types";
import { useSounds } from '@/composables/useSounds'
import { set } from "@vueuse/core";



const sound = useSounds()

interface PomodoroSettings {
  time: {
    focusTime: number,
    shortBreak: number,
    longBreak: number
  },
  breakInterval: number,
  autoStart?: boolean
}

export const usePomodoroStore = defineStore('usePomodoro', () => {

  const percentage = ref(10)

  // const startTime = computed(() => storage.value.pomodoroDuration.workDuration || 1)
  const startTime = computed(() => settings.time.focusTime)
  const intervals = reactive({
    focusMode: 0,
    shortBreak: 0,
    count: 0
  })

  const settings = reactive<PomodoroSettings>({
    autoStart: true,
    time: {
      focusTime: 25,
      shortBreak: 5,
      longBreak: 15
    },
    breakInterval: 4
  })

  const initialTime = ref(0)
  const currentTime = ref(0)
  const timer = ref<ReturnType<typeof setInterval> | number | null>(null)
  const isRunning = ref(false)
  const timerState = ref<TimerState>('stopped')
  const focus = ref<FocusState>('focusMode')


  function addPad(value: number) {
    return value < 10 ? `0${value}` : value
  }


  const formatted = computed(() => {
    const hour = Math.floor(currentTime.value / 3600)
    const minute = Math.floor((currentTime.value % 3600) / 60)
    const seconds = (currentTime.value % 60)
    const percentage = (currentTime.value / initialTime.value) * 100

    return {
      time: hour > 0 ? addPad(hour) + ':' + addPad(minute) + ':' + addPad(seconds) : addPad(minute) + ':' + addPad(seconds),
      // hour,
      // minute,
      // seconds,
      percentage
    }

  })


  function setTime() {
    initialTime.value = startTime.value * 60
    currentTime.value = initialTime.value;
  }

  // watch(timerState, (newState, oldState) => {
  //   if (newState === 'stopped' && settings.autoStart && breakInterval.value === intervals.count && focus.value === 'shortBreak') {
  //     start();
  //     return;
  //   }
  // });

  function start() {
    if (!isRunning.value) {
      sound.start()
      timerState.value = 'running'
      timer.value = setInterval(() => {
        if (currentTime.value > 0 && timerState.value == 'running') {
          currentTime.value--;
        } else {
          autoChangeMode(settings.breakInterval)
          clearInterval(timer.value as number);
          timerState.value = 'stopped'
          sound.end()
        }
      }, 1000);
    }

  }

  function stop() {
    if (timerState.value == 'running') {
      timerState.value = 'stopped'
      clearInterval(timer.value as number);
      currentTime.value = initialTime.value;
    }

  }

  function reset() {
    stop()
    timerState.value = 'stopped'
    currentTime.value = initialTime.value;
  }

  function pause() {
    if (timerState.value === 'running') {
      clearInterval(timer.value as number); // Clear the interval to stop the timer
      timerState.value = 'paused'; // Update the timer state
    }
  }

  function resume() {
    if (!isRunning.value) {
      timer.value = setInterval(() => {
        timerState.value = 'running'
        if (currentTime.value > 0 && timerState.value == 'running') {
          currentTime.value--;
          isRunning.value = true;
        } else {
          clearInterval(timer.value as number);
          timerState.value = 'stopped'

        }
      }, 1000);
    }

  }

  function autoChangeMode(breakInterval: number) {
    if (focus.value === 'focusMode') {
      intervals.focusMode++;
      intervals.count++;
      if (intervals.focusMode % settings.breakInterval === 0) {
        focus.value = 'longBreak';
        // No need to reset intervals.focusMode here, as the cycle should continue
      } else {
        focus.value = 'shortBreak';
      }
    } else if (focus.value === 'shortBreak') {
      intervals.shortBreak++;
      focus.value = 'focusMode';
    } else if (focus.value === 'longBreak') {
      // Reset the cycle after long break
      focus.value = 'focusMode';
      // resetIntervalCount()
    }
  }


  function resetIntervalCount() {
    intervals.focusMode = 0
    intervals.shortBreak = 0
    intervals.count = 0
    focus.value = 'focusMode'
  }



  function controls() {
    return {
      start,
      stop,
      reset,
      pause,
      resume,
    }
  }

  function options() {
    return {
      formatted: formatted,
      timerState,
      currentTime: currentTime.value,
      initialTime: initialTime.value,
      percentage: percentage.value,
      focus,
    }
  }


  watch(formatted, () => {
    percentage.value = formatted.value.percentage
  })

  // watch(focus, (newFocus) => {
  //   const minutes = computed(() => newFocus === 'focusMode' ? settings.time.focusTime : newFocus === 'shortBreak' ? settings.time.shortBreak : settings.time.longBreak)

  //   initialTime.value = minutes.value * 60
  //   currentTime.value = initialTime.value;

  //   stop()
  // });

  watch(([() => settings.time, () => settings.breakInterval, focus]),
    ([newSettings, newMasterVolume, newFocus]) => {

      const minutes = computed(() => newFocus === 'focusMode' ? settings.time.focusTime ?? 25 : newFocus === 'shortBreak' ? settings.time.shortBreak ?? 5 : settings.time.longBreak ?? 15)

      initialTime.value = minutes.value * 60
      currentTime.value = initialTime.value;

      stop()

    }
    ,
    { deep: true }
  );

  onMounted(() => {
    setTime()
  })


  onUnmounted(() => {
    clearInterval(timer.value as number)
  })


  return {
    controls,
    percentage,
    options,
    intervals,
    resetIntervalCount,
    settings,
  }
})


