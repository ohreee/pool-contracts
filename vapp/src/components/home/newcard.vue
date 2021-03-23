<template>
  <div @click="openCreateCooperative" class="ohr-card">
    <img src="@/assets/icons/plus.svg" alt="plus" />
    <p>Create</p>
  </div>
</template>

<script>
export default {
  methods: {
    openCreateCooperative(){
      this.$router.push('/create-cooperative')
    }
  }
};
</script>

<style lang="sass" scoped>
    .ohr-card
        border-radius: 28px
        height: 284px
        background-color: #FFC043
        margin-right: 40px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        cursor: pointer
        width: 100%
        p
            font-size: 33px
            font-weight: bold
            color: #fff
            margin-top: 26px
@media only screen and (max-width: 1550px)
    .ohr-card
        margin: 0 30px 0 0 !important
        height: 310px !important

@media only screen and (max-width: 1050px)
    .ohr-card
        margin: 0 !important
</style>
