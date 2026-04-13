# 数据模型规范

## BaseResponse 基础响应模型

通用的 API 响应包装模型，包含 code、message、data 字段。

```dart
BaseResponse<UserModel> response = BaseResponse(
  code: 1000,
  message: 'success',
  data: UserModel(...),
);
```

## PaginationModel 分页模型

分页查询参数和结果。

```dart
final pagination = PaginationModel(
  page: 1,
  size: 10,
  total: 100,
);
```

## BasePageModel 分页数据模型

包含分页信息和数据列表的复合模型。

```dart
final pageData = BasePageModel<String>(
  list: ['item1', 'item2'],
  pagination: PaginationModel(page: 1, size: 10, total: 100),
);
```

## CaptchaModel 验证码模型

```dart
final captcha = CaptchaModel(
  captchaId: 'captcha_id',
  data: 'base64_image_data',
);
```

## TokenModel Token 模型

```dart
final token = TokenModel(
  token: 'access_token',
  expire: 3600,
  refreshToken: 'refresh_token',
  refreshExpire: 86400,
);
```

## UserModel 用户模型

```dart
final user = UserModel(
  unionid: 'unionid',
  id: 1,
  nickName: '用户名',
  avatarUrl: 'https://example.com/avatar.jpg',
  phone: '13800138000',
  gender: 1,
  status: 1,
  createTime: '2024-01-01',
  updateTime: '2024-01-01',
);
```

## UploadTypeModel 上传类型模型

```dart
final uploadType = UploadTypeModel(
  mode: 'oss',
  type: 'oss',
  credentials: {},
);
```

## UploadModel 上传模型

```dart
final upload = UploadModel(
  uploadUrl: 'https://upload.example.com',
  url: 'https://cdn.example.com/file.jpg',
  host: 'oss-cn-hangzhou.aliyuncs.com',
  OSSAccessKeyId: 'access_key_id',
  policy: 'policy',
  signature: 'signature',
  publicDomain: 'https://public.example.com',
  token: 'token',
);
```

## 相关文档

- [服务使用](./services.md)
- [代码生成流程](./code-generation.md)
- [主索引](./index.md)
