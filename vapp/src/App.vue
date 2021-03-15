<template>
  <div>
    <table>
      <thead>
        <tr>
          <th colspan="2">Pool Dapp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <td><PoolRecorder /></td> -->
          <router-view class="view"></router-view>
          <!-- <td><SimpleBank2 :addressPool="this.$store.state.addressSimpleBank" /></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import PoolRecorder from './PoolRecorder'
// import PoolRecorder from './PoolRecorder.vue';

export default {
  // components: { PoolRecorder },
  name: "app",
  created() {
    // this.$router.push({ path: "/poolrecorder" });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
