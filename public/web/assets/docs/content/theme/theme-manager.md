# CuThemeManager 和 CuThemeExtension 使用指南

`CuThemeManager` 和 `CuThemeExtension` 是 `CurbUI` 框架中用于管理和访问主题的核心类。本文档将详细说明如何使用这两个类来管理和访问主题。

## CuThemeManager

`CuThemeManager` 是一个单例类，用于管理主题的切换和持久化。

### 初始化

在应用启动时，需要初始化 `CuThemeManager`：

```dart
import 'package:curb_ui/theme/index.dart';

void main() async {
  // 初始化主题
  await CuThemeManager().init();
  runApp(MyApp());
}
```

### 主题模式

#### 获取当前主题模式

```dart
CuThemeMode currentMode = CuThemeManager().themeMode;
print('当前主题模式: ${currentMode.name}');
```

#### 设置主题模式

```dart
// 切换到浅色模式
await CuThemeManager().setThemeMode(CuThemeMode.light);

// 切换到深色模式
await CuThemeManager().setThemeMode(CuThemeMode.dark);

// 切换到跟随系统
await CuThemeManager().setThemeMode(CuThemeMode.system);
```

### 主题颜色

#### 获取当前主题颜色

```dart
CuThemeColorType currentColor = CuThemeManager().themeColor;
print('当前主题颜色: ${currentColor.name}');
```

#### 设置主题颜色

```dart
// 切换到默认主题
await CuThemeManager().setThemeColor(CuThemeColorType.defaultColor);

// 切换到翠绿主题
await CuThemeManager().setThemeColor(CuThemeColorType.emerald);

// 切换到紫檀主题
await CuThemeManager().setThemeColor(CuThemeColorType.purple);

// 切换到金橙主题
await CuThemeManager().setThemeColor(CuThemeColorType.gold);

// 切换到樱桃主题
await CuThemeManager().setThemeColor(CuThemeColorType.cherry);

// 切换到薄荷主题
await CuThemeManager().setThemeColor(CuThemeColorType.mint);

// 切换到青灰主题
await CuThemeManager().setThemeColor(CuThemeColorType.gray);

// 切换到珊瑚主题
await CuThemeManager().setThemeColor(CuThemeColorType.coral);
```

### 主题获取

#### 获取 Material 主题模式

```dart
ThemeMode materialMode = CuThemeManager().materialThemeMode;
print('Material 主题模式: ${materialMode.name}');
```

#### 获取浅色主题

```dart
ThemeData lightTheme = CuThemeManager().lightTheme;
```

#### 获取深色主题

```dart
ThemeData darkTheme = CuThemeManager().darkTheme;
```

### 主题变化监听

`CuThemeManager` 继承自 `ChangeNotifier`，可以监听主题变化：

```dart
class ThemeSwitcher extends StatefulWidget {
  @override
  _ThemeSwitcherState createState() => _ThemeSwitcherState();
}

class _ThemeSwitcherState extends State<ThemeSwitcher> {
  @override
  void initState() {
    super.initState();
    // 监听主题变化
    CuThemeManager().addListener(_onThemeChanged);
  }

  void _onThemeChanged() {
    setState(() {
      // 主题变化，更新 UI
    });
  }

  @override
  void dispose() {
    // 移除监听器
    CuThemeManager().removeListener(_onThemeChanged);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 主题模式切换
        ListTile(
          title: Text('浅色模式'),
          leading: Radio<CuThemeMode>(
            value: CuThemeMode.light,
            groupValue: CuThemeManager().themeMode,
            onChanged: (value) async {
              if (value != null) {
                await CuThemeManager().setThemeMode(value);
              }
            },
          ),
        ),
        ListTile(
          title: Text('深色模式'),
          leading: Radio<CuThemeMode>(
            value: CuThemeMode.dark,
            groupValue: CuThemeManager().themeMode,
            onChanged: (value) async {
              if (value != null) {
                await CuThemeManager().setThemeMode(value);
              }
            },
          ),
        ),
        ListTile(
          title: Text('跟随系统'),
          leading: Radio<CuThemeMode>(
            value: CuThemeMode.system,
            groupValue: CuThemeManager().themeMode,
            onChanged: (value) async {
              if (value != null) {
                await CuThemeManager().setThemeMode(value);
              }
            },
          ),
        ),
      ],
    );
  }
}
```

## CuThemeExtension

`CuThemeExtension` 是一个 `ThemeExtension` 子类，用于在 Flutter 主题系统中提供统一的主题数据访问。

### 访问主题数据

通过上下文扩展方法，可以方便地访问主题数据：

