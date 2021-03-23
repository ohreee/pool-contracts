<template>
  <div>
      <p> {{label}}</p>
      <input/>
  </div>
</template>

<script>
export default {
    props: {
        label: [String]
    }
}
</script>

<style lang="sass" scoped>
    div
        width: 100%
        margin-bottom: 24px
        p
            color: #BC202E !important
            font-size: 16px
            font-weight: 500
            margin-bottom: 16px
        input
            border: none
            outline: none
            width: 100%
            height: 48px
            border-radius: 12px
            background-color: #fff
            padding: 8px
    @media only screen and (max-width: 992px)
        p
            font-size: 13px !important
</style>