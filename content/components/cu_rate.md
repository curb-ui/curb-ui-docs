
# CuRate 评分组件 (Rate)

`CuRate` 是 `curb_ui` 库的评分交互组件，基于 `StatefulWidget` 实现。该组件封装了 `GestureDetector` 以支持点击和滑动评分，集成了 `ShaderMask` 实现半星效果，并提供了 `HapticFeedback` 触感反馈增强用户体验。

---

## 1. 基础用法

通过 `value` 属性设置当前分值，`count` 属性定义图标总数。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3),
    CuRate(value: 4, count: 10),
  ],
)
```
:::

## 2. 视觉配置

### 颜色配置
支持自定义选中和未选中的图标颜色。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3, color: CuTheme.of(context).primaryColor),
    CuRate(value: 3, color: CuTheme.of(context).successColor),
    CuRate(value: 3, color: CuTheme.of(context).warningColor),
  ],
)
```
:::

### 图标定制
通过 `icon` 和 `voidIcon` 属性自定义选中和未选中的图标。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3, icon: Icons.favorite, voidIcon: Icons.favorite_border),
    CuRate(value: 3, icon: Icons.thumb_up, voidIcon: Icons.thumb_up_off_alt),
  ],
)
```
:::

## 3. 交互状态

### 禁用状态
`disabled` 属性降低组件不透明度并拦截所有交互事件。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3),
    CuRate(value: 3, disabled: true),
  ],
)
```
:::

### 半星评分
通过 `allowHalf` 属性启用半星评分模式，支持更精细的评分操作。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3.5, allowHalf: true),
    CuRate(value: 2.5, allowHalf: true, count: 10),
  ],
)
```
:::

## 4. 尺寸与模式

### 尺寸规格
通过 `size` 属性自定义图标的大小，通过 `gutter` 属性调整图标间距。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRate(value: 3, size: 16, gutter: CuSpacing.extraSmall),
    CuRate(value: 3, size: 24, gutter: CuSpacing.small),
    CuRate(value: 3, size: 32, gutter: CuSpacing.medium),
  ],
)
```
:::

### 动态评分
通过 `onChange` 回调获取用户选择的分值，实现动态评分更新。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    double rating = 3;
    return Column(
      spacing: CuSpacing.medium,
      children: [
        CuText('当前评分: $rating'),
        CuRate(
          value: rating,
          onChange: (value) {
            setState(() {
              rating = value;
            });
          },
        ),
      ],
    );
  },
)
```
:::

## 5. 高级自定义

展示如何深度定制评分组件的外观和行为。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    // 完全自定义颜色和图标
    CuRate(
      value: 4,
      count: 7,
      icon: Icons.star,
      voidIcon: Icons.star_border,
      color: const Color(0xFFFF6B6B),
      voidColor: const Color(0xFFE0E0E0),
    ),
    // 大尺寸+半星模式
    CuRate(
      value: 3.5,
      count: 6,
      size: 40,
      gutter: CuSpacing.medium,
      allowHalf: true,
      color: const Color(0xFF9B59B6),
    ),
    // 禁用状态+自定义样式
    CuRate(
      value: 2,
      size: 32,
      icon: Icons.heart_broken,
      voidIcon: Icons.heart_broken_outlined,
      disabled: true,
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 属性 | 类型 | 默认值 | 数值规范 |
| :--- | :--- | :--- | :--- |
| `count` | `int` | `5` | 图标总数，正整数 |
| `size` | `double` | `24.0` | 图标尺寸 |
| `gutter` | `double` | `4.0` | 图标间距，参考 `CuSpacing.extraSmall` |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `count` | `int` | `5` | 图标总数 |
| `value` | `double` | `0` | 当前分值 |
| `size` | `double` | `24.0` | 图标大小 |
| `gutter` | `double` | `4.0` | 图标间距 |
| `allowHalf` | `bool` | `false` | 是否允许半星 |
| `disabled` | `bool` | `false` | 是否禁用 |
| `icon` | `IconData` | `Icons.star_rounded` | 选中图标 |
| `voidIcon` | `IconData` | `Icons.star_rounded` | 未选中图标 |
| `color` | `Color?` | — | 选中颜色（默认经典评分黄 `0xFFFFB400`） |
| `voidColor` | `Color?` | — | 未选中颜色 |
| `onChange` | `ValueChanged&lt;double&gt;?` | — | 分值变化回调 |

### 内部逻辑优先级
1. **状态同步**：组件通过 `_currentValue` 维护内部状态，在 `didUpdateWidget` 中监听外部 `value` 变化并同步更新。
2. **评分计算**：点击/滑动时通过 `localPosition.dx` 计算点击位置对应的分数，`allowHalf` 模式下精确到 0.5。
3. **渲染优先级**：
   - 分值 >= 1：全亮图标
   - 0 &lt; 分值 &lt; 1：半亮图标（使用 `ShaderMask` 实现精确裁剪）
   - 分值 &lt;= 0：全灭图标
4. **交互优先级**：`disabled` 状态下直接拦截所有事件，降低不透明度至 0.5。
5. **反馈机制**：分值变化时触发 `HapticFeedback.lightImpact()` 提供触感反馈。

---

&gt; **AI Prompt Context**: 关键词：`Rate`, `CuRate`, `评分`, `星级评分`。原则：优先使用 `value` 控制当前分值；半星模式需设置 `allowHalf: true`；禁用状态使用 `disabled` 标志位；严禁在外部包裹 `GestureDetector`。
