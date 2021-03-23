<template>
  <div>
    <label class="switch">
      <input type="checkbox" :checked="dataChecked" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
    props: {
        checked: [Boolean]
    },
    data(){
        return{
            dataChecked: this.checked
        }
    },

    methods: {
        toggleSwitch(){
            this.dataChecked = !this.dataChecked
        }
    }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 58px;
  height: 32px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #D8D8D8;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 28px;
  left: 2px;
  bottom: 2px;
  background-color: #74ED47;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #D8D8D8;
}

input:focus + .slider {
  box-shadow: 0 0 1px #74ED47;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
