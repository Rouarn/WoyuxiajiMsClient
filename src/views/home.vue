<template>
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
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
// 引入nav组件
import Nav from '@/views/nav.vue'
import Main from '@/views/main.vue'
import About from '@/views/about.vue'
import Work from '@/views/work.vue'
import BlinkingCursor from '@/components/blinking-cursor.vue'
import Info from '@/views/info.vue'
import Footer from '@/views/footer.vue'

// 传递给About和blinking-cursor 子组件的值
const isBlinkingCursorShow = ref<boolean>(false)
const isCherryBlossomShow = (value: boolean) => {
  isBlinkingCursorShow.value = value
}

// 接收main组件传递过来的高度
const homeHeight = ref<number>(0)
// 传递给blinkingCursor组件

const homePageHeight = (height: number) => {
  homeHeight.value = height
}

const isNavActive = ref<boolean>(false)

const handleScroll = () => {
  if (window.scrollY >= homeHeight.value - 150) {
    isNavActive.value = true
  } else {
    isNavActive.value = false
  }
}

onMounted(() => {
  // 监控滚动条
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
</style>
