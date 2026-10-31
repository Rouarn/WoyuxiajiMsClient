<template>
  <div class="c-footer" id="footer" ref="footerRef">
    <div class="c-footer__item" ref="friendshipRef">
      <p>友情链接</p>
      <template v-for="(link, index) in footerInfo.friendshipLinks" :key="index">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
        <br v-if="index !== footerInfo.friendshipLinks.length - 1" />
      </template>
    </div>

    <div class="c-footer__item c-footer__item--contact" ref="contactRef">
      <p>与我联系</p>
      <template v-for="(item, index) in footerInfo.contact" :key="index">
        <a :href="item.url" :target="item.url.startsWith('mailto') ? '_self' : '_blank'">{{
          item.label
        }}</a>
        <br v-if="index !== footerInfo.contact.length - 1" />
      </template>
    </div>
    <div class="c-footer__item c-footer__item--copyright" ref="copyrightRef">
      <p>{{ footerInfo.copyright.text }}</p>
      <a id="linkCopyright" :href="footerInfo.copyright.linkUrl">{{
        footerInfo.copyright.linkText
      }}</a>
      <br />
      <a href="#" class="c-footer__pentagram">☆☆☆☆☆</a>
      <br />
      <a :href="footerInfo.icp.url" target="_blank">{{ footerInfo.icp.text }}</a>
      <br />
      <span v-if="footerInfo.beian.text" class="c-footer__beian">
        <img src="@/assets/images/beian.png" alt="豫公网安备" class="c-footer__beian-img" />
        <a :href="footerInfo.beian.url" target="_blank">{{ footerInfo.beian.text }}</a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerRef = ref<HTMLElement | null>(null)
const friendshipRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const copyrightRef = ref<HTMLElement | null>(null)

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

    await nextTick()

    gsap.fromTo(
      [friendshipRef.value, contactRef.value, copyrightRef.value],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    document.querySelectorAll('.c-footer a').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, color: '#ff6b9d', duration: 0.2, ease: 'power2.out' })
      })
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, color: 'inherit', duration: 0.2, ease: 'power2.out' })
      })
    })
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

  @media screen and (max-width: 768px) {
    height: 400px;
  }

  &__item {
    @media screen and (max-width: 768px) {
      display: none;
    }

    &:nth-child(2) {
      margin: 0 250px;
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

    &--copyright {
      @media screen and (max-width: 768px) {
        display: block;
      }

      .old {
        display: none;

        @media screen and (max-width: 768px) {
          display: inline-block;
        }
      }
    }
  }

  &__beian {
    text-align: start;

    &-img {
      display: inline-block;
      vertical-align: sub;
      margin-right: 5px;
    }
  }
}
</style>
