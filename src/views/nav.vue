<template>
  <nav :class="{ active: navActive }">
    <div class="nav">
      <a class="nav__logo" href="#">
        <img src="/images/Logo_Main_2108.svg" alt="logo" ref="Logo_Main" />
        <img
          :src="navActive ? '/images/Logo_Text_2208.svg' : '/images/Logo_Text_2108.svg'"
          alt="logo"
          ref="Logo_Text"
        />
      </a>
      <div class="switch" @click.stop="IsMove" :class="{ active: IsMoveShow }"></div>
      <div class="nav__menu" @click.stop="">
        <ul @click.stop="" :class="{ active: navActive || isDark }">
          <li @click.stop=""><a href="#">首页</a></li>
          <li @click.stop=""><a href="#about">关于</a></li>
          <li @click.stop=""><a href="#work">作品</a></li>
          <li @click.stop=""><a href="#info">日志</a></li>
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
    if (newVal) {
      navActive.value = true
    } else {
      navActive.value = false
    }
  },
)
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100vw;
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
  //  把已经设置的所有样式都设为空
  nav {
    &.active > .nav > .switch {
      background-color: var(--nav-switch-color);
      &::before,
      &::after {
        background-color: var(--nav-switch-color);
      }
    }
    .nav {
      position: relative;
      .switch {
        width: 20px;
        height: 1px;
        background-color: #fff;
        transition: all 0.5s;
        z-index: 5;
        &::before {
          content: '';
          width: 20px;
          height: 1px;
          background-color: #fff;
          position: absolute;
          top: 8px;
          left: 0;
          // pointer-events: none;  // 事件穿透
        }
        &::after {
          content: '';
          width: 20px;
          height: 1px;
          background-color: #fff;
          position: absolute;
          top: -8px;
          left: 0;
          // pointer-events: none;
        }
        &.active {
          width: 0;
          margin-right: 20px;
          background-color: transparent;
          cursor: pointer;
          &::before {
            transform: rotate(45deg);
            top: 0;
          }
          &::after {
            transform: rotate(-45deg);
            top: 0;
          }
        }
        &.active + .nav__menu {
          position: absolute;
          top: 0;
          left: 20vw;
          width: 70vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-items: center;
          background-color: var(--nav-mobile-bg);
          // 添加动画
          transition: all 0.5s;
          ul {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            li {
              width: 100%;
              height: 50px;
              margin: 0;
              display: flex;
              align-items: center;
              justify-items: center;
              a {
                width: 100%;
                height: 100%;
                text-decoration: none;
                color: var(--text-primary);
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
                width: 50px;
                height: 3px;
                border-bottom: 1px solid rgba(0, 255, 0, 0.7);
                position: absolute;
                left: 41%;
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
      .nav__menu {
        display: none;
        ul {
          li {
            a {
              > img {
                width: 30px;
                height: 30px;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
