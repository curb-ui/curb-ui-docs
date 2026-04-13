---
layout: home
hero:
  name: CurbUI
  text: 一个精致的 Flutter 设计系统
  tagline: 开箱即用、极致语义化的 Flutter UI 框架
  actions:
    - theme: brand
      text: 快速开始
      link: /
    - theme: alt
      text: 查看组件
      link: /content/components/index 

features:
  - icon: 🚀
    title: Cool-Admin 生态兼容
    details: 深度适配 Cool-Admin 后端架构，内置登录鉴权、用户权限管理及文件上传等 API 逻辑，实现前后端无缝对接。

  - icon: 🧩
    title: 语义化组件
    details: 提供丰富的语义化组件，让开发像写 HTML 一样直观，通过简单的 API 即可实现复杂的页面布局。

  - icon: 🎨
    title: 主题系统
    details: 完整的主题配置系统，支持动态色板、一键切换暗黑模式，自定义主题轻而易举。

  - icon: 🌍
    title: 国际化支持
    details: 开箱即用的多语言方案，支持中文和英文，轻松扩展新语言，适应全球用户。

  - icon: 🚦
    title: 路由管理
    details: 基于 GoRouter 的声明式导航，支持深度链接、参数自动注入和路由守卫。

  - icon: 📡
    title: API 服务
    details: Retrofit 驱动的网络层，注解式请求，自动代码生成，集成缓存机制，让 API 开发更高效。

  - icon: ⚡
    title: 开发效率
    details: 完整的项目架构方案，从环境配置到业务开发一站式解决，大幅提升全栈开发效率。

  - icon: 🏗️
    title: 工程化落地
    details: 内置符合国内监管要求的开屏隐私合规流程、自动登录鉴权及多环境配置。

  - icon: 🔧
    title: 状态管理
    details: Provider 响应式数据流，轻量级且高性能，让状态管理变得简单。
---


<style>
@media (min-width: 960px) {
  .VPHero {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px 32px !important;
  }
  .VPHero .container {
    display: flex;
    flex-direction: row !important;
    width: 100%;
    gap: 40px;
  }
  .VPHero .main {
    flex: 1;
    text-align: left;
  }
  .VPHero .image {
    flex: 1;
    display: flex;
    justify-content: center;
    order: 2;
  }
}
</style>

<HomePreview />