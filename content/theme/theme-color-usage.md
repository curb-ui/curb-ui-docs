# 在组件中使用主题颜色指南

本文档详细说明如何在组件中使用 `CurbUI` 框架的主题颜色，包括如何访问主题颜色、如何在不同场景中使用主题颜色，以及最佳实践。

## 访问主题颜色

### 通过上下文访问

在 Flutter 组件中，可以通过 `context.theme` 访问主题数据，包括主题颜色：

```dart
// 访问主题数据
CuThemeData themeData = context.theme;

// 访问主题品牌
CuThemeBrand brand = context.theme.brand;

// 访问主题颜色
Color primaryColor = context.theme.brand.primaryColor;
Color bgColorPage = context.theme.brand.bgColorPage;
Color textPrimaryColor = context.theme.brand.textPrimaryColor;
// 其他主题颜色...
```

### 直接访问颜色常量

也可以直接访问 `CuColor` 类中的颜色常量：

```dart
import 'package:curb_ui/theme/color/index.dart';

// 直接访问颜色常量
Color primaryColor = CuColor.primary;
Color secondaryColor = CuColor.secondary;
Color bgPage = CuColor.bgPage;
// 其他颜色常量...
```

## 在组件中使用主题颜色

### 文本颜色

```dart
CuText(
  '这是一段文本',
  level: CuTextLevel.bodyMedium,
  style: TextStyle(
    color: context.theme.brand.textPrimaryColor,
  ),
);
```

### 背景颜色

```dart
Container(
  width: 200,
  height: 200,
  decoration: BoxDecoration(
    color: context.theme.brand.bgColorContainer,
    borderRadius: BorderRadius.circular(8),
  ),
  child: CuText('容器内容'),
);
```

### 按钮颜色

```dart
CuButton(
  label: '按钮',
  onPressed: () {},
  color: context.theme.brand.primaryColor,
  textColor: Colors.white,
);
```

### 边框颜色

```dart
Container(
  width: 200,
  height: 200,
  decoration: BoxDecoration(
    border: Border.all(
      color: context.theme.brand.borderColor,
      width: 1,
    ),
    borderRadius: BorderRadius.circular(8),
  ),
  child: CuText('带边框的容器'),
);
```

### 卡片颜色

```dart
CuCard(
  child: Container(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CuText(
          '卡片标题',
          level: CuTextLevel.titleMedium,
          style: TextStyle(
            color: context.theme.brand.textPrimaryColor,
          ),
        ),
        SizedBox(height: 8),
        CuText(
          '卡片内容',
          level: CuTextLevel.bodyMedium,
          style: TextStyle(
            color: context.theme.brand.textSecondaryColor,
          ),
        ),
      ],
    ),
  ),
);
```

### 列表项颜色

```dart
CuListTile(
  title: CuText(
    '列表项标题',
    style: TextStyle(
      color: context.theme.brand.textPrimaryColor,
    ),
  ),
  subtitle: CuText(
    '列表项副标题',
    style: TextStyle(
      color: context.theme.brand.textSecondaryColor,
    ),
  ),
  leading: Icon(
    Icons.star,
    color: context.theme.brand.primaryColor,
  ),
  trailing: Icon(
    Icons.chevron_right,
    color: context.theme.brand.textSecondaryColor,
  ),
  onTap: () {},
);
```

### 输入框颜色

```dart
CuTextField(
  hintText: '请输入内容',
  style: TextStyle(
    color: context.theme.brand.textPrimaryColor,
  ),
  decoration: InputDecoration(
    hintStyle: TextStyle(
      color: context.theme.brand.textSecondaryColor,
    ),
    border: OutlineInputBorder(
      borderSide: BorderSide(
        color: context.theme.brand.borderColor,
      ),
    ),
    focusedBorder: OutlineInputBorder(
      borderSide: BorderSide(
        color: context.theme.brand.primaryColor,
        width: 2,
      ),
    ),
  ),
);
```

### 进度条颜色

```dart
CuProgressBar(
  value: 0.5,
  color: context.theme.brand.primaryColor,
  backgroundColor: context.theme.brand.borderColor,
);
```

### 徽章颜色

```dart
CuBadge(
  label: '新',
  color: context.theme.brand.primaryColor,
  textColor: Colors.white,
);
```

## 主题颜色使用场景

### 主要场景

1. **品牌标识**：使用主色调作为品牌标识的颜色
2. **交互元素**：使用主色调作为按钮、链接等交互元素的颜色
3. **状态指示**：使用不同颜色表示不同的状态（成功、警告、错误等）
4. **层次结构**：使用不同颜色表示不同的层次结构
5. **视觉引导**：使用颜色引导用户关注重要元素

### 颜色搭配建议

1. **主色调 + 辅助色**：主色调用于主要交互元素，辅助色用于次要交互元素
2. **背景色 + 文本色**：确保背景色和文本色之间有足够的对比度
3. **中性色**：使用中性色（如灰色）作为背景和边框
4. **强调色**：使用强调色突出重要信息

## 主题颜色响应式

### 浅色和深色模式

`CurbUI` 支持浅色和深色模式，主题颜色会根据当前模式自动调整：

```dart
// 在浅色模式下，primaryColor 为 #007AFF
// 在深色模式下，primaryColor 为 #0A84FF
Color primaryColor = context.theme.brand.primaryColor;
```

### 主题切换

当主题切换时，组件会自动更新颜色：

```dart
class ThemedComponent extends StatefulWidget {
  @override
  _ThemedComponentState createState() => _ThemedComponentState();
}

class _ThemedComponentState extends State<ThemedComponent> {
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
    return Container(
      color: context.theme.brand.bgColorContainer,
      child: CuText(
        '主题切换时，此文本颜色会自动更新',
        style: TextStyle(
          color: context.theme.brand.textPrimaryColor,
        ),
      ),
    );
  }
}
```

## 最佳实践

1. **使用主题系统**：优先使用 `context.theme` 访问主题颜色，而不是硬编码颜色
2. **保持一致性**：在整个应用中保持颜色使用的一致性
3. **考虑对比度**：确保文本和背景之间有足够的对比度
4. **测试不同模式**：测试主题在浅色和深色模式下的显示效果
5. **避免过度使用**：避免在一个组件中使用过多的颜色
6. **使用语义化颜色**：使用语义化的颜色名称，如 `primaryColor`、`textPrimaryColor` 等

## 常见问题

### 1. 主题颜色不更新

**原因**：可能是没有添加主题变化监听器或没有触发 UI 重建。

**解决方案**：
- 添加 `CuThemeManager().addListener()` 监听主题变化
- 在监听器中调用 `setState()` 触发 UI 重建

### 2. 颜色对比度不足

**原因**：可能是选择的颜色组合对比度不足。

**解决方案**：
- 使用主题系统提供的颜色组合
- 确保文本和背景之间的对比度至少为 4.5:1

### 3. 颜色使用不一致

**原因**：可能是在不同组件中使用了不同的颜色来源。

**解决方案**：
- 统一使用 `context.theme` 访问主题颜色
- 建立颜色使用规范，确保整个应用的颜色使用一致

## 相关文档

- [主文档](./index.md)
- [主题配置结构与管理规范](./config-structure.md)
- [主题颜色视觉预览](./color-preview.md)
- [API 使用及规范文档](../api/index.md)
