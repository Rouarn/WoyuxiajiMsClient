<template>
  <nav class="c-nav" :class="{ 'c-nav--active': navActive }">
    <div class="c-nav__container">
      <a class="c-nav__logo" href="#">
        <img
          :src="navActive ? '/images/Logo_Main_2208.svg' : '/images/Logo_Main_2108.svg'"
          alt="logo"
        />
        <img
          :src="navActive ? '/images/Logo_Text_2208.svg' : '/images/Logo_Text_2108.svg'"
          alt="logo"
        />
      </a>
      <div
        class="c-nav__toggle"
        @click.stop="IsMove"
        :class="{ 'c-nav__toggle--active': IsMoveShow }"
      >
        <span class="c-nav__toggle-line"></span>
      </div>
      <div class="c-nav__overlay" v-if="IsMoveShow" @click="IsMove"></div>
      <div class="c-nav__menu" :class="{ 'c-nav__menu--active': IsMoveShow }" @click.stop="">
        <ul class="c-nav__list" :class="{ 'c-nav__list--active': navActive || isDark }">
          <li class="c-nav__item" @click="IsMove"><a class="c-nav__link" href="#">首页</a></li>
          <li class="c-nav__item" @click="IsMove"><a class="c-nav__link" href="#about">关于</a></li>
          <li class="c-nav__item" @click="IsMove"><a class="c-nav__link" href="#work">作品</a></li>
          <li class="c-nav__item" @click="IsMove"><a class="c-nav__link" href="#info">日志</a></li>
          <li class="c-nav__item" @click.stop="toggleTheme">
            <a class="c-nav__link">
              <img :src="isDark ? moonIcon : sunIcon" :alt="isDark ? 'moon' : 'sun'" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import gsap from 'gsap'
import moonIcon from '@/assets/images/TB-Jerry-moon.svg'
import sunIcon from '@/assets/images/TB-Tom-sun.svg'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const IsMoveShow = ref(false)
const IsMove = () => {
  IsMoveShow.value = !IsMoveShow.value
}

const handleOutsideClick = (e: MouseEvent) => {
  const switchDom = document.querySelector('.c-nav__toggle')
  const navMenuDom = document.querySelector('.c-nav__menu')
  const target = e.target as Node
  if (switchDom && navMenuDom && !switchDom.contains(target) && !navMenuDom.contains(target)) {
    IsMoveShow.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)

  gsap.fromTo(
    '.c-nav__logo',
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 },
  )

  gsap.fromTo(
    '.c-nav__item',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.7 },
  )

  document.querySelectorAll('.c-nav__link').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -3,
        color: '#00ff00',
        duration: 0.2,
        ease: 'power2.out',
      })
    })
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        y: 0,
        color: '',
        duration: 0.2,
        ease: 'power2.out',
      })
    })
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

const props = defineProps({
  navClassCame: {
    type: Boolean,
    default: false,
  },
})

const navActive = ref(false)
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
watch(
  () => props.navClassCame,
  (newVal) => {
    navActive.value = newVal
  },
)
</script>

<style lang="scss" scoped>
.c-nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 999;
  transition: all 0.5s;

  &--active {
    background-color: var(--nav-bg);
    box-shadow: var(--nav-shadow) 0 5px 10px;

    @media screen and (max-width: 768px) {
      & > .c-nav__container > .c-nav__toggle {
        z-index: 1001;
        &::before,
        &::after,
        .c-nav__toggle-line {
          background-color: var(--nav-switch-color);
        }
      }
    }

    .c-nav__link {
      color: var(--nav-text);
      &:hover {
        background-color: var(--nav-text-hover-bg);
      }
    }

    .c-nav__list--active {
      .c-nav__link {
        color: var(--nav-text-active);
      }
    }
  }

  &__container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  &__logo {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
      &:nth-child(2) {
        width: 100px;
        height: 50px;
      }
    }
  }

  &__toggle {
    display: none;

    @media screen and (max-width: 768px) {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.5s;
      z-index: 1001;
      position: relative;

      &::before,
      &::after,
      .c-nav__toggle-line {
        content: '';
        width: 20px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        transition: all 0.3s ease;
      }

      .c-nav__toggle-line {
        width: 20px;
      }
      &::before {
        top: 6px;
      }
      &::after {
        bottom: 6px;
      }

      &--active {
        .c-nav__toggle-line {
          width: 0;
          opacity: 0;
        }
        &::before {
          transform: rotate(45deg);
          top: 14px;
        }
        &::after {
          transform: rotate(-45deg);
          bottom: 14px;
        }
      }
    }
  }

  &__overlay {
    @media screen and (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(4px);
      z-index: 999;
      transition: opacity 0.3s ease;
    }
  }

  &__menu {
    height: 50px;
    display: flex;
    align-items: center;
    justify-items: center;

    @media screen and (max-width: 768px) {
      position: fixed;
      top: 0;
      right: -70vw;
      width: 70vw;
      height: 100vh;
      background: var(--nav-mobile-bg);
      z-index: 1000;
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);

      &--active {
        right: 0;
      }
    }
  }

  &__list {
    height: 50px;
    display: flex;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: auto;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
  }

  &__item {
    width: 70px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-items: center;
    position: relative;

    @media screen and (max-width: 768px) {
      width: 80%;
      height: 50px;
      margin: 0;
      justify-content: center;
    }

    &:hover {
      &::after {
        display: block;
      }
      .c-nav__link {
        transition: 0.5s;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    &::after {
      content: '';
      width: 23px;
      height: 3px;
      border-bottom: 1px solid rgba(0, 255, 0, 0.7);
      position: absolute;
      left: 35%;
      bottom: 18%;
      transition: width 0.3s;
      display: none;

      @media screen and (max-width: 768px) {
        display: none !important;
      }
    }

    &:last-child::after {
      content: none;
    }
  }

  &__link {
    width: inherit;
    height: inherit;
    text-decoration: none;
    color: var(--nav-text);
    font-size: 15px;
    border-radius: 5px;
    text-align: center;
    padding: 7px 20px;
    transition: all 0.5s;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: 100%;
      color: var(--text-primary);
      font-size: 18px;
      font-weight: 500;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);

      &:active {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(0.95);
      }
    }

    > img {
      width: 30px;
      height: 30px;
      margin: 0 auto;

      @media screen and (max-width: 768px) {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
