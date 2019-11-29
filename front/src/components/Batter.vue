<template>
  <div>
    <v-row style="margin-top: 58px;" justify="center">
      <v-col class="col">
        <average :players_data="players_data"></average>
      </v-col>
      <v-col class="col">
        <ops :players_data="players_data"></ops>
      </v-col>
      <v-col class="col">
        <homerun :players_data="players_data"></homerun>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="col">
        <rbi :players_data="players_data"></rbi>
      </v-col>
      <v-col class="col">
        <hit :players_data="players_data"></hit>
      </v-col>
      <v-col class="col">
        <bb :players_data="players_data"></bb>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import average from "./BatterComponents/Average";
import homerun from "./BatterComponents/HR";
import ops from "./BatterComponents/OPS";
import bb from "./BatterComponents/BB";
import rbi from "./BatterComponents/Rbi";
import hit from "./BatterComponents/Hit";

import axios from "axios";

export default {
  components: {
    average,
    homerun,
    ops,
    hit,
    bb,
    rbi
  },
  data: function() {
    return {
      players_data:[]
    };
  },
  methods: {},
  created: function() {
    axios.get("https://vb-sql.herokuapp.com/info/batter").then(response => {
      this.players_data = response.data;
    });
  }
};
</script>
<style scoped>
.col {
  max-width: 400px;
}
</style>
