<template>
  <div id="footer">
    <div class="footer__Item friendshipLink">
      <p>友情链接</p>
      <a href="#" target="_blank">神剑已去，再无桎梏</a>
      <br />
      <a href="#" target="_blank">终焉之审判，就在此刻</a>
      <br />
      <a href="#" target="_blank">这是邪神的意志，是我的意志</a>
      <br />
      <a href="#" target="_blank">不如与我在这终末的哀歌下共舞到最后吧</a>
      <br />
      <a href="#" target="_blank">经一场大梦，梦中见满眼山花如翡，如见故人，喜不自胜。</a>
    </div>

    <div class="footer__Item contactme">
      <p>与我联系</p>
      <a href="mailto:die3881123@163.com">我的邮箱</a>
      <br />
      <a href="https://weibo.com/7269276678" target="_blank">我的微博</a>
      <br />
      <a href="https://space.bilibili.com/340928373" target="_blank">我的哔哩哔哩频道</a>
    </div>
    <div class="footer__Item copyright">
      <p>© 2022 刘亮</p>
      <a id="linkCopyright">版权声明</a>
      <br />
      <a href="#" class="pentagram">☆☆☆☆☆</a>
      <br />
      <a :href="footerInfo.icp.url" target="_blank">{{ footerInfo.icp.text }}</a>
      <br />
      <span class="beian">
        <img src="@/assets/images/beian.png" alt="豫公网安备" class="beian__Img" />
        <a :href="footerInfo.beian.url" target="_blank">{{ footerInfo.beian.text }}</a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const footerInfo = reactive({
  icp: { text: '', url: '' },
  beian: { text: '', url: '' },
})

onMounted(async () => {
  try {
    const response = await fetch('/json/footer.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    footerInfo.icp = data.icp
    footerInfo.beian = data.beian
  } catch (error) {
    console.error('Failed to fetch footer.json:', error)
  }
})
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  height: 300px;
  background: url('@/assets/images/footer_background01.jpg') no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .footer__Item {
    &:nth-child(2) {
      margin: 0 100px;
    }
    p {
      font-size: 15px;
      color: #ffffff;
    }
    a {
      font-size: 12px;
      color: #ffffff;
      text-decoration: none;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }
    &.copyright {
      .old {
        display: none;
      }
      .beian {
        text-align: start;

        .beian__Img {
          display: inline-block;
          vertical-align: sub;
          margin-right: 5px;
        }
      }
    }
  }
}

// 移动端
@media screen and (max-width: 768px) {
  #footer {
    height: 400px;
    .footer__Item {
      display: none;
      p {
        font-size: 15px;
        color: #ffffff;
      }
      a {
        font-size: 12px;
        color: #ffffff;
        text-decoration: none;
        &:hover {
          color: #ffffff;
          text-decoration: underline;
        }
      }
      &.copyright {
        display: block;
        .old {
          display: inline-block;
        }
        .pentagram {
          display: none;
        }
      }
    }
  }
}
</style>
