<template>
  <nav :class="{ active: navActive }">
    <div class="nav">
      <a class="nav__logo" href="#">
        <img :src="navActive ? '/images/Logo_Main_2208.svg' : '/images/Logo_Main_2108.svg'" alt="logo" />
        <img :src="navActive ? '/images/Logo_Text_2208.svg' : '/images/Logo_Text_2108.svg'" alt="logo" />
      </a>
      <div class="switch" @click.stop="IsMove" :class="{ active: IsMoveShow }">
        <span class="line"></span>
      </div>
      <div class="nav__overlay" v-if="IsMoveShow" @click="IsMove"></div>
      <div class="nav__menu" :class="{ active: IsMoveShow }" @click.stop="">
        <ul :class="{ active: navActive || isDark }">
          <li @click="IsMove"><a href="#">首页</a></li>
          <li @click="IsMove"><a href="#about">关于</a></li>
          <li @click="IsMove"><a href="#work">作品</a></li>
          <li @click="IsMove"><a href="#info">日志</a></li>
          <li @click.stop="toggleTheme">
            <a>
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
import moonIcon from '@/assets/images/TB-Jerry-moon.svg'
import sunIcon from '@/assets/images/TB-Tom-sun.svg'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
// 移动端导航栏效果
const IsMoveShow = ref(false)
const IsMove = () => {
  IsMoveShow.value = !IsMoveShow.value
}

// 点击非switch区域关闭switch,排除nav__menu里面的a标签
const handleOutsideClick = (e: MouseEvent) => {
  const switchDom = document.querySelector('.switch')
  const navMenuDom = document.querySelector('.nav__menu')
  const target = e.target as Node
  if (switchDom && navMenuDom && !switchDom.contains(target) && !navMenuDom.contains(target)) {
    IsMoveShow.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

// 监视器watch
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
nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 999;
  transition: all 0.5s;
  &.active {
    background-color: var(--nav-bg);
    box-shadow: var(--nav-shadow) 0 5px 10px;
    .nav {
      .nav__menu {
        ul {
          li {
            a {
              color: var(--nav-text);
              &:hover {
                background-color: var(--nav-text-hover-bg);
              }
            }
          }
          &.active {
            li {
              a {
                color: var(--nav-text-active);
              }
            }
          }
        }
      }
    }
  }
  .nav {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav__logo {
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

    .nav__menu {
      height: 50px;
      display: flex;
      align-items: center;
      justify-items: center;
      ul {
        height: 50px;
        display: flex;
        li {
          width: 70px;
          margin: 0 20px;
          display: flex;
          align-items: center;
          justify-items: center;
          a {
            width: inherit;
            height: inherit;
            text-decoration: none;
            color: var(--nav-text);
            font-size: 15px;
            border-radius: 5px;
            text-align: center;
            padding: 7px 20px;
            transition: all 0.5s;
            > img {
              width: 30px;
              height: 30px;
              margin: 0 auto;
            }
          }
          &:hover {
            &::after {
              display: block;
            }
            a {
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
          }
          &:last-child::after {
            content: none;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// 移动端
@media screen and (max-width: 768px) {
  nav {
    &.active > .nav > .switch {
      z-index: 1001;
      &::before,
      &::after,
      .line {
        background-color: var(--nav-switch-color);
      }
    }
    .nav {
      position: relative;
      .switch {
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
        .line {
          content: '';
          width: 20px;
          height: 2px;
          background-color: #fff;
          position: absolute;
          transition: all 0.3s ease;
        }
        .line {
          width: 20px;
        }
        &::before {
          top: 6px;
        }
        &::after {
          bottom: 6px;
        }
        &.active {
          .line {
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

      .nav__overlay {
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

      .nav__menu {
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

        &.active {
          right: 0;
        }

        ul {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;

          li {
            width: 80%;
            height: 50px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            a {
              width: 100%;
              height: 100%;
              text-decoration: none;
              color: var(--text-primary);
              font-size: 18px;
              font-weight: 500;
              border-radius: 12px;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              background: rgba(255, 255, 255, 0.05);

              &:active {
                background: rgba(255, 255, 255, 0.15);
                transform: scale(0.95);
              }

              > img {
                width: 32px;
                height: 32px;
              }
            }

            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
