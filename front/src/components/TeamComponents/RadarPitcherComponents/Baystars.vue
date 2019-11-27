<template>
    <apexchart type="radar" height="250" width="300" :options="chartOptions" :series="series" />
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
let label_data = []
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
export default {
  data: function() {
    return {
      series: [],
      chartOptions: {
        title: {
          text: "横浜DeNAベイスターズ "
        },
        theme: {
          mode: "dark"
        },
        chart: {
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        yaxis: {
          show: false,
          tickAmount: 5,
          min: 0,
          max: 5
        },
        stroke: {
          colors: ["#73bae2"],
          width: 3
        },
        fill: {
          colors: ["#73bae2"],
          opacity: 0.1
        },
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColor: ["#73bae2"],
          strokeWidth: 1
        },
        tooltip: {
          x: {
            show: true,
            formatter: function(val, i) {
              let returnvalue = "";
              switch (i.dataPointIndex) {
                case 0:
                  returnvalue = "防御率";
                  break;
                case 1:
                  returnvalue = "完投＋完封";
                  break;
                case 2:
                  returnvalue = "ホールドポイント";
                  break;
                case 3:
                  returnvalue = "セーブ";
                  break;
                case 4:
                  returnvalue = "与四球＋与死球";
                  break;
                case 5:
                  returnvalue = "奪三振数";
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
              result = label_data[num]
              return result;
            }
          },
          marker: {
            fillColors: ["#fad201"]
          }
        },
        legend: {
          markers: {
            fillColors: ["#73bae2"]
          }
        },
        labels: ["総合投手力", "先発力", "中継力", "抑え力", "制球力", "奪三振力"]
      }
    };
  },
  methods: {
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
    axios
      .get("https://vb-sql.herokuapp.com/stats/2019/central/pitcher")
      .then(response => {
        response.data.forEach(el => {
          if (el["team_name"] == "DeNA") {
            this.series.push({
              name: "DeNA",
              data: [
                this.getNormValue(el["防御率"], 2.78, 4.78, 0.5, 4.5, true),
                this.getNormValue(parseInt(el["完投"])+parseInt(el["完封"]), 5, 37, 0.5, 4.5, false),
                this.getNormValue(el["HP"], 70, 174, 0.5, 4.5, false),
                this.getNormValue(el["セーブ"], 18, 43, 0.5, 4.5, false),
                this.getNormValue(parseInt(el["与四球"])+parseInt(el["与死球"]), 413, 576, 0.5, 4.5,true),
                this.getNormValue(el["奪三振"], 872, 1223, 0.5, 4.5, true)
              ]
            });
            label_data=[
              el["防御率"],
              parseInt(el["完投"])+parseInt(el["完封"]),
              el["HP"],
              el["セーブ"],
              parseInt(el["与四球"])+parseInt(el["与死球"]),
              el["奪三振"]
            ];
            console.log(label_data)
          }
        });
      });
  }
};
</script>

<style scoped>
.contain {
  padding-top: 80px;
}
</style>