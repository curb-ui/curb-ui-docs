# 代码生成流程

## 生成命令

当修改了服务接口或数据模型后，需要运行代码生成命令。

### 单次生成

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 监听模式（开发时使用）

```bash
flutter pub run build_runner watch
```

## 添加新 API 端点的步骤

1. **在对应服务文件中添加抽象方法**

```dart
@RestApi()
abstract class UserService {
  factory UserService(Dio dio, {String? baseUrl}) = _UserService;

  @GET('/app/user/info/person')
  Future<UserModel> getUserInfo();

  @POST('/app/user/info/updatePerson')
  Future<UserModel> updateUser(@Body() UserModel user);

  @DELETE('/app/user/info/{id}')
  Future<void> deleteUser(@Path('id') int id);
}
```

2. **添加数据模型（如需要）**

```dart
@JsonSerializable()
class NewModel {
  NewModel({required this.id, required this.name});

  factory NewModel.fromJson(Map<String, dynamic> json) =>
      _$NewModelFromJson(json);

  final int id;
  final String name;

  Map<String, dynamic> toJson() => _$NewModelToJson(this);
}
```

3. **导出模型（如需要）**

在 `models.dart` 中添加导出：

```dart
export 'models/new_model.dart';
```

4. **运行代码生成命令**

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

5. **使用新 API**

```dart
try {
  await userService.deleteUser(1);
} catch (e) {
  print('删除用户失败: $e');
}
```

## Retrofit 常用注解

| 注解 | 说明 | 示例 |
| :--- | :--- | :--- |
| `@GET` | GET 请求 | `@GET('/users')` |
| `@POST` | POST 请求 | `@POST('/users')` |
| `@PUT` | PUT 请求 | `@PUT('/users/{id}')` |
| `@DELETE` | DELETE 请求 | `@DELETE('/users/{id}')` |
| `@Path` | 路径参数 | `@Path('id') int id` |
| `@Query` | 查询参数 | `@Query('page') int page` |
| `@Field` | 表单字段 | `@Field('name') String name` |
| `@Body` | 请求体 | `@Body() User user` |
| `@Header` | 请求头 | `@Header('Authorization') String token` |

## 相关文档

- [主索引](./index.md)
- [数据模型规范](./models.md)
