<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title style="width:350px;" class="headline text-uppercase">
        <span class="font-weight-light">Visualising Baseball</span>
      </v-toolbar-title>
      <v-tabs v-model="tab">
        <v-tab>野手</v-tab>
        <v-tab>投手</v-tab>
        <v-tab>チーム分析</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Index />
      </v-tab-item>
      <v-tab-item>
        <Pitcher />
      </v-tab-item>
      <v-tab-item>
        <radar />
      </v-tab-item>
    </v-tabs-items>
    <!-- </v-tabs> -->
  </v-app>
</template>

<script>
import Index from "./components/Index";
import Pitcher from "./components/Pitcher";
import radar from "./components/Radar"

export default {
  name: "App",

  components: {
    Index,
    Pitcher,
    radar
  },

  data: () => ({
    tab: null
    //
  })
};
</script>
