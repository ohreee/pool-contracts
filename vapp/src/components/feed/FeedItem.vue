<template>
  <div class="ohr-feed-element">
    <div class="ohr-feed-info">
      <p>
        <!-- <span class="ohr-feed-info-eth">{{ this.balanceParticipant(username) }} {{" "}} </span> -->
        <span class="ohr-feed-info-data">{{ data }}. {{" "}}</span>
        <span class="ohr-feed-info-username"> {{ username.substr(0,12) }}...</span>
      </p>
    </div>

    <div class="ohr-feed-date">
      <p >{{ date }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    date: [String],
    username: [String],
    eth: [String],
    data: [String],
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount"]),
    ...mapGetters("contracts", ["getContractData"]),
    balance() {
      if (this.isDrizzleInitialized) {
        const dataKey = this.drizzle.contracts[this.$route.query.address].methods.balanceParticipant.cacheCall(this.username)
         return this.$store.state.contracts.contracts[this.$route.query.address].balanceParticipant[dataKey].value
      }
      return -1;
    },
  },
  methods: {
    balanceParticipant(address) {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
            contract: this.$route.query.address,
            method: "balanceParticipant",
            methodArgs: "[" + toString(address) + "]"
          });

          return data / 10**18;
      }
      return -1;
    },
  },
};
</script>

<style lang="sass" scoped>
.ohr-feed-element
    display: flex
    justify-content: space-between
    align-items: center
    padding: 20px 0px
    border-bottom: 1px solid #D8D8D8
    .ohr-feed-info
        .ohr-feed-info-eth
            color: #252E65
            font-weight: bold
            font-size: 17px
        .ohr-feed-info-data
            color: #252E65
            font-size: 17px
        .ohr-feed-info-username
            color: #252E65
            font-weight: bold
            font-size: 17px
    .ohr-feed-date
        p
            color: #252E65
            font-size: 10px

@media only screen and (max-width: 576px)
.ohr-feed-info
    .ohr-feed-info-eth
        color: #252E65
        font-weight: bold
        font-size: 14px !important
    .ohr-feed-info-data
        color: #252E65
        font-size: 14px !important
    .ohr-feed-info-username
        color: #252E65
        font-weight: bold
        font-size: 14px !important
.ohr-feed-date
    p
        color: #252E65
        font-size: 7px !important
</style>
