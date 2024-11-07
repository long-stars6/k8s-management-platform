<template>
    <div class="terminal-page">
      <div class="terminal-container" ref="terminal"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Terminal } from 'xterm';
  import { useRouter, useRoute } from 'vue-router';
  import 'xterm/css/xterm.css';
  
  const terminal = ref<Terminal | null>(null);
  const socket = ref<WebSocket | null>(null);
  
  onMounted(() => {
    // 初始化终端
    terminal.value = new Terminal({
      rows: 24,
      cols: 80,
      cursorBlink: true,
      theme: {
        background: '#1e1e1e', // 终端背景色
        foreground: '#ffffff', // 终端文本颜色
      },
    });
  
    // 挂载到页面元素上
    terminal.value.open(document.querySelector('.terminal-container') as HTMLElement);
    // 连接到 WebSocket 后端
    const route = useRoute();
    const podName = route.params.podName;
    const namespace = route.params.namespace;
    const containerName = route.params.containerName;
    socket.value = new WebSocket(`ws://localhost:8080/ws/terminal?namespace=${namespace}&podName=${podName}&containerName=${containerName}`);


    // 当收到 WebSocket 数据时，将其写入终端
    socket.value.onmessage = (event) => {
      terminal.value?.write(event.data);
    };
  
    // 捕获终端的输入并发送到 WebSocket 后端
    terminal.value.onData((data) => {
      socket.value?.send(data);
    });
  });
  
  </script>
  
<style scoped>
.terminal-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
}

.terminal-container {
  width: 80%;
  height: 80%;
  border: 1px solid #3b3f47;
  border-radius: 8px;
  overflow: hidden;
}
</style>
  