<template>
  <div class="inline-flex gap-3   ">
    <div class="text-white">
      <p class="font-nanami">Header</p>
    </div>
    <div class="text-white">
      <UPopover :popper="{ arrow: true }">
        <UIcon :name="audioStore.getAudio ? audioStore.getAudio.iconName : 'ph:soundcloud-logo-light'"
          class="text-2xl font-light" dynamic />
        <template #panel>
          <div class=" p-4">
            <SoundScape class="w-80" @update-view="updateView" :current-view="currentView" />
          </div>
        </template>
      </UPopover>

    </div>

    <AudioScape v-if="audioStore.getAudio" :audio="audioStore.audio" :sounds="soundsGroup"
      :audioState="audioStore.audioState" />

  </div>
</template>

<script setup lang="ts">
import { soundsGroup } from '../data/index.ts'
import type { AudioState, View } from '../types/index.ts'

const currentView = ref<View>('home');
const currentAudioState = ref<AudioState>('pause');

const audioStore = useAudioStore();


function updateView(view: View) {
  currentView.value = view;
}



function updateState(state: AudioState) {
  currentAudioState.value = state;
}


// function audio(state: AudioState) {
//   if (state === 'play') {
//     audioManager?.audio('pause');
//   } else {
//     audioManager?.audio('play');
//   }
// }
// function audio(state: AudioState) {
//   if (state === 'play') {
//     soundScapeRef.value?.audio('pause');
//   } else {
//     soundScapeRef.value?.audio('play');
//   }
// }




</script>

<style scoped></style>
