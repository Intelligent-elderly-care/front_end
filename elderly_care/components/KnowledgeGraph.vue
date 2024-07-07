<template>
  <div>
    <div id="chart" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from '../plugins/axios'

const $axios = axios().provide.axios

export default {
  setup() {
    onMounted(async () => {
      const chartDom = document.getElementById('chart');
      const myChart = echarts.init(chartDom);
      let option;

      try {
        const response = await $axios.get('/api/graph');
        const data = response.data;

        option = {
          title: {
            text: 'Knowledge Graph',
          },
          tooltip: {},
          legend: [{
            data: ['OldPerson', 'Volunteer', 'Employee', 'Event']
          }],
          series: [{
            type: 'graph',
            layout: 'force',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            force: {
              repulsion: 1000
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: data.nodes,
            links: data.links,
            categories: [
              { name: 'OldPerson' },
              { name: 'Volunteer' },
              { name: 'Employee' },
              { name: 'Event' }
            ],
            lineStyle: {
              color: 'source',
              curveness: 0.3
            }
          }]
        };

        myChart.setOption(option);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
</script>
