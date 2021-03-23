<template>
<div v-if="isDrizzleInitialized">
  <Navbar />
  <router-view />
  <Footer/>
</div>
<div v-else>
  Loading...
</div>
</template>

<script>
import Footer from './components/Footer.vue';
import Navbar from "./components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  components: { Navbar, Footer },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
  },
  name: "app",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
