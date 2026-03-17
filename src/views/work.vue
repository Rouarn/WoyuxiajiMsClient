<template>
  <div class="c-work" id="work">
    <h1>我的作品</h1>
    <under-line></under-line>
    <div class="c-work__background"></div>
    <div class="c-work__list" ref="workList" v-if="list">
      <a
        :href="item.url"
        target="_blank"
        v-for="(item, index) in list"
        :key="item.id"
        class="c-work__card"
        :class="{ 'c-work__card--last': index === list.length - 1 }"
      >
        <img :src="item.pic" :alt="item.title" />
        <div class="c-work__card-body">
          <div class="c-work__card-header">
            <h2>{{ item.title }}</h2>
            <p>{{ item.platform }}</p>
          </div>
          <p>{{ item.Introduce }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import UnderLine from '@/components/under-line.vue'

// 请求作品列表
const list = reactive<
  {
    id: number
    title: string
    pic: string
    platform: string
    Introduce: string
    url: string
  }[]
>([])

// 页面挂载前请求作品列表
onMounted(async () => {
  try {
    const response = await fetch('/json/work.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    list.push(
      ...(await response.json()).map((item: { pic: string | URL }) => ({
        ...item,
        pic: new URL(item.pic, import.meta.url).href,
      })),
    )
  } catch (error) {
    console.error('Failed to fetch work.json:', error)
  }
})
</script>

<style lang="scss" scoped>
.c-work {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0 100px 0;
  h1 {
    font-size: 30px;
    color: var(--work-title-color);
    margin-bottom: 25px;
    cursor: pointer;
  }
  .c-work__background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-secondary);
    z-index: -1;
  }

  .c-work__list {
    width: 80%;
    margin: 50px auto 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 50px;
    justify-content: center;
    .c-work__card {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--card-shadow) 0 5px 10px;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
      &:hover {
        box-shadow: var(--card-shadow-hover) 0 5px 20px;
        transform: scale(1.1) translateY(-20px);
      }
      img {
        width: 100%;
        height: 155px;
        object-fit: contain;
        background-color: var(--card-bg);
      }
      .c-work__card-body {
        height: calc(100% - 155px);
        background-color: var(--card-bg);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
        .c-work__card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 5px;
        }
        h2 {
          font-size: 20px;
          color: var(--card-text-title);
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }
        p {
          font-size: 16px;
          color: var(--card-text-desc);
          &:nth-child(2) {
            margin: 1px 0 0;
            color: var(--card-text-desc);
            font-size: small;
            white-space: nowrap;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
          }
          &:nth-child(3) {
            margin: 9px 0 0;
            font-size: 12px;
            color: var(--card-text-desc);
          }
        }
      }
    }
  }
}

// 移动端给作品列表加上 flex-direction: column;
@media screen and (max-width: 768px) {
  .c-work {
    .c-work__list {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 25px;
      .c-work__card {
        max-width: 100%;
      }
    }
  }
}
</style>
