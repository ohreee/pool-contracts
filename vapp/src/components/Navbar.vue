<template>
  <div id="navbar">
    <div
      :class="
        isDrawerVisible ? 'ohr-mobile-drawer' : 'ohr-mobile-drawer-hidden'
      "
    >
      <div>
        <img
          @click="handleToggleDrawer"
          alt="cross-icon"
          style="cursor: pointer"
          src="@/assets/icons/cross.svg"
        />
      </div>
      <div class="ohr-user ohr-row ohr-v-center ohr-h-center">
        <img src="@/assets/logo.svg" />
        <p>Noble Jang</p>
      </div>
      <div class="ohr-navbar-menu-list">
        <p @click="handleToggleDrawer">
          <router-link to="/create-cooperative"> Cooperative </router-link>
        </p>
        <div class="ohr-menu-divider" />
        <p @click="handleToggleDrawer">
          <router-link to="/settings"> Settings </router-link>
        </p>
        <div class="ohr-menu-divider" />
        <p>Wallet</p>
      </div>
    </div>
    <div
      :class="
        isDesktopDrawerVisible
          ? 'ohr-desktop-drawer'
          : 'ohr-desktop-drawer-hidden'
      "
    >
      <div>
        <img
          @click="handleDesktopToggleDrawer"
          alt="cross-icon"
          style="cursor: pointer"
          src="@/assets/icons/cross.svg"
        />
      </div>
      <div class="ohr-user ohr-row ohr-v-center ohr-h-center">
        <img src="@/assets/logo.svg" />
        <p>Noble Jang</p>
      </div>
      <div class="ohr-navbar-menu-list">
        <p>New Cooperative</p>
        <div class="ohr-menu-divider" />
        <p @click="handleDesktopToggleDrawer">
          <router-link to="/settings"> Settings </router-link>
        </p>
        <div class="ohr-menu-divider" />
        <p>Wallet</p>
      </div>
    </div>
    <div class="ohr-mobile-navbar">
      <div class="ohr-row ohr-v-center ohr-h-100">
        <div class="ohr-col-8 ohr-v-center ohr-no-gutter ">
          <div class="ohr-row ohr-v-center ohr-h-100 ohr-left ohr-no-gutter">
            <router-link to="/home">
              <img alt="logo" class="ohr-logo" src="@/assets/logo.svg" />
            </router-link>
            <img
              @click="handleToggleDrawer"
              alt="menu"
              class="ohr-hamburger"
              src="@/assets/icons/ham-burger.svg"
            />
          </div>
        </div>
        <div class="ohr-col-4 ohr-v-center  ohr-right ohr-no-gutter">
          <div class="ohr-navbar-wallet-wrapper ohr-row ohr-v-center">
            <div
              class="ohr-col-6 ohr-h-100 ohr-h-center ohr-v-center ohr-no-gutter"
            >
              <img
                class="ohr-wallet-green-dot"
                alt="green-dot"
                src="@/assets/icons/green-dot.svg"
              />
            </div>
            <div
              class="ohr-col-6 ohr-h-100  ohr-h-center ohr-v-center ohr-no-gutter"
            >
              <img
                class="ohr-wallet-wallet-icon"
                alt="wallet-icon"
                src="@/assets/icons/wallet.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ohr-desktop-navbar">
      <div class="ohr-row ohr-v-center ohr-h-100">
        <div class="ohr-col-8 ohr-v-center ohr-no-gutter ">
          <div class="ohr-row ohr-v-center ohr-h-100 ohr-left ohr-no-gutter">
            <router-link to="/home">
              <img
                alt="logo"
                class="ohr-logo-desktop"
                src="@/assets/logo-desktop.svg"
              />
            </router-link>
          </div>
        </div>
        <div class="ohr-col-4 ohr-v-center ohr-right ohr-no-gutter">
          <div class="ohr-navbar-wallet-wrapper ohr-row ohr-v-center">
            <div
              class="ohr-col-6 ohr-h-100 ohr-h-center ohr-v-center ohr-no-gutter"
            >
              <img
                class="ohr-wallet-green-dot"
                alt="green-dot"
                src="@/assets/icons/green-dot.svg"
              />
            </div>
            <div
              class="ohr-col-6 ohr-h-100 ohr-h-center ohr-v-center ohr-no-gutter"
            >
              <img
                class="ohr-wallet-wallet-icon"
                alt="wallet-icon"
                src="@/assets/icons/wallet.svg"
              />
            </div>
          </div>
          <img
            @click="handleDesktopToggleDrawer"
            alt="menu"
            class="ohr-hamburger"
            src="@/assets/icons/ham-burger.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawerVisible: false,
      isDesktopDrawerVisible: false,
    };
  },

  methods: {
    handleToggleDrawer() {
      this.isDrawerVisible = !this.isDrawerVisible;
    },
    handleDesktopToggleDrawer() {
      this.isDesktopDrawerVisible = !this.isDesktopDrawerVisible;
    },
  },
};
</script>

