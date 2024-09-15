import type { SoundScape } from "~/types";


export const useSoundScapeStore = defineStore("sounds", () => {
  const currentSound = ref<SoundScape | null>(null)
  const masterVolume = ref(50);

  function setSoundScape(sound: SoundScape) {
    currentSound.value = sound
  }

  const getSoundScape = computed(() => currentSound.value)

  return {
    currentSound, setSoundScape, getSoundScape, masterVolume
  }
})
