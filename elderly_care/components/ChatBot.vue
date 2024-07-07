<template>
    <div class="iframe-container">
      <iframe
        src="http://localhost:7860"
        class="iframe-content"
      ></iframe>
    </div>
</template>
  
<style scoped>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .iframe-container {
    height: 100vh;
  }
  
  .iframe-content {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
  