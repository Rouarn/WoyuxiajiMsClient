<template>
  <div id="work">
    <h1>我的作品</h1>
    <under-line></under-line>
    <div class="mark"></div>
    <div class="workList" ref="workList" v-if="list">
      <a
        :href="item.url"
        target="_blank"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{ Alast: index === list.length - 1 }"
      >
        <img :src="item.pic" :alt="item.title" />
        <div class="workLinkText">
          <h2>{{ item.title }}</h2>
          <p>{{ item.platform }}</p>
          <p>{{ item.Introduce }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import httpApi from "@/http";
import Work from "@/types/Work";

// 请求作品列表
const list = reactive<Work[]>([]);
// 页面挂载前请求作品列表
onMounted(() => {
  httpApi.WorkApi.queryAllWork().then(res => {
    list.push(
      ...res.data.data.map((item: Work, index) => {
        return {
          id: item.F_Id,
          title: item.F_Title,
          pic: `https://oa.woyuxiaji.xyz${JSON.parse(item.F_Image)[0].url}`,
          platform: item.F_Platform,
          Introduce: item.F_Introduce,
          url: item.F_Url,
        };
      })
    );
  });
});
</script>

<style lang="scss" scoped>
#work {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0 100px 0;
  h1 {
    font-size: 30px;
    color: #000000;
    margin-bottom: 25px;
    cursor: pointer;
  }
  .mark {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: -1;
  }

  .workList {
    width: 80%;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    a {
      // 一行几个
      --A-num: 4;
      // 一个宽度
      --A-width: 300px;
      // 一行间距 两边
      --A-margin: 25px;
      width: var(--A-width);
      height: 250px;
      // 使用 flex + margin 自动计算间距
      margin: 25px
        calc((100% - var(--A-width) * var(--A-num)) / var(--A-num) / 2);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px;
      transition: all 0.3s ease-in-out;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0 5px 20px;
        transform: scale(1.1) translateY(-20px);
      }
      img {
        width: 100%;
        height: 155px;
        object-fit: fill;
        background-color: #ffffff;
      }
      .workLinkText {
        height: calc(100% - 155px);
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
        h2 {
          font-size: 20px;
          color: #000000;
          margin: 5px 0 0;
          font-size: 16px;
          font-weight: 700;
        }
        p {
          font-size: 16px;
          color: #000000;
          &:nth-child(2) {
            margin: 1px 0 0;
            color: #000;
            font-size: small;
            white-space: nowrap;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
          }
          > &:nth-child(3) {
            margin: 9px 0 0;
            font-size: 12px;
            color: #000;
          }
        }
      }
    }
  }
}

// 移动端给作品列表加上 flex-direction: column;
@media screen and (max-width: 768px) {
  #work {
    .workList {
      flex-direction: column;
      align-items: center;
      a {
        width: 100%;
        margin: 25px 0;
      }
    }
  }
}
</style>
