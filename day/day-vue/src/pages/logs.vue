<template>
  <div class="log-page-container">
    <h1 style="font-size: 20px;">Pod 日志</h1>
    <p>Pod 名称: {{ podName }}</p>
    <p>命名空间: {{ namespace }}</p>
    <button @click="connectWebSocket" class="refresh-button">连接日志流</button>
    <div class="log-content">
      <div v-if="logs.length">
        <h2>日志内容:</h2>
        <pre ref="logContainer" class="log-lines">
          <span v-for="(line, index) in logs" :key="index" :class="getLogLineClass(line)">
            {{ line }}
          </span>
        </pre>
      </div>
      <p v-else>暂无日志</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';

const props = defineProps({
  podName: {
    type: String,
    required: true,
  },
  namespace: {
    type: String,
    required: true,
  },
});

const logs = ref<string[]>([]);
const logContainer = ref<HTMLElement | null>(null);
let socket: WebSocket | null = null;

// 处理日志行的样式
const getLogLineClass = (line: string) => {
  if (line.includes('ERROR')) return 'log-error';
  if (line.includes('WARN')) return 'log-warning';
  return 'log-info';
};

// 连接到 WebSocket 服务器
const connectWebSocket = () => {
  const wsUrl = `ws://localhost:8080/ws/pod-logs?podName=${props.podName}&namespace=${props.namespace}`;
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log('WebSocket 连接已建立');
  };

  socket.onmessage = (event) => {
    logs.value.push(event.data);

    // 自动滚动
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket 发生错误:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket 连接已关闭');
    // 尝试重新连接
    setTimeout(connectWebSocket, 3000);
  };
};

onUnmounted(() => {
  if (socket) {
    socket.close();
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
  max-height: 70vh; /* 设置最大高度 */
  background-color: #2C2F36;
  border-radius: 5px;
  padding: 10px; /* 添加内边距 */
  overflow-y: auto; /* 确保可以滚动 */
}

.log-lines {
  color: #E0E0E0;
  white-space: pre-wrap; /* 保持换行 */
  line-height: 1.5; /* 设置行高 */
  margin: 0; /* 清除外边距 */
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

