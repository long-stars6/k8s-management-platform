<template>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="(item, index) in p" :key="index" class="infinite-list-item">
        {{ `${item.name} - ${item.namespace} - ${item.pods} - ${item.ready} - ${item.time}` }}
      </li>
    </ul>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
    setup() {
      const p = reactive([
        { name: 'java', namespace: 'app', pods: '2', ready: '2/2', time: '2024-10-01' },
        { name: 'mydevops', namespace: 'app', pods: '2', ready: '1/2', time: '2024-09-30' },
        { name: 'ingress-nginx', namespace: 'app', pods: '3', ready: '1/3', time: '2024-09-29' },
      ]);
  
      // 加载更多数据的函数
      const load = (): void => {
        // 假设每次加载 2 个新条目
        p.push(
          { name: 'new-app-1', namespace: 'app', pods: '1', ready: '1/1', time: '2024-10-02' },
          { name: 'new-app-2', namespace: 'app', pods: '1', ready: '0/1', time: '2024-10-03' }
        );
      };
  
      return { p, load };
    }
  });
  </script>
  
  <style>
  .infinite-list {
    max-height: 700px; /* 设置最大高度 */
    overflow-y: auto; /* 添加垂直滚动条 */
    border: 1px solid #ccc; /* 边框 */
    border-radius: 8px; /* 圆角 */
    background-color: #f9f9f9; /* 背景颜色 */
    padding: 10px; /* 内边距 */
  }
  
  .infinite-list-item {
    padding: 10px 15px; /* 内边距 */
    margin: 5px 0; /* 外边距 */
    background-color: #fff; /* 列表项背景 */
    border: 1px solid #e0e0e0; /* 边框 */
    border-radius: 4px; /* 圆角 */
    transition: background-color 0.3s; /* 背景色过渡 */
  }
  
  .infinite-list-item:hover {
    background-color: #e9ecef; /* 悬停效果 */
  }
  </style>
  