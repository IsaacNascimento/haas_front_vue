<template>
  <div id="app">
    <v-app>
      <LayoutComponent />
      <div class="container">
        <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
import LayoutComponent from "./components/layout/LayoutComponent.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  data() {
    return RouterView;
  },
  components: { LayoutComponent },
};
</script>

<style>
#app {
  background-color: #efefef;
}

.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
