<template>
  <div class="ohr-wrapper">
    <div class="ohr-edit-co-container">
      <h1>Edit Cooperative</h1>
      <div class="ohr-row">
        <div class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12 ohr-col-custom">
          <ohr-input label="Name" />
          <ohr-input label="Number Of members" />
          <ohr-input label="Target Pool" />
        </div>
        <div class="ohr-col-4 ohr-col-lg-6 ohr-col-md-12">
          <ohr-input label="Due Date" />
          <ohr-input label="Ban Members" />
          <ohr-input label="Transfer Administrative Role" />
        </div>
      </div>
      <div class="ohr-row ohr-v-center ohr-edit-co-actions">
        <div class="ohr-col-4 ohr-col-custom dissolve-container ohr-col-md-6 ohr-col-sm-12">
          <p class="dissolve-cop">
           <u> Dissolve Cooperative </u>
            <span>
              <img alt="warning" src="@/assets/icons/warning.svg" />
            </span>
          </p>
        </div>
        <div class="ohr-col-4 ohr-button ohr-col-md-6 ohr-col-sm-12">
          <ohr-blue-button text="Save" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OhrBlueButton from "../components/common/OhrBlueButton.vue";
import OhrInput from "../components/common/OhrInput.vue";
export default {
  components: { OhrInput, OhrBlueButton },
};
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 100px
  font-size: 49px
  font-weight: bold !important
  color: #252E65
.ohr-edit-co-container
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

.dissolve-cop
  display: flex
  align-items: center
  color: #BC202E
  font-size: 16px
  font-weight: bold
  cursor: pointer
      
  img
    height: 30px
    width: 30px

@media screen and (max-width: 992px)
  .ohr-col-custom
    margin-right: 0px !important
  .ohr-edit-co-actions
    margin-top: 20px
    div
      display: flex
      justify-content: flex-end
  h1
    font-size: 21px !important
    text-align: center
    margin-bottom: 41px !important
  .dissolve-container
    justify-content: flex-start !important
  .dissolve-cop
    font-size: 13px !important

@media only screen and (max-width: 576px)
  .ohr-button
    margin-top: 24px
</style>
