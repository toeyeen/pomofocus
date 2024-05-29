<template>
  <div class="border h-full border-green-600">

    <pre>
      STORAGE:
      {{ storage.pomodoroDuration?.workDuration }}

    </pre>
    {{ formatted.time }}
    <button @click="resetTimer"> Reset </button>
    <button @click="startTimer" v-if="timerState == 'stopped'"> Start </button>
    <button @click="pauseTimer" v-if="timerState == 'running'"> Pause </button>
    <button @click="resumeTimer" v-if="timerState == 'paused'"> Resume </button>
    <button @click="stopTimer"> Stop </button>
  </div>




</template>

<script setup lang="ts">

import type { TimerState } from '~/types'
import userSettings from '~/composables/userSettings'


const { storage } = userSettings()


// const storageState = useStorage('preference')




const initialTime = ref(0),
  minutes = ref(5),
  startTime = storage.pomodoroDuration?.workDuration || ref(25),
  currentTime = ref(0),
  timer = ref<ReturnType<typeof setInterval> | number | null>(null),
  isRunning = ref(false),
  timerState = ref<TimerState>('stopped')


function addPad(value: number) {
  return value < 10 ? `0${value}` : value
}


const formatted = computed(() => {
  const hour = Math.floor(currentTime.value / 3600)
  const minute = Math.floor((currentTime.value % 3600) / 60)
  const seconds = (currentTime.value % 60)

  return {
    time: addPad(hour) + ':' + addPad(minute) + ':' + addPad(seconds),
    hour,
    minute,
    seconds
  }

})

function setTime() {
  initialTime.value = startTime.value * 60
  currentTime.value = initialTime.value;
}



function startTimer() {
  if (!isRunning.value) {
    timerState.value = 'running'
    timer.value = setInterval(() => {

      if (currentTime.value > 0 && timerState.value == 'running') {
        currentTime.value--;
      } else {
        clearInterval(timer.value);
        timerState.value = 'stopped'
      }
    }, 1000);
  }

}

function stopTimer() {
  if (timerState.value == 'running') {
    timerState.value = 'stopped'
    clearInterval(timer.value);
    currentTime.value = initialTime.value;
  }

}
function resetTimer() {
  stopTimer()
  timerState.value = 'stopped'
  currentTime.value = initialTime.value;
}
function pauseTimer() {
  if (timerState.value === 'running') {
    clearInterval(timer.value); // Clear the interval to stop the timer
    timerState.value = 'paused'; // Update the timer state

  }
}

function resumeTimer() {
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



onMounted(() => {
  // startTimer()
  // const startTime = storage.pomodoroDuration?.workDuration || ref(1)
  setTime()
})


onUnmounted(() => {
  clearInterval(timer.value)
})


const time = computed(() => {
  const hour = Math.floor(currentTime.value / 3600)
  const minute = Math.floor((currentTime.value % 3600) / 60)
  const seconds = currentTime.value % 60

  return {
    hour,
    minute,
    seconds
  }
})

</script>

<style scoped></style>
