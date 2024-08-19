
<template>
  <div class="progress-container" >

  <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none"  ref="progressContainer" :percentage="props.percentage" >
<path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke-linecap="round" stroke="#c3c3c3" stroke-width="3" fill-opacity="10%" class="ant-progress-circle-trail" style="stroke-dasharray: 220.31px, 295.31px;stroke-dashoffset: -37.5px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s;"></path>
   <path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke="white" stroke-linecap="round" stroke-width="3" opacity="1" fill-opacity="0" class="ant-progress-circle-path"></path>
   
  </svg>

  <div class="text">
    <div class="flex justify-center">
      <button :class="[activeMode == 'focusMode' ? 'text-white font-bold' : 'text-gray-100 font-light']" class="focus  text-xl mx-8 " @click="changeMode('focusMode')">Focus</button>
      <button :class="[activeMode == 'shortBreak' ? 'text-white' : 'text-gray-200 font-light']" class="break text-xl mx-8 " @click="changeMode('shortBreak')">Short Break</button>
      <button :class="[activeMode == 'longBreak' ? 'text-white' : 'text-gray-200 font-light']" class="break font-light text-xl mx-8 " @click="changeMode('longBreak')">Long Break</button>

    </div>

    <div class="flex flex-col gap-y-4 text-white">
      <p class="text-8xl ">{{ options.formatted.value.time }}</p>
      <p class="text-2xl"> Time  {{ options.focus.value == 'focusMode' ? 'to focus' : 'for a break' }}</p>
      <div class="flex gap-3 justify-center ">
        <UButton v-if="options.timerState.value == 'stopped' || options.timerState.value == 'paused' " @click="controls.start" icon="i-carbon-play" variant="outline" :ui="{ rounded: 'rounded-full' }" size="xl" color="white" ></UButton>
  
        <UButton v-if="options.timerState.value == 'running'"  @click="controls.pause" icon="i-carbon-pause" variant="outline" :ui="{ rounded: 'rounded-full' }" size="xl" color="white" ></UButton>
        <UButton  @click="controls.reset"  icon="i-carbon-stop" variant="outline" :ui="{ rounded: 'rounded-full' }" size="xl" color="white" ></UButton>
      </div>
    </div>


  </div>
</div>
</template>

<script lang="ts" setup>

import {addStyles} from '../utils/utils.ts'
import type { FocusState } from '~/types'


interface SpeedometerProps {
  
  // percentage?: number
  // Write the prop defintion for the controls prop
  controls: {
    start: () => void
    stop: () => void
    pause: () => void
    resume: () => void
    reset: () => void
  },
  options: {
  timerState: string,
  focus: string,
  currentTime: string,
  initialTime: string,
  percentage: number
  formatted: object
  },
  percentage: number
}

const props = defineProps<SpeedometerProps>()

const progressContainer = ref<HTMLDivElement | null>(null)

watch(() => props.percentage, () => {
  setPercentage()
})


function setPercentage() {

const totalDash = 220.31, totalGap = 295.31 ,dashOffest = -37.5

  const speedometerStyle = {
  strokeDasharray: `${totalDash - (props.percentage / 100) * totalDash}px, ${totalGap}px`,
  strokeDashoffset: `${dashOffest}px`,
  transition:
    "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s"
}


  addStyles(progressContainer.value.children[1] as HTMLDivElement, speedometerStyle)

}


function changeMode(state: FocusState) {
  props.options.focus.value = state
}

const activeMode = computed(() => props.options.focus.value)

onMounted(() => {
  setPercentage()
})


</script>


<style>
.progress-container {
  box-shadow: 0px 4px 5px rgb(0, 0, 0, .1);
}

.progress-container {
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


}

.progress-container svg {
  width: 280px;
  height: 280px;

  @media screen and (min-width: 510px) {
    width: 480px;
    height: 480px;
  }
  @media screen and (min-width: 640px) {
    width: 550px;
    height: 550px;
  }

  @media screen and (min-width: 768px) {
    width: 550px;
    height: 550px;
  }

}



/* .title {
  position: absolute;
  font-size: 100px;
} */

.text {
  position: absolute;
  width: 100%;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  text-align: center;
}

svg {
background: inherit;
}
</style>

