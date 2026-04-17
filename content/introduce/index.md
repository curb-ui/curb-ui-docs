# CurbUI 简介

CurbUI 是一个为 Flutter 开发者量身定制的、极致语义化的移动端 UI 设计系统。它不仅提供了一套精致的视觉组件，更是一套成熟的工程化落地方案，旨在大幅提升从环境配置到业务开发的效率。

***

## 🚀 核心特性

- **极致语义化**：提供丰富的语义化组件（如 `CuButton`, `CuInput`, `CuPage`），开发体验如同编写 HTML 一样直观，通过简单的 API 即可实现复杂的页面布局。
- **Cool-Admin 生态兼容**：深度适配 Cool-Admin 后端架构，内置登录鉴权、用户权限管理及文件上传等 API 逻辑，实现前后端无缝对接。
- **全栈工程化落地**：内置符合监管要求的开屏隐私合规流程、自动登录鉴权及多环境配置，帮助开发者快速完成项目基建。
- **完善的主题与国际化**：支持动态色板、一键切换暗黑模式，并提供开箱即用的多语言方案，轻松适配全球用户。
- **生产级功能组件**：内置应用更新 (`CuUpgrade`)、基于 GoRouter 的声明式路由管理以及 Retrofit 驱动的高效网络层。

***

## 🛠️ 技术栈

- **UI 框架**：Flutter
- **状态管理**：Provider 响应式数据流
- **路由管理**：GoRouter 声明式导航
- **网络请求**：Dio + Retrofit + 代码生成
- **动效引擎**：Flutter Animate
- **本地存储**：SharedPreferences 封装

***

## 📦 快速预览

### 语义化 API 示例

只需几行代码，即可构建一个包含标准交互的页面：

```dart
CuPage(
  title: '系统设置',
  body: CuList(
    children: [
      CuListItem(
        label: '暗黑模式',
        trailing: CuSwitch(value: isDark, onChanged: _toggleTheme),
      ),
      CuListItem(
        label: '检查更新',
        onTap: () => CuUpgradeDialog.show(version: "1.1.2"),
      ),
    ],
  ),
)
```

***

## 📅 项目现状

目前，CurbUI 已完成核心组件库的构建，包括基础组件、表单组件、布局容器及交互反馈组件。项目正处于活跃的开发与维护阶段，并已成功在多个应用项目中得到验证。

- **当前版本**：v1.0.0
- **开源协议**：MIT License
- **联系邮箱**：<curbui@yeah.net>

***

## 📁 项目目录结构

CurbUI 采用标准化的 Flutter 项目结构，清晰的目录划分便于维护与扩展：

