<template>  
  <div id="main" ref="chartRef" style="width: 600px; height: 400px;"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const chartRef = ref<HTMLDivElement | null>(null);
const myChart = ref<echarts.ECharts | null>(null);
const defaultMax = 100; // 默认的 max 值

// 初始化图表
const initChart = (max: number, initialValue: number) => {
  if (chartRef.value) {
    myChart.value = echarts.init(chartRef.value);
    const option: echarts.EChartsOption = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}'
      },
      series: [
        {
          name: 'Pods',
          type: 'gauge',
          progress: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']],
              width: 30,
            }
          },
          detail: {
            valueAnimation: true,
            formatter: (value: number) => Math.floor(value).toString(), // 确保显示整数
          },
          max: max, // 动态设置 max
          data: [
            {
              value: initialValue,
              name: 'Pod 数量'
            }
          ]
        }
      ]
    };
    myChart.value.setOption(option);
  }
};

// 获取 Pod 数量
const fetchPodCount = async () => {
  try {
    const response = await axios.get<{ totalPods: number }>('http://localhost:8080/api/pod-count');
    return response.data.totalPods;
  } catch (error) {
    console.error('Error fetching Pod count:', error);
    return null; // 返回 null 表示获取失败
  }
};

// 更新图表数据
const updateChartData = async () => {
  const podCount = await fetchPodCount();
  if (podCount !== null && myChart.value) {
    const newMax = podCount + 10; // 设置新的 max
    myChart.value.setOption({
      series: [{
        max: newMax, // 动态更新 max
        data: [{
          value: podCount,
          name: 'Pod 数量'
        }]
      }]
    });
  }
};

// 组件挂载后执行的逻辑
onMounted(async () => {
  const initialPodCount = await fetchPodCount();
  const initialMax = initialPodCount !== null ? initialPodCount + 10 : defaultMax; // 初始 max
  initChart(initialMax, initialPodCount || 0); // 初始化图表
  updateChartData(); // 初始化时获取一次数据
  setInterval(updateChartData, 5000); // 每5秒更新一次数据
});
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>
