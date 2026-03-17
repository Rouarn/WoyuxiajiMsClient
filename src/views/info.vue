<template>
  <div class="c-info" id="info">
    <h1>小站大记事</h1>
    <under-line></under-line>
    <p>左右滑动来查看</p>
    <div class="c-info__log-container">
      <div
        class="c-info__log-list"
        ref="scrollContainer"
        @wheel.prevent="handleWheel"
        @mousedown="startDragging"
        @mousemove="onDragging"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"
      >
        <div class="c-info__log-item"></div>
        <div class="c-info__log-item" v-for="item in list" :key="item.id">
          <h2>{{ item.logTime }}</h2>
          <p>{{ item.description }}</p>
          <p v-if="item.otherText">{{ item.otherText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UnderLine from '@/components/under-line.vue'
import { onMounted, ref } from 'vue'

const list = ref<
  {
    id: number
    logTime: string
    description: string
    otherText: string
  }[]
>([])

const scrollContainer = ref<HTMLElement | null>(null)

const handleWheel = (event: WheelEvent) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += event.deltaY
  }
}

// 鼠标拖拽滚动逻辑
const isDragging = ref(false)
const startX = ref(0)
const initialScrollLeft = ref(0)

const startDragging = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.pageX - (scrollContainer.value?.offsetLeft || 0)
  initialScrollLeft.value = scrollContainer.value?.scrollLeft || 0
}

const stopDragging = () => {
  isDragging.value = false
}

const onDragging = (e: MouseEvent) => {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - (scrollContainer.value?.offsetLeft || 0)
  const walk = (x - startX.value) * 2 // 滚动系数，可调整
  scrollContainer.value.scrollLeft = initialScrollLeft.value - walk
}

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

  @media screen and (max-width: 1200px) {
    padding: 50px 0 30px 0;
  }

  h1 {
    font-size: 30px;
    color: var(--text-primary);
    margin-bottom: 17px;
    cursor: pointer;

    @media screen and (max-width: 1200px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 12px;
    color: var(--text-primary);
    margin-top: 17px;

    @media screen and (max-width: 1200px) {
      font-size: 10px;
    }
  }

  &__log-container {
    width: 80%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;

    @media screen and (max-width: 1200px) {
      width: 100vw;
      height: 100px;
    }
  }

  &__log-list {
    width: 86%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &:active {
      cursor: grabbing;
    }
  }

  &__log-item {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding-bottom: 75px;
    position: relative;

    @media screen and (max-width: 1200px) {
      width: 200px;
      padding-bottom: 50px;
    }

    &:first-child {
      width: 50px;

      @media screen and (max-width: 1200px) {
        width: 20px;
      }
    }

    &.move {
      display: block;
    }

    h2 {
      margin: 0;
      padding: 0;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);

      @media screen and (max-width: 1200px) {
        font-size: 12px;
      }
    }

    p {
      margin: 0;
      padding: 0;
      color: var(--text-regular);
      font-size: 14px;

      @media screen and (max-width: 1200px) {
        font-size: 10px;
      }

      &:nth-child(3) {
        position: absolute;
        bottom: 55px;

        @media screen and (max-width: 1200px) {
          bottom: 35px;
        }
      }
    }
  }
}
</style>
