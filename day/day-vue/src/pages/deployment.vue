<template>
  <div class="container-management-page">
  <p class="container-info-title">容器信息</p>
  
  <div class="actions">
    <button class="btn add-container">添加容器</button>
    <button class="btn refresh">刷新列表</button>
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
          <div class="info-item">{{ num }}</div>
          <div class="info-item">{{ item.metadata.ready }}</div>
          <div class="info-item">{{ item.metadata.time }}</div>
        </div>
      </li>
    </ul>
  </div>
</div>

</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';



// 定义deployment:部署对象接口
interface Deployment {
  // 根据 API 返回的数据结构定义 Deployment 接口
  metadata: {
    name: string,
    namespace: string,
    pods: string,
    ready: string,
    time: string
  };
}

let num = ref(0);
const deps = ref<Deployment[]>([]); // 定义响应式变量用于存储 deployments
  onMounted(async () => {
    async function getData(): Promise<Deployment[]> {
      try {
        const response = await axios.get<Deployment[]>('http://localhost:8080/api/pods');
        return response.data; // 返回获取到的数据
        num.value = response.data.length;
      } catch (error) {
        console.error('Error fetching pods:', error);
        return []; // 如果出错，返回一个空数组
      }
    }
    deps.value = await getData(); // 获取数据并赋值给 deps

  });

</script>

<style scoped>
.container-info-title {
  margin: 20px 0;  /* 顶部和底部间距 */
  font-weight: bold;  /* 加粗 */
  font-size: 1.2em; /* 字体大小 */
}

.info-header, .info-row {
  display: flex; /* 使用 Flexbox 进行布局 */
  justify-content: space-between; /* 均匀分配空间 */
  padding: 10px 0; /* 每行的上下间距 */
}

.info-item {
  flex: 1; /* 每个项目均分空间 */
  text-align: center; /* 文字居中对齐 */
}
.container-management-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1E1E1E;
  color: #E0E0E0; /* 默认文字颜色 */
  padding: 5px; /* 减少顶部和底部内边距 */
  border-radius: 10px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: 90vh; /* 设置为视口高度的90% */
}


.container-management-page p {
  color: #FFFFFF; /* 使用白色 */
  text-align: center;
  font-size: 14px; /* 减小字体大小 */
  margin: 0 0 5px; /* 减少下面的间距 */
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px; /* 减少按钮区域的底部间距 */
}
.btn {
  padding: 5px 10px; /* 减小按钮内边距 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em; /* 调整字体大小 */
  transition: background-color 0.3s, transform 0.2s;
}

.add-container {
  background-color: #757575; /* 深灰色 */
  color: #FFFFFF; /* 白色文字 */
}

.refresh {
  background-color: #6A1B9A; /* 深紫色 */
  color: #FFFFFF; /* 白色文字 */
}

.infinite-scroll-container {
  max-height: calc(90vh - 50px); /* 确保更大的可滚动区域 */
  overflow-y: auto; /* 添加垂直滚动条 */
  border: 1px solid #3B3F47; /* 边框颜色 */
  border-radius: 8px; /* 圆角 */
  background-color: #2C2F36; /* 背景颜色 */
  padding: 10px; /* 内边距 */
}

.infinite-list {
  list-style: none; /* 去掉列表样式 */
  padding: 0; /* 去掉内边距 */
  margin: 0; /* 去掉外边距 */
}

.infinite-list-item {
  padding: 50px 20px; /* 增加内边距 */
  margin: 10px 0; /* 增加外边距 */
  background-color: #1E1E1E; /* 列表项背景 */
  border: 1px solid #3B3F47; /* 边框 */
  border-radius: 4px; /* 圆角 */
  transition: background-color 0.3s; /* 背景色过渡 */
  font-size: 1.1em; /* 增加字体大小 */
  color: #E0E0E0; /* 使用柔和的字体颜色 */
}

.infinite-list-item:hover {
  background-color: #3A3D43; /* 悬停效果颜色 */
}
</style>
