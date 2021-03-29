<template>
  <div class="ohr-wrapper">
    <div class="ohr-details-header">
      <div class="ohr-details-header-container">
        <div class="ohr-row ohr-v-center ohr-h-100">
          <div class="ohr-col-8 ohr-details-header-text">
            <h1>Uhuru Community Project</h1>
            <div class="ohr-row ohr-no-gutter ohr-details-sub-list">
              <div class="ohr-col-1 ohr-v-center">
                <p class="ohr-active">
                  MEMBER
                </p>
              </div>
              <div class="ohr-header-divider ohr-col-1 ohr-h-center">
                <div></div>
              </div>
              <div class="ohr-col-1 ohr-v-center">
                <p class="ohr-inactive">
                  {{this.$route.query.address}}
                </p>
              </div>
            </div>
          </div>
          <div class="ohr-col-4 ohr-right ohr-v-center ohr-details-image">
            <img alt="event-image" src="@/assets/images/details.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="ohr-details-container ohr-desktop">
      <div class="ohr-row">
        <div class="ohr-col-4 ohr-col-lg-12 ohr-details-summary">
          <div class="ohr-row ohr-no-gutter ohr-summary-section">
            <div class="ohr-col-6">
              <p class="ohr-details-summary-data">ETH <span>
                {{ balance }}
                </span></p>
              <p class="ohr-details-summary-info">Your balance</p>
            </div>
            <div class="ohr-col-6">
              <p class="ohr-details-summary-data">ETH <span>{{ depositsBalance }}</span></p>
              <p class="ohr-details-summary-info-blue">TOTAL<br />POOLED</p>
            </div>
          </div>
          <div class="ohr-row ohr-no-gutter ohr-summary-section">
            <div class="ohr-col-6">
              <p class="ohr-details-summary-data"><span>{{ getParticipantList.length}}</span></p>
              <p class="ohr-details-summary-info-blue">MEMBERS<br />POOLED</p>
            </div>
          </div>
          <div class="ohr-row">
          <ohr-input
            type="number"
            @onChange="(e) => (amount = e)"
            label="Amount"
          />
            <div class="ohr-col-4">
              <ohr-blue-button text="Deposit" @onClick="onClickDepositBtn()"/>
            </div>
            <div class="ohr-col-1"></div>
            <div class="ohr-col-4">
              <ohr-gray-button text="Withdraw" />
            </div>
          </div>
        </div>
        <div class="ohr-col-4 ohr-col-lg-12 ohr-feed-container">
          <div class="ohr-row ohr-no-gutter ohr-feed-head ohr-v-center">
            <p>Participant List</p>
            <span class="ohr-hor-line"></span>
          </div>
            <ohr-input v-if="is_owner"
            type="text"
            @onChange="(e) => (newAddressParticipant = e)"
            label="Add participant"
          />
              <ohr-blue-button v-if="is_owner" text="Enroll" @onClick="onClickAddBtn()"/>
          <feed-item v-for="(address, i) in getParticipantList"
            :key="i"
            :username="address"
            :data="i"
          />
      </div>
    </div>
    <div class="ohr-mobile">
      <div class="ohr-row ohr-v-center">
        <div
          class="ohr-col-3 ohr-no-gutter ohr-details-mobile-sum ohr-right-border"
        >
          <p class="ohr-details-summary-data-mobile">ETH <span>15</span></p>
          <p class="ohr-details-summary-info-blue-mobile">TOTAL<br />POOLED</p>
        </div>
        <div class="ohr-col-3 ohr-details-mobile-sum ohr-no-gutter">
          <p class="ohr-details-summary-data-mobile"><span>{{getParticipantList.length}}</span></p>
          <p class="ohr-details-summary-info-blue-mobile">
            MEMBERS<br />POOLED
          </p>
        </div>
      </div>

      <div class="ohr-details-mobile-tab-container">
        <div
          @click="toggleButton(0)"
          :class="
            activeTab == 0
              ? 'ohr-details-mobile-tab-active'
              : 'ohr-details-mobile-tab'
          "
        >
          Feed
        </div>
        <div
          @click="toggleButton(1)"
          :class="
            activeTab == 1
              ? 'ohr-details-mobile-tab-active'
              : 'ohr-details-mobile-tab'
          "
        >
          Members
        </div>
      </div>

      <div class="ohr-details-mobile-viewpager">
        <div v-if="activeTab == 0">
          <feed-item
            username="@mechaadi"
            eth="0.50 ETH"
            data="deposited by"
            date="19/02/2021 9:44am"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import OhrBlueButton from "../components/common/OhrBlueButton.vue";
