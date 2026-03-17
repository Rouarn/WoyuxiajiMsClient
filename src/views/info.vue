<template>
  <div class="c-info" id="info">
    <h1>小站大记事</h1>
    <under-line></under-line>
    <p>左右滑动来查看</p>
    <div class="c-info__log-container">
      <div class="c-info__log-list">
        <div class="c-info__log-item"></div>
        <div class="c-info__log-item" v-for="item in list" :key="item.id">
          <h2>{{ item.logTime }}</h2>
          <p>{{ item.description }}</p>
          <p v-if="item.otherText">{{ item.otherText }}</p>
        </div>
      </div>
    </div>
    <div class="c-info__mask" v-if="DetermineScreenWidth">
      <span class="c-info__mask--left"></span>
      <span class="c-info__mask--right"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入under-line组件
import UnderLine from '@/components/under-line.vue'
import { onMounted, ref, computed } from 'vue'

const list = ref<
  {
    id: number
    logTime: string
    description: string
    otherText: string
  }[]
>([])

const DetermineScreenWidth = computed(() => window.matchMedia('(min-width: 1200px)').matches)

onMounted(async () => {
  try {
    const response = await fetch('/json/info.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    list.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch info.json:', error)
  }
})
</script>

<style lang="scss" scoped>
.c-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 80px 0;
  overflow: hidden;
  position: relative;
  h1 {
    font-size: 30px;
    color: var(--text-primary);
    margin-bottom: 17px;
    cursor: pointer;
  }
  p {
    font-size: 12px;
    color: var(--text-primary);
    margin-top: 17px;
  }
  .c-info__mask {
    width: 75%;
    height: 100px;
    position: absolute;
    bottom: 32%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    .c-info__mask--left {
      display: block;
      width: 150px;
      height: 100px;
      z-index: 1;
      background-image: linear-gradient(to left, rgba(255, 255, 255, 0), var(--bg-color));
    }
    .c-info__mask--right {
      display: block;
      width: 150px;
      height: 100px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0), var(--bg-color));
    }
  }
  .c-info__log-container {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .c-info__log-list {
      width: 150px;
      height: 1200px;
      overflow-y: scroll;
      overflow-x: hidden;
      transform: rotate(270deg);

      .c-info__log-item {
        width: 300px;
        height: 282px;
        transform: rotate(90deg);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding-bottom: 75px;
        position: relative;
        h2 {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }
        p {
          margin: 0;
          padding: 0;
          color: var(--text-regular);
          font-size: 14px;
          &:nth-child(3) {
            position: absolute;
            bottom: 55px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// 移动端
@media screen and (max-width: 1200px) {
  .c-info {
    padding: 50px 0 30px 0;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 10px;
    }
    .c-info__mask {
      width: 100%;
      height: 50px;
      bottom: 30%;
      .c-info__mask--left {
        width: 100px;
        height: 50px;
      }
      .c-info__mask--right {
        width: 100px;
        height: 50px;
      }
    }
    .c-info__log-container {
      width: 100vw;
      height: 100px;
      .c-info__log-list {
        width: 100px;
        height: 600px;
        .c-info__log-item {
          width: 200px;
          height: 200px;
          padding-bottom: 50px;
          &.move {
            display: block;
          }
          h2 {
            font-size: 12px;
          }
          p {
            font-size: 10px;
            &:nth-child(3) {
              bottom: 35px;
            }
          }
        }
      }
    }
  }
}
</style>
