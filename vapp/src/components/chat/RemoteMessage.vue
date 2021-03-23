<template>
  <div class="ohr-message-wrapper">
    <div class="ohr-message-container">
      <p class="ohr-message-author">
        {{ author }}
      </p>
      <p class="ohr-message-text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: [String],
    text: [String],
  },
};
</script>

<style lang="sass" scoped>
.ohr-message-wrapper
    display: flex
    justify-content: flex-start
.ohr-message-container
    background-color: #F8F8F8
    border-radius: 15px
    padding: 7px 14px
    max-width: 217px
    margin: 14px
    .ohr-message-author
        color: #BC202E
        font-size: 14px
        margin-bottom: 10px
    .ohr-message-text
        color: #252E65
        font-size: 14px
</style>
