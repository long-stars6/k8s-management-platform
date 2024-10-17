<template>
    <div class="log-page-container">
      <h1 style="font-size: 20px;">Pod 日志</h1>
      <p>Pod 名称: {{ podName }}</p>
      <p>命名空间: {{ namespace }}</p>
      <button @click="fetchLogs" class="refresh-button">刷新日志</button>
      <div class="log-content">
        <div v-if="logs.length">
          <h2>日志内容:</h2>
          <pre ref="logContainer" class="log-lines">
            <span v-for="(line, index) in formattedLogs" :key="index" :class="getLogLineClass(line)">
              {{ line }}
            </span>
          </pre>
        </div>
        <p v-else>暂无日志</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const podName = route.params.name as string;
  const namespace = route.params.namespace as string;
  const logs = ref<string[]>([]);
  const logContainer = ref<HTMLElement | null>(null);
  
  const fetchLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pod-logs?podName=${podName}&namespace=${namespace}`);
      logs.value = response.data.split('\n');
    } catch (error) {
      console.error('获取日志失败:', error);
      logs.value = [];
    }
  };
  
  const formattedLogs = computed(() => logs.value.map((line) => line));
  
  const getLogLineClass = (line: string) => {
    if (line.includes('ERROR')) return 'log-error';
    if (line.includes('WARN')) return 'log-warning';
    return 'log-info';
  };
  
  watch(logs, () => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
  
  onMounted(() => {
    fetchLogs();
  });
  </script>
  
  <style scoped>
  .log-page-container {
    /* margin-left: 240px; 确保对齐侧边栏 */
    padding: 20px;
    background-color: #1E1E1E;
    color: #E0E0E0;
    height: 100vh; /* 确保页面填满 */
    overflow: hidden; /* 隐藏溢出 */
  }
  
  .refresh-button {
    background-color: #6A1B9A;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .log-content {
    max-width: 800px; /* 限制日志内容的最大宽度 */
    margin: 0 auto; /* 居中对齐 */
    height: calc(100vh - 180px); /* 预留上方空间 */
    background-color: #2C2F36;
    border-radius: 5px;
    padding: 10px;
    overflow-y: auto; /* 启用垂直滚动 */
  }
  
  .log-lines {
    color: #E0E0E0;
    white-space: pre-wrap; /* 保持换行格式 */
    line-height: 1.5; /* 调整行高以提高可读性 */
  }
  
  .log-info {
    color: #E0E0E0;
  }
  
  .log-warning {
    color: #FFCC00;
  }
  
  .log-error {
    color: #FF6347;
  }
  </style>
  