<template>
  <iframe src="https://www.baidu.com" frameborder="0">
    
  </iframe>
  
  <div id="main" ref="chartRef" style="width: 600px; height: 400px;"></div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const chartRef = ref<HTMLDivElement | null>(null);
const myChart = ref<echarts.ECharts | null>(null);

const initChart = () => {
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
                formatter: '{value}'
              },
              data: [
                {
                  value: 0,
                  name: 'Pod 数量'
                }
              ]
            }
          ]
        };
        myChart.value.setOption(option);
      }
    }

    const fetchData = async () => {
      try {
        // 假设后端 API 为 /api/pod-count 返回一个包含 podCount 属性的对象
        const response = await axios.get('/api/pod-count');
        const podCount = response.data.podCount;

        if (myChart.value) {
          myChart.value.setOption({
            series: [{
              data: [{
                value: podCount,
                name: 'Pod 数量'
              }]
            }]
          });
        }
      } catch (error) {
        console.error('Error fetching Pod count:', error);
      }
    }

    onMounted(() => {
      initChart();
      fetchData(); // 初始化时获取一次数据
      setInterval(fetchData, 5000); // 每5秒更新一次数据
    })
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>
