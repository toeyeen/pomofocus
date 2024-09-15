<template>
  <div class="text-gray-500">
    <div>
      <!-- First Header -->
      <div v-show="currentView == 'home'">
        <div class="flex justify-between py-4 px-1.5">
          <div class="flex items-center" @click="changeView('primary')">
            <UIcon name="ph:soundcloud-logo-light" class="text-2xl mr-2 text-black" />
            <span class="text-black"> SoundScapes </span>
          </div>


          <div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200">
            <UPopover>
              <UIcon name="mdi:dots-horizontal" class="text-2xl text-gray-500 center" />
              <template #panel>
                <div class="p-4 text-black bg-gray-100 h-12 w-40">
                  <ul>
                    <li class="mb-2">What is this?</li>
                    <li>Feedback</li>
                  </ul>
                </div>
              </template>
            </UPopover>

          </div>

        </div>
        <div>
          <ul class="grid grid-cols-3 gap-4 mt-8">
            <div @click="handleSoundClick(sound)" v-for="sound in soundsGroup"
              class="flex flex-col items-center text-gray-500 cursor-pointer">
              <UIcon :name="sound.iconName" dynamic class="text-3xl fill-current" />
              <small> {{ sound.name }} </small>
            </div>
          </ul>
        </div>
      </div>

      <!-- Second Header -->
      <div v-show="currentView == 'primary'">
        <div class="flex items-center text-gray bg-gray-100 w-full py-4 px-1.5 rounded-lg">
          <div class="flex-1 inline-flex items-center">
            <UIcon @click="changeView('home')" class="pr-3" name="i-ph-caret-left-bold" dynamic />

            <span class="px-1"> {{ getAudio?.name }} </span>
            <UIcon :name="getAudio?.iconName ?? ''" class="text-2xl" dynamic />
          </div>
          <div class="flex items-center justify-end w-full">
            <div class="mr-2">
              <audio :data-name="track.uuid" v-for="track in getAudio?.tracks" loop ref="audioPlayerRef"
                :src="track.url"></audio>

              <div v-if="audioState == 'pause'" @click="audioStore.audio().play()"
                class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                <UIcon name="i-ph-play-fill" class="bg-blue-500 " dynamic />
              </div>


              <div v-if="audioState == 'play'" @click="audioStore.audio().pause()"
                class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                <UIcon name="i-ph-pause-fill" class="bg-blue-500 " dynamic />
              </div>
            </div>
            <span class="w-16">
              <URange size="xs" color="blue" v-model="masterVolume" />
            </span>
          </div>
        </div>
        <div>
          <ul class="grid grid-cols-3 gap-4 mt-8">
            <div v-for=" track in getAudio?.tracks"
              class="flex flex-col items-center text-center text-gray-500 cursor-pointer">
              <UIcon :name="track.iconName" dynamic class="text-xl fill-current" />

              <span class="w-16">
                <URange size="2xs" color="red" v-model="track.volume" />
                {{ track.volume }}
              </span>
            </div>
            <p>
            </p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

const links = [
  { name: 'What is this?', to: 'https://momentumdash.com/contact' },
  { name: 'Feedback', to: 'https://get.momentumdash.help/hc/en-us/articles/4405655736215-Soundscapes' },
]

import { useAudioStore } from '@/stores/useAudio.ts'
import { storeToRefs } from 'pinia'
import type { SoundScape, Tracks, View } from '~/types';
import { soundsGroup } from '~/data';

const audioStore = useAudioStore()

const { audioState, masterVolume, getAudio } = storeToRefs(audioStore)

const emits = defineEmits(['update-view', 'audio-state']);
const props = defineProps<{ currentView: View }>()


function handleSoundClick(soundScape: SoundScape) {
  audioStore.setTracks(soundScape)
  audioStore.audio().play()
  changeView('primary')
}

function changeView(newView: View) {

  emits('update-view', newView)
  if (newView === 'home') {
    // audioStore.audioState = 'pause'
    audioStore.audio().stop()
    audioStore.setTracks(null);
    emits('audio-state', 'pause')
  }
  if (newView === 'primary') {
    audioState.value = 'play'
    emits('audio-state', 'play')
  }

}

watch(
  [masterVolume, getAudio],
  () => {
    audioStore.updateVolumes()
  },
  { deep: true }
)



</script>

<style scoped></style>
