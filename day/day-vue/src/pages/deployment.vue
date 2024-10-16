<template>
  <div class="container-management-page">
    <p class="container-info-title">容器信息</p>

    <div class="actions">
      <button class="btn add-container">添加容器</button>
      <button class="btn refresh" @click="refreshList">刷新列表</button>
    </div>

    <div class="info-header">
      <div class="info-item">名称</div>
      <div class="info-item">命名空间</div>
      <div class="info-item">Pods</div>
      <div class="info-item">就绪</div>
      <div class="info-item">时间</div>
    </div>

    <div class="infinite-scroll-container">
      <ul class="infinite-list">
        <li v-for="(item, index) in deps" :key="index" class="infinite-list-item">
          <div class="info-row">
            <div class="info-item">{{ item.metadata.name }}</div>
            <div class="info-item">{{ item.metadata.namespace }}</div>
            <div class="info-item">{{ item.metadata.pods }}</div>
            <div class="info-item">{{ item.metadata.ready }}</div>
            <div class="info-item">{{ item.metadata.time }}</div>
          </div>
        </li>
      </ul>
      <p v-if="deps.length === 0">暂无数据</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Deployment {
  metadata: {
    name: string,
    namespace: string,
    pods: string,
    ready: string,
    time: string
  };
}

let num = ref(0);
const deps = ref<Deployment[]>([]);

const fetchPodsData = async () => {
  try {
    const response = await axios.get<Deployment[]>('http://localhost:8080/api/pods');
    num.value = response.data.length;
    deps.value = response.data;
  } catch (error) {
    console.error('获取Pods信息失败:', error);
    deps.value = [];
  }
};

const refreshList = () => {
  fetchPodsData();
};

onMounted(() => {
  fetchPodsData();
});
</script>

<style scoped>
.container-info-title {
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.2em;
}
.info-header, .info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.info-item {
  flex: 1;
  text-align: center;
}
.container-management-page {
  display: flex;
  flex-direction: column;
  background-color: #1E1E1E;
  color: #E0E0E0;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: 90vh; /* 设置为视口高度的100% */
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;
}
.add-container {
  background-color: #757575;
  color: #FFFFFF;
}
.refresh {
  background-color: #6A1B9A;
  color: #FFFFFF;
}
.infinite-scroll-container {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  border: 1px solid #3B3F47;
  border-radius: 8px;
  background-color: #2C2F36;
  padding: 10px;
}
.infinite-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.infinite-list-item {
  padding: 20px;
  margin: 10px 0;
  background-color: #1E1E1E;
  border: 1px solid #3B3F47;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1.1em;
  color: #E0E0E0;
}
.infinite-list-item:hover {
  background-color: #3A3D43;
}
</style>
