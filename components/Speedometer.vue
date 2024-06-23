<template>


  <div class="progress-container" >


  <svg width="550" height="550" viewBox="0 0 100 100" fill="none" ref="progressContainer" :percentage="percentage" >
<path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke-linecap="round" stroke="gray" stroke-width="3" fill-opacity="0" class="ant-progress-circle-trail" style="stroke-dasharray: 220.31px, 295.31px;stroke-dashoffset: -37.5px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s;"></path>
   <path d="M 50,50 m 0,47
   a 47,47 0 1 1 0,-94
   a 47,47 0 1 1 0,94" stroke="orange" stroke-linecap="round" stroke-width="3" opacity="1" fill-opacity="0" class="ant-progress-circle-path"></path>
   
  </svg>

  <div class="text">

    <div class="flex items-center justify-center border px-8 border-1  text-center ">
      <div class="focus px-2">Focus</div>
      <div class="break">Break</div>
    </div>

    <span class="title block">{{ title }}</span>


    
    <button> Start </button>
  </div>





</div>







</template>

<script lang="ts" setup>

import {addStyles} from '../utils/utils.ts'

const props = defineProps<{
  percentage?: number
  title?: string
}>()

const el = ref<HTMLCanvasElement | null>(null)
const progressContainer = ref<HTMLDivElement | null>(null)
const size = ref(20)





watch(() => props.percentage, () => {
  setPercentage()
})



function setPercentage() {

const totalDash = 220.31, totalGap = 295.31 ,dashOffest = -37.5

  const speedometerStyle = {
  strokeDasharray: `${totalDash - (props.percentage /100) * totalDash}px, ${totalGap}px`,
  strokeDashoffset: `${dashOffest}`,
  transition:
    "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s"
}

  addStyles(progressContainer.value.children[1] as HTMLDivElement, speedometerStyle)


}



onMounted(() => {
  setPercentage()
})


</script>


<style scoped>
.progress-container {
  box-shadow: 0px 4px 5px rgb(0, 0, 0, .1);
}

.progress-container {
  background-color: #f1f1f1;
  border-radius: 5px;
  position: relative;
  border: 1px solid green;
  width:600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



/* .title {
  position: absolute;
  font-size: 100px;
} */

.text {
  position: absolute;
  width: 100%;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  text-align: center;
}
</style>

