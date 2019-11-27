<template>
  <div>
    <!-- <v-container> -->
    <v-row style="padding-top:100px;" justify="center">
      <v-card class="card" outlined>
        <v-card-title class="title">セリーグ球団別野手レーダー</v-card-title>
        <v-row class="central-a" justify="center">
          <giantsbatter></giantsbatter>
          <baystarsbatter></baystarsbatter>
          <tigersbatter></tigersbatter>
        </v-row>
        <v-row justify="center">
          <carpbatter></carpbatter>
          <dragonsbatter></dragonsbatter>
          <swallowsbatter></swallowsbatter>
        </v-row>
      </v-card>
   

          <v-card class="card" outlined>
        <v-card-title class="title">セリーグ球団別投手レーダー</v-card-title>
        <v-row class="central-a" justify="center">
          <giantspitcher></giantspitcher>
          <baystarspitcher></baystarspitcher>
          <tigerspitcher></tigerspitcher>
        </v-row>
        <v-row justify="center">
          <carppitcher></carppitcher>
          <dragonspitcher></dragonspitcher>
          <swallowspitcher></swallowspitcher>
        </v-row>
      </v-card>
       </v-row>
    <!-- </v-container> -->
  </div>
</template>

<script>
import giantsbatter from "./TeamComponents/RadarBatterComponents/Giants";
import baystarsbatter from "./TeamComponents/RadarBatterComponents/Baystars";
import tigersbatter from "./TeamComponents/RadarBatterComponents/Tigers";
import carpbatter from "./TeamComponents/RadarBatterComponents/Carp";
import dragonsbatter from "./TeamComponents/RadarBatterComponents/Dragons";
import swallowsbatter from "./TeamComponents/RadarBatterComponents/Swallows";

import giantspitcher from "./TeamComponents/RadarPitcherComponents/Giants";
import baystarspitcher  from "./TeamComponents/RadarPitcherComponents/Baystars";
import tigerspitcher  from "./TeamComponents/RadarPitcherComponents/Tigers";
import carppitcher  from "./TeamComponents/RadarPitcherComponents/Carp";
import dragonspitcher  from "./TeamComponents/RadarPitcherComponents/Dragons";
import swallowspitcher  from "./TeamComponents/RadarPitcherComponents/Swallows";

// import radar from "./TeamComponents/RadarBatterComponents/BatterRadar";

export default {
  components: {
    giantsbatter,
    baystarsbatter,
    tigersbatter,
    carpbatter,
    dragonsbatter,
    swallowsbatter,

    giantspitcher,
    baystarspitcher,
    tigerspitcher,
    carppitcher,
    dragonspitcher,
    swallowspitcher
    // radar
  },
  data: function() {
    return {};
  },
  methods: {},
  created: function() {}
};
</script>
<style scoped>
.card {
  width: 1000px;
}
.central-a {
  margin-bottom: -15px;
}
</style>
