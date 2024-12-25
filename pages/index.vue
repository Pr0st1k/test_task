<template>
    <div>
        
      <h1 class="text-[32px]">Home Page</h1>
      {{ authStore.email }}
    </div>
</template>
  
<style>
h1 {
    color: red;
  }
</style>
<script setup lang="ts">
  import { useAuthStore } from '~/store/auth';
  import { ref } from 'vue';

  const authStore = useAuthStore()
</script>