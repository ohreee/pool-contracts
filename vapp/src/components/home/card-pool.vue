<template>
  <div class="ohr-card">
    <img alt="event-img" :src="image" />
    <div class="ohr-card-body">
      <div class="ohr-row ohr-h-100 ohr-no-gutter">
        <div class="ohr-col-8 ohr-h-100 ohr-no-gutter">
          <p class="title">{{ title }}</p>
        </div>
        <div class="ohr-col-4 members-log ohr-h-100 ohr-no-gutter">
          <p class="members-count">
            {{ description }} {{address_block}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: [String],
    description: [String],
    address_block: [String],
    address_owner: [String],
    is_public: [Boolean],
  },
};
</script>

<style lang="sass" scoped>
.ohr-card
    border-radius: 28px
    height: 284px
    margin: 0 30px
    width: 100%
    background-color: #252E65
    cursor: pointer
    img
        max-width: 100%
        width: 100%
        object-fit: cover
        height: 169px
        border-top-left-radius: 24px
        border-top-right-radius: 24px
    .ohr-card-body
        height: 112px
        padding: 8px 18px
        .title
            color: #ffffff
            font-size: 21px
            font-weight: bold
        .member
            background-color: #fff
            border-radius: 5px
            border: none
            outline: none
            font-size: 17px
            font-weight: bold
            color: #252E65
            height: 26px
            margin-top: 8px
        .join
            background-color: #74ED47
            border-radius: 5px
            border: none
            outline: none
            font-size: 17px
            font-weight: bold
            color: #252E65
            height: 26px
            margin-top: 8px
            cursor: pointer
        .members-log
            display: flex
            justify-content: flex-end
            flex-direction: column
            align-items: flex-end
            padding-bottom: 16px
        .members
            color: #FFC043
            font-size: 9px
            font-weight: bold    
        .members-count
            color: #FFC043
            font-size: 45px
            font-family: 'Lato' !important

@media only screen and (max-width: 1550px)
    .ohr-card
        margin: 0 20px !important
        height: 310px !important
@media only screen and (max-width: 1050px)
    .ohr-card
        margin: 0 !important
</style>
