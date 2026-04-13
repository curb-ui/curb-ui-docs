# CuResourceDelegate 使用指南

`CuResourceDelegate` 是 `CurbUI` 框架提供的资源委托类，用于组件文本国际化，为组件提供统一的文本资源管理。

## 基本概念

### CuResourceDelegate

`CuResourceDelegate` 是一个抽象类，定义了组件需要的文本资源接口：

```dart
abstract class CuResourceDelegate {
  /// 取消
  String get cancel;
  
  /// 确认
  String get confirm;
  
  /// 确定
  String get ok;
  
  /// 关闭
  String get close;
  
  /// 错误
  String get error;
  
  /// 警告
  String get warning;
  
  /// 成功
  String get success;
  
  /// 信息
  String get info;
  
  /// 加载中
  String get loading;
  
  /// 重试
  String get retry;
  
  /// 更多
  String get more;
  
  /// 全部
  String get all;
  
  /// 无数据
  String get noData;
  
  /// 搜索
  String get search;
  
  /// 清除
  String get clear;
  
  /// 选择
  String get select;
  
  /// 请选择
  String get pleaseSelect;
  
  /// 请输入
  String get pleaseInput;
  
  /// 确定删除
  String get confirmDelete;
  
  /// 删除
  String get delete;
  
  /// 编辑
  String get edit;
  
  /// 添加
  String get add;
  
  /// 保存
  String get save;
  
  /// 提交
  String get submit;
  
  /// 取消
  String get cancelOperation;
  
  /// 确定
  String get confirmOperation;
  
  /// 上一页
  String get previousPage;
  
  /// 下一页
  String get nextPage;
  
  /// 第 {current} 页，共 {total} 页
  String pageInfo(int current, int total);
  
  /// 共 {count} 条
  String totalCount(int count);
  
  /// 加载失败
  String get loadFailed;
  
  /// 网络错误
  String get networkError;
  
  /// 服务器错误
  String get serverError;
  
  /// 未知错误
  String get unknownError;
}
```

### 实现类

#### CuDefaultResourceDelegate

默认资源委托，提供中文文本：

```dart
class CuDefaultResourceDelegate extends CuResourceDelegate {
  @override
  String get cancel => '取消';
  
  @override
  String get confirm => '确认';
  
  // 其他方法实现...
}
```

#### CuIntlResourceDelegate

国际化资源委托，提供英文文本：

```dart
class CuIntlResourceDelegate extends CuResourceDelegate {
  CuIntlResourceDelegate(this.context);
  
  final BuildContext context;
  
  @override
  String get cancel => 'Cancel';
  
  @override
  String get confirm => 'Confirm';
  
  // 其他方法实现...
}
```

## 使用方法

### 1. 通过上下文获取资源委托

使用上下文扩展方法获取资源委托：

```dart
Text(context.cl.cancel); // 取消
Text(context.cl.confirm); // 确认
Text(context.cl.loading); // 加载中
```

### 2. 直接使用资源管理器

```dart
// 获取默认资源委托
CuResourceDelegate delegate = CuResourceManager.delegate;
print(delegate.cancel); // 取消

// 获取当前上下文的资源委托
CuResourceDelegate contextDelegate = CuResourceManager.of(context);
print(contextDelegate.confirm); // 确认
```

### 3. 自定义资源委托

如果需要自定义资源委托，可以创建一个新的实现类：

```dart
class CustomResourceDelegate extends CuResourceDelegate {
  @override
  String get cancel => '取消操作';
  
  @override
  String get confirm => '确认操作';
  
  // 其他方法实现...
  
  @override
  String pageInfo(int current, int total) {
    return '第 $current 页，共 $total 页';
  }
  
  @override
  String totalCount(int count) {
    return '总共 $count 条数据';
  }
}

// 设置自定义资源委托
CuResourceManager.setDelegate(CustomResourceDelegate());
```

### 4. 在组件中使用

```dart
class CustomButton extends StatelessWidget {
  const CustomButton({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return CuButton(
      label: context.cl.confirm,
      onTap: () {
        // 操作
      },
    );
  }
}

class LoadingWidget extends StatelessWidget {
  const LoadingWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return CuText(context.cl.loading);
  }
}
```

## 与 AppLocalizations 的区别

| 特性 | CuResourceDelegate | AppLocalizations |
| :--- | :--- | :--- |
| 用途 | 组件文本国际化 | 应用文本国际化 |
| 范围 | 组件库内部使用 | 整个应用使用 |
| 实现 | 手动实现，支持运行时切换 | 自动生成，基于 arb 文件 |
| 灵活性 | 可自定义实现 | 基于 Flutter 标准国际化 |

## 最佳实践

1. **在组件中使用**：组件库的组件应使用 `CuResourceDelegate` 获取文本
2. **在应用中使用**：应用级别的文本应使用 `AppLocalizations` 获取
3. **自定义委托**：如果需要特殊的文本资源，可以自定义资源委托
4. **保持一致性**：确保组件文本与应用文本风格一致
5. **测试覆盖**：测试不同语言环境下的组件显示

## 相关文档

- [主文档](./index.md)
- [语言切换与持久化](./language-switching.md)
- [复杂国际化场景处理](./complex-scenarios.md)
- [API 使用及规范文档](../api/index.md)
