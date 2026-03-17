<template>
  <div class="sakura-falling" :style="`top: ${homeHeight}px`" v-show="isBlinkingCursorShow">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import sakuraImgSrc from '@/assets/images/blinkingCursor.png'

export default defineComponent({
  name: 'SakuraFalling',
  props: {
    homeHeight: {
      type: Number,
      required: true,
      dfault: 0,
    },
    isBlinkingCursorShow: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  setup() {
    // 接收父组件传递过来的高度
    const canvasRef = ref<HTMLCanvasElement | null>(null) // 定义 canvas 引用
    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D
    let RAF: number // requestAnimationFrame ID
    let sakuraImg: HTMLImageElement
    const sakuraArr: Sakura[] = [] // 樱花对象数组

    class Sakura {
      x: number
      y: number
      deg: number // 横向偏移角度
      size: number
      v: number // 纵向速度
      vx: number // 横向速度
      a: number // 加速度
      alpha: number // 透明度
      constructor() {
        this.x = Math.random() * canvas.width // 随机横坐标
        this.y = Math.random() * canvas.height // 随机纵坐标
        this.deg = Math.random() * 360 // 随机偏移角度
        this.size = Math.random() * 30 + 20 // 随机大小
        this.v = Math.random() * 0.5 + 0.5 // 随机纵向速度
        this.vx = Math.random() * 0.5 + 0.5 // 随机横向速度
        this.a = Math.random() * 0.0015 + 0.0005 // 随机加速度
        this.alpha = 1 // 初始化透明度
      }

      draw() {
        const radian = (this.deg / 180) * Math.PI // 角度转弧度
        ctx.save()
        ctx.translate(this.x, this.y) // 平移到当前需要绘制的点
        ctx.rotate(radian)
        ctx.scale(this.size / sakuraImg.width, this.size / sakuraImg.height) // 按照比例进行缩放
        ctx.globalAlpha = this.alpha
        ctx.drawImage(sakuraImg, -sakuraImg.width / 2, -sakuraImg.height / 2) // 居中绘制
        ctx.restore()
      }

      update() {
        this.deg += Math.random() * 2 - 1 // 随机偏移
        this.size += Math.random() * 0.1 - 0.05 // 随机大小变化
        this.v += this.a // 加速度变化速度
        this.x += this.vx // 更新横坐标
        this.y += this.v // 更新纵坐标
        this.alpha = (canvas.height - this.y) / canvas.height // 透明度变化
        if (this.alpha <= 0 || this.x > canvas.width) {
          // 透明度小于 0 或 超出右边界时，重置对象
          this.alpha = 0
          this.new()
        }
      }

      new() {
        // 对象重置
        if (Math.random() > 0.5) {
          // 从顶部进入
          this.x = Math.random() * canvas.width
          this.y = 0
        } else {
          // 从左侧进入
          this.x = 0
          this.y = Math.random() * canvas.height
        }
        this.deg = Math.random() * 360
        this.size = Math.random() * 30 + 20
        this.v = Math.random() * 0.5 + 0.5
        this.vx = Math.random() * 0.5 + 0.5
        this.a = Math.random() * 0.0015 + 0.0005
        this.alpha = 1
      }
    }
    const updateCanvasDimensions = () => {
      const container = document.querySelector('.sakura-falling') as HTMLElement
      if (!container) return
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    const initCanvas = () => {
      canvas = canvasRef.value!
      ctx = canvas.getContext('2d')!
      updateCanvasDimensions()
      sakuraImg = new Image()
      sakuraImg.src = sakuraImgSrc
      sakuraImg.onload = () => {
        // 初始化随机樱花对象
        for (let i = 0; i < 100; i++) {
          sakuraArr.push(new Sakura())
        }
        RAF = requestAnimationFrame(draw)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // 清空画布
      sakuraArr.forEach((item) => {
        item.draw() // 绘制对象
        item.update() // 更新对象状态
      })
      RAF = requestAnimationFrame(draw)
    }

    onMounted(() => {
      initCanvas()
      window.addEventListener('resize', updateCanvasDimensions)
    })

    onUnmounted(() => {
      cancelAnimationFrame(RAF)
      window.removeEventListener('resize', updateCanvasDimensions)
    })

    return {
      canvasRef,
    }
  },
})
</script>

<style lang="scss" scoped>
.sakura-falling {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
