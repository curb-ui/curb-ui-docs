# 路由高级功能指南

本文档将详细介绍 CurbUI 框架中路由的高级功能，包括嵌套路由、路由守卫和路由动画等。

## 1. 嵌套路由

### 1.1 基本嵌套路由

嵌套路由允许在一个路由中包含其他路由，适用于具有子页面的场景，如标签页、抽屉菜单等。

```dart
// 定义嵌套路由
abstract class Routes {
  static const dashboard = CuRouteEntity('dashboard', '/dashboard');
  static const dashboardHome = CuRouteEntity('dashboard_home', '/dashboard/home');
  static const dashboardProfile = CuRouteEntity('dashboard_profile', '/dashboard/profile');
  static const dashboardSettings = CuRouteEntity('dashboard_settings', '/dashboard/settings');
}

// 配置嵌套路由
GoRoute(
  path: Routes.dashboard.path,
  name: Routes.dashboard.name,
  builder: (context, state) => const DashboardPage(),
  routes: [
    GoRoute(
      path: 'home',
      name: Routes.dashboardHome.name,
      builder: (context, state) => const DashboardHomePage(),
    ),
    GoRoute(
      path: 'profile',
      name: Routes.dashboardProfile.name,
      builder: (context, state) => const DashboardProfilePage(),
    ),
    GoRoute(
      path: 'settings',
      name: Routes.dashboardSettings.name,
      builder: (context, state) => const DashboardSettingsPage(),
    ),
  ],
);

// Dashboard 页面
class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '仪表盘',
      body: Column(
        children: [
          Expanded(
            child: GoRouter.of(context).location == Routes.dashboard.path
                ? const Center(child: CuText('请选择一个选项'))
                : const RouterOutlet(),
          ),
          CuTabBar(
            tabs: [
              CuTabItem(label: '首页', value: Routes.dashboardHome.name),
              CuTabItem(label: '个人资料', value: Routes.dashboardProfile.name),
              CuTabItem(label: '设置', value: Routes.dashboardSettings.name),
            ],
            onTabChanged: (value) {
              context.goNamed(value);
            },
          ),
        ],
      ),
    );
  }
}
```

### 1.2 多级嵌套路由

可以创建多级嵌套路由，适用于更复杂的页面结构：

```dart
// 定义多级嵌套路由
abstract class Routes {
  static const admin = CuRouteEntity('admin', '/admin');
  static const adminUsers = CuRouteEntity('admin_users', '/admin/users');
  static const adminUserDetail = CuRouteEntity('admin_user_detail', '/admin/users/:id');
  static const adminUserEdit = CuRouteEntity('admin_user_edit', '/admin/users/:id/edit');
}

// 配置多级嵌套路由
GoRoute(
  path: Routes.admin.path,
  name: Routes.admin.name,
  builder: (context, state) => const AdminPage(),
  routes: [
    GoRoute(
      path: 'users',
      name: Routes.adminUsers.name,
      builder: (context, state) => const AdminUsersPage(),
      routes: [
        GoRoute(
          path: ':id',
          name: Routes.adminUserDetail.name,
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            return AdminUserDetailPage(id: id);
          },
          routes: [
            GoRoute(
              path: 'edit',
              name: Routes.adminUserEdit.name,
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                return AdminUserEditPage(id: id);
              },
            ),
          ],
        ),
      ],
    ),
  ],
);
```

## 2. 路由守卫

### 2.1 基本路由守卫

路由守卫用于控制路由的访问权限，例如需要登录才能访问的页面：

```dart
// 定义需要登录的路由
abstract class Routes {
  static const login = CuRouteEntity('login', '/login');
  static const profile = CuRouteEntity('profile', '/profile');
  static const settings = CuRouteEntity('settings', '/settings');
}

// 登录状态管理
class AuthService {
  static bool isLoggedIn = false;
  static void login() => isLoggedIn = true;
  static void logout() => isLoggedIn = false;
}

// 配置路由守卫
GoRouter(
  initialLocation: Routes.login.path,
  routes: [
    GoRoute(
      path: Routes.login.path,
      name: Routes.login.name,
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: Routes.profile.path,
      name: Routes.profile.name,
      builder: (context, state) => const ProfilePage(),
      redirect: (context, state) {
        if (!AuthService.isLoggedIn) {
          return Routes.login.path;
        }
        return null;
      },
    ),
    GoRoute(
      path: Routes.settings.path,
      name: Routes.settings.name,
      builder: (context, state) => const SettingsPage(),
      redirect: (context, state) {
        if (!AuthService.isLoggedIn) {
          return Routes.login.path;
        }
        return null;
      },
    ),
  ],
);

// 登录页面
class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '登录',
      body: Center(
        child: CuButton(
          label: '登录',
          onTap: () {
            AuthService.login();
            context.goNamed(Routes.profile.name);
          },
        ),
      ),
    );
  }
}
```

### 2.2 全局路由守卫

可以创建全局路由守卫，对所有路由进行统一的权限控制：

