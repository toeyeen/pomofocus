<script setup lang="ts">
import type { FocusState } from '~/types'

const minutes = ref(25)
const { controls, options, percentage } = useControls(minutes.value)
const controller = controls()


function changeMode(state: FocusState) {
  minutes.value = state === 'focusMode' ? 12 : state === 'shortBreak' ? 5 : 15

  console.log(minutes.value);
}

</script>
<template>
  <div class="glass">
    <div class="h-full w-full mx-auto ">

      <div>

        <div id="focus" class="h-full mb-[99px] flex justify-center text-center items-center">
          <div class="">

            <Speedometer :controls="controller" :options="options" :percentage="percentage" />
          </div>
        </div>
      </div>



    </div>
  </div>


</template>

<style>
.speedometer {
  width: 600px;
  height: 600px;
  background: #e7e7e7;
  border-radius: 500px 500px 500px 500px;
  position: relative;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.09), 0 0 35px 5px rgba(255, 255, 255, 0.29);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 75%);



}

.speedometer::after {
  content: '';
  position: absolute;
  background: blue;
  height: 20px;
  width: 100%;
  border-radius: 100%;
}

.speedometer__needle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  left: 50%;
  bottom: 25%;
}

.speedometer__loading {
  width: 600px;
  height: 600px;
  background: transparent;
  border-radius: 500px 500px 500px 500px;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 75%);

}

.glass {
  /* From https://css.glass */
  margin: 20px 20px;
  /* background: rgba(255, 255, 255, 0.19); */
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.3px);
  /* border: 1px solid rgba(12, 255, 255, 0.9); */
}
</style>