import OhrGrayButton from "../components/common/OhrGrayButton.vue";
import FeedItem from "../components/feed/FeedItem.vue";
import RemoteMessage from "../components/chat/RemoteMessage.vue";
import Message from "../components/chat/Message.vue";
import OhrInput from "../components/common/OhrInput.vue";
import PoolFactory from "../../../build/contracts/PoolFactory.json";
import { mapGetters } from "vuex";

export default {
  components: {
    RemoteMessage,
    Message,
    OhrBlueButton,
    OhrGrayButton,
    FeedItem,
    OhrInput
  },
  data() {
    return {
      activeTab: 0,
      amount: 0,
      newAddressParticipant: ""
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters("accounts", ["activeAccount"]),
    ...mapGetters("contracts", ["getContractData"]),
  
    is_owner() {
    if (this.isDrizzleInitialized) {
        return this.get_owner == this.activeAccount;
      }
      return -1;
    },
    get_owner() {
    if (this.isDrizzleInitialized) {
          const data = this.getContractData({
              contract: this.$route.query.address,
              method: "get_owner",
            });

            return data;
          }
          return -1;
    },
    getParticipantList() {
    if (this.isDrizzleInitialized) {
      const data = this.getContractData({
          contract: this.$route.query.address,
          method: "getParticipantList",
        });

        return data;
    }
    return -1;
    },
    balance() {
      if (this.isDrizzleInitialized) {
        // const data = this.getContractData({
        //     contract: this.$route.query.address,
        //     method: "balanceParticipant",
        //     methodArgs: "["+ this.activeAccount +"]"
        //   });

        //   return data / 10**18;
        return this.balanceParticipant(this.activeAccount)

      }
      return -1;
    },
    depositsBalance() {
      if (this.isDrizzleInitialized) {
        const data = this.getContractData({
            contract: this.$route.query.address,
            method: "depositsBalance",
          });

          return data / 10**18;
      }
      return -1;
    },
  },
  methods: {
    toggleButton(v) {
      this.activeTab = v;
    },
    onClickDepositBtn() {
      this.drizzleInstance.contracts[
        this.$route.query.address
      ].methods.deposit.cacheSend({
        from: this.activeAccount,
        value: this.drizzleInstance.web3.utils.toWei(
          this.amount,
          "ether"
        ),
      });
    },
    onClickAddBtn() {
      this.drizzleInstance.contracts[
        this.$route.query.address
      ].methods.enroll.cacheSend(this.newAddressParticipant, {
        from: this.activeAccount
      });
    },
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
  created() {
    // while (!this.isDrizzleInitialized);
    if (!(this.$route.query.address in this.drizzleInstance.contracts)) {
      var contractConfig = {
        contractName: this.$route.query.address,
        web3Contract: new this.drizzleInstance.web3.eth.Contract(
          PoolFactory.abi,
          this.$route.query.address
        ),
      };
    this.drizzleInstance.addContract(contractConfig);
    }
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
      methodArgs: []
    });

    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "get_owner",
      methodArgs: [], // No args required for this method
    });

    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: this.$route.query.address, // i.e. TwistedAuctionMock
      method: "balanceParticipant",
      methodArgs: [this.activeAccount] // No args required for this method
    });

    
  },
};
</script>

