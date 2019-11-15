<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Visualising Baseball</span>
      </v-toolbar-title>
    </v-app-bar>

    <Index />
  </v-app>
</template>

<script>
import Index from "./components/Index";

export default {
  name: "App",

  components: {
    Index
  },

  data: () => ({
    //
  })
};
</script>
