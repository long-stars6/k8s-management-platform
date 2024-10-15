<template>
  <div class="container-management-page">
    <p>容器部署</p>
  
    <div class="actions">
      <button class="btn add-container">添加容器</button>
      <button class="btn refresh">刷新列表</button>
    </div>

    <div class="infinite-scroll-container">
      <ul class="infinite-list">
        <li v-for="(item, index) in deps" :key="index" class="infinite-list-item">
          {{ `${item.name} - ${item.namespace} - ${item.pods} - ${item.ready} - ${item.time}` }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';

// 定义deployment:部署对象接口
interface deployment {
  name: string,
  namespace: string,
  pods: string,
  ready: string,
  time: string
}

const deps = ref<deployment[]>([]);

//-----------挂载时调用函数-----------------
onMounted(() => {
  async function getdeploy() {
    async function getdata(): Promise<deployment[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const data: deployment[] = [
            { name: 'java', namespace: 'app', pods: '2', ready: '2/2', time: '2024-10-01' },
            { name: 'ingress-nginx', namespace: 'app', pods: '3', ready: '1/3', time: '2024-09-29' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
            { name: 'jenkins', namespace: 'app', pods: '1', ready: '1/1', time: '2024-09-28' },
          ];
          resolve(data);
        }, 3000);
      });
    }
    deps.value = await getdata();
  }
  getdeploy();
});
</script>

<style scoped>
.container-management-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1E1E1E;
  color: #E0E0E0; /* 默认文字颜色 */
  padding: 20px;
  border-radius: 10px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: 90vh; /* 设置为视口高度的90% */
}

.container-management-page p {
  color: #FFFFFF; /* 使用白色 */
  text-align: center;
  font-size: 18px; /* 调整字体大小 */
  margin: 0 0 20px; /* 下面的间距 */
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
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
  max-height: calc(90vh - 120px); /* 设置最大高度为90vh减去其他元素的高度 */
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
