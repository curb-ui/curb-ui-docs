# CurbUI 文档

这是 CurbUI 的官方文档网站，基于 VitePress 构建。

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看文档。

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 文档结构

```
docs/
├── .vitepress/          # VitePress 配置
│   ├── theme/           # 主题定制
│   │   ├── components/  # 自定义组件
│   │   ├── custom.css   # 自定义样式
│   │   └── index.ts     # 主题入口
│   └── config.ts        # VitePress 配置文件
├── content/             # 文档内容
│   ├── api/             # API 文档
│   ├── components/      # 组件文档
│   ├── locale/          # 国际化文档
│   ├── route/           # 路由文档
│   ├── theme/           # 主题文档
│   ├── changelog.md     # 更新日志
│   └── contributing.md  # 贡献指南
├── public/              # 静态资源
│   ├── phone-bg.png     # 手机背景图
│   └── app/             # APK 文件
├── index.md             # 首页
├── package.json         # npm 配置
└── README.md            # 本文件
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT License
