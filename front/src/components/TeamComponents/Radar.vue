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
            this.toRaderData(3.77, 0),
            this.toRaderData(137, 1),
            this.toRaderData(72, 2),
            this.toRaderData(83, 3),
            this.toRaderData(0.422, 4),
            this.toRaderData(0.335, 5)
          ]
        },
        {
          name: "DeNA",
          data: [
            this.toRaderData(3.93, 0),
            this.toRaderData(133, 1),
            this.toRaderData(97, 2),
            this.toRaderData(62, 3),
            this.toRaderData(0.398, 4),
            this.toRaderData(0.329, 5)
          ]
        },
        {
          name: "阪神",
          data: [
            this.toRaderData(3.46, 0),
            this.toRaderData(174, 1),
            this.toRaderData(65, 2),
            this.toRaderData(40, 3),
            this.toRaderData(0.398, 4),
            this.toRaderData(0.315, 5)
          ]
        },
        {
          name: "広島",
          data: [
            this.toRaderData(3.68, 0),
            this.toRaderData(119, 1),
            this.toRaderData(87, 2),
            this.toRaderData(81, 3),
            this.toRaderData(0.392, 4),
            this.toRaderData(0.315, 5)
          ]
        },
        {
          name: "中日",
          data: [
            this.toRaderData(3.72, 0),
            this.toRaderData(142, 1),
            this.toRaderData(45, 2),
            this.toRaderData(63, 3),
            this.toRaderData(0.381, 4),
            this.toRaderData(0.317, 5)
          ]
        },
        {
          name: "ヤクルト",
          data: [
            this.toRaderData(4.78, 0),
            this.toRaderData(133, 1),
            this.toRaderData(102, 2),
            this.toRaderData(100, 3),
            this.toRaderData(0.362, 4),
            this.toRaderData(0.319, 5)
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
        yaxis: {
          show: false,
          tickAmount:5,
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
                  returnvalue = "防御率";
                  break;
                case 1:
                  returnvalue = "ホールドポイント";
                  break;
                case 2:
                  returnvalue = "失策数";
                  break;
                case 3:
                  returnvalue = "盗塁数";
                  break;
                case 4:
                  returnvalue = "長打率";
                  break;
                case 5:
                  returnvalue = "出塁率";
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
                    returnvalue = -(value / 2 - 5);
                    break;
                  case 1:
                    returnvalue = Math.round((200 * value) / 5);
                    break;
                  case 2:
                    returnvalue = Math.round(-(value / 0.07 - 112));
                    break;
                  case 3:
                    returnvalue = Math.round((value * 120) / 5);
                    break;
                  case 4:
                    returnvalue = value / 40 + 0.3;
                    break;
                  case 5:
                    returnvalue = value / 120 + 0.3;
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
        labels: ["投手力", "中継力", "守備力", "走力", "長打力", "出塁力"]
      }
    };
  },
  methods: {
    toRaderData(value, i) {
      let returnvalue = "";
      switch (i) {
        case 0:
          returnvalue = 2 * (5 - value);
          break;
        case 1:
          returnvalue = (5 * value) / 200;
          break;
        case 2:
          returnvalue = (112 - value) * 0.07;
          break;
        case 3:
          returnvalue = (5 * value) / 120;
          break;
        case 4:
          returnvalue = (value - 0.3) * 40;
          break;
        case 5:
          returnvalue = (value - 0.3) * 120;
          break;

        default:
          returnvalue = value;
          break;
      }
      return returnvalue;
    },
    toRawData(value, i) {
      let returnvalue = "";
      switch (i) {
        case 0:
          returnvalue = -(value / 2 - 5);
          break;
        case 1:
          returnvalue = (200 * value) / 5;
          break;
        case 2:
          returnvalue = value / 0.07 - 112;
          break;
        case 3:
          returnvalue = (value * 120) / 5;
          break;
        case 4:
          returnvalue = value / 40 + 0.3;
          break;
        case 5:
          returnvalue = value / 120 + 0.3;
          break;

        default:
          returnvalue = value;
          break;
      }
      return returnvalue;
    }
  },
  created() {}
};
</script>

<style scoped>
.contain {
  padding-top: 80px;
}
</style>