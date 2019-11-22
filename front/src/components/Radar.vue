<template>
  <v-container class="contain">
    <v-card class="card" outlined>
      <v-card-title class="title">チーム別スコア</v-card-title>
      <apexchart type="radar" height="350" :options="chartOptions" :series="series" />
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
export default {
  data: function() {
    return {
      series: [
        {
          name: "読売",
          data: [
            2 * (5 - 3.77),
            (5 * 137) / 200,
            (110 - 72) * 0.07,
            (5 * 83) / 120,
            (0.422 - 0.3) * 40,
            (0.335 - 0.3) * 120
          ]
        },
        {
          name: "DeNA",
          data: [
            2 * (5 - 3.93),
            (5 * 133) / 200,
            (110 - 97) * 0.07,
            (5 * 62) / 120,
            (0.398 - 0.3) * 40,
            (0.329 - 0.3) * 120
          ]
        },
        {
          name: "阪神",
          data: [
            2 * (5 - 3.46),
            (5 * 174) / 200,
            (110 - 65) * 0.07,
            (5 * 40) / 120,
            (0.398 - 0.3) * 40,
            (0.315 - 0.3) * 120
          ]
        },
        {
          name: "広島",
          data: [
            2 * (5 - 3.68),
            (5 * 119) / 200,
            (110 - 87) * 0.07,
            (5 * 81) / 120,
            (0.392 - 0.3) * 40,
            (0.324 - 0.3) * 120
          ]
        },
        {
          name: "中日",
          data: [
            2 * (5 - 3.72),
            (5 * 142) / 200,
            (110 - 45) * 0.07,
            (5 * 63) / 120,
            (0.381 - 0.3) * 40,
            (0.317 - 0.3) * 120
          ]
        },
        {
          name: "ヤクルト",
          data: [
            2 * (5 - 4.78),
            (5 * 133) / 200,
            (110 - 102) * 0.07,
            (5 * 100) / 120,
            (0.362 - 0.3) * 40,
            (0.319 - 0.3) * 120
          ]
        }
      ],

      chartOptions: {
        theme: {
          mode: "dark",
          palette: "palette4" // upto palette10
        },
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        stroke: {
          width: 0
        },
        fill: {
          colors: [
            "#ff4500",
            "#00bfff",
            "#ffff00",
            "#ff0000",
            "#0000cd",
            "#00ff00"
          ],
          opacity: 0.4
        },
        legend:{
            markers:{
                fillColors:[
            "#ff4500",
            "#00bfff",
            "#ffff00",
            "#ff0000",
            "#0000cd",
            "#00ff00"
          ]
            }
        },
        markers: {
          size: 0
        },
        labels: ["投手力", "中継力", "守備力", "走力", "長打力", "出塁力"]
      }
    };
  }
};
</script>

<style scoped>
.contain{
    padding-top: 80px;
}
</style>