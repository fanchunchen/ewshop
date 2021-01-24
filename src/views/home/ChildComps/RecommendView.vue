<!--  -->
<template>
  <div class="recommend">
    <div v-for="item in recommends.slice(0, 4)" :key="item.id">
      <a href=""
      @click.prevent="goDetail(item.id)"
        ><img v-lazy="item.cover_url" alt="" />
        <p>{{ item.title }}</p></a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
methods:{
  goDetail(id){
    this.$router.push({path:'/detail',query:{id}})
  }
},
  components: {}
};
</script>
<style lang="less" scoped>
.recommend {
  font-size: 12px;
  display: flex;
  padding: 10px 0;

  border-bottom: 5px solid #ccc;
  div {
    a {
      color: #333;
      text-align: center;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
