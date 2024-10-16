<template>
  <div class="total">
    <div class="main">
      <Sidebar />
    </div>
  </div>  
  
</template>
<script lang="ts" setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Home from './pages/Home.vue';
  import Sidebar from './pages/saidebar.vue';
  import iii from './pages/iii.vue';
  import deployment from './pages/deployment.vue';
  import { ref } from 'vue';
  

</script>


<style scoped>
.iframe-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
iframe {
  border: 1px solid #ccc;
}

/*----------------------------------*/
  .red{
    color: rgb(244, 243, 243);
    background-color: rgb(0, 0, 0);
  }
  body {
  background-color: #121212;
  color: #F4F3F3;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 600;
  color: #F4F3F3;
}

p {
  font-size: 1rem;
  color: #E0E0E0;
}

a {
  font-family: 'Roboto', Arial, sans-serif;
  color: #448AFF;
  text-decoration: none;
}

a:hover {
  color: #FF5252;
}

button {
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #333333;
  color: #F4F3F3;
  border: none;
  padding: 10px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
}

.card {
  background-color: #333333;
  color: #F4F3F3;
  font-family: 'Roboto', Arial, sans-serif;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #444444;
}

.card h3 {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
}

.card p {
  font-size: 0.95rem;
  color: #CCCCCC;
}

</style>