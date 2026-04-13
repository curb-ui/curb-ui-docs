# 服务使用

## AuthService 认证服务

提供用户认证相关的 API 接口，包括验证码获取、登录、Token 刷新等。

### 获取图片验证码

```dart
try {
  final captcha = await authService.captcha(
    phone: '13800138000',
    color: '#2c3142',
    width: 200,
    height: 70,
  );
  print('验证码ID: ${captcha.captchaId}');
  print('验证码图片数据: ${captcha.data}');
} catch (e) {
  print('获取验证码失败: $e');
}
```

### 手机号登录

```dart
try {
  final token = await authService.loginByPhone(
    phone: '13800138000',
    smsCode: '123456',
  );
  print('Access Token: ${token.token}');
  print('Refresh Token: ${token.refreshToken}');
} catch (e) {
  print('登录失败: $e');
}
```

### 刷新 Token

```dart
try {
  final newToken = await authService.refreshToken('refresh_token_here');
  print('新 Token: ${newToken.token}');
} catch (e) {
  print('刷新 Token 失败: $e');
}
```

### 发送短信验证码

```dart
try {
  await authService.sendSmsCode(
    phone: '13800138000',
    code: 'captcha_code',
    captchaId: 'captcha_id',
  );
  print('短信验证码发送成功');
} catch (e) {
  print('发送短信验证码失败: $e');
}
```

---

## UserService 用户服务

提供用户信息获取和更新的 API 接口。

### 获取用户信息

```dart
try {
  final user = await userService.getUserInfo();
  print('用户昵称: ${user.nickName}');
  print('手机号: ${user.phone}');
} catch (e) {
  print('获取用户信息失败: $e');
}
```

### 更新用户信息

```dart
try {
  final updatedUser = await userService.updateUser(
    UserModel(
      unionid: 'unionid',
      id: 1,
      nickName: '新昵称',
      avatarUrl: 'https://example.com/avatar.jpg',
      phone: '13800138000',
      gender: 1,
      status: 1,
      createTime: '2024-01-01',
      updateTime: '2024-01-01',
    ),
  );
  print('用户信息更新成功');
} catch (e) {
  print('更新用户信息失败: $e');
}
```

---

## UploadService 上传服务

提供文件上传相关的 API 接口。

### 获取上传模式

```dart
try {
  final uploadMode = await uploadService.getUploadMode();
  print('上传模式: ${uploadMode.mode}');
  print('云服务类型: ${uploadMode.type}');
} catch (e) {
  print('获取上传模式失败: $e');
}
```

### 获取云上传参数

```dart
try {
  final uploadParams = await uploadService.upload();
  print('上传参数: $uploadParams');
} catch (e) {
  print('获取上传参数失败: $e');
}
```
---

## MockService 模拟数据服务

提供分页数据模拟，用于开发和测试。

### 获取分页数据

```dart
try {
  final result = await mockService.page(
    PaginationModel(page: 1, size: 10),
  );
  print('数据列表: ${result.list}');
  print('总数: ${result.pagination.total}');
} catch (e) {
  print('获取数据失败: $e');
}
```

### 获取空数据

```dart
try {
  final result = await mockService.page(
    PaginationModel(page: 1, size: 10),
    isEmpty: true,
  );
  print('数据总数: ${result.pagination.total}');
} catch (e) {
  print('获取数据失败: $e');
}
```

## 相关文档

- [数据模型规范](./models.md)
- [主索引](./index.md)
