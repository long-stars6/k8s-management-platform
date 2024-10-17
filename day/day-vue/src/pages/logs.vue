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
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const podName = route.params.name as string;
const namespace = route.params.namespace as string;
const logs = ref<string[]>([]);
const logContainer = ref<HTMLElement | null>(null);
let refreshInterval: number | null = null;

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
  // 设置定时器每隔5秒自动刷新日志
  refreshInterval = setInterval(fetchLogs, 5000);
});

onUnmounted(() => {
  // 清除定时器
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<style scoped>
.log-page-container {
  padding: 20px;
  background-color: #1E1E1E;
  color: #E0E0E0;
  height: 90vh;
  overflow: hidden;
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
 
  margin: 0 auto;
  height: calc(100vh - 180px);
  background-color: #2C2F36;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
}

.log-lines {
  color: #E0E0E0;
  white-space: pre-wrap;
  line-height: 1.5;
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
