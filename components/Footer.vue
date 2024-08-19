<template>
  <div class="flex items-center justify-between">
    <div id="settings">
      <UIcon name="i-ph-gear" class="bg-white  text-2xl" dynamic />

    </div>
    <!-- <div id="project-author" class="w-full text-center ">
      <div> Built with 💙 by toeyeen </div>
      <div class=" w-full my-2"></div>
    </div> -->
    <div class="quotes">
      <p class="text-lg cursor-pointer font-light text-gray-200 transition-all hover:font-bold hover:text-white">
        {{
          quotes.quotes[0].text
        }} </p>
    </div>

    <div id="Todo">
      <UPopover :popper="{ offsetDistance: 10 }">
        <!-- <UButton color="white" label="Todo" class="outline-none" /> -->
        <p class="px-2  text-white">
          Todo
        </p>
        <template #panel>
          <div class="px-4 pt-4 pb-1">
            <Todos />
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import quotes from '~/constants/quotes.json'


const showTodo = ref(false)

function toggleTodo() {
  showTodo.value = !showTodo.value
}
</script>

<style scoped></style>
