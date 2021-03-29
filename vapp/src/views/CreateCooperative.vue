<template>
  <div class="ohr-wrapper">
    <div class="ohr-create-co-container">
      <h1>Create a Cooperative</h1>
      <div class="ohr-row">
        <div class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12 ohr-col-custom">
          <ohr-input type="text" @onChange="(e) => (name = e)" label="Name" />
          <ohr-input
            type="text"
            @onChange="(e) => (description = e)"
            label="Description"
          />
          <ohr-input
            type="checkbox"
            @onChange="(e) => (isPublic = e)"
            label="Public"
          />
          <!-- <ohr-toggle /> -->
          <div class="ohr-row ohr-create-co-actions">
            <div class="ohr-col-12">
              <ohr-blue-button @onClick="handleClick" text="Save" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OhrBlueButton from "../components/common/OhrBlueButton.vue";
import OhrInput from "../components/common/OhrInput.vue";
import OhrToggle from "../components/common/OhrToggle.vue"
import { mapGetters } from "vuex";
export default {
  components: { OhrInput, OhrBlueButton, OhrToggle },
  data() {
    return {
      name: "",
      description: "",
      isPublic: true,
    };
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
        return data;
      }
      return -1;
    },
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
    handleClick() {
      this.drizzleInstance.contracts.PoolRecorder.methods.createPool.cacheSend(
        this.name,
        this.description,
        this.isPublic,
        this.activeAccount
      );
    },
  },
};
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 100px
  font-size: 49px
  font-weight: bold !important
  color: #252E65
.ohr-create-co-container
  max-width: 1560px
  margin: auto
  padding: 60px 24px
  display: flex
  flex-direction: column
  justify-content: flex-start
  height: 100%
.ohr-col-custom
  margin-right: 80px
.ohr-col-custom-alt
  margin-top: 24px

.ohr-create-co-actions
  margin-top: 30px

@media screen and (max-width: 992px)
  .ohr-col-custom
    margin-right: 0px !important
  .ohr-create-co-actions
    margin-top: 30px
    justify-content: flex-end !important
    div
      display: flex
      justify-content: flex-end !important
  h1
    font-size: 21px !important
    text-align: center
    margin-bottom: 41px !important
</style>
