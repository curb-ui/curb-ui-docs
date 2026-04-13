import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CurbUI',
  description: '一个精致的 Flutter 设计系统',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    logo: '/public/logo.png',
    nav: [
      { text: '指南', link: '/' },
      { text: '组件', link: '/content/components/' },
      { text: '主题', link: '/content/theme/' },
      { text: '国际化', link: '/content/locale/' },
      { text: '路由', link: '/content/route/' },
      { text: 'API', link: '/content/api/' },
      { text: '更新日志', link: '/content/changelog' },
      { text: '贡献指南', link: '/content/contributing' },
      { text: '关于我们', link: '/content/about' },
    ],

    sidebar: {
      '/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/' }
          ]
        }
      ],
      '/content/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/content/components/cu_button' },
            { text: 'Icon 图标', link: '/content/components/cu_icon' },
            { text: 'Text 文本', link: '/content/components/cu_text' },
            { text: 'Image 图片', link: '/content/components/cu_image' },
            { text: 'Tag 标签', link: '/content/components/cu_tag' },
            { text: 'Avatar 头像', link: '/content/components/cu_avatar' },
            { text: 'Divider 分割线', link: '/content/components/cu_divider' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/content/components/cu_input' },
            { text: 'Checkbox 多选框', link: '/content/components/cu_checkbox' },
            { text: 'Radio 单选框', link: '/content/components/cu_radio' },
            { text: 'Switch 开关', link: '/content/components/cu_switch' },
            { text: 'Slider 滑块', link: '/content/components/cu_slider' },
            { text: 'Rate 评分', link: '/content/components/cu_rate' },
            { text: 'Upload 上传', link: '/content/components/cu_upload' },
            { text: 'Multi Select 多选', link: '/content/components/cu_multi_select' }
          ]
        },
        {
          text: '布局容器',
          items: [
            { text: 'Page 页面', link: '/content/components/cu_page' },
            { text: 'Card 卡片', link: '/content/components/cu_card' },
            { text: 'List 列表', link: '/content/components/cu_list' },
            { text: 'AppBar 导航栏', link: '/content/components/cu_appbar' },
            { text: 'TabBar 底部导航', link: '/content/components/cu_tabbar' },
            { text: 'Tabs 标签页', link: '/content/components/cu_tabs' },
            { text: 'KeepAlive 保活', link: '/content/components/cu_keep_alive' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Banner 横幅', link: '/content/components/cu_banner' },
            { text: 'Result 结果页', link: '/content/components/cu_result' },
            { text: 'Progress Circle 圆形进度条', link: '/content/components/cu_progress_circle' },
            { text: 'Lottie 动画', link: '/content/components/cu_lottie' }
          ]
        },
        {
          text: '交互反馈',
          items: [
            { text: 'Dialog 对话框', link: '/content/components/cu_dialog' },
            { text: 'Confirm 确认框', link: '/content/components/cu_confirm' },
            { text: 'Toast 轻提示', link: '/content/components/cu_toast' },
            { text: 'Loading 加载', link: '/content/components/cu_loading' },
            { text: 'Bottom Sheet 底部抽屉', link: '/content/components/cu_bottom_sheet' },
            { text: 'Refresh 刷新', link: '/content/components/cu_refresh' },
            { text: 'Upgrade 应用更新', link: '/content/components/cu_upgrade' }
          ]
        }
      ],
      '/content/theme/': [
        {
          text: '主题系统',
          items: [
            { text: '概述', link: '/content/theme/' },
            { text: '主题配置结构', link: '/content/theme/config-structure' },
            { text: '主题切换', link: '/content/theme/theme-switching' },
            { text: '自定义主题', link: '/content/theme/custom-theme' },
            { text: '主题管理器', link: '/content/theme/theme-manager' },
            { text: '主题颜色使用', link: '/content/theme/theme-color-usage' },
            { text: '颜色预览', link: '/content/theme/color-preview' }
          ]
        }
      ],
      '/content/locale/': [
        {
          text: '国际化',
          items: [
            { text: '概述', link: '/content/locale/' },
            { text: '文件结构', link: '/content/locale/file-structure' },
            { text: '语言切换', link: '/content/locale/language-switching' },
            { text: '添加新语言', link: '/content/locale/add-language' },
            { text: '资源委托', link: '/content/locale/resource-delegate' },
            { text: '复杂场景', link: '/content/locale/complex-scenarios' }
          ]
        }
      ],
      '/content/route/': [
        {
          text: '路由管理',
          items: [
            { text: '概述', link: '/content/route/' },
            { text: '基本使用', link: '/content/route/basic-usage' },
            { text: '高级功能', link: '/content/route/advanced-features' },
            { text: '最佳实践', link: '/content/route/best-practices' }
          ]
        }
      ],
      '/content/api/': [
        {
          text: 'API 接口',
          items: [
            { text: '概述', link: '/content/api/' },
            { text: '服务使用', link: '/content/api/services' },
            { text: '数据模型', link: '/content/api/models' },
            { text: '代码生成', link: '/content/api/code-generation' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/curb-ui/curb-ui-docs' },
      { icon: 'gitee', link: 'https://gitee.com/curb-ui/curb-ui-docs' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    footer: {
      message: '联系邮箱: <a href="mailto:curbui@yeah.net">curbui@yeah.net</a> | <a href="/content/agreement">用户服务协议</a> | <a href="/content/privacy">隐私政策</a> | Released under the MIT License.',
      copyright: 'Copyright © 2026 CurbUI'
    }
  },

  markdown: {
    lineNumbers: true
  }
})
