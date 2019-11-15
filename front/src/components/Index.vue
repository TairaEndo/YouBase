<template>
  <v-container>
    <div>
      <v-card style="margin-top:100px;" class="mx-auto" max-width="600" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">打率変化</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <apexchart type="line" height="300" :options="chartOptions" :series="series" />
        <v-row align="center" justify="space-around">
          <v-col cols="10">
            <v-select
              v-model="players"
              v-on:change="updateChart(players)"
              :items="items"
              chips
              multiple
              :append-icon="'mdi-plus'"
              label="選手を選択"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-col cols="10">
            <v-range-slider
              v-on:change="updateChart(players)"
              label="表示範囲"
              step="0.05"
              min="0"
              max="1"
              v-model="range"
              thumb-label
            ></v-range-slider>
          </v-col>
        </v-row>
      </v-card>
      <v-container style="margin-bottom: 100%"></v-container>
    </div>
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
      items: [],
      players: [],
      range: [0, 1],
      chartOptions: {
        xaxis: {
          categories: [],
          type: "datetime"
        },
        yaxis: {
          title: {
            text: "Average"
          },
          min: 0,
          max: 1
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  },
  methods: {
    updateChart(players) {
      axios.get(`https://vb-sql.herokuapp.com/average/`).then(response => {
        const chartOptions_data = {
          annotations: {
            xaxis: [
              {
                x: new Date("4 Jun 2019").getTime(),
                x2: new Date("25 Jun 2019").getTime(),
                fillColor: "#B3F7CA",
                opacity: 0.4,
                label: {
                  borderColor: "#B3F7CA",
                  style: {
                    fontSize: "10px",
                    color: "#fff",
                    background: "#00E396"
                  },
                  offsetY: -10,
                  text: "交流戦"
                }
              }
            ]
          },
          xaxis: { categories: [], type: "datetime" },
          yaxis: {
            title: {
              text: "Average"
            },
            min: this.range[0],
            max: this.range[1]
          }
        };
        const series_data = [];
        players.forEach((player, i) => {
          series_data.push({ name: player, data: [] });
          response.data.forEach(element => {
            chartOptions_data.xaxis.categories.push(
              Date.parse(element.GameDate)
            );
            series_data[i].data.push(Math.round(element[player] * 1000) / 1000);
          });
        });
        this.chartOptions = chartOptions_data;
        this.series = series_data;
      });
    }
  },
  created: function() {
    const index = [];
    axios.get("https://vb-sql.herokuapp.com/average/").then(response => {
      Object.keys(response.data[0]).forEach((el, i) => {
        if (i >= 2) {
          index.push(`${el}`);
        }
      });
    });

    this.items = index;
  }
};
</script>
