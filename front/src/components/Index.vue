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
              v-model="value"
              v-on:change="updateChart(value)"
              :items="items"
              chips
              multiple
              :append-icon="'mdi-plus'"
              label="選手を選択"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>
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
      items: ["YamadaTetsuto", "SuzukiSeiya", "SakamotoHayato"],
      value: [],
      averageData: [],
      chartOptions: {
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          type: 'datetime',
        },
         yaxis: {
            title: {
              text: 'Average'
            },
            min: 0,
            max: 0.5
          },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  },
  watch: {
    multiple(val) {
      if (val) this.model = [this.model];
      else this.model = this.model[0] || "Foo";
    }
  },
  methods: {
    updateChart(value) {
      // const options = { xaxis: { categories: [] } };
      // const datas = [];
      // value.forEach((player, i) => {
      //   datas.push([{ name: `${player}`, data: [] }]);
      //   axios
      //     .get(`https://vb-sql.herokuapp.com/average/${player}`)
      //     .then(response => {
      //       const gamenumArray = [];
      //       response.data.forEach(data => {
      //         gamenumArray.push(data.gamenum);
      //         datas[i][0].data.push(data[`$player`]);
      //       });
      //       options.xaxis.categories = gamenumArray;
      //       this.averageData = response.data;
      //     });
      // });

      // this.chartOptions = options;
      // this.series = datas[0];

      axios.get(`https://vb-sql.herokuapp.com/average/`).then(response => {
        // this.averageData = response.data;
        // console.log(response)
        const chartOptions_data = { xaxis: { categories: [],type: 'datetime'} };
        const series_data = [];
        value.forEach((player, i) => {
          series_data.push({ name: player, data: [] });
          response.data.forEach(element => {
            // console.log(Date.parse(element.GameDate))
            // chartOptions_data.xaxis.categories.push(element.gamenum);
            chartOptions_data.xaxis.categories.push(Date.parse(element.GameDate));

            series_data[i].data.push(Math.round(element[player]*1000)/1000);
            // console.log(element[player])
          });
        });
        // const series_data = [{ name: value[0], data: [] }];

        this.chartOptions = chartOptions_data;
        this.series = series_data;
      });
    }
  }
};
</script>
