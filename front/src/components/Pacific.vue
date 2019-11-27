<template>
  <div>
    <v-row style="padding-top:70px;" justify="center">
      <v-card class="card" outlined>
        <v-card-title class="title">
          パリーグ球団別野手レーダー
          <v-select
            style="max-width:200px; margin-top:10px;"
            v-model="batterYear"
            :items="years"
            label="年度を選択"
            rounded
            v-on:change="UpdateBatter"
          ></v-select>
        </v-card-title>
        <v-row class="central-a" justify="center">
          <bradar
            ref="bL"
            v-bind:year="batterYear"
            teamShortName="西武"
            teamLongName="埼玉西武ライオンズ"
            teamColor="#73bae2"
          ></bradar>
          <bradar
            ref="bH"
            v-bind:year="batterYear"
            teamShortName="ソフトバンク"
            teamLongName="福岡ソフトバンクホークス"
            teamColor="#fad201"
          ></bradar>
          <bradar
            ref="bE"
            v-bind:year="batterYear"
            teamShortName="楽天"
            teamLongName="東北楽天ゴールデンイーグルス"
            teamColor="#9c242c"
          ></bradar>
        </v-row>
        <v-row justify="center">
          <bradar
            ref="bM"
            v-bind:year="batterYear"
            teamShortName="ロッテ"
            teamLongName="千葉ロッテマリーンズ"
            teamColor="#111"
          ></bradar>
          <bradar
            ref="bF"
            v-bind:year="batterYear"
            teamShortName="日本ハム"
            teamLongName="北海道日本ハムファイターズ"
            teamColor="#018c73"
          ></bradar>
          <bradar
            ref="bB"
            v-bind:year="batterYear"
            teamShortName="オリックス"
            teamLongName="オリックスバファローズ"
            teamColor="#696ad2"
          ></bradar>
        </v-row>
      </v-card>
      <v-card class="card" outlined>
        <v-card-title class="title">
          パリーグ球団別投手レーダー
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
            ref="pL"
            v-bind:year="pitcherYear"
            teamShortName="西武"
            teamLongName="西武ライオンズ"
            teamColor="#73bae2"
          ></pradar>
          <pradar
            ref="pH"
            v-bind:year="pitcherYear"
            teamShortName="ソフトバンク"
            teamLongName="福岡ソフトバンクホークス"
            teamColor="#fad201"
          ></pradar>
          <pradar
            ref="pE"
            v-bind:year="pitcherYear"
            teamShortName="楽天"
            teamLongName="東北楽天ゴールデンイーグルス"
            teamColor="#9c242c"
          ></pradar>
        </v-row>
        <v-row justify="center">
          <pradar
            ref="pM"
            v-bind:year="pitcherYear"
            teamShortName="ロッテ"
            teamLongName="千葉ロッテマリーンズ"
            teamColor="#111"
          ></pradar>
          <pradar
            ref="pF"
            v-bind:year="pitcherYear"
            teamShortName="日本ハム"
            teamLongName="北海道日本ハムファイターズ"
            teamColor="#018c73"
          ></pradar>
          <pradar
            ref="pB"
            v-bind:year="pitcherYear"
            teamShortName="オリックス"
            teamLongName="オリックスバファローズ"
            teamColor="#696ad2"
          ></pradar>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import bradar from "./TeamComponents/RaderBatterPacific";
import pradar from "./TeamComponents/RadarPitcherPacific"


export default {
  components: {
    bradar,
    pradar
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
      this.$refs.bL.update(this.batterYear);
      this.$refs.bH.update(this.batterYear);
      this.$refs.bE.update(this.batterYear);
      this.$refs.bM.update(this.batterYear);
      this.$refs.bF.update(this.batterYear);
      this.$refs.bB.update(this.batterYear);
    },
    UpdatePitcher() {
      this.$refs.pL.update(this.pitcherYear);
      this.$refs.pH.update(this.pitcherYear);
      this.$refs.pE.update(this.pitcherYear);
      this.$refs.pM.update(this.pitcherYear);
      this.$refs.pF.update(this.pitcherYear);
      this.$refs.pB.update(this.pitcherYear);
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
