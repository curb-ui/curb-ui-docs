# 语言切换与持久化使用指南

`CurbUI` 框架提供了 `CuLocaleManager` 类来管理语言的切换和持久化，使用单例模式确保全局只有一个实例。

## 语言切换

### 基本用法

使用 `CuLocaleManager.setLocale()` 方法切换语言：

```dart
import 'package:flutter/material.dart';
import 'package:curb_ui/locale/index.dart';

// 切换到英文
await CuLocaleManager.setLocale(Locale('en'));

// 切换到中文
await CuLocaleManager.setLocale(Locale('zh'));
```

### 语言切换示例

以下是一个完整的语言切换示例：

```dart
class LanguageSwitcher extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          title: Text('中文'),
          leading: Radio<Locale>(
            value: Locale('zh'),
            groupValue: CuLocaleManager.currentLocale,
            onChanged: (value) async {
              if (value != null) {
                await CuLocaleManager.setLocale(value);
              }
            },
          ),
        ),
        ListTile(
          title: Text('English'),
          leading: Radio<Locale>(
            value: Locale('en'),
            groupValue: CuLocaleManager.currentLocale,
            onChanged: (value) async {
              if (value != null) {
                await CuLocaleManager.setLocale(value);
              }
            },
          ),
        ),
      ],
    );
  }
}
```

## 语言持久化

### 实现原理

`CuLocaleManager` 使用本地存储来持久化语言设置：

1. 语言切换时，将语言代码保存到本地存储
2. 应用启动时，从本地存储读取保存的语言设置
3. 如果没有保存的设置，使用默认语言（中文）

### 存储键名

```dart
static const String _localeKey = 'curb_app_locale';
```

### 初始化语言

在应用启动时，调用 `CuLocaleManager.init()` 方法初始化语言：

```dart
void main() async {
  // 初始化语言
  await CuLocaleManager.init();
  runApp(MyApp());
}
```

## 监听语言变化

`CuLocaleManager` 继承自 `ChangeNotifier`，可以监听语言变化：

```dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  @override
  void initState() {
    super.initState();
    // 监听语言变化
    CuLocaleManager.instance.addListener(() {
      setState(() {
        // 语言变化，更新 UI
      });
    });
  }

  @override
  void dispose() {
    // 移除监听器
    CuLocaleManager.instance.removeListener(() {});
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Text(context.l10n.appTitle);
  }
}
```

## 获取当前语言

使用 `CuLocaleManager.currentLocale` 获取当前语言：

```dart
Locale? currentLocale = CuLocaleManager.currentLocale;
print('当前语言: ${currentLocale?.languageCode}');
```

## 支持的语言

`CuLocaleManager` 支持的语言列表：

```dart
static const List<Locale> supportedLocales = [Locale('en'), Locale('zh')];
```

## 最佳实践

1. **在应用启动时初始化**：确保在 `runApp()` 之前调用 `CuLocaleManager.init()`
2. **使用上下文扩展**：使用 `context.l10n` 来获取本地化文本
3. **监听语言变化**：对于需要实时更新的 UI，添加语言变化监听器
4. **避免频繁切换**：语言切换会触发 UI 重建，避免频繁切换
5. **测试覆盖**：确保语言切换功能在不同场景下都能正常工作

## 相关文档

- [主文档](./index.md)
- [语言文件结构与管理规范](./file-structure.md)
- [添加新语言](./add-language.md)
- [API 使用及规范文档](../api/index.md)
