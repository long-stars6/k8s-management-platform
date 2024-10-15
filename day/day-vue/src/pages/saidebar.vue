<template>
  <div class="container">
    <div class="sidebar">
      <h2>Kubernetes</h2>
      <ul>
        <li><router-link to="/cluster">集群概览</router-link></li>
        <li>
          
          <router-link to="/deployment">Pods 管理</router-link>
        </li>

        <li><router-link to="/services">服务管理</router-link></li>
        <li class="menu-item">
          <span @click="toggleDropdown" class="dropdown-toggle">持续集成部署</span>
          <transition name="expand">
            <ul v-if="dropdownOpen" class="dropdown">
              <li><router-link to="/cicd/build">构建管理</router-link></li>
              <li><router-link to="/cicd/test">测试管理</router-link></li>
              <li><router-link to="/cicd/deploy">部署管理</router-link></li>
            </ul>
          </transition>
        </li>
        <li>
          <span @click="toggleConfigDropdown" class="dropdown-toggle">配置管理</span>
          <transition name="expand">
            <ul v-if="configDropdownOpen" class="dropdown">
              <li><router-link to="/configmaps">ConfigMaps</router-link></li>
              <li><router-link to="/secrets">Secrets</router-link></li>
            </ul>
          </transition>
        </li>
        <li><router-link to="/alert">告警</router-link></li>
        <li><router-link to="/logs">监控与日志</router-link></li>
      </ul>
    </div>
    <div class="content-area">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dropdownOpen = ref(false);
const configDropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  configDropdownOpen.value = false; // 关闭配置管理的下拉
};

const toggleConfigDropdown = () => {
  configDropdownOpen.value = !configDropdownOpen.value;
  dropdownOpen.value = false; // 关闭持续集成部署的下拉
};
</script>

<style scoped>

.container {
  display: flex;
}

.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #282c34;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden; /* 防止溢出 */
}

.sidebar h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 30px 0;
  position: relative; /* 位置相对 */
}

.sidebar a {
  text-decoration: none;
  color: #61dafb;
  transition: color 0.3s;
}

.sidebar a:hover {
  color: #21a1f1;
}

.dropdown-toggle {
  cursor: pointer;
  color: #61dafb;
  transition: color 0.3s;
}

.dropdown-toggle:hover {
  color: #21a1f1;
}

.dropdown {
  list-style: none;
  padding-left: 20px; /* 缩进 */
  margin-top: 10px; /* 与父项间隔 */
  max-height: 0; /* 默认高度为0 */
  overflow: hidden; /* 隐藏溢出 */
  transition: max-height 0.5s ease, opacity 0.3s ease; /* 动画效果 */
  background: linear-gradient(180deg, #3b3f47 0%, #2c2f36 100%); /* 渐变背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 阴影 */
}

.dropdown li {
  margin: 10px 0; /* 子菜单项间距 */
}

.dropdown a {
  color: #ffffff; /* 子菜单项字体颜色 */
  padding: 8px 12px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
  display: block; /* 使链接填充整个 li */
  transition: background 0.3s; /* 背景过渡效果 */
}

.dropdown a:hover {
  background-color: rgba(255, 255, 255, 0.1); /* 悬停时背景颜色 */
}

.expand-enter-active, .expand-leave-active {
  transition: max-height 1s ease, opacity 0.3s ease;
}
.expand-enter, .expand-leave-to {
  max-height: 0; /* 关闭时高度为0 */
  opacity: 0; /* 关闭时透明度为0 */
}

.expand-enter-to {
  max-height: 200px; /* 展开时最大高度 */
  opacity: 1; /* 展开时透明度为1 */
}

.content-area {
  margin-left: 240px;
  padding: 20px;
  flex: 1;
  background-color: #f7f7f7;
}


</style>
