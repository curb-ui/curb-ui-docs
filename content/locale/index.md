# CurbUI 多语言使用及规范文档

`CurbUI` 框架提供了完整的多语言支持，基于 Flutter 标准的 `flutter_localizations` 框架实现，支持英文和中文两种语言，并提供了语言切换和持久化功能。

---

## 快速入门

### 1. 基础配置

在应用的 `MaterialApp` 中配置本地化代理：

```dart
import 'package:curb_ui/locale/index.dart';

MaterialApp(
  localizationsDelegates: CuLocaleManager.localizationsDelegates,
  supportedLocales: CuLocaleManager.supportedLocales,
  locale: CuLocaleManager.currentLocale,
  home: MyHomePage(),
);
```

### 2. 初始化语言

在应用启动时初始化语言设置：

```dart
void main() async {
  // 初始化语言
  await CuLocaleManager.init();
  runApp(MyApp());
}
```

### 3. 使用本地化文本

通过上下文扩展方法获取本地化文本：

```dart
Text(context.l10n.appTitle); // 应用标题
Text(context.l10n.login); // 登录
Text(context.l10n.logout); // 退出登录
```

### 4. 语言切换

```dart
// 切换到英文
await CuLocaleManager.setLocale(Locale('en'));

// 切换到中文
await CuLocaleManager.setLocale(Locale('zh'));
```

---

## 架构概述

### 目录结构

```
lib/locale/
├── l10n/                # 语言文件目录
│   ├── app_localizations.dart     # 自动生成的本地化类
│   ├── app_localizations_en.dart  # 英文实现
│   ├── app_localizations_zh.dart  # 中文实现
│   ├── intl_en.arb                # 英文资源文件
│   └── intl_zh.arb                # 中文资源文件
├── index.dart           # 语言管理入口
└── resource_delegate.dart  # 资源委托
```

### 核心组件

- **CuLocaleManager**: 语言管理类，负责语言的初始化、切换和持久化
- **AppLocalizations**: 自动生成的本地化类，提供具体的本地化文本
- **CuResourceDelegate**: 资源委托，用于组件文本国际化
- **CuResourceManager**: 资源管理器，管理资源委托的实例

---

## 相关文档

- [语言文件结构与管理规范](./file-structure.md)
- [语言切换与持久化](./language-switching.md)
- [添加新语言](./add-language.md)
- [CuResourceDelegate 使用指南](./resource-delegate.md)
- [复杂国际化场景处理](./complex-scenarios.md)
- [API 使用及规范文档](../api/index.md)

---

> **AI Prompt Context**: 关键词：`多语言`, `国际化`, `Flutter`, `CuLocaleManager`, `CuResourceDelegate`。原则：使用 `context.l10n` 获取本地化文本；使用 `CuLocaleManager.setLocale()` 切换语言；语言切换后会自动持久化；添加新语言需要创建对应的 arb 文件并运行代码生成命令。
