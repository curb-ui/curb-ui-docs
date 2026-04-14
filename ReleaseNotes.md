# CurbUI 简介

**CurbUI** 是一个为 Flutter 开发者量身定制的、极致语义化的移动端 UI 设计系统。它不仅提供了一套精致的视觉组件，更是一套成熟的工程化落地方案，旨在大幅提升从环境配置到业务开发的效率。

***

## 🚀 核心特性

- **极致语义化**：提供丰富的语义化组件（如 `CuButton`, `CuInput`, `CuPage`），开发体验如同编写 HTML 一样直观，通过简单的 API 即可实现复杂的页面布局。
- **Cool-Admin 生态兼容**：深度适配 Cool-Admin 后端架构，内置登录鉴权、用户权限管理及文件上传等 API 逻辑，实现前后端无缝对接。
- **全栈工程化落地**：内置符合监管要求的开屏隐私合规流程、自动登录鉴权及多环境配置，帮助开发者快速完成项目基建。
- **完善的主题与国际化**：支持动态色板、一键切换暗黑模式，并提供开箱即用的多语言方案，轻松适配全球用户。
- **生产级功能组件**：内置应用更新 (`CuUpgrade`)、基于 GoRouter 的声明式路由管理以及 Retrofit 驱动的高效网络层。

***

## 🛠️ 技术栈

* **UI 框架**：Flutter
* **状态管理**：Provider 响应式数据流
* **路由管理**：GoRouter 声明式导航
* **网络请求**：Dio + Retrofit + 代码生成
* **动效引擎**：Flutter Animate
* **本地存储**：SharedPreferences 封装

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

## 📚 官方资源与预览

* **🌐 在线文档预览**：[https://v0-curb-ui.vercel.app/](https://v0-curb-ui.vercel.app/)
* **📧 项目咨询与支持**：[curbui@yeah.net](mailto:curbui@yeah.net)
* **📌 当前版本**：`v1.0.0` | **⚖️ 协议**：MIT

***

## ⚙️ 快速上手提示

为了确保项目环境配置正确，请在克隆仓库后执行以下操作：

1.  **环境配置初始化**：
    进入项目根目录，根据 `config_example.json` 模板新建各环境配置文件：
    * 复制并命名为 `config_dev.json` (开发环境)
    * 复制并命名为 `config_prod.json` (生产环境)

2.  **配置内容参考**：
    ```json
    {
      "APP_NAME": "Curb UI",
      "APP_VERSION": "1.0.0",
      "API_URL": "https://show.cool-admin.com",
      "BASE_URL": "/api",
      "SHOW_LOGS": false,
      "PRIVACY_URL": "https://gitee.com/curb-ui/.../privacy.md",
      "AGREEMENTS_URL": "https://gitee.com/curb-ui/.../agreement.md"
    }
    ```
