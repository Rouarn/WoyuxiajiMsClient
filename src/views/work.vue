<template>
  <div class="c-work" id="work" ref="workRef">
    <h1>我的作品</h1>
    <under-line ref="lineRef"></under-line>
    <div class="c-work__background"></div>
    <div class="c-work__list" ref="workList" v-if="list">
      <a :href="item.url" target="_blank" v-for="(item, index) in list" :key="item.id" class="c-work__card"
        :class="{ 'c-work__card--last': index === list.length - 1 }">
        <img :src="item.pic" :alt="item.title" class="c-work__card-image" />
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
import { onMounted, reactive, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import UnderLine from '@/components/under-line.vue'

gsap.registerPlugin(ScrollTrigger)

const workRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const workList = ref<HTMLElement | null>(null)

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

    await nextTick()

    gsap.fromTo(
      lineRef.value,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: workRef.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    gsap.fromTo(
      '.c-work__card',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: workList.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    document.querySelectorAll('.c-work__card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -15, scale: 1.05, duration: 0.3, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
      })
    })
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

  &__background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-secondary);
    z-index: -1;
  }

  &__list {
    width: 80%;
    margin: 50px auto 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 50px;
    justify-content: center;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 25px;
    }
  }

  &__card {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--card-shadow) 0 5px 10px;
    transition: all 0.3s ease-in-out;
    text-decoration: none;

    @media screen and (max-width: 768px) {
      max-width: 100%;
    }

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

    &-body {
      height: calc(100% - 155px);
      background-color: var(--card-bg);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px 20px;
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 5px;
    }

    h2 {
      font-size: 16px;
      font-weight: 700;
      color: var(--card-text-title);
      margin: 0;
    }

    p {
      font-size: 16px;
      color: var(--card-text-desc);

      &:nth-child(2) {
        margin: 1px 0 0;
        font-size: small;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:nth-child(3) {
        margin: 9px 0 0;
        font-size: 12px;
      }
    }
  }
}
</style>
