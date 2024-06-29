<template>
  <div class="flex flex-col min-h-screen">
    <TopNav />
    <div class="flex flex-1 min-h-screen">
      <SideNav />
      <div class="flex-1 p-4">
        <HomePage />
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script setup>
  const route = useRoute();
</script>
  