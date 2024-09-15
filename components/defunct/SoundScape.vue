<!-- <template>
  <div>
    <div>
      <!- - First Header - ->
      <div v-show="currentView == 'home'">
        <div class="flex justify-between py-4 px-1.5">
          <div class="flex items-center" @click="changeView('primary')">
            <UIcon name="ph:soundcloud-logo-light" class="text-2xl mr-2 text-black" />
            <span class="text-black"> SoundScape </span>
          </div>

          <div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200">
            <UIcon name="mdi:dots-horizontal" class="text-2xl text-gray-500" />
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

      <!- - Second Header - ->
      <div v-show="currentView == 'primary'">
        <div class="flex items-center text-gray bg-gray-100 w-full py-4 px-1.5 rounded-lg">
          <div class="flex-1 inline-flex items-center">
            <UIcon @click="changeView('home')" class="pr-3" name="i-ph-caret-left-bold" dynamic />
            <span class="px-1"> {{ storeSound.getSoundScape?.name }} </span>
            <UIcon :name="storeSound.getSoundScape?.iconName ?? ''" class="text-2xl" dynamic />
          </div>
          <div class="flex items-center justify-end w-full">
            <div class="mr-2">
              <audio :data-name="track.uuid" v-for="track in storeSound.getSoundScape?.tracks" loop ref="audioPlayerRef"
                :src="track.url"></audio>

              <div v-if="audioState == 'pause'" @click="audio('play')"
                class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                <UIcon name="i-ph-play-fill" class="bg-blue-500 " dynamic />
              </div>


              <div v-if="audioState == 'play'" @click="audio('pause')"
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
            <div v-for=" track in storeSound.getSoundScape?.tracks"
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
</template> -->

<!-- <script setup lang="ts">

import type { AudioState, SoundScape, View } from '../types/index.ts'
import { soundsGroup } from '../data/index.ts'
import { useSoundScapeStore } from '../stores/useSoundScape.ts';
const storeSound = useSoundScapeStore();

const audioState = ref<AudioState>('pause');
const audioPlayerRef = ref<HTMLAudioElement | HTMLAudioElement[] | null>(null)
const masterVolume = ref(50)

let audioElements = ref<HTMLAudioElement[]>([]);
const emits = defineEmits(['update-view', 'audio-state']);
const props = defineProps<{ currentView: View }>()

//  Public functions
function changeView(newView: View) {

  emits('update-view', newView)
  if (newView === 'home') {
    audioState.value = 'pause'
    emits('audio-state', 'pause')
  }
  if (newView === 'primary') {
    audioState.value = 'play'
    emits('audio-state', 'play')
  }

}

function changeAudioState(action: AudioState) {
  if (action === 'play') {
    audioState.value = 'play'
    emits('audio-state', 'play')
  }
  else {
    audioState.value = 'pause'
    emits('audio-state', 'pause')

  }
}

function audio(action: 'play' | 'pause') {
  if (Array.isArray(audioPlayerRef.value)) {
    // If refElement is an array, iterate through each element
    audioPlayerRef.value.forEach((audio, idx) => {
      audio?.[action]()
    });

  } else if (audioPlayerRef.value instanceof HTMLAudioElement) {
    // If audioPlayerRef is a single element, directly apply the action
    audioPlayerRef.value?.[action]()

  }

  audioState.value = action
  changeAudioState(action)

}

function setTracks(currentSound: SoundScape) {
  if (storeSound.getSoundScape && currentSound.name === storeSound.getSoundScape.name)
    return

  storeSound.setSoundScape(currentSound)
  // Stop all previous audio elements
  audioElements.value.forEach(audio => audio.pause());
  // Create audio elements for each track
  audioElements.value = currentSound.tracks.map(track => {
    const audio = new Audio(track.url);
    return audio;
  });


}


function handleSoundClick(current: SoundScape) {
  // Otherwise, play the sound
  setTracks(current);
  audio('play');
  changeView('primary')
}


watch([() => storeSound.getSoundScape?.tracks, masterVolume],
  ([newTracks, newMasterVolume]) => {
    if (!newTracks || !audioPlayerRef.value) return;

    if (Array.isArray(audioPlayerRef.value)) {
      // Create a Map for quick lookup of audio elements by uuid
      const audioMap = new Map(
        audioPlayerRef.value.map(audio => [audio.dataset.name, audio])
      );



      newTracks.forEach(track => {
        const audio = audioMap.get(track.uuid);
        if (audio) {
          audio.volume = (track.volume / 100) * (newMasterVolume / 100);
        }

      });
    } else if (audioPlayerRef.value instanceof HTMLAudioElement) {
      audioPlayerRef.value.volume = newMasterVolume / 100;

    }
  },
  { deep: true }
);


