<template>
    <div class="container mx-auto p-4">
      <h3 class="text-xl font-bold mb-4"> 事件统计信息 </h3>
      <div class="flex flex-wrap justify-center space-x-4">
        <div id="barChart" class="w-full md:w-1/2 h-96 mb-4"></div>
        <div id="pieChart" class="w-full md:w-1/2 h-96 mb-4"></div>
        <div id="barChartLocation" class="w-full md:w-1/2 h-96 mb-4"></div>
        <div id="pieChartLocation" class="w-full md:w-1/2 h-96 mb-4"></div>
        <div id="barChartOldPerson" class="w-full md:w-1/2 h-96 mb-4"></div>
        <div id="pieChartOldPerson" class="w-full md:w-1/2 h-96 mb-4"></div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import { useEventStore } from '../stores/event';
  
  const store = useEventStore();
  const data = ref([]);
  const loading = ref(false);
  
  const loadData = async () => {
    loading.value = true;
    await store.fetchAllData();
    data.value = store.event;
    loading.value = false;
  };
  
  const locationCounts = ref({});
  const oldPersonCounts = ref({});
  
  const setupCharts = () => {
    const eventTypes = ['情感检测', '义工交互检测', '陌生人检测', '摔倒检测', '禁止区'];
    const eventCounts = [0, 0, 0, 0, 0];
  
    data.value.forEach(event => {
      eventCounts[event.event_type]++;
      if (locationCounts.value[event.event_location]) {
        locationCounts.value[event.event_location]++;
      } else {
        locationCounts.value[event.event_location] = 1;
      }
      if (oldPersonCounts.value[event.oldperson_id]) {
        oldPersonCounts.value[event.oldperson_id]++;
      } else {
        oldPersonCounts.value[event.oldperson_id] = 1;
      }
    });
  
    // 事件类型统计图表
    const barChart = echarts.init(document.getElementById('barChart'));
    const pieChart = echarts.init(document.getElementById('pieChart'));
    
    const barOption = {
      title: {
        text: '事件数量统计'
      },
      tooltip: {},
      xAxis: {
        data: eventTypes
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: eventCounts
        }
      ]
    };
    
    const pieOption = {
      title: {
        text: '事件类型占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '事件类型',
          type: 'pie',
          radius: '50%',
          data: eventTypes.map((type, index) => ({
            value: eventCounts[index],
            name: type
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  
    barChart.setOption(barOption);
    pieChart.setOption(pieOption);
  
    // 按地点统计图表
    const locationData = Object.keys(locationCounts.value).map(location => ({
      value: locationCounts.value[location],
      name: location
    }));
  
    const barChartLocation = echarts.init(document.getElementById('barChartLocation'));
    const pieChartLocation = echarts.init(document.getElementById('pieChartLocation'));
    
    const barOptionLocation = {
      title: {
        text: '按地点统计 - 次数'
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(locationCounts.value)
      },
      yAxis: {},
      series: [
        {
          name: '次数',
          type: 'bar',
          data: Object.values(locationCounts.value)
        }
      ]
    };
    
    const pieOptionLocation = {
      title: {
        text: '按地点统计 - 占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '地点',
          type: 'pie',
          radius: '50%',
          data: locationData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  
    barChartLocation.setOption(barOptionLocation);
    pieChartLocation.setOption(pieOptionLocation);
  
    // 按老人ID统计图表
    const oldPersonData = Object.keys(oldPersonCounts.value).map(id => ({
      value: oldPersonCounts.value[id],
      name: `老人ID ${id}`
    }));
  
    const barChartOldPerson = echarts.init(document.getElementById('barChartOldPerson'));
    const pieChartOldPerson = echarts.init(document.getElementById('pieChartOldPerson'));
    
    const barOptionOldPerson = {
      title: {
        text: '按老人ID统计 - 次数'
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(oldPersonCounts.value).map(id => `老人ID ${id}`)
      },
      yAxis: {},
      series: [
        {
          name: '次数',
          type: 'bar',
          data: Object.values(oldPersonCounts.value)
        }
      ]
    };
    
    const pieOptionOldPerson = {
      title: {
        text: '按老人ID统计 - 占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '老人ID',
          type: 'pie',
          radius: '50%',
          data: oldPersonData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  
    barChartOldPerson.setOption(barOptionOldPerson);
    pieChartOldPerson.setOption(pieOptionOldPerson);
  };
  
  onMounted(() => {
    loadData().then(() => {
      setupCharts();
    });
  });
</script>
  