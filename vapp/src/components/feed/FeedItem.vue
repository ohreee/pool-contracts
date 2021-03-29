<template>
  <div class="ohr-feed-element">
    <div class="ohr-feed-info">
      <p>
        <span class="ohr-feed-info-eth">{{ eth }} {{" "}} </span>
        <span class="ohr-feed-info-data">{{ data }} {{" "}}</span>
        <span class="ohr-feed-info-username"> {{ username }}</span>
      </p>
    </div>

    <div class="ohr-feed-date">
      <p >{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: [String],
    username: [String],
    eth: [String],
    data: [String],
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
