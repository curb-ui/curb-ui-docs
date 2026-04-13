# CuProgressCircle 环形进度条 (Progress Circle)

`CuProgressCircle` 是 `curb_ui` 库的进度展示组件，基于 `StatelessWidget` 实现。该组件封装了 `TweenAnimationBuilder` 以提供平滑的进度动画，并集成了 `CuText` 处理进度文本展示，适用于加载状态、任务完成度等业务交互场景。

---

## 1. 基础用法

通过 `value` 属性定义进度值（范围 0.0 到 1.0）。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.25),
    CuProgressCircle(value: 0.5),
    CuProgressCircle(value: 0.75),
    CuProgressCircle(value: 1.0),
  ],
)
```
:::

## 2. 视觉配置

### 颜色定制

通过 `color` 属性自定义进度条颜色，`backgroundColor` 属性自定义背景轨道颜色。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, color: CuTheme.of(context).successColor),
    CuProgressCircle(value: 0.6, color: CuTheme.of(context).warningColor),
    CuProgressCircle(value: 0.6, color: CuTheme.of(context).dangerColor),
  ],
)
```
:::

### 轨道与进度定制

通过 `strokeWidth` 属性自定义进度条粗细。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, strokeWidth: 4),
    CuProgressCircle(value: 0.6, strokeWidth: 8),
    CuProgressCircle(value: 0.6, strokeWidth: 12),
  ],
)
```
:::

## 3. 交互状态

### 文本显示控制

通过 `showText` 属性控制是否显示进度文本。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, showText: true),
    CuProgressCircle(value: 0.6, showText: false),
  ],
)
```
:::

### 自定义文本

通过 `text` 属性自定义显示文本。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, text: '60'),
    CuProgressCircle(value: 0.6, text: '完成'),
  ],
)
```
:::

## 4. 尺寸与模式

### 尺寸规格

通过 `size` 属性自定义组件尺寸。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, size: 60),
    CuProgressCircle(value: 0.6, size: 100),
    CuProgressCircle(value: 0.6, size: 140),
  ],
)
```
:::

### 动画时长

通过 `duration` 属性自定义动画过渡时长。

:::demo
```dart
Row(
  spacing: 24,
  children: [
    CuProgressCircle(value: 0.6, duration: Duration(milliseconds: 100)),
    CuProgressCircle(value: 0.6, duration: Duration(milliseconds: 300)),
    CuProgressCircle(value: 0.6, duration: Duration(milliseconds: 600)),
  ],
)
```
:::

## 5. 高级自定义

支持对文本样式进行深度覆盖。

:::demo
```dart
Column(
  spacing: 24,
  children: [
    Row(
      spacing: 24,
      children: [
        CuProgressCircle(
          value: 0.6,
          textStyle: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: CuTheme.of(context).primaryColor,
          ),
        ),
        CuProgressCircle(
          value: 0.6,
          color: CuTheme.of(context).successColor,
          backgroundColor: CuTheme.of(context).bgColorLight,
          strokeWidth: 10,
          text: '60%',
          textStyle: TextStyle(
            fontSize: 16,
            color: CuTheme.of(context).successColor,
          ),
        ),
      ],
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考

| 属性 | 类型 | 推荐值 | 说明 |
| :--- | :--- | :--- | :--- |
| `size` | `double` | `60.0` / `100.0` / `140.0` | 组件整体尺寸 |
| `strokeWidth` | `double` | `4.0` / `8.0` / `12.0` | 进度条粗细 |

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `double` | — (required) | 进度值，范围 0.0 到 1.0 |
| `size` | `double` | `100.0` | 组件尺寸 |
| `strokeWidth` | `double` | `8.0` | 进度条粗细 |
| `color` | `Color?` | `theme.primaryColor` | 进度条颜色 |
| `backgroundColor` | `Color?` | `theme.bgColorPage` | 背景轨道颜色 |
| `showText` | `bool` | `true` | 是否显示进度文本 |
| `textStyle` | `TextStyle?` | — | 自定义文本样式 |
| `text` | `String?` | — | 自定义显示文本 |
| `duration` | `Duration` | `Duration(milliseconds: 300)` | 动画过渡时长 |

### 内部逻辑优先级

1. **进度值优先级**：`value` 必须在 0.0 到 1.0 之间，内部会通过 `clamp(0.0, 1.0)` 进行约束。
2. **内容优先级**：若 `text` 非空，则忽略默认的百分比文本渲染。
3. **样式优先级**：自定义 `color` 和 `backgroundColor` 优先级高于主题色。
4. **文本样式**：自定义 `textStyle` 优先级高于默认样式；默认文本大小基于 `size * 0.2` 动态计算。
5. **动画规范**：使用 `Curves.easeOutCubic` 缓动曲线，提供平滑自然的过渡效果。

---

> **AI Prompt Context**: 关键词：`Progress Circle`, `CuProgressCircle`, `环形进度条`。原则：优先使用 `value` 定义进度；`value` 必须在 0.0 到 1.0 之间；自定义文本时使用 `text` 属性覆盖默认百分比显示。
