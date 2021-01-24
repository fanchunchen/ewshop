<!--  -->
<template>
  <div class="swipe">
    <swipe :banner="banner"></swipe>
  </div>
</template>

<script>
import Swipe from "@/components/common/swipe/Swipe";
export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },

  components: { Swipe }
};
</script>
<style lang="less" scoped>
.swipe {
  margin-top: 45px;
}
</style>
