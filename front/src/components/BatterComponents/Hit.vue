<template>
  <v-container class="contain">
    <v-card class="card" outlined>
      <v-card-title class="title">
        <v-menu v-model="menu" :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on" />
          </template>
          <v-card>
            <v-card-text><v-btn @click="reset()" small>全選手選択解除</v-btn></v-card-text>
          </v-card>
        </v-menu>安打数変化
      </v-card-title>
      <div style="z-index:0;">
      <apexchart type="line" height="250" width="370" :options="chartOptions" :series="series" /></div>
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
            step="5"
            min="0"
            max="220"
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
  props:{
    players_data:Array
  },
  data: function() {
    return {
      menu: false,
      players: ['SakamotoHayato','OshimaYohei'],
      range: [0, 200],
      chartOptions: {
        theme: {
          palette: "palette4" // upto palette10
        },
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
            text: "安打数"
          },
          min: 0,
          max: 200
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
            text: "安打数"
          },
          min: this.range[0],
          max: this.range[1]
        }
      };
      const series_data = [];

      axios.get("https://vb-sql.herokuapp.com/B_H").then(response => {
        const dates = response.data.map(x => Date.parse(x.GameDate));
        chartOptions_data.xaxis.categories = dates;
        players.forEach((p, i) => {
          const bname = this.players_data.filter(el => {
            return el.batter === p;
          });
          series_data.push({ name: bname[0].batter_jp, data: [], all: 0 });
          response.data.forEach(el => {
            series_data[i].all += parseInt(el[`${p}`]);
            series_data[i].data.push(series_data[i].all);
          });
        });
        this.chartOptions = chartOptions_data;
        this.series = series_data;
      });
    },
    reset(){
      this.players=[]
      this.updateChart(this.players)
    }
  },
  created: function() {
    this.updateChart(this.players)
  }
};
</script>

<style scoped>
.contain {
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
