<template>
    <button class="ohr-blue-button">
        {{text}}
    </button>
</template>

<script>
export default {
    props: {
        text: [String]
    }
}
</script>

<style lang="sass" scoped>
.ohr-blue-button
    background-color: #252E65
    height: 40px
    padding: 0px 20px
    color: #ffffff
    border-radius: 5px
    border: none
    outline: none
    cursor: pointer
    font-weight: bold
    font-size: 21px
</style>