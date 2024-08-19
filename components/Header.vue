<template>
  <div class="inline-flex gap-3   ">
    <div class="text-white">
      <UIcon name="i-ph-brain" class="text-2xl" dynamic />
    </div>
    <div class="text-white">
      <UPopover :popper="{ arrow: true }">
        <UIcon name="i-ph-waveform" class="text-2xl" dynamic />
        <template #panel>
          <div class=" p-4">
            <SoundScape name="Soundscapes" class="w-80" />
          </div>
        </template>
      </UPopover>

    </div>

    <span class="text-white">Focusing</span>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
