# 扩展和自定义主题指南

`CurbUI` 框架提供了灵活的主题扩展和自定义能力，允许开发者根据自己的需求定制主题。本文档将介绍如何扩展和自定义 CurbUI 主题。

## 主题扩展机制

### CuThemeExtension

`CuThemeExtension` 是一个 `ThemeExtension` 子类，用于在 Flutter 主题系统中提供统一的主题数据访问：

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

## 自定义主题品牌

### 创建自定义主题品牌

要创建自定义主题品牌，需要定义一个 `CuThemeBrand` 对象：

```dart
import 'package:curb_ui/theme/color/index.dart';
import 'package:curb_ui/theme/list/index.dart';

// 创建自定义主题品牌
final CuThemeBrand customTheme = CuThemeBrand(
  name: '自定义主题',
  primaryColor: Color(0xFF1E88E5), // 自定义主色调
  primaryColorDark: Color(0xFF1565C0), // 自定义深色主色调
  secondaryColor: Color(0xFF4CAF50), // 自定义辅助色
  bgColorPage: Color(0xFFF5F5F5), // 自定义页面背景色
  bgColorContainer: Color(0xFFFFFFFF), // 自定义容器背景色
  textPrimaryColor: Color(0xFF212121), // 自定义主要文本色
  textSecondaryColor: Color(0xFF757575), // 自定义次要文本色
  borderColor: Color(0xFFE0E0E0), // 自定义边框颜色
  // 其他颜色...
);
```

### 注册自定义主题

要使用自定义主题，需要将其注册到主题颜色映射中：

```dart
// 扩展主题颜色类型枚举
enum CustomThemeColorType {
  custom, // 自定义主题
}

// 扩展主题颜色映射
Map<dynamic, CuThemeBrand> customThemeColorMap = {
  ...themeColorMap, // 包含默认主题
  CustomThemeColorType.custom: customTheme, // 添加自定义主题
};

// 使用自定义主题
await CuThemeManager().setThemeColor(CustomThemeColorType.custom);
```

## 自定义主题数据

### 自定义 CuThemeData

`CuThemeData` 包含了主题的所有数据，包括颜色、尺寸、间距等：

```dart
import 'package:curb_ui/theme/index.dart';

// 创建自定义主题数据
CuThemeData customThemeData = CuThemeData(
  brand: customTheme, // 使用自定义主题品牌
  brightness: Brightness.light, // 亮度
  size: CuSize(), // 尺寸
  spacing: CuSpacing(), // 间距
  radius: CuRadius(), // 圆角
  shadow: CuShadow(), // 阴影
  alpha: CuAlpha(), // 透明度
  font: CuFont(), // 字体
);

// 创建自定义主题扩展
CuThemeExtension customThemeExtension = CuThemeExtension(customThemeData);

// 在 MaterialApp 中使用
MaterialApp(
  theme: ThemeData(
    extensions: [customThemeExtension],
  ),
  home: HomePage(),
);
```

## 扩展主题常量

### 扩展颜色常量

可以扩展 `CuColor` 类来添加自定义颜色：

```dart
class CustomColor {
  // 自定义颜色
  static const Color customPrimary = Color(0xFF1E88E5);
  static const Color customSecondary = Color(0xFF4CAF50);
  static const Color customAccent = Color(0xFFFFC107);
  
  // 继承默认颜色
  static const Color primary = CuColor.primary;
  static const Color secondary = CuColor.secondary;
  // 其他默认颜色...
}
```

### 扩展尺寸常量

可以扩展 `CuSize` 类来添加自定义尺寸：

```dart
class CustomSize extends CuSize {
  // 自定义尺寸
  static const double customExtraLarge = 48.0;
  static const double customExtraSmall = 8.0;
  
  // 重写默认尺寸
  @override
  double get large => 32.0;
  @override
  double get medium => 24.0;
  @override
  double get small => 16.0;
}
```

## 主题继承与覆盖

### 主题继承

可以通过继承现有主题来创建新主题：

```dart
// 基于默认主题创建新主题
final CuThemeBrand extendedTheme = CuThemeBrand(
  name: '扩展主题',
  primaryColor: CuColor.primary.withAlpha(200), // 调整默认主色调的透明度
  primaryColorDark: CuColor.primaryDark.withAlpha(200),
  secondaryColor: CuColor.secondary,
  bgColorPage: CuColor.bgPage,
  bgColorContainer: CuColor.bgContainer,
  textPrimaryColor: CuColor.textPrimary,
  textSecondaryColor: CuColor.textSecondary,
  borderColor: CuColor.border,
  // 其他颜色...
);
```

### 主题覆盖

可以在组件级别覆盖主题：

```dart
// 在组件中覆盖主题
Container(
  color: context.theme.brand.bgColorContainer,
  child: CuButton(
    label: '按钮',
    // 覆盖按钮主题
    style: ButtonStyle(
      backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
    ),
  ),
);
```

## 主题变体

### 浅色和深色模式

`CurbUI` 支持浅色和深色模式，可以为不同模式定义不同的主题：

```dart
// 浅色模式主题
final CuThemeBrand lightTheme = CuThemeBrand(
  name: '浅色主题',
  primaryColor: Color(0xFF1E88E5),
  bgColorPage: Color(0xFFF5F5F5),
  textPrimaryColor: Color(0xFF212121),
  // 其他颜色...
);

// 深色模式主题
final CuThemeBrand darkTheme = CuThemeBrand(
  name: '深色主题',
  primaryColor: Color(0xFF90CAF9),
  bgColorPage: Color(0xFF121212),
  textPrimaryColor: Color(0xFFFFFFFF),
  // 其他颜色...
);
```

### 主题模式切换

使用 `CuThemeManager` 切换主题模式：

```dart
// 切换到浅色模式
await CuThemeManager().setThemeMode(CuThemeMode.light);

// 切换到深色模式
await CuThemeManager().setThemeMode(CuThemeMode.dark);

// 切换到跟随系统
await CuThemeManager().setThemeMode(CuThemeMode.system);
```

## 最佳实践

1. **保持一致性**：自定义主题应保持与默认主题的一致性，确保组件显示正常
2. **渐进式扩展**：优先扩展现有主题，而不是完全重写
3. **文档化**：为自定义主题添加文档，说明设计意图和使用方法
4. **测试覆盖**：测试自定义主题在不同模式下的显示效果
5. **性能考虑**：避免创建过多的主题变体，影响性能

## 常见问题

### 1. 自定义主题不生效

**原因**：可能是没有正确注册或应用自定义主题。

**解决方案**：
- 确保正确创建 `CuThemeBrand` 对象
- 确保将自定义主题添加到主题颜色映射中
- 确保使用 `CuThemeManager` 切换到自定义主题

### 2. 主题切换时组件没有更新

**原因**：可能是没有添加主题变化监听器或没有触发 UI 重建。

**解决方案**：
- 添加 `CuThemeManager().addListener()` 监听主题变化
- 在监听器中调用 `setState()` 触发 UI 重建

### 3. 自定义主题与默认主题冲突

**原因**：可能是自定义主题的属性与默认主题不兼容。

**解决方案**：
- 确保自定义主题包含所有必要的属性
- 参考默认主题的结构和属性
- 测试自定义主题在所有组件中的显示效果

## 相关文档

- [主文档](./index.md)
- [主题配置结构与管理规范](./config-structure.md)
- [主题切换与持久化](./theme-switching.md)
- [API 使用及规范文档](../api/index.md)