```dart
// 访问主题数据
CuThemeData themeData = context.theme;

// 访问主题品牌
CuThemeBrand brand = context.theme.brand;

// 访问主题颜色
Color primaryColor = context.theme.brand.primaryColor;
Color bgColorPage = context.theme.brand.bgColorPage;

// 访问主题尺寸
double largeSize = context.theme.size.large;
double mediumSize = context.theme.size.medium;
double smallSize = context.theme.size.small;

// 访问主题间距
double largeSpacing = context.theme.spacing.large;
double mediumSpacing = context.theme.spacing.medium;
double smallSpacing = context.theme.spacing.small;

// 访问主题圆角
double largeRadius = context.theme.radius.large;
double mediumRadius = context.theme.radius.medium;
double smallRadius = context.theme.radius.small;

// 访问主题阴影
BoxShadow largeShadow = context.theme.shadow.large;
BoxShadow mediumShadow = context.theme.shadow.medium;
BoxShadow smallShadow = context.theme.shadow.small;

// 访问主题透明度
double highAlpha = context.theme.alpha.high;
double mediumAlpha = context.theme.alpha.medium;
double lowAlpha = context.theme.alpha.low;

// 访问主题字体
TextStyle titleLarge = context.theme.font.titleLarge;
TextStyle titleMedium = context.theme.font.titleMedium;
TextStyle titleSmall = context.theme.font.titleSmall;
TextStyle bodyLarge = context.theme.font.bodyLarge;
TextStyle bodyMedium = context.theme.font.bodyMedium;
TextStyle bodySmall = context.theme.font.bodySmall;
```

### 在组件中使用主题

```dart
class ThemedComponent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(context.theme.spacing.medium),
      margin: EdgeInsets.all(context.theme.spacing.small),
      decoration: BoxDecoration(
        color: context.theme.brand.bgColorContainer,
        borderRadius: BorderRadius.circular(context.theme.radius.medium),
        boxShadow: [context.theme.shadow.medium],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CuText(
            '标题',
            level: CuTextLevel.titleMedium,
            style: context.theme.font.titleMedium.copyWith(
              color: context.theme.brand.textPrimaryColor,
            ),
          ),
          SizedBox(height: context.theme.spacing.small),
          CuText(
            '这是一段文本，使用主题颜色和字体。',
            level: CuTextLevel.bodyMedium,
            style: context.theme.font.bodyMedium.copyWith(
              color: context.theme.brand.textSecondaryColor,
            ),
          ),
          SizedBox(height: context.theme.spacing.medium),
          CuButton(
            label: '按钮',
            onPressed: () {},
            color: context.theme.brand.primaryColor,
          ),
        ],
      ),
    );
  }
}
```

### 主题数据结构

`CuThemeData` 包含了主题的所有数据：

```dart
class CuThemeData {
  final CuThemeBrand brand;      // 主题品牌
  final Brightness brightness;    // 亮度
  final CuSize size;              // 尺寸
  final CuSpacing spacing;        // 间距
  final CuRadius radius;          // 圆角
  final CuShadow shadow;          // 阴影
  final CuAlpha alpha;            // 透明度
  final CuFont font;              // 字体

  const CuThemeData({
    required this.brand,
    required this.brightness,
    required this.size,
    required this.spacing,
    required this.radius,
    required this.shadow,
    required this.alpha,
    required this.font,
  });

  // 插值方法，用于主题动画
  CuThemeData lerp(CuThemeData other, double t) {
    // 实现插值逻辑
  }
}
```

## 最佳实践

1. **在应用启动时初始化**：确保在 `runApp()` 之前调用 `CuThemeManager().init()`
2. **使用上下文访问**：使用 `context.theme` 访问主题数据，而不是直接使用 `CuThemeManager()`
3. **监听主题变化**：对于需要实时更新的 UI，添加主题变化监听器
4. **统一管理**：使用 `CuThemeManager` 统一管理主题，避免分散管理
5. **测试覆盖**：测试不同主题模式和主题颜色的组合

## 常见问题

### 1. 主题数据访问失败

**原因**：可能是没有正确初始化 `CuThemeManager` 或没有在 `MaterialApp` 中设置主题。

**解决方案**：
- 确保在应用启动时调用 `CuThemeManager().init()`
- 确保在 `MaterialApp` 中设置 `theme`、`darkTheme` 和 `themeMode`

### 2. 主题切换后 UI 没有更新

**原因**：可能是没有添加主题变化监听器或没有触发 UI 重建。

**解决方案**：
- 添加 `CuThemeManager().addListener()` 监听主题变化
- 在监听器中调用 `setState()` 触发 UI 重建

### 3. 自定义主题不生效

**原因**：可能是没有正确注册或应用自定义主题。

**解决方案**：
- 确保正确创建 `CuThemeBrand` 对象
- 确保将自定义主题添加到主题颜色映射中
- 确保使用 `CuThemeManager` 切换到自定义主题

## 相关文档

- [主文档](./index.md)
- [主题配置结构与管理规范](./config-structure.md)
- [主题切换与持久化](./theme-switching.md)
- [API 使用及规范文档](../api/index.md)