```
curb_ui/
├── .vscode/                   # VS Code 工作区配置
├── android/                   # Android 平台原生代码
│   ├── app/
│   │   └── src/main/
│   │       ├── kotlin/        # Kotlin 源代码
│   │       ├── res/           # 资源文件（图标、样式）
│   │       └── AndroidManifest.xml
│   └── gradle/                # Gradle 构建配置
├── ios/                       # iOS 平台原生代码
│   ├── Flutter/
│   ├── Runner/                # Xcode 主工程
│   └── Runner.xcworkspace/
├── lib/                       # Flutter 核心源代码目录
│   ├── api/                   # API 层（Retrofit + Dio）
│   │   ├── models/            # 数据模型定义
│   │   │   ├── auth_model.dart
│   │   │   ├── user_model.dart
│   │   │   └── upload_model.dart
│   │   ├── service/           # API 服务接口
│   │   │   ├── auth_service.dart
│   │   │   ├── user_service.dart
│   │   │   └── upload_service.dart
│   │   ├── request.dart       # 网络请求封装
│   │   └── index.dart         # API 导出入口
│   ├── components/            # CurbUI 组件库
│   │   ├── button/            # 按钮组件
│   │   ├── input/             # 输入框组件
│   │   ├── page/              # 页面容器
│   │   ├── dialog/            # 对话框组件
│   │   ├── ...                # 其他组件
│   │   └── index.dart         # 组件统一导出
│   ├── config/                # 应用配置管理
│   │   └── index.dart         # 环境配置读取
│   ├── locale/                # 国际化资源
│   │   ├── l10n/              # 多语言文件
│   │   │   ├── intl_zh.arb    # 中文
│   │   │   ├── intl_en.arb    # 英文
│   │   │   └── app_localizations.dart
│   │   ├── resource_delegate.dart  # 资源代理
│   │   └── index.dart
│   ├── pages/                 # 页面层
│   │   ├── demo/              # 组件示例页面
│   │   ├── index/             # 首页模块
│   │   ├── setting/           # 设置页面
│   │   ├── user/              # 用户模块（登录、反馈）
│   │   └── welcome.dart       # 欢迎页
│   ├── provider/              # 状态管理（Provider）
│   │   ├── app.dart           # 应用状态
│   │   ├── user.dart          # 用户状态
│   │   └── index.dart
│   ├── routes/                # 路由管理（GoRouter）
│   │   ├── routes.dart        # 路由表定义
│   │   ├── demo.dart          # 示例路由
│   │   └── index.dart
│   ├── theme/                 # 主题系统
│   │   ├── color/             # 色彩系统
│   │   ├── font/              # 字体配置
│   │   ├── radius/            # 圆角配置
│   │   ├── spacing/           # 间距配置
│   │   ├── list/              # 预设主题列表
│   │   ├── manager.dart       # 主题管理器
│   │   └── index.dart
│   ├── utils/                 # 工具类
│   │   ├── screen.dart        # 屏幕适配
│   │   ├── storage.dart       # 本地存储
│   │   ├── talker.dart        # 日志工具
│   │   └── index.dart
│   ├── app.dart               # 应用入口
│   ├── bootstrap.dart         # 启动引导
│   ├── main.dart              # 主函数
│   └── curb_ui.dart           # 库导出文件
├── assets/                    # 静态资源文件
│   ├── fonts/                 # 字体文件
│   ├── images/                # 图片资源
│   ├── svgs/                  # SVG 矢量图
│   └── lotties/               # Lottie 动画
├── docs/                      # VitePress 文档站点
│   ├── .vitepress/            # VitePress 配置
│   │   ├── config.ts          # 站点配置
│   │   └── theme/             # 自定义主题
│   ├── content/               # 文档内容
│   │   ├── components/        # 组件文档
│   │   ├── api/               # API 文档
│   │   ├── theme/             # 主题文档
│   │   ├── locale/            # 国际化文档
│   │   ├── route/             # 路由文档
│   │   ├── welcome/           # 启动页文档
│   │   └── about/             # 关于页面（协议、隐私）
│   ├── public/                # 静态资源
│   │   ├── app/               # APK 下载
│   │   └── web/               # Web 预览构建产物
│   ├── index.md               # 文档首页
│   └── package.json           # 文档依赖配置
├── test/                      # 测试文件（待补充）
├── config_example.json        # 配置文件模板
├── pubspec.yaml               # Flutter 依赖配置
├── analysis_options.yaml      # Dart 代码分析规则
└── README.md                  # 项目说明文档
```

### 目录说明

#### 核心目录

- **`lib/`**：Flutter 应用的核心源代码目录，包含所有业务逻辑与组件实现
- **`lib/components/`**：CurbUI 组件库，每个组件独立文件夹，包含实现文件与配置
- **`lib/api/`**：后端 API 接口层，采用 Retrofit 模式定义网络请求
- **`lib/theme/`**：主题系统，包含色彩、字体、间距等设计令牌
- **`lib/locale/`**：国际化资源，支持多语言动态切换

#### 平台目录

- **`android/`**：Android 平台原生代码与构建配置
- **`ios/`**：iOS 平台原生代码与 Xcode 工程配置

#### 资源目录

- **`assets/`**：应用内静态资源，包括图片、字体、动画等
- **`docs/`**：VitePress 文档站点，包含完整的使用指南与 API 文档

#### 配置目录

- **`.trae/`**：Trae IDE 的项目规范与文档生成模板
- **`.vscode/`**：VS Code 开发环境配置
- **`config_*.json`**：应用运行时配置（开发环境、生产环境）

***

## 🛠️ 快速上手提示

为了确保项目环境配置正确，请在克隆仓库后执行以下操作：

1. **环境配置初始化**：
   进入项目根目录，根据 `config_example.json` 模板新建各环境配置文件：
   - 复制并命名为 `config_dev.json` (开发环境)
   - 复制并命名为 `config_prod.json` (生产环境)
2. **配置内容**：

```json
  {
    "APP_NAME": "Curb UI",
    "APP_VERSION": "1.0.0",
    "API_URL": "https://show.cool-admin.com",
    "BASE_URL": "/api",
    "SHOW_LOGS": false,
    "PRIVACY_URL": "https://gitee.com/curb-ui/curb-ui-docs/blob/master/content/about/privacy.md",
    "AGREEMENTS_URL": "https://gitee.com/curb-ui/curb-ui-docs/blob/master/content/about/agreement.md",
  }
```

***

::: tip 准备好提升开发效率了吗？
无需繁琐的配置，直接探索 CurbUI 的精致组件世界。
:::

<div style="text-align: center; padding: 40px 0;">
  <a href="/content/components/cu_button" style="
    background: linear-gradient(120deg, #42a5f5, #ff4081);
    color: white;
    padding: 12px 36px;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    transition: transform 0.3s ease;
    display: inline-block;
  " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    🚀 立即开始
  </a>
</div>
