<!--  -->
<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :class="{ active: currentIndex == index }"
      :key="index"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.tab-control {
  position: sticky;
  top: 45px;
  background-color: #fff;
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  div {
    flex: 1;
    span {
      padding: 5px;
    }
  }
  .active {
    span {
      border-bottom: 2px solid red;
    }
  }
}
</style>
