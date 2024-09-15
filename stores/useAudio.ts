import type { AudioState, SoundScape } from "~/types";

export const useAudioStore = defineStore('useAudio', () => {
  const audioState = ref<AudioState>('pause');
  const masterVolume = ref(50)
  const currentSound = ref<SoundScape | null>(null)
  let audioElements = ref<HTMLAudioElement[]>([]);


  function setAudio(sound: SoundScape | null) {
    currentSound.value = sound
  }

  const getAudio = computed(() => currentSound.value)

  function play() {
    audioElements.value.forEach(audio => audio.play())
    audioState.value = 'play'
  }

  function pause() {
    audioElements.value.forEach(audio => audio.pause())
    audioState.value = 'pause'

  }


  function stop() {
    audioElements.value.forEach(audio => audio.pause())
    audioElements.value.forEach(audio => audio.currentTime = 0)
    audioState.value = 'pause'
  }

  function setTracks(currentSound: SoundScape | null) {
    // if (storeSound.getSoundScape && currentSound.name === storeSound.getSoundScape.name)
    //   return

    // storeSound.setSoundScape(currentSound)
    // // Stop all previous audio elements

    setAudio(currentSound)
    if (currentSound === null) return;
    audioElements.value.forEach(audio => audio.pause());
    // Create audio elements for each track
    audioElements.value = currentSound.tracks.map(track => {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.volume = masterVolume.value / 100;
      return audio;
    });

  }

  function updateVolumes() {
    if (!currentSound.value) return
    audioElements.value.forEach((audio, index) => {
      const track = currentSound.value!.tracks[index]
      audio.volume = ((track.volume ?? 100) / 100) * (masterVolume.value / 100)
    })
  }

  function setMasterVolume(volume: number) {
    masterVolume.value = volume
    updateVolumes();
  }

  function setTrackVolume(trackUuid: string, volume: number) {
    if (!currentSound.value) return
    const trackIndex = currentSound.value.tracks.findIndex(t => t.uuid === trackUuid)
    if (trackIndex !== -1) {
      currentSound.value.tracks[trackIndex].volume = volume
      updateVolumes()
    }
  }



  function audio() {
    return {
      play,
      pause,
      stop
    }
  }

  return {
    audioState,
    setTracks,
    play,
    pause,
    masterVolume,
    getAudio,
    audio,
    setMasterVolume,
    setTrackVolume,
    updateVolumes
  }


});
