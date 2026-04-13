# 主题配置结构与管理规范

## 目录结构

`CurbUI` 框架的主题配置位于 `lib/theme/` 目录下，采用模块化的结构组织：

```
lib/theme/
├── alpha/          # 透明度定义
│   └── index.dart   # 透明度常量
├── color/          # 颜色定义
│   ├── index.dart   # 颜色常量
│   └── index.g.dart # 自动生成的颜色代码
├── font/           # 字体定义
│   └── index.dart   # 字体常量
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
│   └── index.dart   # 圆角常量
├── shadow/         # 阴影定义
│   └── index.dart   # 阴影常量
├── size/           # 尺寸定义
│   └── index.dart   # 尺寸常量
├── spacing/        # 间距定义
│   └── index.dart   # 间距常量
├── extension.dart  # 主题扩展
├── index.dart      # 主题入口
└── manager.dart    # 主题管理器
```

## 主题颜色类型

### CuThemeColorType 枚举

`CuThemeColorType` 定义了支持的主题颜色类型：

```dart
enum CuThemeColorType {
  defaultColor, // 默认颜泽
  emerald, // 翠绿
  purple, // 紫檀
  gold, // 金橙
  cherry, // 樱桃
  mint, // 薄荷
  gray, // 青灰
  coral, // 珊瑚
}
```

### 主题颜色映射

`themeColorMap` 将主题颜色类型映射到具体的主题品牌：

```dart
Map<CuThemeColorType, CuThemeBrand> themeColorMap = {
  CuThemeColorType.defaultColor: defaultTheme,
  CuThemeColorType.emerald: emeraldTheme,
  CuThemeColorType.purple: purpleTheme,
  CuThemeColorType.gold: goldTheme,
  CuThemeColorType.cherry: cherryTheme,
  CuThemeColorType.mint: mintTheme,
  CuThemeColorType.gray: grayTheme,
  CuThemeColorType.coral: coralTheme,
};
```

## 主题品牌定义

每个主题品牌都定义了一套完整的颜色方案，包括浅色和深色模式：

### 主题品牌结构

```dart
class CuThemeBrand {
  final String name;           // 主题名称
  final Color primaryColor;    // 主色调
  final Color primaryColorDark; // 深色主色调
  final Color secondaryColor;  // 辅助色
  final Color bgColorPage;     // 页面背景色
  final Color bgColorContainer; // 容器背景色
  final Color textPrimaryColor; // 主要文本色
  final Color textSecondaryColor; // 次要文本色
  final Color borderColor;     // 边框颜色
  // 其他颜色...
}
```

### 默认主题示例

```dart
final CuThemeBrand defaultTheme = CuThemeBrand(
  name: '默认',
  primaryColor: CuColor.primary,
  primaryColorDark: CuColor.primaryDark,
  secondaryColor: CuColor.secondary,
  bgColorPage: CuColor.bgPage,
  bgColorContainer: CuColor.bgContainer,
  textPrimaryColor: CuColor.textPrimary,
  textSecondaryColor: CuColor.textSecondary,
  borderColor: CuColor.border,
  // 其他颜色...
);
```

## 主题扩展

`CuThemeExtension` 是一个 `ThemeExtension` 子类，用于在 Flutter 主题系统中提供统一的主题数据访问：

### 主题扩展结构

```dart
class CuThemeExtension extends ThemeExtension<CuThemeExtension> {
  final CuThemeData data;

  const CuThemeExtension(this.data);

  @override
  CuThemeExtension copyWith({CuThemeData? data}) {
    return CuThemeExtension(data ?? this.data);
  }

  @override
  CuThemeExtension lerp(ThemeExtension<CuThemeExtension>? other, double t) {
    if (other is! CuThemeExtension) return this;
    return CuThemeExtension(data.lerp(other.data, t));
  }
}
```

### 上下文扩展

通过上下文扩展方法，可以方便地访问主题数据：

```dart
extension ThemeContextExtension on BuildContext {
  CuThemeData get theme {
    final extension = extensions<CuThemeExtension>();
    return extension?.data ?? CuTheme.defaultThemeData;
  }
}
```

## 主题管理规范

### 1. 主题配置原则

- **一致性**：所有组件应使用统一的主题配置
- **可扩展性**：主题系统应支持轻松添加新的主题颜色
- **可定制性**：允许用户自定义主题
- **性能**：主题切换应流畅，避免性能问题

### 2. 命名规范

- **主题颜色类型**：使用 PascalCase，如 `CuThemeColorType`
- **主题品牌**：使用 camelCase，如 `defaultTheme`
- **颜色常量**：使用 snake_case，如 `primary_color`
- **主题属性**：使用 camelCase，如 `primaryColor`

### 3. 使用规范

- **避免硬编码**：所有颜色、尺寸、间距等应通过主题系统访问
- **统一访问**：使用 `context.theme` 访问主题数据
- **主题切换**：使用 `CuThemeManager` 进行主题切换
- **持久化**：主题设置应通过 `CuThemeManager` 自动持久化

### 4. 维护规范

- **主题一致性**：确保所有主题品牌的属性完整且一致
- **文档同步**：主题变更应同步更新文档
- **测试覆盖**：确保主题在不同模式下的显示效果

## 相关文档

- [主文档](./index.md)
- [主题切换与持久化](./theme-switching.md)
- [扩展和自定义主题](./custom-theme.md)
- [API 使用及规范文档](../api/index.md)
