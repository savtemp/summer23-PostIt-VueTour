<template>
  <v-tour name="myTour" :steps="steps" :callbacks="callbacks"></v-tour>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  name: 'my-tour',

  props: {
    steps: {type: Array, required: true},
    callbacks: {type: Object, required: true}
  },

  setup(){
  return {  }
  },

  mounted: function(){
    this.$tours['myTour'].start()
  }
};
</script>


<style lang="scss" scoped>

</style>