watchEffect(() => {
  if (audioPlayerRef.value) audio('play');
});






</script> -->

<style scoped></style>



<template>
  <div>
    <div>
      <!- - First Header - ->
        <div v-show="currentView == 'home'">
          <div class="flex justify-between py-4 px-1.5">
            <div class="flex items-center" @click="changeView('primary')">
              <UIcon name="ph:soundcloud-logo-light" class="text-2xl mr-2 text-black" />
              <span class="text-black"> SoundScape </span>
            </div>

            <div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200">
              <UIcon name="mdi:dots-horizontal" class="text-2xl text-gray-500" />
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

        <!- - Second Header - ->
          <div v-show="currentView == 'primary'">
            <div class="flex items-center text-gray bg-gray-100 w-full py-4 px-1.5 rounded-lg">
              <div class="flex-1 inline-flex items-center">
                <UIcon @click="changeView('home')" class="pr-3" name="i-ph-caret-left-bold" dynamic />
                <span class="px-1"> {{ storeSound.getSoundScape?.name }} </span>
                <UIcon :name="storeSound.getSoundScape?.iconName ?? ''" class="text-2xl" dynamic />
              </div>
              <div class="flex items-center justify-end w-full">
                <div class="mr-2">
                  <audio :data-name="track.uuid" v-for="track in storeSound.getSoundScape?.tracks" loop
                    ref="audioPlayerRef" :src="track.url"></audio>

                  <div v-if="audioState.value == 'pause'" @click="audio('play')"
                    class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                    <UIcon name="i-ph-play-fill" class="bg-blue-500 " dynamic />
                  </div>


                  <div v-if="audioState.value == 'play'" @click="audio('pause')"
                    class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                    <UIcon name="i-ph-pause-fill" class="bg-blue-500 " dynamic />
                  </div>
                </div>
                <span class="w-16">
                  <URange size="xs" color="blue" v-model="masterVolume.value" />
                </span>
              </div>
            </div>
            <div>
              <ul class="grid grid-cols-3 gap-4 mt-8">
                <div v-for=" track in storeSound.getSoundScape?.tracks"
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

import type { AudioState, SoundScape, View } from '../../types/index.ts'
import { useSoundScapeStore } from '@/stores/useSoundScape';
import { AudioKey } from '@/symbols'
import { soundsGroup } from '@/data/index'

const storeSound = useSoundScapeStore();


const audioState = ref<AudioState>('pause');
const audioPlayerRef = ref<HTMLAudioElement | HTMLAudioElement[] | null>(null)
const masterVolume = ref(50)

let audioElements = ref<HTMLAudioElement[]>([]);
const emits = defineEmits(['update-view', 'audio-state']);
const props = defineProps<{ currentView: View }>()



//  Public functions
function changeView(newView: View) {

  emits('update-view', newView)
  if (newView === 'home') {
    audioState.value = 'pause'
    emits('audio-state', 'pause')
  }
  if (newView === 'primary') {
    emits('audio-state', 'play')
    audioState.value = 'pause'
  }

}

function changeAudioState(action: AudioState) {
  if (action === 'play') {

    audioState.value = 'play'
    emits('audio-state', 'play')
  }
  else {

    audioState.value = 'pause'
    emits('audio-state', 'pause')

  }
}




function handleSoundClick(current: SoundScape) {
  // Otherwise, play the sound
  setTracks(current);
  audio('play');
  changeView('primary')
}


watch([() => storeSound.getSoundScape?.tracks, masterVolume],
  ([newTracks, newMasterVolume]) => {
    if (!newTracks || !audioPlayerRef.value) return;

    if (Array.isArray(audioPlayerRef.value)) {
      // Create a Map for quick lookup of audio elements by uuid
      const audioMap = new Map(
        audioPlayerRef.value.map(audio => [audio.dataset.name, audio])
      );


      newTracks.forEach(track => {
        const audio = audioMap.get(track.uuid);
        if (audio) {
          audio.volume = (track.volume / 100) * (newMasterVolume / 100);
        }

      });
    } else if (audioPlayerRef.value instanceof HTMLAudioElement) {
      audioPlayerRef.value.volume = newMasterVolume / 100;

    }
  },
  { deep: true }
);


// watchEffect(() => {
//   if (audioPlayerRef.value) audio('play');
// });





</script>

<style scoped></style>