```dart
// 全局路由守卫
class RouteGuard {
  static String? redirect(BuildContext context, GoRouterState state) {
    // 不需要登录的路由
    final unprotectedRoutes = [
      Routes.login.path,
      Routes.register.path,
      Routes.forgotPassword.path,
    ];

    // 检查是否需要登录
    if (!unprotectedRoutes.contains(state.location) && !AuthService.isLoggedIn) {
      return Routes.login.path;
    }

    return null;
  }
}

// 配置全局路由守卫
GoRouter(
  initialLocation: Routes.login.path,
  redirect: RouteGuard.redirect,
  routes: [
    // 路由配置...
  ],
);
```

### 2.3 权限路由守卫

可以根据用户权限控制路由访问：

```dart
// 权限路由守卫
class PermissionGuard {
  static String? redirect(BuildContext context, GoRouterState state) {
    // 检查登录状态
    if (!AuthService.isLoggedIn) {
      return Routes.login.path;
    }

    // 检查管理员权限
    if (state.location.startsWith('/admin') && !AuthService.isAdmin) {
      return Routes.home.path;
    }

    return null;
  }
}

// 配置权限路由守卫
GoRouter(
  initialLocation: Routes.login.path,
  redirect: PermissionGuard.redirect,
  routes: [
    // 路由配置...
  ],
);
```

## 3. 路由动画

### 3.1 基本路由动画

可以为路由添加自定义动画，提升用户体验：

```dart
// 配置路由动画
GoRouter(
  initialLocation: Routes.home.path,
  routes: [
    GoRoute(
      path: Routes.home.path,
      name: Routes.home.name,
      builder: (context, state) => const HomePage(),
    ),
    GoRoute(
      path: Routes.detailRaw.path,
      name: Routes.detailRaw.name,
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return DetailPage(id: id);
      },
      pageBuilder: (context, state) {
        final id = state.pathParameters['id']!;
        return CustomTransitionPage(
          child: DetailPage(id: id),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(
              opacity: animation,
              child: child,
            );
          },
        );
      },
    ),
  ],
);
```

### 3.2 滑动路由动画

可以实现滑动效果的路由动画：

```dart
// 滑动路由动画
GoRoute(
  path: Routes.detailRaw.path,
  name: Routes.detailRaw.name,
  pageBuilder: (context, state) {
    final id = state.pathParameters['id']!;
    return CustomTransitionPage(
      child: DetailPage(id: id),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = Offset(1.0, 0.0);
        const end = Offset.zero;
        const curve = Curves.ease;

        var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

        return SlideTransition(
          position: animation.drive(tween),
          child: child,
        );
      },
    );
  },
);
```

### 3.3 缩放路由动画

可以实现缩放效果的路由动画：

```dart
// 缩放路由动画
GoRoute(
  path: Routes.detailRaw.path,
  name: Routes.detailRaw.name,
  pageBuilder: (context, state) {
    final id = state.pathParameters['id']!;
    return CustomTransitionPage(
      child: DetailPage(id: id),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return ScaleTransition(
          scale: animation,
          child: child,
        );
      },
    );
  },
);
```

## 4. 路由状态管理

### 4.1 路由状态

可以使用 `state.extra` 传递状态数据：

```dart
// 传递状态数据
context.pushNamed(
  Routes.detailRaw.name,
  pathParameters: {'id': '123'},
  extra: {
    'title': '商品详情',
    'from': 'home',
  },
);

// 获取状态数据
GoRoute(
  path: Routes.detailRaw.path,
  name: Routes.detailRaw.name,
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    final extra = state.extra as Map<String, dynamic>? ?? {};
    final title = extra['title'] ?? '详情页';
    final from = extra['from'] ?? '';
    
    return DetailPage(id: id, title: title, from: from);
  },
);
```

### 4.2 路由参数持久化

可以使用 `SharedPreferences` 持久化路由参数：

```dart
// 持久化路由参数
Future<void> saveRouteParams(String routeName, Map<String, dynamic> params) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('last_route', routeName);
  await prefs.setString('last_route_params', jsonEncode(params));
}

// 恢复路由参数
Future<Map<String, dynamic>?> getRouteParams() async {
  final prefs = await SharedPreferences.getInstance();
  final paramsJson = prefs.getString('last_route_params');
  if (paramsJson != null) {
    return jsonDecode(paramsJson) as Map<String, dynamic>;
  }
  return null;
}

// 使用示例
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '首页',
      body: Center(
        child: CuButton(
          label: '查看详情',
          onTap: () async {
            final params = {'id': '123', 'title': '商品详情'};
            await saveRouteParams(Routes.detailRaw.name, params);
            context.push(Routes.detail('123'));
          },
        ),
      ),
    );
  }
}
```

## 5. 示例代码

### 5.1 完整的高级路由配置示例

