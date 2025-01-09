<template>
  <div class="home">
    <Nav :navClassCame="isNavActive"></Nav>
    <Main @mainHeight="homePageHeight"></Main>
    <blinking-cursor
      v-if="homeHeight != 0"
      :homeHeight="homeHeight"
      :isBlinkingCursorShow="isBlinkingCursorShow"
    ></blinking-cursor>
    <About @isCherryBlossomShow="isCherryBlossomShow"></About>
    <Work></Work>
    <Info></Info>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
// 引入nav组件
import Nav from "@/views/Nav/Nav.vue";
// 引入main组件
import Main from "@/views/Main/Main.vue";
// 引入about组件
import About from "@/views/About/About.vue";
// 引入work组件
import Work from "@/views/Work/Work.vue";
// 引入blinkingCursor组件
import BlinkingCursor from "@/components/blinkingCursor.vue";
// 引入info组件
import Info from "@/views/Info/Info.vue";
// 引入footer组件
import Footer from "@/views/Footer/footer.vue";

// 传递给About和blinking-cursor 子组件的值
const isBlinkingCursorShow = ref<boolean>(false);
const isCherryBlossomShow = (value: any) => {
  isBlinkingCursorShow.value = value;
};

// 接收main组件传递过来的高度
const homeHeight = ref<number>(0);
// 传递给blinkingCursor组件

const homePageHeight = (height: number) => {
  homeHeight.value = height;
};

const isNavActive = ref<boolean>(false);

onMounted(() => {
  // 监控滚动条
  window.addEventListener("scroll", () => {
    if (window.scrollY >= homeHeight.value - 150) {
      isNavActive.value = true;
    } else {
      isNavActive.value = false;
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", () => {});
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
