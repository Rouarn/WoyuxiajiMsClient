<template>
  <div class="c-about" id="about">
    <h1>关于我</h1>
    <under-line></under-line>
    <div class="c-about__tags">
      <span class="c-about__tag">00后</span>
      <span class="c-about__tag">WYXJ</span>
      <span class="c-about__tag">YXNYG</span>
      <span class="c-about__tag">小黑子</span>
      <span class="c-about__tag" @click="toggleCherryBlossom">{{ blossomButtonText }}</span>
    </div>
    <div class="c-about__content">
      <p>嗨,我是刘靓仔。</p>
      <p>一个练习时长两年半的前端艺术家</p>
      <p>同时也是一名音乐爱好者、白日梦想家</p>
      <p>某知名视频站的不知名UP主</p>
      <p>强迫症、拖延症、懒癌晚期</p>
      <p>PS:(这都不是真的,我非常的勤奋好学,真的)</p>
      <p>在郑州度过最SB的高中三年</p>
      <p>现就读于河南某大学软件系</p>
      <p>热衷钻研与计算机有关的一切：</p>
      <p>前端开发、平面设计、视频剪辑、吹牛逼等...</p>
      <p>近期白日梦想：富婆包养我!</p>
      <p>带着相机和好心情 与喜欢的人环游世界</p>
      <p>请多指教！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UnderLine from '@/components/under-line.vue'

// 控制樱花飘落是否显示
const isCherryBlossomShow = ref(true)
const blossomButtonText = computed(() =>
  isCherryBlossomShow.value ? '关闭樱花飘落' : '开启樱花飘落',
)
const emit = defineEmits(['isCherryBlossomShow'])

const toggleCherryBlossom = () => {
  isCherryBlossomShow.value = !isCherryBlossomShow.value
  emit('isCherryBlossomShow', isCherryBlossomShow.value)
}

// 初始化时通知父组件
emit('isCherryBlossomShow', isCherryBlossomShow.value)
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
