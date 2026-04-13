# 路由配置规范和最佳实践

本文档将详细介绍 CurbUI 框架中路由配置的规范和最佳实践，包括命名规范、结构规范、性能优化和安全建议等。

## 1. 命名规范

### 1.1 路由名称规范

- **使用小驼峰命名法**：路由名称应该使用小驼峰命名法，例如 `homePage`、`userProfile`。
- **使用描述性名称**：路由名称应该清晰描述页面的功能，例如 `login`、`register`、`settings`。
- **避免使用缩写**：除非是通用缩写（如 `id`、`api`），否则应使用完整的单词。
- **保持一致性**：相同类型的路由应该使用一致的命名模式，例如所有详情页都使用 `detail` 后缀。

```dart
// 推荐
static const home = CuRouteEntity('home', '/home');
static const userProfile = CuRouteEntity('userProfile', '/user/profile');
static const productDetail = CuRouteEntity('productDetail', '/product/:id');

// 不推荐
static const hp = CuRouteEntity('hp', '/home'); // 使用了缩写
static const UserProfile = CuRouteEntity('UserProfile', '/user/profile'); // 使用了大驼峰
static const prodDet = CuRouteEntity('prodDet', '/product/:id'); // 使用了缩写
```

### 1.2 路由路径规范

- **使用小写字母**：路由路径应该使用小写字母，例如 `/home`、`/user/profile`。
- **使用连字符分隔**：多个单词的路径应该使用连字符分隔，例如 `/user-profile`、`/product-detail`。
- **避免使用下划线**：路由路径中应避免使用下划线，应使用连字符代替。
- **保持简洁**：路由路径应该简洁明了，避免过长的路径。

```dart
// 推荐
static const home = CuRouteEntity('home', '/home');
static const userProfile = CuRouteEntity('userProfile', '/user/profile');
static const productDetail = CuRouteEntity('productDetail', '/product/:id');

// 不推荐
static const home = CuRouteEntity('home', '/Home'); // 使用了大写字母
static const userProfile = CuRouteEntity('userProfile', '/user_profile'); // 使用了下划线
static const productDetail = CuRouteEntity('productDetail', '/products/details/:id'); // 路径过长
```

### 1.3 参数命名规范

- **使用小写字母**：参数名称应该使用小写字母，例如 `:id`、`:userId`。
- **使用描述性名称**：参数名称应该清晰描述参数的含义，例如 `:productId`、`:userId`。
- **避免使用单个字母**：除非是通用参数（如 `:id`），否则应使用描述性名称。

```dart
// 推荐
static String productDetail(String id) => '/product/$id';
static const productDetailRaw = CuRouteEntity('productDetail', '/product/:id');

static String userDetail(String userId) => '/user/$userId';
static const userDetailRaw = CuRouteEntity('userDetail', '/user/:userId');

// 不推荐
static String productDetail(String id) => '/product/$id';
static const productDetailRaw = CuRouteEntity('productDetail', '/product/:ID'); // 使用了大写字母

static String userDetail(String id) => '/user/$id';
static const userDetailRaw = CuRouteEntity('userDetail', '/user/:u'); // 使用了单个字母
```

## 2. 结构规范

### 2.1 路由定义结构

- **使用抽象类**：路由定义应该使用抽象类，例如 `Routes`。
- **分类组织**：相关的路由应该分组组织，例如认证路由、主路由、管理路由等。
- **使用子路由类**：复杂的路由结构应该使用子路由类，例如 `DemoRoutes`。
- **保持清晰**：路由定义应该清晰易读，避免混乱的结构。

```dart
// 推荐
class CuRouteEntity {
  final String name;
  final String path;
  const CuRouteEntity(this.name, this.path);
}

abstract class Routes {
  // 认证路由
  static const login = CuRouteEntity('login', '/login');
  static const register = CuRouteEntity('register', '/register');
  static const forgotPassword = CuRouteEntity('forgotPassword', '/forgot-password');
  
  // 主路由
  static const home = CuRouteEntity('home', '/home');
  static const profile = CuRouteEntity('profile', '/profile');
  static const settings = CuRouteEntity('settings', '/settings');
  
  // 详情路由
  static String productDetail(String id) => '/product/$id';
  static const productDetailRaw = CuRouteEntity('productDetail', '/product/:id');
  
  // 子路由
  static const demo = DemoRoutes();
}

class DemoRoutes {
  const DemoRoutes();

  final CuRouteEntity basic = CuRouteEntity('demoBasic', '/demo/basic');
  final CuRouteEntity advanced = CuRouteEntity('demoAdvanced', '/demo/advanced');
  final CuRouteEntity network = CuRouteEntity('demoNetwork', '/demo/network');
}
```

### 2.2 路由配置结构

- **使用单独的文件**：路由配置应该使用单独的文件，例如 `lib/routes/index.dart`。
- **组织路由顺序**：路由配置应该按照逻辑顺序组织，例如先配置认证路由，再配置主路由。
- **使用命名路由**：所有路由都应该使用命名路由，便于导航和管理。
- **添加错误处理**：应该添加全局错误处理，处理未找到的路由。

