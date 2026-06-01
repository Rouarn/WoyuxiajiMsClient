<template>
  <div class="c-about" id="about" ref="aboutRef">
    <h1 ref="titleRef">关于我</h1>
    <under-line ref="lineRef"></under-line>
    <div class="c-about__tags" ref="tagsRef">
      <span class="c-about__tag" v-for="(tag, index) in tags" :key="tag" :data-index="index">
        {{ tag }}
      </span>
      <span class="c-about__tag cherry-tag" @click="toggleCherryBlossom">{{
        blossomButtonText
      }}</span>
    </div>
    <div class="c-about__content" ref="contentRef">
      <p v-for="(text, index) in content" :key="index" :data-index="index">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import UnderLine from '@/components/under-line.vue'

gsap.registerPlugin(ScrollTrigger)

const aboutRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const tagsRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const tags = ['00后', 'WYXJ', 'YXNYG', '小黑子']

const content = [
  '嗨,我是刘靓仔。',
  '一个练习时长两年半的前端艺术家',
  '同时也是一名音乐爱好者、白日梦想家',
  '某知名视频站的不知名UP主',
  '强迫症、拖延症、懒癌晚期',
  'PS:(这都不是真的,我非常的勤奋好学,真的)',
  '在郑州度过最SB的高中三年',
  '现就读于河南某大学软件系',
  '热衷钻研与计算机有关的一切：',
  '前端开发、平面设计、视频剪辑、吹牛逼等...',
  '近期白日梦想：富婆包养我!',
  '带着相机和好心情 与喜欢的人环游世界',
  '请多指教！',
]

const isCherryBlossomShow = ref(true)
const blossomButtonText = computed(() =>
  isCherryBlossomShow.value ? '关闭樱花飘落' : '开启樱花飘落',
)
const emit = defineEmits(['isCherryBlossomShow'])

const toggleCherryBlossom = () => {
  isCherryBlossomShow.value = !isCherryBlossomShow.value
  emit('isCherryBlossomShow', isCherryBlossomShow.value)
}

onMounted(() => {
  gsap.fromTo(
    titleRef.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  gsap.fromTo(
    lineRef.value,
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutRef.value,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  gsap.fromTo(
    '.c-about__tag',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: tagsRef.value,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  gsap.fromTo(
    '.c-about__content p',
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: contentRef.value,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  document.querySelectorAll('.c-about__tag').forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, { scale: 1.15, rotation: 3, duration: 0.3, ease: 'power2.out' })
    })
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' })
    })
  })

  emit('isCherryBlossomShow', isCherryBlossomShow.value)
})
</script>

<style lang="scss" scoped>
.c-about {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 30px;
    color: var(--text-primary);
    margin-bottom: 25px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      font-size: 25px;
    }
  }

  &__tags {
    margin: 25px 0 15px 0;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: small;
  }

  &__tag {
    margin: 0 5px;
    padding: 8px 15px;
    border-radius: 5px;
    background-color: var(--tag-bg);
    color: var(--tag-text);
    box-shadow: var(--tag-shadow) 0 5px 20px;
    transition: all 0.3s ease;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      padding: 5px 10px;
    }

    &:hover {
      background-color: var(--tag-hover-bg);
      color: var(--tag-hover-text);
      box-shadow: var(--tag-shadow) 0 5px 20px;
    }
  }

  &__content {
    text-align: center;
    cursor: pointer;

    p {
      margin: 14px 0;
      font-size: 15px;
      color: var(--about-text);
      font-family: '幼圆';

      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  // 阻止 canvas 被鼠标事件触发
  pointer-events: none;
}
</style>
