<template>
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
</template>

<script>
import average from "./BatterComponents/Average"
import homerun from "./BatterComponents/HR"
import ops from "./BatterComponents/OPS"

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
.col {
  max-width: 400px;
  margin-top: 80px;
}
</style>
