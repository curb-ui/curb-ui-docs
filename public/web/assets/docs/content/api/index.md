# CurbUI API 使用及规范文档

`CurbUI API` 模块提供了类型安全的 REST API 客户端，基于 Retrofit.dart 构建，包含完整的认证、用户、上传等服务，以及统一的拦截器和错误处理机制。

---

## 文档导航

| 文档 | 说明 |
| :--- | :--- |
| [services.md](./services.md) | 服务使用（AuthService、UserService、UploadService、FeishuService、MockService） |
| [models.md](./models.md) | 数据模型规范 |
| [code-generation.md](./code-generation.md) | 代码生成流程 |

---

## 快速入门

### 基础导入

直接导入 API 模块即可使用所有服务。

```dart
import 'package:curb_ui/api/index.dart';
```

### 简单调用示例

```dart
try {
  final captcha = await authService.captcha(phone: '13800138000');
  final token = await authService.loginByPhone(
    phone: '13800138000',
    smsCode: '123456',
  );
  final user = await userService.getUserInfo();
} on DioException catch (e) {
  print('请求失败: ${e.message}');
}
```

---

## 1. 架构概述

### 1.1 目录结构

```
lib/api/
├── index.dart                  # API 入口文件，统一导出
├── request.dart                # 请求配置、拦截器、Dio 实例
├── models.dart                 # 数据模型统一导出
├── models/                     # 数据模型定义
│   ├── auth_model.dart         # 认证相关模型
│   ├── user_model.dart         # 用户相关模型
│   ├── upload_model.dart       # 上传相关模型
│   └── base_response.dart      # 基础响应模型
└── service/                    # 服务接口定义
    ├── auth_service.dart       # 认证服务
    ├── user_service.dart       # 用户服务
    ├── upload_service.dart     # 上传服务
    ├── feedback_service.dart   # 反馈服务
    └── mock_service.dart       # 模拟数据服务
```

### 1.2 核心依赖

| 依赖 | 版本 | 说明 |
| :--- | :--- | :--- |
| `retrofit` | ^4.9.0 | 类型安全的 API 客户端生成 |
| `dio` | ^5.9.0 | 强大的 Dart HTTP 客户端 |
| `json_annotation` | ^4.9.0 | JSON 序列化注解 |
| `json_serializable` | ^6.10.0 | JSON 序列化代码生成 |
| `build_runner` | ^2.6.0 | 构建运行器 |
| `retrofit_generator` | ^10.0.1 | Retrofit 代码生成 |

---

## 2. 拦截器配置

### 2.1 TokenInterceptor Token 拦截器

自动处理 Token 的添加、刷新和过期逻辑。

#### 主要功能

- 自动为请求添加 Authorization Header
- 检测 Token 过期并自动刷新
- 刷新 Token 期间将请求加入队列
- Token 刷新失败时自动退出登录

#### 忽略 Token 的接口

在 `Config.ignoreTokens` 中配置的接口不会携带 Token：

```dart
static const List<String> ignoreTokens = [
  '/app/user/login/captcha',
  '/app/user/login/smsCode',
  '/app/user/login/phone',
];
```

---

### 2.2 RetryInterceptor 重试拦截器

网络请求失败时的自动重试机制。

#### 配置参数

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `maxRetries` | `int` | 3 | 最大重试次数 |
| `retryableStatuses` | `List<int>` | [408, 429, 500, 502, 503, 504] | 可重试的 HTTP 状态码 |
| `retryableTypes` | `List<DioExceptionType>` | 连接超时、发送超时、接收超时、连接错误、未知错误 | 可重试的错误类型 |

#### 重试策略

使用指数退避策略，每次重试间隔为 `1000 * (2^retries)` 毫秒：

- 第 1 次重试：1 秒
- 第 2 次重试：2 秒
- 第 3 次重试：4 秒

---

## 3. 错误处理和最佳实践

### 3.1 错误类型

| 错误类型 | 说明 |
| :--- | :--- |
| `DioExceptionType.connectionTimeout` | 连接超时 |
| `DioExceptionType.sendTimeout` | 发送超时 |
| `DioExceptionType.receiveTimeout` | 接收超时 |
| `DioExceptionType.badResponse` | 响应错误（HTTP 状态码非 200） |
| `DioExceptionType.cancel` | 请求取消 |
| `DioExceptionType.connectionError` | 连接错误 |
| `DioExceptionType.unknown` | 未知错误 |

### 3.2 基础错误处理

```dart
try {
  final user = await userService.getUserInfo();
} on DioException catch (e) {
  switch (e.type) {
    case DioExceptionType.connectionTimeout:
      print('连接超时，请检查网络');
      break;
    case DioExceptionType.sendTimeout:
      print('发送超时');
      break;
    case DioExceptionType.receiveTimeout:
      print('接收超时');
      break;
    case DioExceptionType.badResponse:
      print('服务器错误: ${e.message}');
      break;
    case DioExceptionType.cancel:
      print('请求已取消');
      break;
    case DioExceptionType.connectionError:
      print('网络连接失败');
      break;
    case DioExceptionType.unknown:
      print('未知错误: ${e.message}');
      break;
  }
} catch (e) {
  print('其他错误: $e');
}
```

### 3.3 统一错误处理封装

```dart
Future<T> handleApiRequest<T>(Future<T> Function() request) async {
  try {
    return await request();
  } on DioException catch (e) {
    final message = e.message ?? '请求失败';
    throw Exception(message);
  } catch (e) {
    throw Exception('未知错误: $e');
  }
}

try {
  final user = await handleApiRequest(() => userService.getUserInfo());
} catch (e) {
  print(e);
}
```

### 3.4 最佳实践

1. **始终使用 try/catch**：所有 API 调用都应该包含错误处理
2. **避免嵌套调用**：使用 async/await 替代嵌套回调
3. **合理使用 Loading 状态**：API 调用期间显示加载状态
4. **防止重复请求**：使用 Loading 标志位防止用户重复点击
5. **Token 管理**：不要手动管理 Token，让拦截器自动处理
6. **配置忽略接口**：登录相关接口配置到 `ignoreTokens`
7. **使用类型安全**：利用 Retrofit 的类型安全特性

---

> **AI Prompt Context**: 关键词：`API`, `Retrofit`, `Dio`, `服务`, `拦截器`, `Token`, `错误处理`。原则：使用类型安全的 API 调用；始终包含错误处理；让拦截器自动管理 Token；修改 API 后记得运行代码生成命令。
