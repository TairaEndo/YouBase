<template>
      <apexchart type="radar" height="250" width="250" :options="chartOptions" :series="series" />
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
      label_data: [],
      series: [],

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
        yaxis: {
          show: false,
          tickAmount: 5,
          min: 0,
          max: 5
        },
        stroke: {
          colors: [
            "#ff7043",
            "#73bae2",
            "#fad201",
            "#d86364",
            "#696ad2",
            "#b2d264"
          ],
          width: 3
        },
        fill: {
          colors: [
            "#ff7043",
            "#73bae2",
            "#fad201",
            "#d86364",
            "#696ad2",
            "#b2d264"
          ],
          opacity: 0.1
        },
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColor: [
            "#ff7043",
            "#73bae2",
            "#fad201",
            "#d86364",
            "#696ad2",
            "#b2d264"
          ],
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
                  returnvalue = "得点数";
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
              const el = i.dataPointIndex;
              result = toRawData(val, el);
              function toRawData(value, i) {
                let returnvalue = "";
                switch (i) {
                  case 0:
                    returnvalue = value / 120 + 0.3;
                    break;
                  case 1:
                    returnvalue = value / 40 + 0.3;
                    break;
                  case 2:
                    returnvalue = value*50
                    break;
                  case 3:
                    returnvalue = value*35+500
                    break;
                  case 4:

                    returnvalue = Math.round((value * 120) / 5);
                    break;
                  case 5:
                    // returnvalue = value / 120 + 0.3;
                    returnvalue = Math.round(-(value / 0.07 - 112));
                    break;

                  default:
                    returnvalue = value;
                    break;
                }
                return returnvalue;
              }
              return result;
            }
          },
          marker: {
            fillColors: [
              "#ff7043",
              "#73bae2",
              "#fad201",
              "#d86364",
              "#696ad2",
              "#b2d264"
            ]
          }
        },
        legend: {
          markers: {
            fillColors: [
              "#ff7043",
              "#73bae2",
              "#fad201",
              "#d86364",
              "#696ad2",
              "#b2d264"
            ]
          }
        },
        labels: ["出塁力", "長打力", "本塁打力", "得点力", "走力", "守備力"]
      }
    };
  },
  methods: {
    toRaderData(value, i) {
      let returnvalue = "";
      switch (i) {
        case 0:
          returnvalue = (value - 0.3) * 120;
          break;
        case 1:
          returnvalue = (value - 0.3) * 40;
          break;
        case 2:
          returnvalue = value / 50;
          break;
        case 3:
          returnvalue = (value-500) / 35;
          break;
        case 4:
          returnvalue = (5 * value) / 120;
          break;
        case 5:
          returnvalue = (112 - value) * 0.07;
          break;

        default:
          returnvalue = value;
          break;
      }
      return returnvalue;
    },
  },
  created() {
    axios
      .get("https://vb-sql.herokuapp.com/stats/2019/central/batter")
      .then(response => {
        response.data.forEach(el => {
          this.series.push({
            name: el["team_name"],
            data: [
              this.toRaderData(el["出塁率"], 0),
              this.toRaderData(el["長打率"], 1),
              this.toRaderData(el["本塁打"], 2),
              this.toRaderData(el["得点"], 3),
              this.toRaderData(el["盗塁"], 4),
              this.toRaderData(el["失策"], 5)
            ]
          });
          this.label_data.push({
            name: el["team_name"],
            data: [
              el["出塁率"],
              el["長打率"],
              el["本塁打"],
              el["得点"],
              el["盗塁"],
              el["失策"]
            ]
          });
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