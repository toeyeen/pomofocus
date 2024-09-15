<template>
  <div>
    <div v-if="audioState == 'pause'" @click="audio().play()"
      class="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
      <UIcon name="i-ph-play-fill" class="bg-blue-500 h-3 w-3" dynamic />
    </div>


    <div v-if="audioState == 'play'" @click="audio().pause()"
      class="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
      <UIcon name="i-ph-pause-fill" class="bg-blue-500 h-3 w-3 " dynamic />
    </div>
  </div>
</template>

<script setup lang="ts">

import type { SoundScape, AudioState, } from "~/types"

const props = defineProps<{
  sounds: SoundScape[],
  audioState: AudioState,
  audio: () => {
    play: () => void,
    pause: () => void
  }
}>()



</script>

<style scoped></style>
