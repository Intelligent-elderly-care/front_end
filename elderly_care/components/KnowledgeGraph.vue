<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <div style="padding: 10px;">
      <input v-model="keyword" placeholder="输入关键词搜索" />
      <button @click="search">搜索</button>
    </div>
    <div id="chart" style="flex-grow: 1;"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  setup() {
    const keyword = ref('');
    const myChart = ref(null);

    onMounted(async () => {
      const chartDom = document.getElementById('chart');
      myChart.value = echarts.init(chartDom);
      await fetchData();
    });

    const fetchData = async (searchKeyword = '') => {
      const $kgInstance = axios.create({
        baseURL: 'http://localhost:9010', 
        timeout: 5000,
      });

      try {
        const response = await $kgInstance.get('/api/graph', {
          params: { keyword: searchKeyword }
        });
        const data = response.data;

        const categories = [
          { name: 'OldPerson', itemStyle: { color: '#FF4500' } },
          { name: 'Volunteer', itemStyle: { color: '#32CD32' } },
          { name: 'Employee', itemStyle: { color: '#1E90FF' } },
          { name: 'Event', itemStyle: { color: '#FFD700' } }
        ];

        const linkColorMap = {
          'ASSOCIATES_WITH': '#FF4500',
          'HELP': '#32CD32',
          'INVOLVES': '#1E90FF'
        };

        const option = {
          title: {
            text: '老人-工作人员-义工-事件知识图谱',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              if (params.dataType === 'node') {
                return `
                  <strong>${params.data.name}</strong><br>
                  ${Object.keys(params.data.properties).map(key => `${key}: ${params.data.properties[key]}`).join('<br>')}
                `;
              } else {
                return `${params.data.source} ${params.data.type} ${params.data.target}`;
              }
            },
            position: function (point, params, dom, rect, size) {
              return [point[0] + 10, point[1] - 10];
            }
          },
          legend: [{
            data: categories.map(a => a.name)
          }],
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 10, // 进一步减少符号大小
            roam: true,
            label: {
              show: true,
              position: 'right'
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 12
            },
            data: data.nodes.map(node => {
              const category = node.labels[0];
              return {
                ...node,
                category,
                itemStyle: {
                  color: categories.find(cat => cat.name === category)?.itemStyle.color
                }
              };
            }),
            links: data.links.map(link => {
              return {
                ...link,
                lineStyle: {
                  color: linkColorMap[link.type] || '#000000'
                }
              };
            }),
            categories,
            lineStyle: {
              curveness: 0.3
            }
          }]
        };

        myChart.value.setOption(option);
      } catch (error) {
        console.error(error);
      }
    };

    const search = () => {
      fetchData(keyword.value);
    };

    return {
      keyword,
      search
    };
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}
</style>