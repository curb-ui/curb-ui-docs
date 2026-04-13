# CurbUI 主题配置使用及规范文档

`CurbUI` 框架提供了完整的主题支持，包括 8 种主题颜色和三种主题模式，实现了主题切换和持久化功能，为应用提供统一的视觉风格管理。

---

## 快速入门

### 1. 基础配置

在应用的 `MaterialApp` 中配置主题：

```dart
import 'package:curb_ui/theme/index.dart';

// 初始化主题管理器
await CuThemeManager().init();

MaterialApp(
  theme: CuThemeManager().lightTheme,
  darkTheme: CuThemeManager().darkTheme,
  themeMode: CuThemeManager().materialThemeMode,
  home: MyHomePage(),
);
```

### 2. 主题切换

```dart
// 切换主题模式
await CuThemeManager().setThemeMode(CuThemeMode.light);  // 浅色模式
await CuThemeManager().setThemeMode(CuThemeMode.dark);   // 深色模式
await CuThemeManager().setThemeMode(CuThemeMode.system); // 跟随系统

// 切换主题颜色
await CuThemeManager().setThemeColor(CuThemeColorType.defaultColor); // 默认
await CuThemeManager().setThemeColor(CuThemeColorType.emerald);      // 翠绿
await CuThemeManager().setThemeColor(CuThemeColorType.purple);       // 紫檀
await CuThemeManager().setThemeColor(CuThemeColorType.gold);         // 金橙
await CuThemeManager().setThemeColor(CuThemeColorType.cherry);       // 樱桃
await CuThemeManager().setThemeColor(CuThemeColorType.mint);         // 薄荷
await CuThemeManager().setThemeColor(CuThemeColorType.gray);         // 青灰
await CuThemeManager().setThemeColor(CuThemeColorType.coral);        // 珊瑚
```

### 3. 监听主题变化

```dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  @override
  void initState() {
    super.initState();
    // 监听主题变化
    CuThemeManager().addListener(() {
      setState(() {
        // 主题变化，更新 UI
      });
    });
  }

  @override
  void dispose() {
    // 移除监听器
    CuThemeManager().removeListener(() {});
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: context.theme.bgColorPage,
      child: CuText(
        'Hello CurbUI',
        style: TextStyle(color: context.theme.textPrimaryColor),
      ),
    );
  }
}
```

---

## 架构概述

### 目录结构

```
lib/theme/
├── alpha/          # 透明度定义
├── color/          # 颜色定义
├── font/           # 字体定义
├── list/           # 主题列表
│   ├── cherry.dart  # 樱桃主题
│   ├── coral.dart   # 珊瑚主题
│   ├── default.dart # 默认主题
│   ├── emerald.dart # 翠绿主题
│   ├── gold.dart    # 金橙主题
│   ├── gray.dart    # 青灰主题
│   ├── index.dart   # 主题列表入口
│   ├── mint.dart    # 薄荷主题
│   └── purple.dart  # 紫檀主题
├── radius/         # 圆角定义
├── shadow/         # 阴影定义
├── size/           # 尺寸定义
├── spacing/        # 间距定义
├── extension.dart  # 主题扩展
├── index.dart      # 主题入口
└── manager.dart    # 主题管理器
```

### 核心组件

- **CuThemeManager**: 主题管理类，负责主题的初始化、切换和持久化
- **CuThemeExtension**: 主题扩展，提供统一的主题数据访问
- **CuThemeColorType**: 主题颜色类型枚举
- **CuThemeBrand**: 主题品牌定义

---

## 相关文档

- [主题配置结构与管理规范](./config-structure.md)
- [主题切换与持久化](./theme-switching.md)
- [扩展和自定义主题](./custom-theme.md)
- [CuThemeManager 和 CuThemeExtension 使用指南](./theme-manager.md)
- [主题颜色视觉预览](./color-preview.md)
- [在组件中使用主题颜色](./theme-color-usage.md)
- [API 使用及规范文档](../api/index.md)
- [多语言使用及规范文档](../locale/index.md)

---

> **AI Prompt Context**: 关键词：`主题`, `CuThemeManager`, `CuThemeExtension`, `主题颜色`, `主题模式`, `持久化`。原则：使用 `CuThemeManager` 管理主题；使用 `context.theme` 访问主题数据；主题切换后会自动持久化；根据需要选择合适的主题颜色。
