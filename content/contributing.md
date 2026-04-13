# 文档贡献指南

感谢您有兴趣为 CurbUI 文档做出贡献！

## 📝 编辑文档

### 1. 开发环境

确保您已安装 Node.js 和 npm/yarn

### 2. 本地预览

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档网站。

### 3. 文档结构

```
docs/
├── .vitepress/          # VitePress 配置
│   ├── config.ts          # 主配置文件
│   └── theme/           # 主题定制
├── components/           # 组件文档
├── theme/              # 主题文档
├── locale/             # 国际化文档
├── route/              # 路由文档
├── api/                # API 文档
└── index.md             # 首页
```

## 🎨 编写规范

### Frontmatter

每个文档页面可以包含 YAML frontmatter：

```markdown
---
title: 页面标题
description: 页面描述
---
```

### 代码块

使用三个反引号标记代码块，并指定语言：

```dart
void main() {
  print('Hello CurbUI!');
}
```

### 链接

- 使用相对链接：`[组件](./components/cu_button.md)`
- 使用锚点链接：`[详细说明](#详细说明)`

## 🔨 构建生产版本

```bash
# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 📤 提交更改

1. Fork 项目仓库
2. 创建特性分支 (`git checkout -b feature/amazing-doc`)
3. 提交更改 (`git commit -m 'docs: 添加 amazing 文档'`)
4. 推送到分支 (`git push origin feature/amazing-doc`)
5. 开启 Pull Request

## 💡 建议

- 保持文档简洁明了
- 提供充分的代码示例
- 使用清晰的标题和段落
- 更新相关文档链接

如有疑问，请开启 Issue 讨论！
