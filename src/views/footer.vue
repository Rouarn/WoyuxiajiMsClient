<template>
  <div id="footer">
    <div class="footer__Item">
      <p>友情链接</p>
      <template v-for="(link, index) in footerInfo.friendshipLinks" :key="index">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
        <br v-if="index !== footerInfo.friendshipLinks.length - 1" />
      </template>
    </div>

    <div class="footer__Item contactme">
      <p>与我联系</p>
      <template v-for="(item, index) in footerInfo.contact" :key="index">
        <a :href="item.url" :target="item.url.startsWith('mailto') ? '_self' : '_blank'">{{
          item.label
        }}</a>
        <br v-if="index !== footerInfo.contact.length - 1" />
      </template>
    </div>
    <div class="footer__Item copyright">
      <p>{{ footerInfo.copyright.text }}</p>
      <a id="linkCopyright" :href="footerInfo.copyright.linkUrl">{{
        footerInfo.copyright.linkText
      }}</a>
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
  friendshipLinks: [] as { text: string; url: string }[],
  contact: [] as { label: string; url: string }[],
  copyright: { text: '', linkText: '', linkUrl: '' },
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
    footerInfo.friendshipLinks = data.friendshipLinks
    footerInfo.contact = data.contact
    footerInfo.copyright = data.copyright
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
      color: var(--footer-text);
    }
    a {
      font-size: 12px;
      color: var(--footer-text);
      text-decoration: none;
      &:hover {
        color: var(--footer-text);
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
        color: var(--footer-text);
      }
      a {
        font-size: 12px;
        color: var(--footer-text);
        text-decoration: none;
        &:hover {
          color: var(--footer-text);
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
