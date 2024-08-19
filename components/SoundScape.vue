<template>
  <div>
    <div class=" ">
      <!-- First Header -->
      <div v-if="secondView == false">
        <div class="flex justify-between py-4 px-1.5">
          <div class="flex items-center">
            <UIcon name="i-ph-waveform" class="text-2xl mr-2 text-black" />
            <span class="text-black"> {{ props.name }} </span>
          </div>

          <div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200">
            <UIcon name="mdi:dots-horizontal" class="text-2xl text-gray-500" />
          </div>


        </div>
        <div>
          <ul class="grid grid-cols-3 gap-4 mt-8">
            <div @click="showSecondView(sound)" v-for="sound in soundsGroup"
              class="flex flex-col items-center text-gray-500 cursor-pointer">
              <UIcon :name="sound.iconName" dynamic class="text-3xl fill-current" />
              <small> {{ sound.name }} </small>
            </div>
          </ul>
        </div>
      </div>

      <!-- Second Header -->
      <div v-else>
        <div class="flex items-center text-gray bg-gray-100 w-full py-4 px-1.5 rounded-lg">
          <div class="flex-1 inline-flex items-center">
            <UIcon @click="showSecondView" class="pr-3" name="i-ph-caret-left-bold" dynamic />
            <span class="px-1"> {{ currentSound?.name }} </span>
            <UIcon :name="currentSound.iconName" class="text-2xl" dynamic />
          </div>
          <div class="flex items-center justify-end w-full">
            <div class="mr-2">
              <audio loop ref="audioPlayer"
                src="https://az814671.vo.msecnd.net/blogimages/eac6cdc4-1f53-4fc5-92dd-0a4c053de028"></audio>
              <div v-if="state == 'pause'" @click="audio('play')"
                class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                <UIcon name="i-ph-play-fill" class="bg-blue-500 " dynamic />
              </div>
              <div v-if="state == 'play'" @click="audio('pause')"
                class="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                <UIcon name="i-ph-pause-fill" class="bg-blue-500 " dynamic />
              </div>
            </div>
            <span class="w-16">
              <URange size="xs" color="blue" v-model="volume" />
            </span>
          </div>
        </div>

        <div>
          <ul class="grid grid-cols-3 gap-4 mt-8">
            <div v-for=" track in currentSound?.tracks"
              class="flex flex-col items-center text-center text-gray-500 cursor-pointer">
              <UIcon :name="track.iconName" dynamic class="text-3xl fill-current" />
              <span class="w-16">
                <URange size="xs" color="gray" v-model="track.volume" />
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup lang="ts">

interface SoundScape {
  name: string
  iconName: string
  tracks?: Tracks[] | any[]
}

interface Tracks {
  uuid: string
  name: string
  iconName: number
  url: string
  volume?: number
}

const props = defineProps<{ name: string }>()
const secondView = ref(false)
const currentSound = ref<SoundScape | null>(null)

const audioPlayer = ref<HTMLAudioElement | null>(null)
const volume = ref(50)
const state = ref('pause')
function audio(action: 'play' | 'pause') {
  audioPlayer.value?.[action]()
  state.value = action
}

const options = {
  loop: true
}

watch(volume, (vOld, vNew) => {
  console.log(vOld, vNew);
  audioPlayer.value.volume = vNew / 100
})

function showSecondView(sound?: SoundScape) {
  if (sound) {
    console.log(sound);
  }
  currentSound.value = sound
  secondView.value = !secondView.value
}



