<template>
    <div class="pod-details-page">
      <div class="pod-header">
        <h2>Pod 详情: {{ podName }} (Namespace: {{ namespace }})</h2>
      </div>
  
      <div class="container-list">
        <h3>容器列表:</h3>
        <ul>
          <li v-for="(container, index) in containers" :key="index" class="container-item">
            <div class="container-info">
              <span class="container-name">容器名称: {{ container.name }}</span>
              <span class="container-status">状态: {{ container.status }}</span>
              <button class="btn view-terminal" @click="viewTerminal(container.name)" aria-label="查看终端">查看终端</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  interface Container {
    name: string;
    status: string;
  }
  
  interface PodDetail {
    podName: string;
    namespace: string;
    containers: Container[];
  }
  
  // 从路由中获取参数
  const route = useRoute();
  const podName = route.params.podName as string;
  const namespace = route.params.namespace as string;
  
  const containers = ref<Container[]>([]);
  
  // 获取Pod详情
  const fetchPodDetail = async () => {
    try {
      const response = await axios.get<PodDetail>(`http://localhost:8080/api/pods/${namespace}/${podName}`);
      containers.value = response.data.containers;
    } catch (error) {
      console.error('获取Pod详情失败:', error);
    }
  };
  
  // 跳转到终端页面
  const viewTerminal = (containerName: string): void => {
    const router = useRouter();
    router.push({ name: 'terminal', params: { podName, namespace, containerName } });
  };
  
  onMounted(() => {
    fetchPodDetail(); // 加载 Pod 详情
  });
  </script>
  
  <style scoped>
  .pod-details-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .pod-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .pod-header h2 {
    font-size: 1.8em;
    color: #333;
  }
  
  .container-list h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .container-item {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .container-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .container-name {
    font-weight: bold;
    color: #333;
    margin-right: 20px;
  }
  
  .container-status {
    color: #888;
  }
  
  .view-terminal {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .view-terminal:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
    .container-info {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .view-terminal {
      margin-top: 10px;
    }
  }
  </style>
  