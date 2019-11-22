<template>
  <div>
      <speedradial class="speed"></speedradial>
      <!-- <radar></radar> -->
  </div>
</template>

<script>
import speedradial from "./SpeedRaialBar.vue";
// import radar from "./Radar.vue"

export default {
  components: {
    speedradial,
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
.speed{
  padding-top: 80px; 
}
</style>
