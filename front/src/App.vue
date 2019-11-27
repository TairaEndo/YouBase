<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title style="min-width: 100px;" class="headline">
        <span class="font-weight-light">YouBase</span>
      </v-toolbar-title>
      <v-tabs v-model="tab">
        <v-tab>野手</v-tab>
        <!-- <v-tab>投手</v-tab> -->
        <v-tab>セリーグ</v-tab>
        <v-tab>パリーグ</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Batter />
      </v-tab-item>
      <!-- <v-tab-item>
        <Pitcher />
      </v-tab-item> -->
      <v-tab-item>
        <Central />
      </v-tab-item>
      <v-tab-item>
        <Pacific />
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
// import Pitcher from "./components/Pitcher";
import Batter from "./components/Batter";
import Central from "./components/Central";
import Pacific from "./components/Pacific";

export default {
  name: "App",

  components: {
    // Pitcher,
    Batter,
    Central,
    Pacific
  },

  data: () => ({
    tab: null
  })
};
</script>
