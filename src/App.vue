<template>
  <div class="bigwrap" ref="yuansu">
    <div v-if="$route.meta.showTop">
      <van-nav-bar title="标题" left-text="返回" left-arrow >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="router-wrap">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
        </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
      </router-view>
    </div>
   
    <bottom-tab v-if="$route.meta.showBottom">

    </bottom-tab>

  
  </div>
</template>

<script>
import bottomTab from "@/components/bottomTab.vue"
export default {
  data() {
    return {
      activeTab: 1,
      home: require("./assets/tabbar/goods1.png"),
      homeActived: require("./assets/tabbar/goods.png"),
      dingdan: require("./assets/tabbar/detail.png"),
      dingdanActive: require("./assets/tabbar/detailactive.png"),
      quan: require("./assets/tabbar/recorde.png"),
      quanActive: require("./assets/tabbar/recodeed.png"),
      zhuan: require("./assets/tabbar/zhuan.png"),
      zhuanok: require("./assets/tabbar/zhuanOK.png"),
    };
  },
  components:{
    bottomTab,
  },
  mounted: function () {
    this.$nextTick(() => {
      this.checkHeight();
    });
   
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      this.checkHeight();
    },
  },
  methods: {
    checkHeight() {
      setTimeout(() => {
        let tt =
          document.documentElement.clientHeight || document.body.clientHeight;
        this.$refs.yuansu.style.height = tt + "px"; //动态设置HTML元素高度
      }, 10);
    },

    golink(num, link) {
      this.activeTab = num;
      this.$router.push(link);
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
