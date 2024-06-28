<template>
    <div class="flex flex-col min-h-screen">
      <TopNav />
      <div :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''" class="flex flex-1">
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
  