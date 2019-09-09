<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div class="select">
      <b-form-select v-model="selected">
        <option v-for="team in teams" v-bind:value="team.teamname" :key="team.teamname">
          {{ team.teamname }}
        </option>
      </b-form-select>
      <span>Selected: {{ selected }}</span>
    </div>
    
    <div class = "line">
      <p>Bar Chart</p>
      <chart :width="100" :height="50"></chart>
    </div>
    <div class = "radar">
      <p>Radar Chart</p>
      <radar :width="100" :height="50"></radar>
    </div>
  </div>
</template>

<script>
import Chart from './Chart';
import Radar from './Radar';
import axios from 'axios';

export default {
  name: 'Index',
  props: ["options"],
  components:{
    Chart,
    Radar
  },
  data() {
    return{
      teams:null,
      msg:"Visualizing-Baseball",
      selected: 'teams'
    }
  },
  mounted (){
    axios
      .get('https://vb-node-api.herokuapp.com/teams')
      .then(response => (this.teams =response.data))
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
