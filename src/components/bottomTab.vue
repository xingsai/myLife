<template>
  <div class="fixed-wrap">
    <div class="btn-wrap">
      <div
        class="one-tap"
        v-for="(item, index) in arrList"
        :key="index"
        @click="goUrl(item, index)"
      >
        <div class="img-wrap">
          <img
            :src="activeTab == index ? item.imageActive : item.image"
            alt=""
            class="img-style"
          />
        </div>
        <p
          class="tab-txt"
          :class="[activeTab == index ? 'tab-txt-active' : '']"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeTab: 0,
      arrList: [
        {
          name: "首页",
          image: require("@/assets/tabbar/goods1.png"),
          imageActive: require("@/assets/tabbar/goods.png"),
          url: "home",
        },
        {
          name: "走势",
          image: require("@/assets/tabbar/detail.png"),
          imageActive: require("@/assets/tabbar/detailactive.png"),
          url: "menuList",
        },
        {
          name: "我的",
          image: require("@/assets/tabbar/recorde.png"),
          imageActive: require("@/assets/tabbar/recodeed.png"),
          url: "myInfo",
        },
      ],
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {
    "$route.path": {
      handler: function (newpath, oldpath) {
        console.log(newpath);
        this.arrList.filter((item, index) => {
          if (newpath === "/" + item.url) {
            this.activeTab = index;
          }
        });
      },
      // 深度观察监听
      //deep: true,
      immediate: true,
    },
  },
  methods: {
    goUrl(item, index) {
      //this.activeTab = index;
      this.$router.push("/" + item.url);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/common/common.scss";
.bigwrap {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}
.router-wrap {
  flex: 1;
  overflow: auto;
}
.fixed-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #f9f9f9;
}
.btn-wrap {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: px2rem(10);
  box-sizing: border-box;
}
.one-tap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.img-wrap {
  height: px2rem(30);
  width: px2rem(30);
  display: flex;
}
.img-style {
  height: 100%;
  width: 100%;
}
.tab-txt {
  font-size: px2rem(24);
  color: #30313c;
  margin-top: px2rem(15);
}
.tab-txt-active {
  color: #ff6969;
}
</style>

