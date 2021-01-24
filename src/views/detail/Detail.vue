<!--  -->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>图书详情 </template>
    </nav-bar>
    {{ $route.query.id }}
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "Detail",
  data() {
    return {};
  },

  components: { NavBar }
};
</script>
<style scoped></style>
