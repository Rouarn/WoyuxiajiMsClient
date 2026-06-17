# 我与夏季 (woyuxiaji-ms-client)

一个基于 Vue 3 + TypeScript + Vite 构建的现代化个人主页展示系统。本项目旨在提供流畅的用户体验、优雅的 UI 设计以及易于维护的内容管理方式。

## 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **编程语言**: [TypeScript 6](https://www.typescriptlang.org/)
- **状态管理**: [Pinia 3](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- **动画引擎**: [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger
- **样式处理**: SCSS (sass-embedded)
- **日期处理**: [Day.js](https://day.js.org/)
- **代码规范**: ESLint + Prettier

## 核心特性

- **深色模式**: 支持浅色/深色主题自由切换，通过 CSS 自定义属性管理主题色，用户偏好持久化存储。
- **GSAP 滚动动画**: 各模块进入可视区域时触发淡入、滑入、缩放等动画效果，支持正向播放与反向回退。
- **樱花飘落特效**: 「关于我」模块内置 Canvas 樱花粒子动画，支持一键开关。
- **打字机效果**: 首页标题下方逐字显示自我介绍文字，配合闪烁光标。
- **响应式设计**: 完美适配桌面端与移动端，移动端提供抽屉式侧滑导航及遮罩层。
- **动态内容管理**: 作品集、大记事、页脚信息均通过 `public/json/` 下的 JSON 文件动态加载，内容与代码解耦。
- **横向滚动日志**: 大记事模块支持鼠标滚轮横向滚动与拖拽滑动浏览。
- **返回顶部**: 滚动超过 300px 时显示返回顶部按钮，带渐变过渡动画。

## 项目结构

```text
src/
├── assets/
│   ├── css/
│   │   ├── reset.css          # CSS 重置样式
│   │   └── theme.css          # 主题变量（亮色/暗色）
│   ├── fonts/                 # 自定义字体
│   └── images/                # 静态图片资源
├── components/
│   ├── back-to-top.vue        # 返回顶部按钮
│   ├── blinking-cursor.vue    # 樱花飘落 Canvas 动画
│   └── under-line.vue         # 标题下划线装饰
├── router/
│   └── index.ts               # 路由配置（单页应用）
├── stores/
│   └── theme.ts               # 主题状态管理（Pinia + 持久化）
├── views/
│   ├── home.vue               # 首页（组装所有模块）
│   ├── nav.vue                # 导航栏（桌面端 + 移动端侧滑）
│   ├── main.vue               # 首屏 Hero 区域（打字机 + 时钟）
│   ├── about.vue              # 关于我（标签 + 樱花特效）
│   ├── work.vue               # 作品展示（Grid 布局卡片）
│   ├── info.vue               # 小站大记事（横向滚动时间线）
│   └── footer.vue             # 页脚（友链 + 联系方式 + 备案）
├── App.vue                    # 根组件
└── main.ts                    # 入口文件（注册 Pinia、Router、GSAP）
public/
├── images/                    # Logo 等公共静态资源
└── json/
    ├── work.json              # 作品集数据
    ├── info.json              # 大记事数据
    └── footer.json            # 页脚数据
```

## 开发与部署

### 环境要求

- Node.js >= 18
- pnpm >= 9

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

开发服务器默认运行在 `http://localhost:8850`。

### 项目构建

```bash
pnpm build
```

### 预览构建产物

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint        # ESLint 检查并自动修复
pnpm format      # Prettier 格式化代码
```
