<template>
    <div class="k8s-container">
     <h1>Kubernetes (K8s)</h1>
     <p>Kubernetes 是一个开源的容器编排平台，旨在自动化应用程序的部署、扩展和管理。</p>
     
     <div class="features">
       <div class="feature">
         <h2>容器管理</h2>
         <p>管理多个容器的部署和扩展，让应用更高效运行。</p>
       </div>
       
       <div class="feature">
         <h2>监控</h2>
         <p>监控集群和应用状态，及时发现并解决问题。</p>
       </div>
       
       <div class="feature">
         <h2>cicd</h2>
         <p>实现应用的持续集成和持续交付，提高开发效率。</p>
       </div>
       
       <div class="feature">
         <h2>日志</h2>
         <p>集中管理日志，方便排查问题。</p>
       </div>
     </div>
   </div>
   
   </template>
   
   <script setup lang="ts">
    import { RouterLink } from 'vue-router'
    
   </script>
   
   <style scoped>
   .k8s-container {
     background-color: #1E1E2F;
     color: #FFFFFF;
     padding: 20px;
     border-radius: 10px;
     max-width: 800px;
     margin: auto;
     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
   }
   
   .k8s-container h1 {
     text-align: center;
     font-size: 2.5em;
     margin-bottom: 20px;
   }
   
   .k8s-container p {
     font-size: 1.1em;
     line-height: 1.5;
     margin-bottom: 30px;
   }
   
   .features {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
     gap: 20px;
   }
   
   .feature {
     background-color: #2D2D3C;
     padding: 15px;
     border-radius: 8px;
     text-align: center;
     transition: transform 0.2s;
   }
   
   .feature:hover {
     transform: scale(1.05);
   }
   
   .feature h2 {
     font-size: 1.5em;
     margin-bottom: 10px;
   }
   
   .feature p {
     font-size: 1em;
     line-height: 1.4;
   }
   
   </style>