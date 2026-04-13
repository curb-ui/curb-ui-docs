# CuDivider 分割线 (Divider)

用于分隔内容区域的线条。支持水平与垂直两种模式，并自动适配 CurbUI 的边框色彩规范。

---

## 1. 基础用法
在列表或内容块之间插入水平分割线。默认带有 `CuSpacing.medium` 的水平缩进。

:::demo
```dart
Column(
  children: [
    CuText('上方内容'),
    CuDivider(),
    CuText('下方内容'),
  ],
)
```
:::

## 2. 垂直模式 (Vertical)
在 `Row` 或水平布局中使用。**注意：** 垂直分割线需要父容器具有明确的高度。

:::demo
```dart
IntrinsicHeight(
  child: Row(
    children: [
      CuText('选项 A'),
      CuDivider(isVertical: true),
      CuText('选项 B'),
      CuDivider(isVertical: true, indent: 4, endIndent: 4),
      CuText('选项 C'),
    ],
  ),
)
```
:::

## 3. 自定义样式 (Customization)
通过调整 `thickness`（厚度）和 `color` 实现特殊视觉效果。

:::demo
```dart
CuDivider(
  thickness: 4,
  color: theme.primaryColor.withAlpha(50),
  indent: 0,
  endIndent: 0,
)
```
:::

---

## 4. 技术规范与逻辑映射 (Technical Spec)

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `isVertical` | `bool` | `false` | 是否切换为垂直分割线 |
| `thickness` | `double` | `1.0` | 线条本身的粗细 |
| `color` | `Color?` | `borderColorLight` | 颜色，建议保持默认以维持 UI 一致性 |
| `indent` | `double` | — | 起点缩进。水平默认 `medium`，垂直默认 `0` |
| `height/width` | `double` | `1.0` | 容器占据的感知空间高度/宽度 |

> **AI Prompt Context**: 关键词：`Divider`, `CuDivider`, `分隔线`, `垂直分隔线`。原则：水平分隔线优先使用默认配置；垂直分隔线必须设置 `isVertical: true`；在卡片、列表等容器中使用时，推荐将 `indent` 和 `endIndent` 设为 `0`。