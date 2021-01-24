<!--  -->
<template>
  <div class="intro">
   <div v-html="intro.details"></div>
  </div>
</template>

<script>
export default {
  name: "Introduce",
  props: {
    intro: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },

  components: {}
};
</script>
<style lang="less" scoped>

</style>
