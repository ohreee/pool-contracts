<template>
  <div class="ohr-footer-wrapper">
    <div class="ohr-footer-desktop">
      <img
        alt="logo"
        class="ohr-footer-desktop-logo"
        src="@/assets/logo-desktop.svg"
      />
      <div class="ohr-row ohr-v-center ohr-h-100">
        <div class="ohr-col-2 ohr-v-center ohr-row ohr-copyright">
          © 2021 Ohreee Ltd.
        </div>
        <div class="ohr-col-6 ohr-v-center ohr-right ohr-menu-links">
          <ul>
            <li>About</li>
            <li>Docs</li>
            <li>Donate <img src="@/assets/icons/heart.svg" /></li>
            <li>Language <img src="@/assets/icons/united-kingdom.svg" /></li>
          </ul>
        </div>
        <div class="ohr-col-4 ohr-row ohr-social-links ohr-right ohr-v-center">
          <img src="@/assets/icons/medium.svg" />
          <img src="@/assets/icons/twitter.svg" />
          <img src="@/assets/icons/instagram.svg" />
          <img src="@/assets/icons/discord.svg" />
          <img src="@/assets/icons/telegram.svg" />
          <img src="@/assets/icons/github.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.ohr-footer-desktop-logo
  display: none
.ohr-footer-wrapper
    background-color: #ffffff
    width: 100%
    height: 158px

    .ohr-footer-desktop
        width: 100%
        height: 100%
        max-width: 1560px
        margin: auto
        padding: 8px 24px

    .ohr-copyright
        color: #252E65
        font-size: 21px
    ul
      width: 100%
      display: flex
      justify-content: flex-end
    li
        display: inline
        font-size: 21px
        color: #252E65
        margin: 0 32px
        cursor: pointer
        display: flex !important
        align-items: center
        justify-content: center
        img
          margin-left: 8px
    .ohr-social-links
        img
            margin: 0 12px

@media only screen and (max-width: 1300px)
    .ohr-footer-desktop, .ohr-footer-wrapper
        height: 100px !important
    .ohr-copyright
        flex: 30% !important
        max-width: 30% !important
        justify-content: flex-start
    .ohr-menu-links
        flex: 70% !important
        max-width: 70% !important
        justify-content: flex-end
    .ohr-social-links
        flex: 100% !important
        max-width: 100% !important
        justify-content: center !important

@media only screen and (max-width: 900px)
  li
    font-size: 16px !important
@media only screen and (max-width: 786px)
  .ohr-footer-desktop, .ohr-footer-wrapper
    height: 80px !important
    padding: 4px !important

  .ohr-copyright
    flex: 100% !important
    max-width: 100% !important
    justify-content: center
  .ohr-menu-links
    flex: 100% !important
    max-width: 100% !important
    justify-content: center
  .ohr-social-links
    flex: 100% !important
    max-width: 100% !important
    justify-content: center !important

  ul
    justify-content: center !important

@media only screen and (max-width: 576px)
  .ohr-footer-desktop-logo
    display: block !important
    width: 130px
    padding: 8px
  .ohr-footer-desktop, .ohr-footer-wrapper
    height: 80px !important
    padding-bottom: 8px
    padding: 8px !important
  .ohr-copyright
    flex: 100% !important
    max-width: 100% !important
    justify-content: center
    font-size: 14px !important
    color: #707070 !important
    order: 3 !important
    height: 60px !important

  .ohr-menu-links
    flex: 100% !important
    max-width: 100% !important
    justify-content: flex-start
    order: 1 !important
    height: 140px
  .ohr-social-links
    flex: 100% !important
    max-width: 100% !important
    justify-content: center !important
    order: 2 !important
    height: 60px !important
    img
      height: 30px
      width: 30px
      margin: 8px !important
  ul
    display: block !important
  li
    display: block !important
    margin: 14px 0 !important
    color: #707070 !important
    font-size: 14px !important
    text-align: center
    display: flex !important
    align-items: center
    justify-content: center
    img
      margin-left: 8px

@media only screen and (max-width: 450px)
  .ohr-footer-desktop, .ohr-footer-wrapper
    height: 80px !important
    padding-bottom: 8px

  .ohr-social-links
    flex: 100% !important
    max-width: 100% !important
    justify-content: center !important
    order: 2 !important

@media only screen and (max-width: 358px)
    .ohr-social-links
      img
        height: 24px
        width: 24px
        margin: 8px !important
</style>
