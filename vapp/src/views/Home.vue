<template>
  <div class="ohr-wrapper">
    <div class="ohr-container-home">
      <h1>Cooperatives</h1>
      <div class="ohr-home-desktop-list">
        <div class="ohr-card-container">
          <newcard />
        </div>
        <div class="ohr-card-container" v-if="!PoolList.length">
          <card
            title="Uhuru Community
                  Project"
            :joined="true"
            :membersCount="25"
            image="https://cdn.discordapp.com/attachments/818922919715536909/819624761196806214/img1.png"
          />
        </div>
        <div class="ohr-card-container" v-if="!PoolList.length">
          <card
            title="Samira, Saidu
            and Friends"
            :joined="false"
            :membersCount="100"
            image="https://cdn.discordapp.com/attachments/818922919715536909/819624768385843220/img2.png"
          />
        </div>
        <div class="ohr-card-container" v-if="!PoolList.length">
          <card
            title="Samira, Saidu
                and Friends "
            :joined="true"
            :membersCount="90"
            image="https://cdn.discordapp.com/attachments/818922919715536909/819624761196806214/img1.png"
          />
        </div>
        <div v-for="(address, i) in PoolList" :key="i">
          <div class="ohr-card-container">
            <card
              :address_block="address"
              :is_public="true"
              :description="90"
            />
          </div>
        </div>
      </div>
      <button class="ohr-home-view-more">View More</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../components/home/card-pool.vue";
import Newcard from "../components/home/newcard.vue";
export default {
  components: {
    Card,
    Newcard,
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("contracts", ["getContractData", "contractInstances"]),
    ...mapGetters("accounts", ["activeAccount"]),
    PoolList() {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
          contract: "PoolRecorder",
          method: "getListPools",
        });
        console.log("data", data);
        return data;
      }
      return -1;
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

<style lang="sass" scoped>
h1
  font-size: 40px
  font-weight: 500
  margin-bottom: 54px
.ohr-container-home
  max-width: 1560px
  margin: auto
  padding: 60px 24px
  display: flex
  flex-direction: column
  justify-content: flex-start
  height: 100%
  .ohr-home-desktop-list
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
  .ohr-card-container
    flex: 25%
    max-width: 25%
    padding: 16px

  .ohr-home-view-more
    background-color: #707070
    font-size: 30px
    font-weight: bold
    color: #fff
    width: 180px
    margin: 92px auto
    margin-bottom: 0px
    height: 57px
    border-radius: 5px
    border: none
    outline: none
    cursor: pointer

@media only screen and (max-width: 1050px)
  .ohr-card-container
    flex: 50% !important
    max-width: 50% !important
    padding: 16px 16px !important

@media only screen and (max-width: 576px)
  .ohr-card-container
    flex: 100% !important
    max-width: 100% !important
    padding: 16px 0px !important
</style>
