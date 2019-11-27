<template>
  <v-container class="contain">
    <v-card class="card" outlined>
      <v-card-title class="title">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on" />
          </template>
          <v-card>
              <v-card-text>チーム選択とかつける</v-card-text>
          </v-card>
        </v-menu>OPS変化
      </v-card-title>
      <apexchart type="line" height="250" width="370" :options="chartOptions" :series="series" />
      <v-row align="center" justify="space-around">
        <v-col class="selector" cols="10">
          <v-select
            v-model="players"
            v-on:change="updateChart(players)"
            :items="players_data"
            item-text="batter_jp"
            item-value="batter"
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
            max="4"
            v-model="range"
            thumb-label
          ></v-range-slider>
        </v-col>
      </v-row>
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
      menu: false,
      players: ['YamadaTetsuto'],
      players_data: [],
      range: [0, 1.5],
      chartOptions: {
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
            text: "OPS"
          },
          min: 0,
          max: 1.5
        }
      },
      series: []
    };
  },
  methods: {
    updateChart(players) {
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
            text: "OPS"
          },
          min: this.range[0],
          max: this.range[1]
        }
      };
      const series_data = [];

      axios.get("https://vb-sql.herokuapp.com/B_OPS").then(response => {
        const dates = response.data.map(x => Date.parse(x.GameDate));
        chartOptions_data.xaxis.categories = dates;
        players.forEach((p, i) => {
        const bname = this.players_data.filter(el=>{
              return el.batter === p
        })
          series_data.push({ name: bname[0].batter_jp, data: []});
          response.data.forEach(el => {
            series_data[i].data.push(el[`${p}`]);
          });
        });
        this.chartOptions = chartOptions_data;
        this.series = series_data;
      });
    },
  },
  created: function() {
    this.updateChart(this.players)
    axios.get("https://vb-sql.herokuapp.com/info/batter").then(response => {
      this.players_data = response.data;
    });
    
  }
};
</script>

<style scoped>
.contain{
    padding: 0px;
    max-width: 400px;
}
.card {
  margin: 0px;
}
.title {
  padding-bottom: 0px;
}
.selector {
  padding: 0px;
}
.v-text-field {
  padding: 0px;
}
</style>
