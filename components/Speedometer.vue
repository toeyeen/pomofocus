<template>
  <!-- <UButton @click="pomodoroStore.resetIntervalCount"> Reset </UButton>
  <UInput v-model.number="pomodoroStore.settings.time.focusTime" placeholder="Focus time" />
  <UInput v-model.number="pomodoroStore.settings.time.shortBreak" placeholder="Short Break" />
  <UInput v-model.number="pomodoroStore.settings.time.longBreak" placeholder="Long Break" /> -->
  <div class="progress-container">
    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" ref="progressContainer" :percentage="percentage">
      <path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke-linecap="round" stroke="#c3c3c3" stroke-width="3" fill-opacity="10%"
        class="ant-progress-circle-trail"
        style="stroke-dasharray: 220.31px, 295.31px;stroke-dashoffset: -37.5px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s;">
      </path>
      <path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke="white" stroke-linecap="round" stroke-width="3" opacity="1" fill-opacity="0"
        class="ant-progress-circle-path"></path>

    </svg>

    <div class="text">
      <div class="flex justify-center">
        <button
          :class="[activeMode.value == 'focusMode' ? 'text-white font-extraboldbold' : 'text-gray-100 font-light']"
          class="focus  text-xl mx-8 " @click="changeMode('focusMode')">Focus</button>
        <button :class="[activeMode.value == 'shortBreak' ? 'text-white' : 'text-gray-200 font-medium']"
          class="break text-xl mx-2 " @click="changeMode('shortBreak')">Short Break</button>
        <button :class="[activeMode.value == 'longBreak' ? 'text-white' : 'text-gray-200 font-medium']"
          class="break font-light text-xl mx-8 " @click="changeMode('longBreak')">Long Break</button>

      </div>

      <div class="flex flex-col gap-y-4 text-white">

        <div class="border flex items-center justify-center">
          <!-- <div class="flex-grow"></div> -->
          <div class=" text-8xl mr-4 text-center justify-center flex items-center">{{ options.formatted?.value.time }}
          </div>
          <div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 relative">
            <UPopover :popper="{ arrow: true, scroll: true }">
              <UIcon name="mdi:dots-horizontal" class="text-2xl text-gray-500 center" />
              <template #panel>
                <div class="p-2 text-black bg-gray-100 h-full w-40">
                  <ul>
                    <li>Feedback</li>
                    <li>Feedback</li>
                    <UDivider />
                    <li class="mb-2">Focus</li>
                    <li class="mb-2">Short Break</li>
                    <li class="mb-2">Long Break</li>
                    <UDivider />
                    <li class="mb-2">Play Sound</li>
                    <li class="mb-2">Play Sound</li>
                    <li class="mb-2">Play Sound</li>
                    <li class="mb-2">Play Sound</li>

                  </ul>
                </div>
              </template>
            </UPopover>
          </div>

        </div>


        <p class="text-2xl"> Time {{ options.focus.value == 'focusMode' ? 'to focus' : 'for a break' }}</p>
        <div class="flex gap-3 justify-center ">
          <UButton v-if="options.timerState.value == 'stopped' || options.timerState.value == 'paused'"
            @click="controls.start" icon="i-carbon-play" variant="outline" :ui="{ rounded: 'rounded-full' }" size="xl"
            color="white"></UButton>

          <UButton v-if="options.timerState.value == 'running'" @click="controls.pause" icon="i-carbon-pause"
            variant="outline" :ui="{ rounded: 'rounded-full' }" size="xl" color="white"></UButton>
          <UButton @click="controls.reset" icon="i-carbon-stop" variant="outline" :ui="{ rounded: 'rounded-full' }"
            size="xl" color="white"></UButton>
        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

import { addStyles } from '../utils/utils.ts'
import type { FocusState, TimerState } from '~/types'

const pomodoroStore = usePomodoroStore()

const { intervals } = storeToRefs(pomodoroStore);


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
    timerState: Ref<TimerState>,
    focus: Ref<FocusState>,
    currentTime?: number,
    initialTime?: number,
    percentage?: number
    formatted?: ComputedRef<{ time: string, percentage: number }>
  },
  percentage?: number
}

const props = defineProps<SpeedometerProps>()

const progressContainer = ref<HTMLDivElement | null>(null)

watch(() => props.percentage, () => {
  setPercentage()
})


function setPercentage() {

  const totalDash = 220.31, totalGap = 295.31, dashOffest = -37.5

  const speedometerStyle = {
    strokeDasharray: `${totalDash - ((props.percentage ?? 0) / 100) * totalDash}px, ${totalGap}px`,
    strokeDashoffset: `${dashOffest}px`,
    transition:
      "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s"
  }

  if (progressContainer.value) {
    addStyles(progressContainer.value.children[1] as HTMLDivElement, speedometerStyle)
  }

}


function changeMode(state: FocusState) {
  props.options.focus.value = state
}

const activeMode = computed(() => props.options.focus)

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
