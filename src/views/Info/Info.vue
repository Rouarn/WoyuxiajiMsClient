<template>
  <div id="info">
    <h1>小站大记事</h1>
    <under-line></under-line>
    <p>左右滑动来查看</p>
    <div class="log">
      <div class="log-list">
        <div class="log-item move">
          <h2></h2>
          <p></p>
          <p></p>
        </div>
        <div class="log-item" v-for="item in list" :key="item.id">
          <h2>{{ item.logTime }}</h2>
          <p>{{ item.description }}</p>
          <p v-if="item.otherText">{{ item.otherText }}</p>
        </div>
      </div>
    </div>
    <div class="logMask" v-if="DetermineScreenWidth">
      <span class="logMaskL"></span>
      <span class="logMaskR"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入under-line组件
import UnderLine from "@/components/underLine.vue";
import { onMounted, reactive, ref } from "vue";
import Info from "@/types/Info";
import httpApi from "@/http";

const list = reactive<Info[]>([]);
onMounted(() => {
  // 发送请求
  httpApi.InfoApi.queryAllInfo().then(res => {
    list.push(
      ...res.data.data.map((item: Info) => {
        return {
          id: item.F_Id,
          logTime: item.F_LogTime,
          description: item.F_Description,
          otherText: item.F_OtherText,
        };
      })
    );
  });
});

const DetermineScreenWidth = ref<boolean>(false);
onMounted(() => {
  // 判断屏幕宽度
  if (document.documentElement.clientWidth < 1200) {
    DetermineScreenWidth.value = false;
  } else {
    DetermineScreenWidth.value = true;
  }
});
</script>

<style lang="scss" scoped>
#info {
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
    color: #000000;
    margin-bottom: 17px;
    cursor: pointer;
  }
  p {
    font-size: 12px;
    color: #000000;
    margin-top: 17px;
  }
  .logMask {
    width: 75%;
    height: 100px;
    position: absolute;
    bottom: 32%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    .logMaskL {
      display: block;
      width: 150px;
      height: 100px;
      z-index: 1;
      background-image: linear-gradient(
        to left,
        rgba(255, 255, 255, 0),
        rgb(255, 255, 255)
      );
    }
    .logMaskR {
      display: block;
      width: 150px;
      height: 100px;
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgb(255, 255, 255)
      );
    }
  }
  .log {
    width: 100vw;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .log-list {
      width: 150px;
      height: 1200px;
      overflow-y: scroll;
      overflow-x: hidden;
      transform: rotate(270deg);

      .log-item {
        width: 300px;
        height: 282px;
        transform: rotate(90deg);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding-bottom: 75px;
        position: relative;
        &.move {
          display: none;
        }
        h2 {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 700;
          color: #000;
        }
        p {
          margin: 0;
          padding: 0;
          color: #ccc;
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
  #info {
    padding: 50px 0 30px 0;
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 10px;
    }
    .logMask {
      width: 100%;
      height: 50px;
      bottom: 30%;
      .logMaskL {
        width: 100px;
        height: 50px;
      }
      .logMaskR {
        width: 100px;
        height: 50px;
      }
    }
    .log {
      width: 100vw;
      height: 100px;
      .log-list {
        width: 100px;
        height: 600px;
        .log-item {
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
