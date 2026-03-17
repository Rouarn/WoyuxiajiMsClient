# 我与夏季 (woyuxiaji-ms-client)

一个基于 Vue 3 + TypeScript + Vite 构建的现代化个人主页展示系统。本项目旨在提供流畅的用户体验、优雅的 UI 设计以及易于维护的内容管理方式。

## 🚀 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **状态持久化**: [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- **样式处理**: SCSS (Sass)
- **日期处理**: [Day.js](https://day.js.org/)
- **类型检查**: Vue-TSC

## ✨ 核心特性

- 🌗 **深色模式**: 支持浅色/深色主题自由切换，并利用 Pinia 持久化存储用户偏好。
- 📱 **响应式设计**: 完美适配桌面端与移动端，提供原生般的移动端导航体验。
- 📊 **动态内容管理**: 核心展示内容（作品集、大记事、页脚信息）均通过 `public/json` 下的 JSON 文件动态加载，实现内容与代码解耦。
- 🎨 **现代化 UI**: 包含打字机效果、平滑滚动、毛玻璃特效等现代化视觉元素。
- 📦 **Grid 布局优化**: 作品展示列表采用 CSS Grid 布局，支持自动换行并保持整齐排列。

## 📂 项目结构

```text
src/
├── assets/             # 静态资源（CSS, 图片, 字体）
├── components/         # 公用组件
├── router/             # 路由配置
├── stores/             # Pinia 状态管理
├── views/              # 页面视图组件 (Nav, Main, Work, Info, Footer)
├── App.vue             # 根组件
└── main.ts             # 入口文件
public/
└── json/               # 动态内容 JSON 数据源
```

## 🛠️ 开发与部署

### 安装依赖
```bash
pnpm install
```

### 本地开发
```bash
pnpm dev
```

### 项目构建
```bash
pnpm build
```

### 代码格式化
```bash
pnpm format
```

## 📝 最近更新

- **2026-03-17**: 
  - 实现深色模式切换及持久化存储。
  - 重构页脚和作品列表，支持从 JSON 动态读取数据。
  - 优化作品展示列表为 CSS Grid 布局，解决重叠问题。
  - 全面引入 CSS 全局变量管理主题颜色。

---
由 [我与夏季](https://github.com/Rouarn) 维护。
