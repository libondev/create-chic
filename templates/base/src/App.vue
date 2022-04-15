<script setup>
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <main>
    <h1>{{ msg }}</h1>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
