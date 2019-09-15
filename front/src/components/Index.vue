<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div class="select">
      <b-form-select v-on:change="chooseTeam" v-model="selectedTeam">
        <option  v-for="team in teams" v-bind:value="team.shortname" :key="team.teamname">
          {{ team.teamname }}
        </option>
      </b-form-select>
      
      <b-form-select v-on:change="choosePitcher" v-model="selectedPitcher">
        <option v-for="pitcher in pitchers" v-bind:value="pitcher.pitchername" :key="pitcher.pitchername">
          {{ pitcher.pitchername }}
        </option>
      </b-form-select>
    </div>
    
    <div class = "line">
      <reactive-bar :chart-data="datacollection"></reactive-bar>
    </div>
  </div>
</template>

<script>
import Chart from './Chart';
import Radar from './Radar';
import ReactiveBar from './ReactiveBar';
import axios from 'axios';

export default {
  name: 'Index',
  components:{
    Chart,
    Radar,
    ReactiveBar
  },
  data() {
    return{
      teams:null,
      pitchers:null,
      msg:"Visualizing-Baseball",
      selectedTeam: 'teams',
      selectedPitcher:'投手',
      pitcherdata:null,
      avgspeed:null,
      datacollection: null,
      pitcherInning:[],
      inningBallSpeed:[]
    }
  },
  created () { 
    //anytime the vue instance is created, call the fillData() function.
    this.fillData()
  },
  mounted (){
    axios
      .get('https://vb-node-api.herokuapp.com/teams')
      .then(response => (this.teams =response.data))
  },
  methods:{
    fillData () {
      this.datacollection = {
        // Data for the y-axis of the chart
        labels: [],
        datasets: []
      }
    },
    chooseTeam: function(){
      axios
        .get(`https://vb-node-api.herokuapp.com/${this.selectedTeam}/pitcher`)
        .then(response => (this.pitchers =response.data))
    },
    choosePitcher: function(){
      axios
        .get(`https://vb-node-api.herokuapp.com/pitcher/${this.selectedPitcher}`)
        .then(response => {
          this.pitcherdata = response.data;
          testfunc();

          let inning = 0;
          let inningArray={'inning':[],'avgspeed':[]};
          let speeds = [];
          this.pitcherdata.forEach((el,index) => {
            if(inning!=el.inning){
              inningArray['inning'].push(el.inning);
            }
            inning = el.inning
          });
          inningArray["inning"].forEach(el=>{
            speeds[el] = []
          })
          this.pitcherdata.forEach((el,index)=>{
            speeds[el.inning].push(el.ballspeed)
          })
          console.log(speeds)
          speeds.forEach(el=>{
            inningArray["avgspeed"].push(avg(el));
          })
          function avg(arr){
            let res = arr.reduce( ( pre, curr, i )=> {
              return pre + curr;
            }, 0 ) / arr.length;
            return( res );
          }

          this.datacollection = {
            labels:inningArray["inning"],
            datasets: [
              {
                label: this.selectedPitcher+'のイニング別平均球速',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth:1,
                // Data for the x-axis of the chart
                data:inningArray["avgspeed"]
              }
            ]
          }
        })
      function testfunc(){
          console.log("test")
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.line{
  margin-left: 2%;
  float: left;
  width: 45%;
  height: 50%;
}
.radar{
  margin-right: 2%;
  float: right;
  width: 45%;
  height: 50%;
}
.select{
  width:20%;
  margin-left: 4%;
}
</style>
