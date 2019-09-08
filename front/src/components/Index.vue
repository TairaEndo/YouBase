<template>
  <div class="index">
    <h1>{{ msg }}</h1>
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

export default {
  name: 'Index',
  props: ["options"],
  components:{
    Chart,
    Radar
  },
  data() {
    return{
      msg:"Visualizing-Baseball"
    }
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
</style>
