<template>
  <!-- <v-container> -->
  <div>
    <v-row justify="center">
      <v-col class="col">
        <average></average>
      </v-col>
      <v-col class="col">
        <ops></ops>
      </v-col>
      <v-col class="col">
        <homerun></homerun>
      </v-col>
    </v-row>
  </div>
  <!-- </v-container> -->
</template>

<script>
import average from "./Average.vue";
import homerun from "./HR.vue";
import ops from "./OPS.vue"

export default {
  components: {
    average,
    homerun,
    ops
  },
  data: function() {
    return {};
  },
  methods: {},
  created: function() {}
};
</script>
<style scoped>
.col{
  /* padding: 0px; */
  max-width: 400px;
  margin-top: 80px;
  /* margin: 10px; */
}
</style>
