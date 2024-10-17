<template>
    <div>
      <div class="info-header">
        <div class="info-item">名称</div>
        <div class="info-item">命名空间</div>
        <div class="info-item">类型</div>
        <div class="info-item">Cluster IP</div>
        <div class="info-item">端口</div>
      </div>
  
      <div class="infinite-scroll-container">
        <ul class="infinite-list">
          <li v-for="(service, index) in services" :key="index" class="infinite-list-item">
            <div class="info-row">
              <div class="info-item">{{ service.name }}</div>
              <div class="info-item">{{ service.namespace }}</div>
              <div class="info-item">{{ service.type }}</div>
              <div class="info-item">{{ service.clusterIP }}</div>
              <div class="info-item">{{ service.ports.map(port => port.port).join(', ') }}</div>
            </div>
          </li>
        </ul>
        <p v-if="services.length === 0">暂无数据</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  interface Service {
    name: string;
    namespace: string;
    type: string;
    clusterIP: string;
    ports: Array<{
      port: number;
      protocol: string;
    }>;
  }
  
  const services = ref<Service[]>([]);
  const selectedNamespace = ref<string>('');
  
  // 获取 Services 数据
  const fetchServicesData = async (namespace = '') => {
    try {
      const response = await axios.get<Service[]>(`http://localhost:8080/api/services?namespace=${namespace}`);
      services.value = response.data;
    } catch (error) {
      console.error('获取 Services 信息失败:', error);
      services.value = [];
    }
  };
  
  // 刷新 Services 列表
const refreshList = () => {
    fetchServicesData(selectedNamespace.value);
  };
  
  // 在组件挂载时调用以获取默认的 Services 数据
  onMounted(() => {
    fetchServicesData(selectedNamespace.value);
  });
  </script>
  
  <style scoped>
  .info-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    background-color: #2C2F36;
    color: #E0E0E0;
    border-bottom: 2px solid #3B3F47;
  }
  
  .info-item {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
  
  .infinite-scroll-container {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    border: 1px solid #3B3F47;
    border-radius: 8px;
    background-color: #1E1E1E;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .infinite-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .infinite-list-item {
    padding: 15px;
    margin: 10px 0;
    background-color: #2C2F36;
    border: 1px solid #3B3F47;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.2s;
    color: #E0E0E0;
    display: flex;
    justify-content: space-between;
  }
  
  .infinite-list-item:hover {
    background-color: #3A3D43;
    transform: translateY(-2px);
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  </style>
  