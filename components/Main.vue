<script setup lang="ts">

import type { TimerState, FocusState } from '~/types'
import userSettings from '~/composables/userSettings'


const { storage } = userSettings()


// const storageState = useStorage('preference')
const toyin = storage

const percentage = ref(10)

// const startTime = computed(() => storage.value.pomodoroDuration.workDuration || 1)
const startTime = computed(() => 1)


const initialTime = ref(0),
  minutes = ref(5),
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
<template>

  <div class="border h-full border-green-600 bg-red-400">
    <div>
      <button @click="focus = 'focusMode'">Focus</button>
      <button @click="focus = 'shortBreak'">Short</button>
      <button @click="focus = 'longBreak'">Long</button>
    </div>

    <div>

      <div id="focus" v-if="focus == 'focusMode'" class="h-full mb-[99px] flex justify-center text-center items-center">
        <div class="">
          <!-- <p class="text-[80px] ">

            {{ formatted.time }}
          </p> -->
          <!-- 
          <svg view-box="500px">
            <circle cx="50" cy="50" r="50"></circle>
          </svg> -->

          <!-- 
          <div class="speedometer">
            <div class="speedometer__needle"></div>
            <div class="speedometer__loading"></div>
          </div> -->


          <!-- <input v-show="toyin" v-model="toyin.pomodoroDuration?.workDuration" type="text"> -->

          <button @click="resetTimer"> Reset </button>
          <button @click="startTimer" v-if="timerState == 'stopped'"> Start </button>
          <button @click="pauseTimer" v-if="timerState == 'running'"> Pause </button>
          <button @click="resumeTimer" v-if="timerState == 'paused'"> Resume </button>
          <button @click="stopTimer"> Stop </button>


          <button @click="changeMe"> Please chang em

          </button>

          <Speedometer :percentage="percentage" :title="formatted.time" />

        </div>
      </div>
    </div>



    <div id="short-break" v-if="focus == 'shortBreak'">
      Short Break
    </div>

    <div id="long-break" v-if="focus == 'longBreak'">
      Long break
    </div>

  </div>


</template>

<style>
.speedometer {
  width: 600px;
  height: 600px;
  background: #e7e7e7;
  border-radius: 500px 500px 500px 500px;
  position: relative;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.09), 0 0 35px 5px rgba(255, 255, 255, 0.29);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 75%);



}

.speedometer::after {
  content: '';
  position: absolute;
  background: blue;
  height: 20px;
  width: 100%;
  border-radius: 100%;
}

.speedometer__needle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  left: 50%;
  bottom: 25%;
}

.speedometer__loading {
  width: 600px;
  height: 600px;
  background: transparent;
  border-radius: 500px 500px 500px 500px;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 75%);

}
</style>
