<template>
  <div v-if="isDrizzleInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <input type="button" value="home" @click="clickHome" />
    <div class="section">
      <h2>Pool Bank Dapp {{ this.$route.query.address }}</h2>
      <drizzle-account units="Ether" :precision="3" />
    </div>

    <div class="section">
      <drizzle-contract
        :contractName="this.$route.query.address"
        method="depositsBalance"
        label="Total Pool balance (wei)"
      />
      <drizzle-contract
        :contractName="this.$route.query.address"
        method="balance"
        label="Your deposit (wei)"
      />
      <div v-if="isOwner">
        As owner of the pool, you can add a participant to the Pool
      </div>
      <drizzle-contract-form
        v-if="isOwner"
        :contractName="this.$route.query.address"
        method="enroll"
        :placeholders="['address participant to add']"
      />
      <br />
      <div>
        <input
          type="number"
          value="0"
          name="amount_deposit"
          v-model="amount_deposit"
        />
        <input type="button" value="Deposit" @click="onClickDepositBtn" />
      </div>

      <br />
      <div>
        <input type="number" value="0" v-model="amount_withdraw" />
        <input type="button" value="Withdraw" @click="onClickWithdrawBtn" />
      </div>
    </div>
    <br />
    <div>Participant list :</div>
    <ul>
      <li v-for="(address, i) in ParticipantList" :key="i">
        {{ i }} : {{ address }}
      </li>
    </ul>
    <Toast />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from "vuex";
import Toast from "./Toast";
import SimpleBank from "../../build/contracts/SimpleBank.json";

export default {
  name: "simplebank",
  data: () => {
    return {
      amount_deposit: 0,
      amount_withdraw: 0,
    };
  },
  components: {
    Toast,
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount"]),
    ...mapGetters("contracts", ["getContractData"]),
    ParticipantList() {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
          contract: this.$route.query.address,
          method: "getParticipantList",
        });

        return data;
      }
      return -1;
    },
    isOwner() {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
          contract: this.$route.query.address,
          method: "is_owner",
        });

        return data;
      }
      return -1;
    },
  },
  methods: {
    onClickDepositBtn() {
      // var state = this.drizzleInstance.store.getState()
      this.drizzleInstance.contracts[
        this.$route.query.address
      ].methods.deposit.cacheSend({
        from: this.activeAccount,
        value: this.drizzleInstance.web3.utils.toWei(
          this.amount_deposit,
          "ether"
        ),
      });
    },
    onClickWithdrawBtn() {
      // var state = this.drizzleInstance.store.getState()
      this.drizzleInstance.contracts[
        this.$route.query.address
      ].methods.withdraw.cacheSend(
        this.drizzleInstance.web3.utils.toWei(this.amount_withdraw, "ether")
      );
    },
    clickHome() {
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    // while (!this.isDrizzleInitialized);
    var contractConfig = {
      contractName: this.$route.query.address,
      web3Contract: new this.drizzleInstance.web3.eth.Contract(
        SimpleBank.abi,
        this.$route.query.address
      ),
    };
    this.drizzleInstance.addContract(contractConfig);
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "is_owner",
      methodArgs: [], // No args required for this method
    });
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "getParticipantList",
      methodArgs: [], // No args required for this method
    });
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "depositsBalance",
      methodArgs: [], // No args required for this method
    });
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "balance",
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
