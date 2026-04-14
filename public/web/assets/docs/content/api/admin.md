# 适配 Cool-Admin 后台框架

CurbUI 深度适配 Cool-Admin 后端架构，提供完整的前后端对接方案，实现无缝集成。

**Cool-Admin 官方地址**：[https://node.cool-admin.com/](https://node.cool-admin.com/)

## 核心功能

### 登录鉴权
- 内置与 Cool-Admin 兼容的登录流程
- 支持 JWT 令牌验证
- 自动处理登录状态管理

### 文件上传
- 集成 Cool-Admin 文件上传 API
- 支持图片、视频等多种文件类型
- 提供上传进度和状态管理

### API 逻辑
- 预置 Cool-Admin 常用 API 调用
- 统一的错误处理机制
- 自动重试和网络状态管理

## 快速开始

### 配置 Cool-Admin 服务地址

在 `config_prod.json` 文件中配置 Cool-Admin 后端服务地址：
```json
{
  "API_URL": "https://show.cool-admin.com",
  "BASE_URL": "/api",
}
```

### 使用登录服务

```dart
// 登录
final result = await AuthService.login(username: 'admin', password: '123456');
if (result.success) {
  // 登录成功，跳转到主页
  context.pushReplacementNamed(Routes.index.name);
} else {
  // 登录失败，显示错误信息
  CuToast.show(result.message);
}
```

### 文件上传示例

```dart
// 选择文件
final file = await ImagePicker().pickImage(source: ImageSource.gallery);
if (file != null) {
  // 上传文件
  final result = await UploadService.uploadFile(file.path);
  if (result.success) {
    // 上传成功，获取文件 URL
    final fileUrl = result.data['url'];
  }
}
```

## 最佳实践

1. **统一配置**：将 Cool-Admin 服务地址和相关配置集中管理
2. **错误处理**：使用统一的错误处理机制，确保 API 调用的可靠性
3. **状态管理**：使用 Provider 管理登录状态和用户信息
4. **权限控制**：在路由和组件层面实现权限检查
5. **缓存策略**：合理使用缓存，减少不必要的 API 调用

## 注意事项

- 确保 Cool-Admin 后端服务已正确部署
- 配置正确的 CORS 策略，允许前端访问
- 定期更新 JWT 令牌，确保安全性
- 对敏感操作进行额外的安全验证

通过 CurbUI 与 Cool-Admin 的深度集成，您可以快速构建功能完整、安全可靠的 Flutter 应用，实现前后端的无缝对接。