<template>
  <div class="inline-flex gap-3   ">
    <div class="text-white">
      <UIcon name="i-ph-brain" class="text-2xl" dynamic />
    </div>
    <div class="text-white">
      <UPopover :popper="{ arrow: true }">
        <UIcon name="i-ph-waveform" class="text-2xl" dynamic />
        <template #panel>
          <div class=" p-4">
            <SoundScape ref="soundScapeRef" class="w-80" @update-view="updateView" :current-view="currentView"
              @audio-state="updateState" />
          </div>
        </template>
      </UPopover>

    </div>

    {{ currentView }}


    <AudioScape :audio="audio" :sounds="soundsGroup" :audioState="currentAudioState" />

  </div>
</template>

<script setup lang="ts">
import { sounds, soundsGroup } from '../data/index.ts'
import type { AudioState, View } from '../types/index.ts'
import SoundScape from './SoundScape.vue';

const currentView = ref<View>('home');
const currentAudioState = ref<AudioState>('play');
const soundScapeRef = ref<InstanceType<typeof SoundScape> | null>(null);

function updateView(view: View) {
  currentView.value = view;
}

function updateState(state: AudioState) {
  currentAudioState.value = state;
}

function audio(state: AudioState) {
  if (state === 'play') {
    soundScapeRef.value?.audio('pause');
  } else {
    soundScapeRef.value?.audio('play');
  }
}


onMounted(() => {
})



</script>

<style scoped></style>
