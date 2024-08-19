import type { TimerState, FocusState } from '~/types'
import { useSounds } from './useSounds'



const sound = useSounds()

export default function useControls() {

  const percentage = ref(10)

  // const startTime = computed(() => storage.value.pomodoroDuration.workDuration || 1)

  const focusTime = ref(0.02);
  const shortBreak = ref(0.05);
  const longBreak = ref(0.05);
  const startTime = computed(() => focusTime.value)
  const breakInterval = ref(4)
  const intervals = reactive({
    focusMode: 0,
    shortBreak: 0,
    count: 0
  })


  const initialTime = ref(0),
    currentTime = ref(0),
    timer = ref<ReturnType<typeof setInterval> | number | null>(null),
    isRunning = ref(false),
    timerState = ref<TimerState>('stopped'),
    focus = ref<FocusState>('focusMode')


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
      hour,
      minute,
      seconds,
      percentage
    }

  })

  watch(formatted, () => {
    percentage.value = formatted.value.percentage
  })

  watch(focus, (newFocus) => {
    const minutes = computed(() => newFocus === 'focusMode' ? focusTime.value : newFocus === 'shortBreak' ? shortBreak.value : longBreak.value)

    initialTime.value = minutes.value * 60
    currentTime.value = initialTime.value;

    stop()
  });

  function setTime() {
    initialTime.value = startTime.value * 60
    currentTime.value = initialTime.value;
  }



  function start() {

    if (!isRunning.value) {
      sound.start()
      timerState.value = 'running'
      timer.value = setInterval(() => {
        if (currentTime.value > 0 && timerState.value == 'running') {

          currentTime.value--;
        } else {

          autoChangeMode(breakInterval.value)

          clearInterval(timer.value);
          timerState.value = 'stopped'
          sound.end()


        }
      }, 1000);
    }

  }

  function stop() {
    if (timerState.value == 'running') {
      timerState.value = 'stopped'
      clearInterval(timer.value);
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
      clearInterval(timer.value); // Clear the interval to stop the timer
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
          clearInterval(timer.value);
          timerState.value = 'stopped'

        }
      }, 1000);
    }

  }

  // function autoChangeMode(breakInterval: number) {
  //   if (focus.value === 'focusMode' && intervals.focusMode % breakInterval !== 0) {
  //     intervals.focusMode++
  //     focus.value = 'shortBreak'

  //     if (intervals.focusMode % breakInterval === 0) {
  //       focus.value = 'longBreak'
  //       intervals.focusMode = 1
  //     }

  //   }
  //   else if (focus.value == 'shortBreak' && intervals.shortBreak % breakInterval !== 0) {
  //     intervals.shortBreak++
  //     focus.value = 'focusMode'
  //   } else if (focus.value == 'longBreak') {
  //     // intervals.longBreak++
  //     focus.value = 'focusMode'
  //     intervals.shortBreak = 1
  //     intervals.focusMode = 1
  //   }

  // }

  function autoChangeMode(breakInterval: number) {
    if (focus.value === 'focusMode') {
      intervals.focusMode++;
      intervals.count++;

      if (intervals.focusMode % breakInterval === 0) {
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
      intervals.focusMode = 0;
      intervals.shortBreak = 0;
      focus.value = 'focusMode';
    }
  }



  // function sound() {
  //   const audio = new Audio('https://az814671.vo.msecnd.net/blogimages/276f1472-734e-492c-9138-c1584fb6cd80');
  //   audio.play()

  //   // if (playAudio !== undefined) {

  //   //   console.log(playAudio, 'playAudio');
  //   //   playAudio.then(() => {
  //   //     console.log('play sound');

  //   //   }).catch((error) => console.log(error));
  //   // }

  // }


  onMounted(() => {
    setTime()
  })


  onUnmounted(() => {
    clearInterval(timer.value)
  })


  //  what is the general name for play, pause, stop, reset, resume
  // is it called controls or something else what is the something else can you c=help with that
  // I don't want to sue the word controls
  // I want to use a more meaningful word
  //  

  function controls() {
    return {
      start,
      stop,
      reset,
      pause,
      resume,
    }
  }


  return {
    controls() {
      return {
        start,
        stop,
        reset,
        pause,
        resume
      }
    },

    percentage,
    options: {
      formatted: formatted,
      timerState,
      currentTime,
      initialTime,
      percentage,
      focus,
    },
    intervals

  }

}