```dart
// lib/routes/routes.dart
class CuRouteEntity {
  final String name;
  final String path;
  const CuRouteEntity(this.name, this.path);
}

abstract class Routes {
  // 认证路由
  static const login = CuRouteEntity('login', '/login');
  static const register = CuRouteEntity('register', '/register');
  
  // 主路由
  static const home = CuRouteEntity('home', '/home');
  static String detail(String id) => '/detail/$id';
  static const detailRaw = CuRouteEntity('detail', '/detail/:id');
  
  // 仪表盘路由
  static const dashboard = CuRouteEntity('dashboard', '/dashboard');
  static const dashboardHome = CuRouteEntity('dashboard_home', '/dashboard/home');
  static const dashboardProfile = CuRouteEntity('dashboard_profile', '/dashboard/profile');
  static const dashboardSettings = CuRouteEntity('dashboard_settings', '/dashboard/settings');
  
  // 管理员路由
  static const admin = CuRouteEntity('admin', '/admin');
  static const adminUsers = CuRouteEntity('admin_users', '/admin/users');
  static const adminUserDetail = CuRouteEntity('admin_user_detail', '/admin/users/:id');
}

// lib/routes/guard.dart
class AuthService {
  static bool isLoggedIn = false;
  static bool isAdmin = false;
  static void login() => isLoggedIn = true;
  static void logout() => isLoggedIn = false;
  static void setAdmin(bool value) => isAdmin = value;
}

class RouteGuard {
  static String? redirect(BuildContext context, GoRouterState state) {
    // 不需要登录的路由
    final unprotectedRoutes = [
      Routes.login.path,
      Routes.register.path,
    ];

    // 检查是否需要登录
    if (!unprotectedRoutes.contains(state.location) && !AuthService.isLoggedIn) {
      return Routes.login.path;
    }

    // 检查管理员权限
    if (state.location.startsWith('/admin') && !AuthService.isAdmin) {
      return Routes.home.path;
    }

    return null;
  }
}

// lib/routes/index.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:curb_ui/pages/login.dart';
import 'package:curb_ui/pages/register.dart';
import 'package:curb_ui/pages/home.dart';
import 'package:curb_ui/pages/detail.dart';
import 'package:curb_ui/pages/dashboard.dart';
import 'package:curb_ui/pages/dashboard_home.dart';
import 'package:curb_ui/pages/dashboard_profile.dart';
import 'package:curb_ui/pages/dashboard_settings.dart';
import 'package:curb_ui/pages/admin.dart';
import 'package:curb_ui/pages/admin_users.dart';
import 'package:curb_ui/pages/admin_user_detail.dart';
import 'package:curb_ui/pages/notfound.dart';
import 'routes.dart';
import 'guard.dart';

export 'routes.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: Routes.login.path,
    redirect: RouteGuard.redirect,
    routes: [
      // 认证路由
      GoRoute(
        path: Routes.login.path,
        name: Routes.login.name,
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: Routes.register.path,
        name: Routes.register.name,
        builder: (context, state) => const RegisterPage(),
      ),
      
      // 主路由
      GoRoute(
        path: Routes.home.path,
        name: Routes.home.name,
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: Routes.detailRaw.path,
        name: Routes.detailRaw.name,
        pageBuilder: (context, state) {
          final id = state.pathParameters['id']!;
          return CustomTransitionPage(
            child: DetailPage(id: id),
            transitionsBuilder: (context, animation, secondaryAnimation, child) {
              const begin = Offset(1.0, 0.0);
              const end = Offset.zero;
              const curve = Curves.ease;

              var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

              return SlideTransition(
                position: animation.drive(tween),
                child: child,
              );
            },
          );
        },
      ),
      
      // 仪表盘路由
      GoRoute(
        path: Routes.dashboard.path,
        name: Routes.dashboard.name,
        builder: (context, state) => const DashboardPage(),
        routes: [
          GoRoute(
            path: 'home',
            name: Routes.dashboardHome.name,
            builder: (context, state) => const DashboardHomePage(),
          ),
          GoRoute(
            path: 'profile',
            name: Routes.dashboardProfile.name,
            builder: (context, state) => const DashboardProfilePage(),
          ),
          GoRoute(
            path: 'settings',
            name: Routes.dashboardSettings.name,
            builder: (context, state) => const DashboardSettingsPage(),
          ),
        ],
      ),
      
      // 管理员路由
      GoRoute(
        path: Routes.admin.path,
        name: Routes.admin.name,
        builder: (context, state) => const AdminPage(),
        routes: [
          GoRoute(
            path: 'users',
            name: Routes.adminUsers.name,
            builder: (context, state) => const AdminUsersPage(),
            routes: [
              GoRoute(
                path: ':id',
                name: Routes.adminUserDetail.name,
                builder: (context, state) {
                  final id = state.pathParameters['id']!;
                  return AdminUserDetailPage(id: id);
                },
              ),
            ],
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) => const NotFoundPage(),
  );
}
```

## 相关文档

- [主文档](./index.md)
- [路由基本使用指南](./basic-usage.md)
- [路由配置规范和最佳实践](./best-practices.md)
- [API 使用及规范文档](../api/index.md)