const sounds = {
  fire: {
    uuid: "32E55A2C-218E-452C-99A5-F377E820B34D",
    name: "Fire",
    iconName: 'ph:fire',
    url: "https://az814671.vo.msecnd.net/blogimages/276f1472-734e-492c-9138-c1584fb6cd80"
  },
  crickets: {
    uuid: "877124D8-4BE5-40D2-9C1B-966403D34D7C",
    name: "Crickets",
    iconName: 'fluent-emoji-high-contrast:cricket',
    url: "https://az814671.vo.msecnd.net/blogimages/7969c39a-f659-40e3-a357-11060161ce74"
  },
  ocean: {
    uuid: "A912DBAB-5C9C-4C7C-8178-51AB5B6BC66E",
    name: "Ocean",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/3f851f30-5854-4fdb-805a-3f302ba56a81"
  },
  wind: {
    uuid: "98428CC-4225-4622-8916-0841A3886460",
    name: "Wind",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/ebcb630e-5cb3-4a64-a2d4-eec16c9abf41"
  },
  seagulls: {
    uuid: "92AED14F-BE35-45E5-ADBD-B38F8C548699",
    name: "Seagulls",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/c0b4e5c6-ab66-42ce-aea3-5d6a419583cb"
  },
  tracks: {
    uuid: "D6EE305A-2EBF-4119-9A0A-71D09946E621",
    name: "Tracks",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/38228a91-cfa9-45b1-ada9-c16b619c2568"
  },
  rainOnSurface: {
    uuid: "8C65E875-1AA4-43C5-A140-0392E45741B8",
    name: "Rain on surface",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/08e95b57-7dbe-4ba8-83a7-8b19fc254ae1"
  },
  rain: {
    uuid: "1D63CBB9-FC3F-4B06-9281-EC463451C0AF",
    name: "Rain",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/eac6cdc4-1f53-4fc5-92dd-0a4c053de028"
  },
  birds: {
    uuid: "CC4EA0EB-9DF2-4F55-BE24-6D519CB36CF1",
    name: "Birds",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/84d9d4e7-1d54-4300-a347-8f2650eafd51"
  },
  insects: {
    uuid: "9126E055-07E3-44E3-AD18-7CD1E6420609",
    name: "Insects",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/5875d483-396c-4bfe-a5d4-160384c18832"
  },
  chimes: {
    uuid: "E7019F40-9C4D-4B58-A2C6-B4FF2831E6DE",
    name: "Chimes",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/c30b03c9-91e0-43ce-9aa9-199e7aa0b76a"
  },
  cafe: {
    uuid: "3A188244-471F-41BF-9CF3-C700C2153C6D",
    name: "Café",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/6f8cf03d-c7f2-45b7-898d-576385236122"
  },
  coffeeMaker: {
    uuid: "86A2C11A-1A74-4832-AE1F-1A7CB4C0A970",
    name: "Coffee Maker",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/43769f50-e91e-4595-91b4-8248372f39d2"
  },
  thunder: {
    uuid: "D19ECB22-814B-4504-A51D-A056B79BA8E7",
    name: "Thunder",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/8291e604-c11a-4b45-b844-2e464527a2e1"
  },
  loudRain: {
    uuid: "581EA3E4-5FD1-485D-8337-F6B1EF9BDB16",
    name: "Loud Rain",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/31fca0bf-8792-458f-8c13-f605b5618275"
  },
  stream: {
    uuid: "8DAFC567-C77A-479A-8873-450914531283",
    name: "Stream",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/2374f3af-35fd-4ab8-96c3-5e70775ca33a"
  },
  coWorkers: {
    uuid: "EA463EB3-E751-49A9-B1AC-565F2D87194F",
    name: "Co-workers",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/7a5fc995-0278-4386-bf30-b5672dfdd95b"
  },
  copier: {
    uuid: "6492F3E6-6517-46EF-B211-AE02E905FDB2",
    name: "Copier",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/3e1f826c-dca2-4fe7-a10f-bf07c56ecfa8"
  },
  airConditioner: {
    uuid: "F88D0945-3DBB-456D-8CF5-812745566F2E",
    name: "Air Conditioner",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/e55e01b5-6fe8-43b3-b50b-18ce4f670472"
  },
  fluorescentHum: {
    uuid: "B3FC885D-06BB-4531-9699-F4EA73894AFB",
    name: "Fluorescent Hum",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/58fdb1ba-8821-4abe-8daf-704ee656e369"
  },
  mechanicalKeyboard: {
    uuid: "17718B1A-A842-4CDA-844F-BC2AC9E7ADD5",
    name: "Mechanical Keyboard",
    iconName: 'ph:campfire',
    url: "https://az814671.vo.msecnd.net/blogimages/f295aec4-9d59-47b2-b31a-ba88f23d4628"
  }
};

const soundsGroup: SoundScape[] = [
  {
    name: "Campfire",
    iconName: 'ph:campfire',
    tracks: [{
      ...sounds.fire,
      volume: 90
    }, {
      ...sounds.crickets,
      volume: 2
    }]
  },
  {
    name: "Beach",
    iconName: 'mdi:beach',
    tracks: [{
      ...sounds.ocean,
      volume: 50
    }, {
      ...sounds.wind,
      volume: 15
    }, {
      ...sounds.seagulls,
      volume: 5
    }]
  }, {
    name: "Train",
    iconName: 'ph:train',
    tracks: [{
      ...sounds.tracks,
      volume: 90
    }, {
      ...sounds.wind,
      volume: 10
    }]
  }, {
    name: "Rainfall",
    iconName: 'mdi:weather-pouring',
    tracks: [{
      ...sounds.rainOnSurface,
      volume: 50
    }, {
      ...sounds.rain,
      volume: 50
    }]
  }, {
    name: "Forest",
    iconName: 'game-icons:forest',
    tracks: [{
      ...sounds.birds,
      volume: 75
    }, {
      ...sounds.wind,
      volume: 10
    }, {
      ...sounds.insects,
      volume: 5
    }]
  }, {
    name: "Garden",
    iconName: 'mdi:sprout-outline',
    tracks: [{
      ...sounds.chimes,
      volume: 50
    }, {
      ...sounds.insects,
      volume: 1
    }, {
      ...sounds.wind,
      volume: 10
    }]
  }, {
    name: "Café",
    iconName: 'carbon:cafe',
    tracks: [{
      ...sounds.cafe,
      volume: 50
    }, {
      ...sounds.coffeeMaker,
      volume: 55
    }]
  }, {
    name: "Thunderstorm",
    iconName: 'mdi:weather-lightning',
    tracks: [{
      ...sounds.thunder,
      volume: 90
    }, {
      ...sounds.loudRain,
      volume: 55
    }, {
      ...sounds.wind,
      volume: 45
    }, {
      ...sounds.rain,
      volume: 25
    }]
  }, {
    name: "Creek",
    iconName: 'game-icons:river',
    tracks: [{
      ...sounds.stream,
      volume: 20
    }, {
      ...sounds.wind,
      volume: 10
    }]
  }, {
    name: "Office",
    iconName: 'mdi:office-building-marker-outline',
    tracks: [{
      ...sounds.coWorkers,
      volume: 13
    }, {
      ...sounds.copier,
      volume: 8
    }, {
      ...sounds.airConditioner,
      volume: 7
    }, {
      ...sounds.fluorescentHum,
      volume: 3
    }, {
      ...sounds.mechanicalKeyboard,
      volume: 1
    }]
  }, {
    name: "Random",
    iconName: 'mdi:shuffle-variant'
  }, {
    name: "Custom",
    iconName: 'material-symbols:dashboard-customize-outline',
    // tracks: Object.values(n)
  }
]


onMounted(() => {
  // console.log(Object.values(sounds));
})


</script>

<style scoped></style>
