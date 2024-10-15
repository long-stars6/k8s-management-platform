<template>
    <div>
      <h1>Kubernetes Pod 监控</h1>
      <table>
        <thead>
          <tr>
            <th>Pod 名称</th>
            <th>状态</th>
            <th>CPU 使用</th>
            <th>内存使用</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pod in pods" :key="pod.name">
            <td>{{ pod.name }}</td>
            <td>{{ pod.status }}</td>
            <td>{{ pod.cpuUsage }}%</td>
            <td>{{ pod.memoryUsage }} MB</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const pods = ref([
  {
    "name": "pod-1",
    "status": "Running",
    "cpuUsage": 50,
    "memoryUsage": 256
  },
  {
    "name": "pod-2",
    "status": "Pending",
    "cpuUsage": 10,
    "memoryUsage": 128
  }
]
);
  
      const fetchPods = async () => {
        try {
          const response = await axios.get('http://your-api-endpoint/pods'); // 替换为你的后端 API 地址
          pods.value = response.data;
        } catch (error) {
          console.error('获取 Pod 数据失败:', error);
        }
      };
  
      onMounted(fetchPods);
  
      return {
        pods,
      };
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  </style>
  