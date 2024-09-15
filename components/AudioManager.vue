<!-- <script setup lang="ts">
import type { AudioState, SoundScape } from '../types/index.ts'
import { useSoundScapeStore } from '../stores/useSoundScape.ts'
import { AudioKey } from '@/symbols'

const storeSound = useSoundScapeStore()
const audioState = ref<AudioState>('pause')
const audioElements = ref<HTMLAudioElement[]>([])
const masterVolume = ref(50)

function audio(action: 'play' | 'pause') {
  audioElements.value.forEach(audio => {
    audio[action]()
  })
  audioState.value = action
}

function setTracks(soundScape: SoundScape) {

  if (storeSound.getSoundScape && soundScape.name === storeSound.getSoundScape.name)
    return

  storeSound.setSoundScape(soundScape)
  // Stop all previous audio elements
  audioElements.value.forEach(audio => audio.pause())

  // Create new audio elements
  audioElements.value = soundScape.tracks.map(track => {
    const audio = new Audio(track.url)
    audio.loop = true
    audio.volume = (track.volume / 100) * (masterVolume.value / 100)
    return audio
  })
}

watch([() => storeSound.getSoundScape?.tracks, masterVolume],
  ([newTracks, newMasterVolume]) => {
    if (!newTracks) return
    audioElements.value.forEach((audio, index) => {
      const track = newTracks[index]
      if (track) {
        audio.volume = (track.volume / 100) * (newMasterVolume / 100)
      }
    })
  },
  { deep: true }
)




provide(AudioKey, {
  audio,
  setTracks,
  audioState,
  masterVolume,
})
</script>

<template>
</template> -->



<template>
  <!-- No render in this component -->
</template>



<script setup lang="ts">

import type { AudioState, SoundScape, View } from '../types/index.ts'
import { useSoundScapeStore } from '../stores/useSoundScape.ts';
import { AudioKey } from '@/symbols'
import { provide } from 'vue';

const storeSound = useSoundScapeStore();
const audioState = ref<AudioState>('pause');
const audioPlayerRef = ref<HTMLAudioElement | HTMLAudioElement[] | null>(null)
const masterVolume = ref(50)

let audioElements = ref<HTMLAudioElement[]>([]);

const emits = defineEmits(['update-view', 'audio-state']);

//  Public methods
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


provide(AudioKey, {
  audio,
  setTracks,
  masterVolume,
  audioState,
})

provide('olu', 'Jolaoso')

// watchEffect(() => {
//   if (audioPlayerRef.value) audio('play');
// });






</script>

<style scoped></style>
