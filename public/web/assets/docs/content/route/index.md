# CurbUI 路由配置使用及规范文档

`CurbUI` 框架使用 `go_router` 实现路由管理，提供了清晰的导航结构和灵活的路由配置方案。本文档将详细介绍 CurbUI 框架的路由实现、配置方法和最佳实践。

---

## 快速入门

### 1. 基础配置

在应用的 `MaterialApp` 中配置路由：

```dart
import 'package:curb_ui/routes/index.dart';

MaterialApp(
  routerConfig: AppRouter.router,
  home: MyHomePage(),
);
```

### 2. 路由定义

在 `lib/routes/routes.dart` 中定义路由：

```dart
class CuRouteEntity {
  final String name;
  final String path;
  const CuRouteEntity(this.name, this.path);
}

abstract class Routes {
  // --- 核心业务路由 ---
  static const welcome = CuRouteEntity('welcome', '/');
  static const index = CuRouteEntity('index', '/index');
  static const home = CuRouteEntity('home', '/home');
  static const login = CuRouteEntity('login', '/login');
  static const setting = CuRouteEntity('setting', '/setting');
  static const feedback = CuRouteEntity('feedback', '/feedback');
  static const docViewer = CuRouteEntity('doc_viewer', '/doc_viewer');

  // 参数路由示例
  static String detail(String id) => '/detail/$id';
  static const detailRaw = CuRouteEntity('detail', '/detail/:id');
  // --- Demo 业务子路由 ---
  static const demo = DemoRoutes();
}
```

### 3. 路由导航

使用 `context.go` 或 `context.push` 进行路由导航：

```dart
// 导航到首页
context.goNamed(Routes.home.name);

// 导航到登录页
context.pushNamed(Routes.login.name);

// 导航到详情页，传递参数
context.push(Routes.detail('123'));
```

---

## 架构概述

### 目录结构

```
lib/routes/
├── index.dart        # 路由入口文件
├── routes.dart       # 路由定义文件
└── demo.dart         # Demo 路由示例
```

### 核心组件

- **Routes**: 路由定义类，包含所有路由的名称和路径
- **AppRouter**: 路由配置类，使用 go_router 配置路由
- **CuRouteEntity**: 路由实体类，包含路由名称和路径

---

## 文档导航

| 文档 | 说明 |
| :--- | :--- |
| [basic-usage.md](./basic-usage.md) | 路由基本使用指南 |
| [advanced-features.md](./advanced-features.md) | 路由高级功能指南 |
| [best-practices.md](./best-practices.md) | 路由配置规范和最佳实践 |

---

> **AI Prompt Context**: 关键词：`路由`, `go_router`, `导航`, `参数传递`, `嵌套路由`, `路由守卫`。原则：使用 `Routes` 类定义路由；使用 `context.go` 或 `context.push` 进行导航；路由参数使用路径参数或查询参数；遵循路由配置规范。
