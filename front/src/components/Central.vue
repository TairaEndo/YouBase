<template>
  <div>
    <v-row style="padding-top:70px;" justify="center">
      <v-card class="card" outlined>
        <v-card-title class="title">
          セリーグ球団別野手レーダー
          <v-select
            style="max-width:200px; margin-top:10px;"
            v-model="batterYear"
            :items="years"
            label="年度を選択"
            rounded
            v-on:change="UpdateBatter"
          ></v-select>
        </v-card-title>
        <v-row  justify="center">
          <bradar
            ref="bG"
            v-bind:year="batterYear"
            teamShortName="巨人"
            teamLongName="読売ジャイアンツ"
            teamColor="#ff7043"
          ></bradar>
          <bradar
            ref="bDe"
            v-bind:year="batterYear"
            teamShortName="DeNA"
            teamLongName="横浜DeNAベイスターズ"
            teamColor="#73bae2"
          ></bradar>
          <bradar
            ref="bT"
            v-bind:year="batterYear"
            teamShortName="阪神"
            teamLongName="阪神タイガース"
            teamColor="#fad201"
          ></bradar>
        </v-row>
        <v-row  justify="center">
          <bradar
            ref="bC"
            v-bind:year="batterYear"
            teamShortName="広島"
            teamLongName="広島東洋カープ"
            teamColor="#d86364"
          ></bradar>
          <bradar
            ref="bD"
            v-bind:year="batterYear"
            teamShortName="中日"
            teamLongName="中日ドラゴンズ"
            teamColor="#696ad2"
          ></bradar>
          <bradar
            ref="bS"
            v-bind:year="batterYear"
            teamShortName="ヤクルト"
            teamLongName="東京ヤクルトスワローズ"
            teamColor="#b2d264"
          ></bradar>
        </v-row>
      </v-card>

      <v-card class="card" outlined>
        <v-card-title class="title">
          セリーグ球団別投手レーダー
          <v-select
            style="max-width:200px; margin-top:10px;"
            v-model="pitcherYear"
            :items="years"
            label="年度を選択"
            rounded
            v-on:change="UpdatePitcher"
          ></v-select>
        </v-card-title>
        <v-row class="central-a" justify="center">
          <pradar
            ref="pG"
            v-bind:year="pitcherYear"
            teamShortName="巨人"
            teamLongName="読売ジャイアンツ"
            teamColor="#ff7043"
          ></pradar>
          <pradar
            ref="pDe"
            v-bind:year="pitcherYear"
            teamShortName="DeNA"
            teamLongName="横浜DeNAベイスターズ"
            teamColor="#73bae2"
          ></pradar>
          <pradar
            ref="pT"
            v-bind:year="pitcherYear"
            teamShortName="阪神"
            teamLongName="阪神タイガース"
            teamColor="#fad201"
          ></pradar>
        </v-row>
        <v-row justify="center">
          <pradar
            ref="pC"
            v-bind:year="pitcherYear"
            teamShortName="広島"
            teamLongName="広島東洋カープ"
            teamColor="#d86364"
          ></pradar>
          <pradar
            ref="pD"
            v-bind:year="pitcherYear"
            teamShortName="中日"
            teamLongName="中日ドラゴンズ"
            teamColor="#696ad2"
          ></pradar>
          <pradar
            ref="pS"
            v-bind:year="pitcherYear"
            teamShortName="ヤクルト"
            teamLongName="東京ヤクルトスワローズ"
            teamColor="#b2d264"
          ></pradar>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import bradar from "./TeamComponents/RadarBatter";
import pradar from "./TeamComponents/RadarPitcher";

export default {
  components: {
    bradar,
    pradar,
  },
  data: function() {
    return {
      pitcherYear: 2019,
      batterYear: 2019,
      years: [2014, 2015, 2016, 2017, 2018, 2019]
    };
  },
  methods: {
    UpdateBatter() {
      this.$refs.bG.update(this.batterYear);
      this.$refs.bDe.update(this.batterYear);
      this.$refs.bT.update(this.batterYear);
      this.$refs.bC.update(this.batterYear);
      this.$refs.bD.update(this.batterYear);
      this.$refs.bS.update(this.batterYear);
    },
    UpdatePitcher() {
      this.$refs.pG.update(this.pitcherYear);
      this.$refs.pDe.update(this.pitcherYear);
      this.$refs.pT.update(this.pitcherYear);
      this.$refs.pC.update(this.pitcherYear);
      this.$refs.pD.update(this.pitcherYear);
      this.$refs.pS.update(this.pitcherYear);
    }
  },
  created: function() {}
};
</script>
<style scoped>
.card {
  width: 1000px;
  margin-bottom:10px;
}
</style>
