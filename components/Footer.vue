<template>
  <div class="flex flex-col items-center justify-center border border-red-200">
    <div id="project-author" class="w-full text-center ">
      <div> Built with 💙 by toeyeen  </div>
      <div class="border border-gray-200 w-full my-2"></div>
    </div>
    <div class="quotes">
      <div> {{ quotes.quotes[0].text }} </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import quotes from '~/constants/quotes.json'

</script>

<style scoped>

</style>
