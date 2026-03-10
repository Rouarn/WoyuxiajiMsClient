<template>
  <div class="main" ref="main">
    <div class="topTitle">
      <div class="topTitleCenter__title">
        <h1>我与夏季.</h1>
      </div>
      <UnderLine></UnderLine>
      <div class="topTitleCenter__info">
        <div class="topTitleCenter__info__text">
          <span>/*&nbsp;</span>
          <span :class="{ blinkingCursor: blinkingCursor }">{{ introduce }}</span>
          <span>&nbsp;*/</span>
        </div>
        <div class="topTitleCenter__info__time" ref="now"></div>
      </div>
    </div>
    <div class="scrollDownIcon" @click="scrollAbouta"></div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { onMounted, ref } from 'vue'
import UnderLine from '@/components/under-line.vue'

const scrollAbouta = () => {
  window.scrollTo({
    top: window.innerHeight, // 滚动到指定的位置
    behavior: 'smooth',
  })
}

const main = ref<HTMLElement | null>(null)
const mainEmits = defineEmits(['mainHeight'])

onMounted(() => {
  // 获取滚动条距离顶部的距离
  if (main.value) {
    mainEmits('mainHeight', main.value.offsetHeight)
  }
})

// 打字机效果
const introduce = ref('')
const blinkingCursor = ref(true)
onMounted(() => {
  let i = 0
  const str = '这里是刘靓仔的个人主页'
  const timer = setInterval(() => {
    introduce.value += str[i]
    i++
    if (i >= str.length) {
      clearInterval(timer)
      setTimeout(() => {
        blinkingCursor.value = false
      }, 1000)
    }
  }, 300)
})

const now = ref<HTMLElement | null>(null)
onMounted(() => {
  setInterval(() => {
    if (now.value) now.value.innerHTML = moment().format('今天是YYYY年MM月DD日HH:mm:ss')
  }, 1000)
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url('@/assets/background28.jpg') no-repeat center/cover;
  .topTitle {
    position: absolute;
    top: 35%;
    width: 100%;
    height: 200px;
    .topTitleCenter__title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        font-weight: 400;
        font-size: 76px;
        color: #fff;
      }
      margin-bottom: 3px;
    }
    .topTitleCenter__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 15px;
      .topTitleCenter__info__text {
        & > span {
          font-size: 15px;
          color: #fff;
          &.blinkingCursor:nth-child(2) {
            color: #00ff00;
            &::after {
              content: '';
              display: inline-block;
              width: 2px;
              height: 15px;
              background-color: #fff;
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
        .text-item {
          display: inline-block;
          font-size: 15px;
          color: #fff;
          margin: 0 2px;
        }
      }
      .topTitleCenter__info__time {
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .scrollDownIcon {
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
