<template>
  <div class="container-management-page">
    <p class="container-info-title">容器信息</p>

    <div class="actions">
      <select class="namespace-selector" v-model="selectedNamespace" @change="refreshList">
        <option value="">默认名称空间</option>
        <option v-for="(ns, index) in namespaces" :key="index" :value="ns">
          {{ ns }}
        </option>
      </select>
      <button class="btn add-container">添加容器</button>
      <button class="btn refresh" @click="refreshList">刷新列表</button>
    </div>
    
    <div class="info-header">
      <div class="info-item">名称</div>
      <div class="info-item">命名空间</div>
      <div class="info-item">状态</div>
      <div class="info-item">时间</div>
      <div class="info-item">Pod IP</div> 
      <div class="info-item">操作</div> 
  </div>

    <div class="infinite-scroll-container">
      <ul class="infinite-list">
        <li v-for="(item, index) in deps" :key="index" class="infinite-list-item">
          <div class="info-row">
            <div class="info-item">{{ item?.name || '未知' }}</div>
            <div class="info-item">{{ item?.namespace || '未知' }}</div>
            <div class="info-item">{{ item?.status || '未知' }}</div>
            <div class="info-item">{{ item?.time || '未知' }}</div>
            <div class="info-item">{{ item?.podIp || '未知' }}</div>
            <div class="info-item">
              <button class="btn view-logs" @click="viewLogs(item.name, item.namespace)" aria-label="查看日志">查看日志</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="isLoading">加载中...</p>
      <p v-if="deps.length === 0">暂无数据</p>
    
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // 导入 useRouter

interface Deployment {
    name: string;
    namespace: string;
    status: string;
    time: string;
    podIp: string;
}

const deps = ref<Deployment[]>([]);
const namespaces = ref<string[]>([]);
const selectedNamespace = ref<string>('');
const router = useRouter(); // 初始化 router

// 获取命名空间列表
const fetchNamespaces = async () => {
  try {
    const response = await axios.get<string[]>('http://localhost:8080/api/namespaces');
    namespaces.value = response.data;
  } catch (error) {
    console.error('获取命名空间失败:', error);
  }
};

// 组件脚本部分
const isLoading = ref<boolean>(false);

const fetchPodsData = async (namespace = '') => {
  isLoading.value = true; // 开始加载
  try {
    const response = await axios.get<Deployment[]>(`http://localhost:8080/api/pods?namespace=${namespace}`);
    deps.value = response.data; 
  } catch (error) {
    console.error('获取Pods信息失败:', error);
    deps.value = [];
  } finally {
    isLoading.value = false; // 加载结束
  }
};

// 模板部分


const refreshList = () => {
  fetchPodsData(selectedNamespace.value);
};

// 跳转到日志显示页面
const viewLogs = (podName: string, namespace: string): void => {
  // 调试日志
  console.log(`Navigating to logs for pod: ${podName}, namespace: ${namespace}`);
  
  // 使用命名路由导航
  router.push({ name: 'logs', params: { podName, namespace } });
};
onMounted(() => {
  fetchNamespaces(); // 获取命名空间列表
  fetchPodsData();   // 获取默认命名空间的Pods
});
</script>

<style scoped>
.namespace-selector {
  padding: 5px;
  border-radius: 5px;
  background-color: #2C2F36;
  color: #E0E0E0;
  border: 1px solid #3B3F47;
  margin-right: 10px; /* 添加一些右边距 */
}

.container-info-title {
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.2em;
}

.info-header, .info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center; /* 确保所有信息项在垂直方向上对齐 */
}

.info-item {
  flex: 1; /* 设置每个 item 的 flex 为 1 */
  text-align: center;
  min-width: 120px; /* 添加一个最小宽度，确保一致性 */
}

.container-management-page {
  display: flex;
  flex-direction: column;
  background-color: #1E1E1E;
  color: #E0E0E0;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: 90vh; /* 设置为视口高度的90% */
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

.view-logs {
  background-color: #4CAF50; /* 按钮颜色 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
