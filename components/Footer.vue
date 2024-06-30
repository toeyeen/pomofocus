<template>
  <div class="flex flex-col items-center justify-center">
    <div id="project-author" class="w-full text-center ">
      <div> Built with 💙 by toeyeen </div>
      <div class=" w-full my-2"></div>
    </div>
    <div class="quotes">
      <p class="text-lg cursor-pointer font-light text-gray-200 transition-all hover:font-bold hover:text-white">
        {{
          quotes.quotes[0].text
        }} </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import quotes from '~/constants/quotes.json'

</script>

<style scoped></style>
