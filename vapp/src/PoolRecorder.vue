<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Ohree's Pool Recorder Dapp</h2>
      <drizzle-account units="Ether" :precision="3" />
    </div>
    <div>
      <form action="" @submit="onClickAddPoolBtn">
        <p>
          <label>Name of pool</label>
          <input type="string" name="" value="namePool" v-model="namePool" />
        </p>
        <p>
          <label>Description of Pool</label>
          <input
            type="string"
            value="descriptionPool"
            v-model="descriptionPool"
          />
        </p>
        <p>
          <label>Is Pool public ?</label>
          <input type="checkbox" value="" v-model="isPublic" />
        </p>
        <input type="button" value="Add Pool" @click="onClickAddPoolBtn" />
      </form>
    </div>
    <div>Pool list :</div>
    <ul>
      <li v-for="(address, i) in PoolList" :key="i">
        <!-- {{ i }} : {{ address }} -> -->
        {{ i }} :
        <p>Pool's Name {{ getPoolInfo(address)[0] }}</p>
        <p>Description {{ getPoolInfo(address)[1] }}</p>
        <p>Owner {{ getPoolInfo(address)[2] }}</p>
        <p>Address of Pool in blockchain {{ getPoolInfo(address)[3] }}</p>
        <p>Is Pool Public ? {{ getPoolInfo(address)[4] }}</p>
      </li>
    </ul>
    <!-- <Toast /> -->
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";
// import Toast from "./Toast";

export default {
  name: "poolrecorder",
  data: () => {
    return {
      namePool: "",
      descriptionPool: "",
      isPublic: true,
      amount_deposit: 0,
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("contracts", ["getContractData", "contractInstances"]),
    PoolList() {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
          contract: "PoolRecorder",
          method: "getListPools",
        });
        return data;
      }
      return -1;
    },
  },
  components: {
    // Toast,
  },
  methods: {
    getPoolInfo(addressPool) {
      if (this.isDrizzleInitialized) {
        var dataKey = this.drizzleInstance.contracts.PoolRecorder.methods.getPoolInfo.cacheCall(
          addressPool
        );
        return this.$store.getters["contracts/contractInstances"].PoolRecorder
          .getPoolInfo[dataKey].value;
      }
      return -1;
    },
    onClickAddPoolBtn() {
      this.drizzleInstance.contracts.PoolRecorder.methods.createPool.cacheSend(
        this.namePool,
        this.descriptionPool,
        this.isPublic
      );
    },
  },
  created() {
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "PoolRecorder", // i.e. TwistedAuctionMock
      method: "getListPools",
      methodArgs: [], // No args required for this method
    });
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