<style lang="sass" scoped>
.ohr-mobile
  display: none
  padding: 20px
  min-height: 600px
  .ohr-details-mobile-viewpager
    padding: 4px 8px
  .ohr-details-mobile-tab-container
    height: 43px
    width: 100%
    border-radius: 15px
    background-color: #fff
    margin-top: 13px
    display: flex
    justify-content: space-between
    align-items: center
    padding: 4px 16px
    .ohr-details-mobile-tab
      height: 31px
      display: flex
      justify-content: center
      align-items: center
      font-size: 15px
      color: #032C60
      cursor: pointer
    .ohr-details-mobile-tab-active
      height: 31px
      background-color: #F3F3F3
      display: flex
      justify-content: center
      align-items: center
      padding: 0px 8px
      border-radius: 10px
      font-size: 15px
      color: #032C60
      cursor: pointer
  .ohr-details-mobile-sum
    padding-left: 16px
  .ohr-right-border
    border-right: 1px solid #D8D8D8
  .ohr-details-summary-data-mobile
    font-size: 15px
    font-family: 'Lato' !important
    span
      font-size: 25px
  .ohr-details-summary-info-mobile
    font-size: 10px
    color: #BC202E
  .ohr-details-summary-info-blue-mobile
    font-size: 10px
    color: #252E65

.ohr-chatbox
  margin-top: 24px
  .ohr-chatbox-list
    background-color: #fff
    border-radius: 15px
    max-height: 315px
    overflow: auto
    width: 100%
  .ohr-chatbox-input-box
    margin-top: 14px
    display: flex
    align-items: center
    justify-content: space-between
    input
      background-color: #fff
      border-radius: 5px
      height: 39px
      width: 88%
      border: none
      outline: none
      padding: 4px 16px
    button
      background-color: transparent
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      width: 10%
      height: 39px
      border: none

.ohr-details-header
    background-color: #252E65
    height: 205px
    width: 100%
    border-bottom-left-radius: 20px
    border-bottom-right-radius: 20px
    .ohr-details-header-container
        max-width: 1560px
        margin: auto
        height: 100%
    .ohr-details-image
        height: 145px
        width: 145px
    .ohr-header-divider
        div
            width: 1px
            background-color: #D8D8D8
            height: 30px
    .ohr-details-header-text
        display: flex
        flex-direction: column
        justify-content: center
        h1
            color: #FFFFFF
            font-size: 49px
        p
            color: #ffffff
            font-size: 22px
        .ohr-active
            color: #FFC043
    .ohr-details-sub-list
        margin-top: 35px
.ohr-details-container
    max-width: 1560px
    margin: auto
    padding: 30px 24px
    display: flex
    flex-direction: column
    justify-content: flex-start
    height: 100%

    .ohr-feed-container
        padding: 20px 40px
        border-right: 1px solid #707070
        height: 500px
        .ohr-feed-head
            margin-bottom: 50px
        .ohr-hor-line
            height: 1px
            background-color: #D8D8D8
            width: 80%
            margin-left: 8px
    .ohr-members-container
        padding: 20px 20px
        height: 500px
        .ohr-hor-line
            height: 1px
            background-color: #D8D8D8
            width: 100%
            margin-left: 8px
        .ohr-members-count
            height: 22px
            padding: 8px
            border: 1px solid #707070
            border-radius: 8px
            width: 50px
            font-size: 10px
            display: flex
            justify-content: center
            align-items: center
            margin-left: 4px
    .ohr-details-summary
        border-right: 1px solid #707070
        height: 500px

        .ohr-summary-section
            align-items: baseline !important
            margin: 45px 0px
        .ohr-details-summary-data
            color: #252E65
            font-size: 23px
            font-family: 'Lato' !important
            span
                font-size: 39px
        .ohr-details-summary-info-blue
            color: #252E65
            font-size: 15px
        .ohr-details-summary-info
            color: #BC202E
            font-size: 15px

@media only screen and (max-width: 992px)
  .ohr-details-header-text
    h1
      font-size: 30px !important
    .ohr-active
      font-size: 16px !important
    .ohr-inactive
      font-size: 16px !important
  .ohr-details-summary
    border: none !important
  .ohr-feed-container
    border: none !important

@media only screen and (max-width: 576px)
  .ohr-mobile
    display: block !important
  .ohr-desktop
    display: none
  .ohr-details-header-text
    h1
      font-size: 20px !important
    .ohr-active
      font-size: 10px !important
    .ohr-inactive
      font-size: 10px !important
  .ohr-details-header
    padding: 16px
    height: 160px !important
  .ohr-details-sub-list
    margin-top: 16px !important
  .ohr-header-divider
    height: 30px !important
    div
      height: 100% !important
  .ohr-details-image
    img
      height: 88px !important
      width: 88px !important
</style>