<style lang="sass" scoped>
#navbar
    position: fixed
    left: 0
    top: 0
    background-color: #ffffff
    width: 100%

.ohr-desktop-drawer
  position: fixed
  right: 0
  top: 100px
  max-width: 498px
  width: 498px
  background-color: #ffffff
  height: 100%
  padding: 61px 70px
  transition: .3s
  z-index: 10
  .ohr-user
    margin-top: 8px
    margin-bottom: 100px
    p
        margin-left: 12px
        color: #707070
        font-size: 13px
        font-weight: 500
  .ohr-navbar-menu-list
    text-align: right
    cursor: pointer
    .ohr-menu-divider
        background-color: #D8D8D8
        height: 1px
        width: 100%
        margin-bottom: 35.5px
    p
        color: #707070
        font-size: 21px !important
        font-weight: bold !important
        margin-bottom: 35.5px

.ohr-desktop-drawer-hidden
  right: -100%
  position: fixed
  height: 100%
  width: 498px
  transition: .7s
  background-color: #ffffff
  visibility: hidden

  .ohr-user
    margin-top: 8px
    margin-bottom: 100px
    p
      margin-left: 12px
      color: #707070
      font-size: 13px
      font-weight: 500
  .ohr-navbar-menu-list
    text-align: right
    .ohr-menu-divider
      background-color: #D8D8D8
      height: 1px
      width: 100%
      margin-bottom: 35.5px
    p
      color: #707070
      font-size: 21px !important
      font-weight: bold !important
      margin-bottom: 35.5px

.ohr-mobile-drawer
    position: fixed
    left: 0
    top: 0
    height: 100%
    width: 100%
    background-color: #ffffff
    padding: 61px 51px
    z-index: 10
    transition: .4s
    .ohr-user
        margin-top: 8px
        margin-bottom: 100px
        p
            margin-left: 12px
            color: #707070
            font-size: 13px
            font-weight: 500
    .ohr-navbar-menu-list
        text-align: center
        cursor: pointer
        .ohr-menu-divider
            background-color: #D8D8D8
            height: 1px
            width: 100%
            margin-bottom: 35.5px
        p
            color: #707070
            font-size: 21px !important
            font-weight: bold !important
            margin-bottom: 35.5px

.ohr-mobile-drawer-hidden
    left: -100%
    visibility: hidden
    position: fixed
    height: 100%
    width: 100%
    opacity: .1
    transition: .4s

.ohr-mobile-navbar
    height: 125px
    width: 100%
    max-width: 1560px
    margin: auto
    padding: 8px 24px
    display: none
    .ohr-logo
        height: 51.77px
        width: 51.77px
        cursor: pointer
    .ohr-hamburger
        margin-left: 16px
        cursor: pointer
    .ohr-wallet-wallet-icon
        height: 28px
        width: 28px
    .ohr-wallet-green-dot
        height: 17px
        width: 17px
    .ohr-navbar-wallet-wrapper
        border: 1.5px solid #CBCBCB
        border-radius: 9px
        width: 74px
        height: 41px
        cursor: pointer

.ohr-desktop-navbar
    height: 125px
    width: 100%
    padding: 8px 24px
    background-color: #ffffff
    max-width: 1560px
    margin: auto
    .ohr-logo-desktop
        height: 73px
        width: 186px
        cursor: pointer
    .ohr-hamburger
        margin-left: 16px
        cursor: pointer
    .ohr-wallet-wallet-icon
        height: 28px
        width: 28px
    .ohr-wallet-green-dot
        height: 17px
        width: 17px
    .ohr-navbar-wallet-wrapper
        border: 1.5px solid #CBCBCB
        border-radius: 9px
        width: 74px
        height: 41px
        cursor: pointer

@media only screen and (max-width: 576px)
    .ohr-mobile-navbar
        display: block !important
    .ohr-desktop-navbar
        display: none !important
</style>
