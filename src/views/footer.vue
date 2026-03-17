<template>
  <div class="c-footer" id="footer">
    <div class="c-footer__item">
      <p>友情链接</p>
      <template v-for="(link, index) in footerInfo.friendshipLinks" :key="index">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
        <br v-if="index !== footerInfo.friendshipLinks.length - 1" />
      </template>
    </div>

    <div class="c-footer__item c-footer__item--contact">
      <p>与我联系</p>
      <template v-for="(item, index) in footerInfo.contact" :key="index">
        <a :href="item.url" :target="item.url.startsWith('mailto') ? '_self' : '_blank'">{{
          item.label
        }}</a>
        <br v-if="index !== footerInfo.contact.length - 1" />
      </template>
    </div>
    <div class="c-footer__item c-footer__item--copyright">
      <p>{{ footerInfo.copyright.text }}</p>
      <a id="linkCopyright" :href="footerInfo.copyright.linkUrl">{{
        footerInfo.copyright.linkText
      }}</a>
      <br />
      <a href="#" class="c-footer__pentagram">☆☆☆☆☆</a>
      <br />
      <a :href="footerInfo.icp.url" target="_blank">{{ footerInfo.icp.text }}</a>
      <br />
      <span class="c-footer__beian">
        <img src="@/assets/images/beian.png" alt="豫公网安备" class="c-footer__beian-img" />
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
.c-footer {
  width: 100%;
  height: 300px;
  background: url('@/assets/images/footer_background01.jpg') no-repeat center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .c-footer__item {
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
    &.c-footer__item--copyright {
      .old {
        display: none;
      }
      .c-footer__beian {
        text-align: start;

        .c-footer__beian-img {
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
  .c-footer {
    height: 400px;
    .c-footer__item {
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
      &.c-footer__item--copyright {
        display: block;
        .old {
          display: inline-block;
        }
        .c-footer__pentagram {
          display: none;
        }
      }
    }
  }
}
</style>
