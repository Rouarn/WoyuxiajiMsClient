<template>
  <nav :class="{ active: navActive }">
    <div class="nav">
      <div class="nav__logo" @click="() => $router.push('/')">
        <img src="@/assets/img/Logo_Main_2108.svg" alt="logo" ref="Logo_Main" />
        <img src="@/assets/img/Logo_Text_2108.svg" alt="logo" ref="Logo_Text" />
      </div>
      <div
        class="switch"
        @click.stop="IsMove"
        :class="{ active: IsMoveShow }"
      ></div>
      <div class="nav__menu" @click.stop="">
        <ul @click.stop="">
          <li @click.stop=""><a href="#">首页</a></li>
          <li @click.stop=""><a href="#about">关于</a></li>
          <li @click.stop=""><a href="#work">作品</a></li>
          <li @click.stop=""><a href="#info">日志</a></li>
          <li @click.stop="topicSwitching">
            <a>
              <img src="@/assets/img/TB-Tom-sun.svg" alt="sum" ref="sum" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
// 移动端导航栏效果
const IsMoveShow = ref(false);
const IsMove = () => {
  IsMoveShow.value = !IsMoveShow.value;
};

// 点击非switch区域关闭switch,排除nav__menu里面的a标签
const switchDom = document.querySelector(".switch");
const navMenuDom = document.querySelector(".nav__menu");
document.addEventListener("click", (e: { target: HTMLElement }) => {
  if (e.target !== switchDom && e.target !== navMenuDom) {
    IsMoveShow.value = false;
  }
});

// 监视器watch
const props = defineProps({
  navClassCame: {
    type: Boolean,
    default: false,
  },
});

let navActive = false;
const Logo_Main: any = ref(null);
const Logo_Text: any = ref(null);
watch(
  () => props.navClassCame,
  (newVal, oldVal) => {
    if (newVal) {
      navActive = true;
      Logo_Main.value.src = require("@/assets/img/Logo_Main_2208.svg");
      Logo_Text.value.src = require("@/assets/img/Logo_Text_2208.svg");
    } else {
      navActive = false;
      Logo_Main.value.src = require("@/assets/img/Logo_Main_2108.svg");
      Logo_Text.value.src = require("@/assets/img/Logo_Text_2108.svg");
    }
  }
);

const sum: any = ref(null);
const topicSwitching = () => {
  if (sum.value.alt === "sum") {
    sum.value.src = require("@/assets/img/TB-Jerry-moon.svg");
    sum.value.alt = "moon";
  } else {
    sum.value.src = require("@/assets/img/TB-Tom-sun.svg");
    sum.value.alt = "sum";
  }
};
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
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px;
    .nav {
      .nav__menu {
        ul {
          li {
            a {
              color: #000;
              &:hover {
                background-color: rgba(0, 0, 0, 0.1);
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
            color: #fff;
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
            content: "";
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
      background-color: #000000;
      &::before,
      &::after {
        background-color: #000000;
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
          content: "";
          width: 20px;
          height: 1px;
          background-color: #fff;
          position: absolute;
          top: 8px;
          left: 0;
          // pointer-events: none;  // 事件穿透
        }
        &::after {
          content: "";
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
          background-color: pink;
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
                color: #fff;
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
                content: "";
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
