# 路由基本使用指南

本文档将详细介绍 CurbUI 框架中路由的基本使用方法，包括路由定义、导航和参数传递。

## 1. 路由定义

### 1.1 基本路由定义

在 `lib/routes/routes.dart` 中定义基本路由：

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

### 1.2 子路由定义

可以创建子路由类来组织相关的路由：

```dart
class DemoRoutes {
  const DemoRoutes();

  final CuRouteEntity basic = CuRouteEntity('demo_basic', '/demo/basic');
  final CuRouteEntity advanced = CuRouteEntity('demo_advanced', '/demo/advanced');
  final CuRouteEntity network = CuRouteEntity('demo_network', '/demo/network');
  final CuRouteEntity theme = CuRouteEntity('demo_theme', '/demo/theme');
  final CuRouteEntity locale = CuRouteEntity('demo_locale', '/demo/locale');
}
```

## 2. 路由导航

### 2.1 基本导航

使用 `context.go` 或 `context.push` 进行路由导航：

```dart
// 导航到首页，替换当前路由
context.goNamed(Routes.home.name);

// 导航到登录页，添加到路由栈
context.pushNamed(Routes.login.name);

// 导航到 Demo 页面
context.pushNamed(Routes.demo.basic.name);
```

### 2.2 返回导航

使用 `context.pop` 返回上一页：

```dart
// 返回上一页
context.pop();

// 返回上一页并传递结果
context.pop('result');
```

### 2.3 替换导航

使用 `context.replace` 替换当前路由：

```dart
// 替换当前路由为首页
context.replaceNamed(Routes.home.name);
```

## 3. 参数传递

### 3.1 路径参数

使用路径参数传递数据：

```dart
// 定义带路径参数的路由
static String detail(String id) => '/detail/$id';
static const detailRaw = CuRouteEntity('detail', '/detail/:id');

// 导航到带参数的路由
context.push(Routes.detail('123'));

// 在目标页面获取参数
class DetailPage extends StatelessWidget {
  const DetailPage({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '详情页',
      body: Center(
        child: CuText('ID: $id'),
      ),
    );
  }
}

// 在路由配置中获取参数
GoRoute(
  path: Routes.detailRaw.path,
  name: Routes.detailRaw.name,
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    return DetailPage(id: id);
  },
);
```

### 3.2 查询参数

使用查询参数传递数据：

```dart
// 导航到带查询参数的路由
context.pushNamed(
  Routes.search.name,
  queryParameters: {'keyword': 'flutter', 'page': '1'},
);

// 在目标页面获取查询参数
class SearchPage extends StatelessWidget {
  const SearchPage({super.key, required this.keyword, required this.page});

  final String keyword;
  final int page;

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '搜索结果',
      body: Center(
        child: CuText('关键词: $keyword, 页码: $page'),
      ),
    );
  }
}

// 在路由配置中获取查询参数
GoRoute(
  path: Routes.search.path,
  name: Routes.search.name,
  builder: (context, state) {
    final keyword = state.queryParameters['keyword'] ?? '';
    final page = int.tryParse(state.queryParameters['page'] ?? '1') ?? 1;
    return SearchPage(keyword: keyword, page: page);
  },
);
```

### 3.3 额外参数

使用 `extra` 参数传递复杂数据：

```dart
// 定义带额外参数的路由
static const userProfile = CuRouteEntity('user_profile', '/user/profile');

// 导航到带额外参数的路由
context.pushNamed(
  Routes.userProfile.name,
  extra: UserModel(id: '123', name: '张三', age: 25),
);

// 在目标页面获取额外参数
class UserProfilePage extends StatelessWidget {
  const UserProfilePage({super.key, required this.user});

  final UserModel user;

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '用户资料',
      body: Center(
        child: Column(
          children: [
            CuText('ID: ${user.id}'),
            CuText('姓名: ${user.name}'),
            CuText('年龄: ${user.age}'),
          ],
        ),
      ),
    );
  }
}

// 在路由配置中获取额外参数
GoRoute(
  path: Routes.userProfile.path,
  name: Routes.userProfile.name,
  builder: (context, state) {
    final user = state.extra as UserModel;
    return UserProfilePage(user: user);
  },
);
```

## 4. 路由配置

### 4.1 基本路由配置

在 `lib/routes/index.dart` 中配置路由：

```dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// 导入你的页面和路由配置
import 'package:curb_ui/pages/welcome.dart';
import 'package:curb_ui/pages/index/home.dart';
import 'package:curb_ui/pages/index/index.dart';
import 'package:curb_ui/pages/user/login.dart';
import 'package:curb_ui/pages/setting/index.dart';
import 'package:curb_ui/pages/user/feedback.dart';
import 'package:curb_ui/pages/notfound.dart';
import 'package:curb_ui/pages/detail.dart';
import 'package:curb_ui/routes/demo.dart';
import 'package:curb_ui/pages/doc_viewer.dart';
import 'routes.dart';

export 'routes.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: Routes.welcome.path,
    routes: [
      GoRoute(
        path: Routes.welcome.path,
        name: Routes.welcome.name,
        builder: (context, state) => const WelcomePage(),
      ),
      GoRoute(
        path: Routes.index.path,
        name: Routes.index.name,
        builder: (context, state) => const IndexPage(),
      ),
      GoRoute(
        path: Routes.home.path,
        name: Routes.home.name,
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: Routes.login.path,
        name: Routes.login.name,
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: Routes.setting.path,
        name: Routes.setting.name,
        builder: (context, state) => const SettingPage(),
      ),
      GoRoute(
        path: Routes.feedback.path,
        name: Routes.feedback.name,
        builder: (context, state) => const FeedbackPage(),
      ),
      GoRoute(
        path: Routes.docViewer.path,
        name: Routes.docViewer.name,
        builder: (context, state) {
          final filePath = state.queryParameters['filePath'] ?? '';
          final title = state.queryParameters['title'] ?? '文档';
          return DocViewerPage(filePath: filePath, title: title);
        },
      ),
      GoRoute(
        path: Routes.detailRaw.path,
        name: Routes.detailRaw.name,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return DetailPage(id: id);
        },
      ),
      // Demo 路由
      GoRoute(
        path: Routes.demo.basic.path,
        name: Routes.demo.basic.name,
        builder: (context, state) => const DemoBasicPage(),
      ),
      GoRoute(
        path: Routes.demo.advanced.path,
        name: Routes.demo.advanced.name,
        builder: (context, state) => const DemoAdvancedPage(),
      ),
      GoRoute(
        path: Routes.demo.network.path,
        name: Routes.demo.network.name,
        builder: (context, state) => const DemoNetworkPage(),
      ),
      GoRoute(
        path: Routes.demo.theme.path,
        name: Routes.demo.theme.name,
        builder: (context, state) => const DemoThemePage(),
      ),
      GoRoute(
        path: Routes.demo.locale.path,
        name: Routes.demo.locale.name,
        builder: (context, state) => const DemoLocalePage(),
      ),
    ],
    errorBuilder: (context, state) => const NotFoundPage(),
  );
}
```

### 4.2 路由错误处理

在路由配置中添加错误处理：

```dart
GoRouter(
  // 其他配置...
  errorBuilder: (context, state) => const NotFoundPage(),
);
```

## 5. 示例代码

### 5.1 完整的路由配置示例

```dart
// lib/routes/routes.dart
class CuRouteEntity {
  final String name;
  final String path;
  const CuRouteEntity(this.name, this.path);
}

abstract class Routes {
  static const welcome = CuRouteEntity('welcome', '/');
  static const home = CuRouteEntity('home', '/home');
  static const login = CuRouteEntity('login', '/login');
  static String detail(String id) => '/detail/$id';
  static const detailRaw = CuRouteEntity('detail', '/detail/:id');
}

// lib/routes/index.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:curb_ui/pages/welcome.dart';
import 'package:curb_ui/pages/home.dart';
import 'package:curb_ui/pages/login.dart';
import 'package:curb_ui/pages/detail.dart';
import 'package:curb_ui/pages/notfound.dart';
import 'routes.dart';

export 'routes.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: Routes.welcome.path,
    routes: [
      GoRoute(
        path: Routes.welcome.path,
        name: Routes.welcome.name,
        builder: (context, state) => const WelcomePage(),
      ),
      GoRoute(
        path: Routes.home.path,
        name: Routes.home.name,
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: Routes.login.path,
        name: Routes.login.name,
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: Routes.detailRaw.path,
        name: Routes.detailRaw.name,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return DetailPage(id: id);
        },
      ),
    ],
    errorBuilder: (context, state) => const NotFoundPage(),
  );
}

// 使用示例
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '首页',
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CuButton(
              label: '去登录',
              onTap: () => context.pushNamed(Routes.login.name),
            ),
            CuButton(
              label: '查看详情',
              onTap: () => context.push(Routes.detail('123')),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 相关文档

- [主文档](./index.md)
- [路由高级功能指南](./advanced-features.md)
- [路由配置规范和最佳实践](./best-practices.md)
- [API 使用及规范文档](../api/index.md)
