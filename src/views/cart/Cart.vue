<!--  -->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车 </template>
    </nav-bar>
    购物车
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "Cart",
  data() {
    return {};
  },

  components: { NavBar }
};
</script>
<style scoped></style>
