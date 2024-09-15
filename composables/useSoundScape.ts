import type { SoundScape } from "~/types"

interface Options {
  defaultVolume?: number
}

const defaultVolume = 50

const currentSound = ref<SoundScape | null>(null);


export function useSoundScape(refElement: Ref<HTMLAudioElement | HTMLAudioElement[] | null>, options?: Options) {

  const volume = ref(defaultVolume)


  function setSoundScape(sound: SoundScape) {
    currentSound.value = sound
  }

  const getSoundScape = computed(() => currentSound.value)

  return {
    setSoundScape, getSoundScape
  }


}
