<template>
  <div>
    <v-row style="margin-top: 58px;" justify="center">
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
    <v-row justify="center">
      <v-col class="col">
        <rbi></rbi>
      </v-col>
      <v-col class="col">
        <hit></hit>
      </v-col>
      <v-col class="col">
        <bb></bb>
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
    return {};
  },
  methods: {},
  created: function() {}
};
</script>
<style scoped>
.col {
  max-width: 400px;
}
</style>
