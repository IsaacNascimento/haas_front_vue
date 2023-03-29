<template>
  <div>
    <b-navbar type="dark" variant="light">
      <b-navbar-nav>
        <b-nav-item >
          <router-link :to="{ name: 'previa'}">
            <img alt="Vue logo" src="../../assets/haas-logo.png" />
          </router-link>
        </b-nav-item>
        <b-nav-item href="#">
            <SideBar />
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  name: "NavBar",
  components: { SideBar }
};
</script>

<style>
ul, li, span, a {
    color: black;
}

</style>
