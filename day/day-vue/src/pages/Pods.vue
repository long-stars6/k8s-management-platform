<template>
  <div class="container-management-page">
  <h1>Pods管理</h1>
  
  <div class="actions">
    <button class="btn add-container">添加容器</button>
    <button class="btn refresh">刷新列表</button>
  </div>

  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>namespace</th>
        <th>pods</th>
        <th>ready</th>
        <th>time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in p" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.namespace }}</td>
        <td>{{ item.pods }}</td>
        <td>{{ item.ready }}</td>
        <td>{{ item.time }}</td>
        <td>
          <button class="btn delete">删除</button>
        </td>
      </tr>
      <!-- 更多容器行 -->
    </tbody>
  </table>
</div>

</template>

<script lang="ts" setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { reactive } from 'vue';
    let p =reactive([
        {name:'java',namespace:'app',pods:'2',ready:'2/2',time:'2024-10-01'},
        {name:'mydevops',namespace:'app',pods:'2',ready:'1/2',time:'2024-09-30'},
        {name:'ingress-nginx',namespace:'app',pods:'3',ready:'1/3',time:'2024-09-29'},
    ])
</script>


<style scoped>
  .container-management-page {
  flex: 1; /* 允许该组件扩展以填充可用空间 */
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  /* max-width: 900px; */
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.container-management-page h1 {
  text-align: center;
  font-size: 20px;
  margin: 0px 0;
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
  transition: background-color 0.2s;
}

.add-container {
  background-color: #28a745;
  color: white;
}

.refresh {
  background-color: #007bff;
  color: white;
}

.delete {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
}

th {
  background-color: #007bff;
  color: white;
}

</style>
