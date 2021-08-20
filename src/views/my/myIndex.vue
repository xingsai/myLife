<template>
  <div>
    我的
    <div @click="getInfo">11111</div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    getInfo() {
      console.log(1111);
      this.$http.get("/home/getData").then((res) => {
        console.log(res);
        //
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>
