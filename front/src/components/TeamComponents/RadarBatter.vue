<template>
  <apexchart type="radar" height="250" width="300" :options="chartOptions" :series="series" />
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

let label_data = {};

export default {
  props: ["year", "teamShortName", "teamLongName", "teamColor"],
  data: function() {
    return {
      series: [],
      chartOptions: {
        title: {
          text: this.teamLongName
        },
        // theme: {
        //     mode: "dark"
        // },
        plotOptions: {
          radar: {
            polygons: {
              strokeColor: "#e9e9e9",
              fill: {
                colors: ["#f8f8f8", "#fff"]
              }
            }
          }
        },
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          toolbar: {
            show: false
          }
        },
        yaxis: {
          show: false,
          tickAmount: 5,
          min: 0,
          max: 5
        },
        stroke: {
          colors: [this.teamColor],
          width: 3
        },
        fill: {
          colors: [this.teamColor],
          opacity: 0.1
        },
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColor: [this.teamColor],
          strokeWidth: 1
        },
        tooltip: {
          x: {
            show: true,
            formatter: function(val, i) {
              let returnvalue = "";
              switch (i.dataPointIndex) {
                case 0:
                  returnvalue = "出塁率";
                  break;
                case 1:
                  returnvalue = "長打率";
                  break;
                case 2:
                  returnvalue = "本塁打数";
                  break;
                case 3:
                  returnvalue = "打点数";
                  break;
                case 4:
                  returnvalue = "盗塁数";
                  break;
                case 5:
                  returnvalue = "失策数";
                  break;
                default:
                  break;
              }
              return returnvalue;
            }
          },
          y: {
            formatter: function(val, i) {
              let result = "";
              const num = i.dataPointIndex;
              result = label_data[i.w.config.series[0].name][num];
              return result;
            },
          },
          marker: {
            fillColors: [this.teamColor]
          }
        },
        legend: {
          markers: {
            fillColors: [this.teamColor]
          }
        },
        labels: ["出塁力", "長打力", "本塁打力", "打点力", "走力", "守備力"]
      }
    };
  },
  methods: {
    update(val) {
      this.series = [];
      axios
        .get(`https://vb-sql.herokuapp.com/stats/${val}/central/batter`)
        .then(response => {
          response.data.forEach(el => {
            if (el["team_name"] == this.teamShortName) {
              this.series.push({
                name: this.teamShortName,
                data: [
                  this.getNormValue(el["出塁率"], 0.3, 0.349, 0.5, 4.5, false),
                  this.getNormValue(
                    el["長打率"],
                    0.338,
                    0.431,
                    0.5,
                    4.5,
                    false
                  ),
                  this.getNormValue(el["本塁打"], 71, 183, 0.5, 4.5, false),
                  this.getNormValue(el["打点"], 434, 705, 0.5, 4.5, false),
                  this.getNormValue(el["盗塁"], 39, 118, 0.5, 4.5, false),
                  this.getNormValue(el["失策"], 45, 116, 0.5, 4.5, true)
                ]
              });
              label_data[this.teamShortName] = [
                el["出塁率"],
                el["長打率"],
                el["本塁打"],
                el["得点"],
                el["盗塁"],
                el["失策"]
              ];
              // label_data[this.teamShortName]=this.label_data
            }
          });
        });
    },
    getNormValue(target, minimum, maximum, minPos, maxPos, reverse) {
      let normValue = "";
      if (!reverse) {
        normValue =
          minPos +
          ((maxPos - minPos) * (target - minimum)) / (maximum - minimum);
      } else {
        normValue =
          minPos +
          ((maxPos - minPos) * (maximum - target)) / (maximum - minimum);
      }

      return normValue;
    }
  },
  created() {
    this.update(this.year);
  }
};
</script>

<style scoped>
.contain {
  padding-top: 80px;
}
</style>