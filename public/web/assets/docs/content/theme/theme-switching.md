# 主题切换与持久化使用指南

`CurbUI` 框架提供了 `CuThemeManager` 类来管理主题的切换和持久化，使用 `ChangeNotifier` 实现主题变化的通知，并使用 `SharedPreferences` 实现主题设置的持久化。

## 主题模式

### 主题模式枚举

```dart
enum CuThemeMode {
  light,  // 浅色模式
  dark,   // 深色模式
  system, // 跟随系统
}
```

### 切换主题模式

```dart
import 'package:curb_ui/theme/index.dart';

// 切换到浅色模式
await CuThemeManager().setThemeMode(CuThemeMode.light);

// 切换到深色模式
await CuThemeManager().setThemeMode(CuThemeMode.dark);

// 切换到跟随系统
await CuThemeManager().setThemeMode(CuThemeMode.system);
```

## 主题颜色

### 主题颜色类型

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

### 切换主题颜色

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

## 主题持久化

### 实现原理

`CuThemeManager` 使用 `SharedPreferences` 来持久化主题设置：

1. 主题切换时，将主题模式和主题颜色保存到 `SharedPreferences`
2. 应用启动时，从 `SharedPreferences` 读取保存的主题设置
3. 如果没有保存的设置，使用默认值（跟随系统模式，默认主题颜色）

### 存储键名

```dart
static const String _themeModeKey = 'curb_theme_mode';
static const String _themeColorKey = 'curb_theme_color';
```

### 初始化主题

在应用启动时，调用 `CuThemeManager().init()` 方法初始化主题：

```dart
void main() async {
  // 初始化主题
  await CuThemeManager().init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: CuThemeManager().lightTheme,
      darkTheme: CuThemeManager().darkTheme,
      themeMode: CuThemeManager().materialThemeMode,
      home: HomePage(),
    );
  }
}
```

## 监听主题变化

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
        // 主题颜色切换
        CuText('主题颜色', level: CuTextLevel.titleSmall),
        Wrap(
          spacing: 12,
          children: CuThemeColorType.values.map((colorType) {
            return GestureDetector(
              onTap: () async {
                await CuThemeManager().setThemeColor(colorType);
              },
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: CuTheme.getThemeByColorType(colorType, Brightness.light).primaryColor,
                  borderRadius: BorderRadius.circular(20),
                  border: CuThemeManager().themeColor == colorType
                      ? Border.all(color: Colors.black, width: 2)
                      : null,
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
```

## 获取当前主题

### 获取主题模式

```dart
CuThemeMode currentMode = CuThemeManager().themeMode;
print('当前主题模式: ${currentMode.name}');
```

### 获取主题颜色

```dart
CuThemeColorType currentColor = CuThemeManager().themeColor;
print('当前主题颜色: ${currentColor.name}');
```

### 获取 Material 主题模式

```dart
ThemeMode materialMode = CuThemeManager().materialThemeMode;
print('Material 主题模式: ${materialMode.name}');
```

## 最佳实践

1. **在应用启动时初始化**：确保在 `runApp()` 之前调用 `CuThemeManager().init()`
2. **使用监听机制**：对于需要实时更新的 UI，添加主题变化监听器
3. **避免频繁切换**：主题切换会触发 UI 重建，避免频繁切换
4. **统一管理**：使用 `CuThemeManager` 统一管理主题，避免分散管理
5. **测试覆盖**：测试不同主题模式和主题颜色的组合

## 常见问题

### 1. 主题切换后 UI 没有更新

**原因**：可能是没有添加主题变化监听器或没有触发 UI 重建。

**解决方案**：
- 添加 `CuThemeManager().addListener()` 监听主题变化
- 在监听器中调用 `setState()` 触发 UI 重建

### 2. 主题设置没有持久化

**原因**：可能是没有调用 `CuThemeManager().init()` 初始化主题。

**解决方案**：
- 在应用启动时调用 `CuThemeManager().init()`
- 确保 `SharedPreferences` 权限正确

### 3. 主题切换卡顿

**原因**：主题切换会触发整个应用的 UI 重建，可能导致卡顿。

**解决方案**：
- 避免在主题切换时进行大量计算
- 考虑使用 `AnimatedBuilder` 优化动画效果
- 对于复杂页面，可以考虑局部更新而不是全局重建

## 相关文档

- [主文档](./index.md)
- [主题配置结构与管理规范](./config-structure.md)
- [CuThemeManager 和 CuThemeExtension 使用指南](./theme-manager.md)
- [API 使用及规范文档](../api/index.md)