```dart
// 推荐
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
      
      // 详情路由
      GoRoute(
        path: Routes.productDetailRaw.path,
        name: Routes.productDetailRaw.name,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return ProductDetailPage(id: id);
        },
      ),
    ],
    errorBuilder: (context, state) => const NotFoundPage(),
  );
}
```

### 2.3 页面结构规范

- **使用 CuPage**：页面应该使用 `CuPage` 组件，提供统一的页面结构。
- **保持一致性**：页面结构应该保持一致，包括标题、导航栏、内容区域等。
- **合理组织**：页面内容应该合理组织，使用适当的布局组件。

```dart
// 推荐
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
            CuText('欢迎来到首页'),
            CuButton(
              label: '去登录',
              onTap: () => context.pushNamed(Routes.login.name),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 3. 性能优化

### 3.1 路由懒加载

- **使用懒加载**：对于大型应用，可以使用懒加载来提高启动性能。
- **按需加载**：只在需要时加载路由对应的页面组件。

```dart
// 推荐
GoRoute(
  path: Routes.productDetailRaw.path,
  name: Routes.productDetailRaw.name,
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    return ProductDetailPage(id: id);
  },
);

// 对于大型页面，可以使用懒加载
GoRoute(
  path: Routes.admin.path,
  name: Routes.admin.name,
  builder: (context, state) => const AdminPage(),
  routes: [
    GoRoute(
      path: 'users',
      name: Routes.adminUsers.name,
      builder: (context, state) => const AdminUsersPage(),
    ),
  ],
);
```

### 3.2 路由缓存

- **使用 CuKeepAlive**：对于频繁访问的页面，可以使用 `CuKeepAlive` 组件来缓存页面状态。
- **合理使用缓存**：根据页面的使用频率和内存占用情况，合理使用缓存。

```dart
// 推荐
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return CuKeepAlive(
      child: CuPage(
        title: '首页',
        body: // 页面内容
      ),
    );
  }
}
```

### 3.3 路由动画优化

- **使用合适的动画**：根据页面的特点，选择合适的路由动画。
- **避免过度动画**：避免使用过于复杂的动画，以免影响性能。

```dart
// 推荐
GoRoute(
  path: Routes.detailRaw.path,
  name: Routes.detailRaw.name,
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
);
```

## 4. 安全建议

### 4.1 路由守卫

- **使用路由守卫**：对于需要权限的页面，应该使用路由守卫进行保护。
- **验证用户身份**：在路由守卫中验证用户的身份和权限。
- **防止未授权访问**：确保未授权用户无法访问受保护的页面。

```dart
// 推荐
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
```

### 4.2 参数验证

- **验证路由参数**：在页面中验证路由参数的有效性。
- **防止注入攻击**：避免直接使用路由参数构建 SQL 查询或其他可能导致安全问题的操作。

```dart
// 推荐
class ProductDetailPage extends StatelessWidget {
  const ProductDetailPage({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context) {
    // 验证参数
    if (id.isEmpty || !RegExp(r'^\d+$').hasMatch(id)) {
      return CuPage(
        title: '错误',
        body: Center(
          child: CuText('无效的产品 ID'),
        ),
      );
    }

    return CuPage(
      title: '产品详情',
      body: // 页面内容
    );
  }
}
```

### 4.3 敏感信息保护

- **避免在路由中传递敏感信息**：避免在路由参数中传递敏感信息，如密码、token 等。
- **使用安全的存储方式**：对于敏感信息，应该使用安全的存储方式，如 `flutter_secure_storage`。

```dart
// 不推荐
// 避免在路由中传递敏感信息
context.pushNamed(
  Routes.userProfile.name,
  extra: {'token': '敏感的认证 token'},
);

// 推荐
// 使用安全的存储方式
await secureStorage.write(key: 'token', value: '敏感的认证 token');
context.pushNamed(Routes.userProfile.name);
```

## 5. 最佳实践

### 5.1 路由组织

- **按功能组织**：按照功能模块组织路由，例如认证路由、用户路由、产品路由等。
- **使用子路由**：对于复杂的功能模块，使用子路由进行组织。
- **保持简洁**：路由结构应该简洁明了，避免过于复杂的嵌套。

### 5.2 导航方式

- **使用命名路由**：使用命名路由进行导航，而不是直接使用路径。
- **选择合适的导航方法**：根据场景选择合适的导航方法，如 `go`、`push`、`replace` 等。
- **处理返回值**：对于需要返回值的场景，使用 `push` 并处理返回值。

```dart
// 推荐
// 使用命名路由
context.goNamed(Routes.home.name);

// 处理返回值
final result = await context.pushNamed(Routes.selectImage.name);
if (result != null) {
  // 处理返回值
}
```

### 5.3 参数传递

- **使用路径参数**：对于必需的参数，使用路径参数。
- **使用查询参数**：对于可选的参数，使用查询参数。
- **使用 extra 参数**：对于复杂的参数，使用 `extra` 参数。

```dart
// 推荐
// 使用路径参数
context.push(Routes.productDetail('123'));

// 使用查询参数
context.pushNamed(
  Routes.search.name,
  queryParameters: {'keyword': 'flutter', 'page': '1'},
);

// 使用 extra 参数
context.pushNamed(
  Routes.userProfile.name,
  extra: userModel,
);
```

### 5.4 错误处理

- **添加全局错误处理**：添加全局错误处理，处理未找到的路由。
- **处理页面错误**：在页面中处理可能的错误情况。
- **提供友好的错误提示**：为用户提供友好的错误提示。

```dart
// 推荐
// 添加全局错误处理
GoRouter(
  // 其他配置...
  errorBuilder: (context, state) => const NotFoundPage(),
);

// 处理页面错误
class ProductDetailPage extends StatelessWidget {
  const ProductDetailPage({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: '产品详情',
      body: FutureBuilder<Product>(
        future: productService.getProduct(id),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(
              child: CuText('加载失败，请重试'),
            );
          }
          if (!snapshot.hasData) {
            return Center(
              child: CuLoading(),
            );
          }
          final product = snapshot.data!;
          return // 产品详情内容
        },
      ),
    );
  }
}
```

## 6. 示例代码

### 6.1 完整的路由配置示例

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
  static const forgotPassword = CuRouteEntity('forgotPassword', '/forgot-password');
  
  // 主路由
  static const home = CuRouteEntity('home', '/home');
  static const profile = CuRouteEntity('profile', '/profile');
  static const settings = CuRouteEntity('settings', '/settings');
  
  // 产品路由
  static const products = CuRouteEntity('products', '/products');
  static String productDetail(String id) => '/products/$id';
  static const productDetailRaw = CuRouteEntity('productDetail', '/products/:id');
  static const productCreate = CuRouteEntity('productCreate', '/products/create');
  static String productEdit(String id) => '/products/$id/edit';
  static const productEditRaw = CuRouteEntity('productEdit', '/products/:id/edit');
  
  // 订单路由
  static const orders = CuRouteEntity('orders', '/orders');
  static String orderDetail(String id) => '/orders/$id';
  static const orderDetailRaw = CuRouteEntity('orderDetail', '/orders/:id');
  
  // 管理员路由
  static const admin = CuRouteEntity('admin', '/admin');
  static const adminUsers = CuRouteEntity('adminUsers', '/admin/users');
  static const adminSettings = CuRouteEntity('adminSettings', '/admin/settings');
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
      Routes.forgotPassword.path,
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
import 'package:curb_ui/pages/forgot_password.dart';
import 'package:curb_ui/pages/home.dart';
import 'package:curb_ui/pages/profile.dart';
import 'package:curb_ui/pages/settings.dart';
import 'package:curb_ui/pages/products.dart';
import 'package:curb_ui/pages/product_detail.dart';
import 'package:curb_ui/pages/product_create.dart';
import 'package:curb_ui/pages/product_edit.dart';
import 'package:curb_ui/pages/orders.dart';
import 'package:curb_ui/pages/order_detail.dart';
import 'package:curb_ui/pages/admin.dart';
import 'package:curb_ui/pages/admin_users.dart';
import 'package:curb_ui/pages/admin_settings.dart';
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
      GoRoute(
        path: Routes.forgotPassword.path,
        name: Routes.forgotPassword.name,
        builder: (context, state) => const ForgotPasswordPage(),
      ),
      
      // 主路由
      GoRoute(
        path: Routes.home.path,
        name: Routes.home.name,
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: Routes.profile.path,
        name: Routes.profile.name,
        builder: (context, state) => const ProfilePage(),
      ),
      GoRoute(
        path: Routes.settings.path,
        name: Routes.settings.name,
        builder: (context, state) => const SettingsPage(),
      ),
      
      // 产品路由
      GoRoute(
        path: Routes.products.path,
        name: Routes.products.name,
        builder: (context, state) => const ProductsPage(),
        routes: [
          GoRoute(
            path: ':id',
            name: Routes.productDetailRaw.name,
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return ProductDetailPage(id: id);
            },
            routes: [
              GoRoute(
                path: 'edit',
                name: Routes.productEditRaw.name,
                builder: (context, state) {
                  final id = state.pathParameters['id']!;
                  return ProductEditPage(id: id);
                },
              ),
            ],
          ),
          GoRoute(
            path: 'create',
            name: Routes.productCreate.name,
            builder: (context, state) => const ProductCreatePage(),
          ),
        ],
      ),
      
      // 订单路由
      GoRoute(
        path: Routes.orders.path,
        name: Routes.orders.name,
        builder: (context, state) => const OrdersPage(),
        routes: [
          GoRoute(
            path: ':id',
            name: Routes.orderDetailRaw.name,
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return OrderDetailPage(id: id);
            },
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
          ),
          GoRoute(
            path: 'settings',
            name: Routes.adminSettings.name,
            builder: (context, state) => const AdminSettingsPage(),
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
- [路由高级功能指南](./advanced-features.md)
- [API 使用及规范文档](../api/index.md)
