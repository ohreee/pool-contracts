<template>
<PoolRecorder/>
</template>

<script>
// import PoolRecorder from './PoolRecorder'
import PoolRecorder from './PoolRecorder.vue';

export default {
  components: { PoolRecorder },
  name: "app",
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
