<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <div style="padding: 10px; display: flex; align-items: center;">
      <select v-model="selectedEntity">
        <option value="Employee">Employee</option>
        <option value="OldPerson">OldPerson</option>
        <option value="Volunteer">Volunteer</option>
        <option value="Event">Event</option>
      </select>
      <input v-model="keyword" placeholder="输入关键词搜索" style="margin-left: 10px;" />
      <button @click="search" style="margin-left: 10px;">搜索</button>
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
    const selectedEntity = ref('Employee');
    const myChart = ref(null);

    onMounted(async () => {
      const chartDom = document.getElementById('chart');
      myChart.value = echarts.init(chartDom);
      await fetchData();
    });

    const fetchData = async (searchQuery = '') => {
      const $kgInstance = axios.create({
        baseURL: 'http://localhost:9010', 
        timeout: 5000,
      });

      try {
        const response = await $kgInstance.get('/api/graph', {
          params: { query: searchQuery }
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
            symbolSize: 10,
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
      const entity = selectedEntity.value;
      const queryKeyword = keyword.value ? `.*${keyword.value}.*` : '';
      const query = `MATCH (n:${entity}) WHERE n.name =~ '${queryKeyword}' RETURN n LIMIT 25`;

      fetchData(query);
    };

    return {
      keyword,
      selectedEntity,
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
