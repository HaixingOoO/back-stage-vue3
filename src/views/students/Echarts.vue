<template>
  <div ref="Echart" class="w-full h-3/4">Echarts</div>
</template>
<script lang="ts" setup>
import { echarts } from "../../plugins";
import { ref, nextTick } from "vue";

const Echart = ref(null);

nextTick(() => {
  var myChart = echarts.init(Echart.value as unknown as HTMLElement);
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
});
</script>
