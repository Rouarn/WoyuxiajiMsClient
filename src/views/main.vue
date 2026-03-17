<template>
  <div class="c-main" ref="main">
    <div class="c-main__header">
      <div class="c-main__title">
        <h1>我与夏季.</h1>
      </div>
      <UnderLine></UnderLine>
      <div class="c-main__info">
        <div class="c-main__info-text">
          <span>/*&nbsp;</span>
          <span :class="{ 'c-main__cursor--blinking': blinkingCursor }">{{ introduce }}</span>
          <span>&nbsp;*/</span>
        </div>
        <div class="c-main__info-time">{{ currentTime }}</div>
      </div>
    </div>
    <div class="c-main__scroll-down" @click="scrollAbouta"></div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, onUnmounted, ref } from 'vue'
import UnderLine from '@/components/under-line.vue'

const scrollAbouta = () => {
  window.scrollTo({
    top: window.innerHeight, // 滚动到指定的位置
    behavior: 'smooth',
  })
}

const main = ref<HTMLElement | null>(null)
const mainEmits = defineEmits(['mainHeight'])

// 打字机效果
const introduce = ref('')
const blinkingCursor = ref(true)
const currentTime = ref('')
let typewriterTimer: number
let clockTimer: number

const updateHeight = () => {
  if (main.value) {
    mainEmits('mainHeight', main.value.offsetHeight)
  }
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)

  // Typewriter effect
  let i = 0
  const str = '这里是刘靓仔的个人主页'
  typewriterTimer = window.setInterval(() => {
    introduce.value += str[i]
    i++
    if (i >= str.length) {
      clearInterval(typewriterTimer)
      setTimeout(() => {
        blinkingCursor.value = false
      }, 1000)
    }
  }, 300)

  // Clock
  clockTimer = window.setInterval(() => {
    currentTime.value = dayjs().format('今天是YYYY年MM月DD日HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  clearInterval(typewriterTimer)
  clearInterval(clockTimer)
})
</script>

<style lang="scss" scoped>
.c-main {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url('https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN')
    no-repeat center/cover;
  .c-main__header {
    position: absolute;
    top: 35%;
    width: 100%;
    height: 200px;
    .c-main__title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        font-weight: 400;
        font-size: 76px;
        color: var(--main-text);
      }
      margin-bottom: 3px;
    }
    .c-main__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      .c-main__info-text {
        & > span {
          font-size: 15px;
          color: var(--main-text);
          &.c-main__cursor--blinking:nth-child(2) {
            color: #00ff00;
            &::after {
              content: '';
              display: inline-block;
              width: 2px;
              height: 15px;
              background-color: var(--main-text);
              margin: 0 5px;
              vertical-align: middle;
              // 闪烁效果
              animation: blink 1s linear infinite;
            }

            @keyframes blink {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
      }
      .c-main__info-time {
        font-size: 16px;
        color: var(--main-text);
      }
    }
  }
  .c-main__scroll-down {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 2%;
    border-right: 3px solid;
    border-top: 3px solid;
    border-color: rgba(253, 228, 227, 0.9);
    border-radius: 2px;
    box-sizing: unset;
    height: 20px;
    width: 20px;
    cursor: pointer;
    transform: rotate(135deg);
  }
}
</style>
