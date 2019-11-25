<template>
  <v-container class="contain">
    <v-card class="card" outlined>
      <v-card-title class="title">変化球別球速</v-card-title>
      <apexchart type="radialBar" height="350" :options="chartOptions" :series="series" />
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
        (152 / 160) * 100,
        (123 / 160) * 100,
        (142 / 160) * 100,
        (130 / 160) * 100
      ],
      chartOptions: {
        theme: {
          mode:'dark',
          palette: "palette4" // upto palette10
        },
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined
            },
            track: {
              background: "#2b314c"
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        chart: {
          animations: {
            enabled: true,
            easing: "easeinout", // linear, easeout, easein, easeinout, swing, bounce, elastic
            speed: 2000,
            animateGradually: {
              delay: 300,
              enabled: true
            },
            dynamicAnimation: {
              enabled: true,
              speed: 300
            }
          }
        },

        // colors: ["#FF0080", "#00E9FF", "#83FF00", "#FFAE00"],
        labels: ["ストレート", "カーブ", "フォーク", "スライダー"],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "left",
          offsetX: 160,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            // return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
            return (
              seriesName +
              ":  " +
              (opts.w.globals.series[opts.seriesIndex] * 160) / 100 +
              "km/h"
            );
          },
          itemMargin: {
            horizontal: 1
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }
        ],
        stroke: {
          lineCap: "round"
        }
      }
    };
  }
};
</script>

<style scoped>
</style>