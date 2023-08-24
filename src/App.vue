<template>
  <p>hello world</p>
  <p>{{ count }}</p>
  <button @click="submit">Save</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let count = ref(0);
const submit = (event: Event) => {
  console.log(event);
  count.value += 1;
};
</script>

<style scoped></style>
