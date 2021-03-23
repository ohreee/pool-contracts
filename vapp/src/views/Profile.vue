<template>
  <div class="ohr-wrapper">
    <div class="ohr-profile-container">
      <div class="ohr-row">
        <div class="ohr-col-12 ohr-profile-user-name">
          <h1>
            Noble Jang
          </h1>
          <p>
            <u>
              Edit Profile
            </u>
          </p>
        </div>
      </div>
      <div class="profile-mobile-toggle">
        <div class="profile-mobile-toggler-container">
          <div
            @click="toggleView"
            :class="
              isDetailsSelected
                ? 'profile-mobile-details-active'
                : 'profile-mobile-details'
            "
          >
            Details
          </div>
          <div
            @click="toggleView"
            :class="
              !isDetailsSelected
                ? 'profile-mobile-privacy-active'
                : 'profile-mobile-privacy'
            "
          >
            Privacy
          </div>
        </div>
      </div>
      <div class="ohr-row">
        <div
          v-if="isDetailsSelected"
          class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12 profile-mobile-details-container"
        >
          <div class="ohr-profile-heading">
            <p>Details</p>
            <div></div>
          </div>
          <div class="ohr-row ohr-no-gutter">
            <div class="ohr-col-8 ohr-col-lg-12 ohr-no-gutter">
              <div class="ohr-profile-widget">
                <h1>Name</h1>
                <p>Noble Jang</p>
              </div>
              <div class="ohr-profile-widget">
                <h1>Email</h1>
                <p>noblejang@gmail.com</p>
              </div>
              <div class="ohr-profile-widget">
                <h1>Phone Number</h1>
                <p>+44 619 0393 3031</p>
              </div>
              <div class="ohr-profile-widget">
                <h1>Date of Birth</h1>
                <p>19/11/1999</p>
              </div>
              <div class="ohr-profile-widget">
                <h1>Address</h1>
                <p>Old Paire 92X</p>
              </div>
            </div>
            <div class="ohr-col-4 ohr-col-lg-12 ohr-no-gutter">
              <div class="ohr-profile-widget">
                <h1>City</h1>
                <p>Manchester</p>
              </div>
              <div class="ohr-profile-widget">
                <h1>Country</h1>
                <p>United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
        <div class="ohr-col-1 ohr-h-center ohr-profile-divider-container">
          <div class="ohr-profile-divider"></div>
        </div>
        <div
          class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12 profile-desktop-privacy"
        >
          <div class="ohr-profile-heading">
            <p>Privacy</p>
            <div></div>
          </div>
          <div class="ohr-row ohr-no-gutter">
            <div class="ohr-col-12 ohr-no-gutter">
              <div class="ohr-privacy-element">
                <h5>Account 2FA Protection</h5>
                <div>
                  <ohr-toggle :checked="true" />
                </div>
              </div>
              <div class="ohr-privacy-element">
                <h5>Upload ID Card</h5>
                <div>
                  <p><u>Uploaded</u></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!isDetailsSelected"
          class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12 profile-mobile-privacy-container"
        >
          <div class="ohr-profile-heading">
            <p>Privacy</p>
            <div></div>
          </div>
          <div class="ohr-row ohr-no-gutter">
            <div class="ohr-col-12 ohr-no-gutter">
              <div class="ohr-privacy-element">
                <h5>Account 2FA Protection</h5>
                <div>
                  <ohr-toggle :checked="true" />
                </div>
              </div>
              <div class="ohr-privacy-element">
                <h5>Upload ID Card</h5>
                <div>
                  <p><u>Uploaded</u></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OhrToggle from "../components/common/OhrToggle.vue";
export default {
  components: { OhrToggle },
  data() {
    return {
      isDetailsSelected: true,
    };
  },
  methods: {
    toggleView() {
      this.isDetailsSelected = !this.isDetailsSelected;
    },
  },
};
</script>

<style lang="sass" scoped>
.profile-mobile-privacy-container, .profile-mobile-details-container
    min-height: 460px
.ohr-profile-container
  max-width: 1560px
  margin: auto
  padding: 60px 24px
  display: flex
  flex-direction: column
  justify-content: flex-start
  height: 100%
.ohr-profile-user-name
    margin-bottom: 74px
    margin-top: 20px
    h1
        color: #252E65
        font-size: 49px
        font-weight: bold
    p
        color: #252E65
        font-size: 16px
        margin-top: 13px
        cursor: pointer
.ohr-profile-divider
    background-color: #707070
    width: 1px
    height: 100%
    min-height: 360px
.ohr-profile-heading
    display: flex
    color: #032C60
    margin-bottom: 32px
    align-items: center
    div
        background-color: #D8D8D8
        height: 1px
        width: 100%
        margin-left: 16px

.ohr-profile-widget
    margin-bottom: 26px
    h1
        color: #BC202E
        font-size: 10px
    p
        color: #252E65
        font-size: 16px
        font-weight: bold
        margin-top: 4px
.ohr-privacy-element
    margin-bottom: 54px
    display: flex
    justify-content: space-between
    h5
        color: #252E65
        font-size: 18px
        font-weight: bold
    div
        p
            color: #252E65
            font-size: 12px

.profile-mobile-toggle
    width: 100%
    margin-bottom: 32px
    display: none
.profile-mobile-toggler-container
    display: flex
    background-color: #FFFFFF
    height: 43px
    width: 178px
    margin: 0 auto
    border-radius: 15px
    align-items: center
    justify-content: space-evenly
    .profile-mobile-details, .profile-mobile-privacy
        color: #032C60
        cursor: pointer
        font-size: 15px
    .profile-mobile-details-active, .profile-mobile-privacy-active
        background-color: #F3F3F3
        border-radius: 10px
        height: 31px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        min-width: 70px
@media only screen and (max-width: 992px)
    .ohr-profile-divider-container
        display: none
@media only screen and (max-width: 768px)
    .profile-desktop-privacy
        display: none !important
    .ohr-profile-heading
        display: none !important
    .ohr-profile-user-name
        margin-bottom: 19px !important
        margin-top: 0px !important
        h1
            text-align: center
            font-size: 21px
        p
            text-align: center
            font-size: 10px
    .profile-mobile-toggle
        display: block !important

    .ohr-privacy-element
        margin-bottom: 37px
        display: flex
        justify-content: space-between
        h5
            color: #252E65
            font-size: 14px
            font-weight: bold
        div
            p
                color: #252E65
                font-size: 10px
</style>
