
# CuTag 标签组件 (Tag)

`CuTag` 是 `curb_ui` 库的标签展示组件，基于 `StatelessWidget` 实现。该组件封装了语义化配色系统，提供轻量级的状态标记功能，并支持可关闭的交互场景，适用于分类、筛选结果展示等业务场景。

---

## 1. 基础用法

通过 `type` 属性定义组件的视觉基调。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuTag(label: 'Default'),
    CuTag(label: 'Primary', type: CuColorType.primary),
    CuTag(label: 'Success', type: CuColorType.success),
    CuTag(label: 'Info', type: CuColorType.info),
    CuTag(label: 'Warning', type: CuColorType.warning),
    CuTag(label: 'Danger', type: CuColorType.error),
  ],
)
```
:::

## 2. 视觉配置

### 自定义颜色
支持通过 `color` 和 `backgroundColor` 属性覆盖默认的文本颜色和背景颜色。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuTag(label: '自定义颜色', color: Colors.purple),
    CuTag(
      label: '自定义背景',
      backgroundColor: Colors.amber.shade100,
      color: Colors.amber.shade800,
    ),
  ],
)
```
:::

### 形状定制
通过 `borderRadius` 属性可自定义标签的圆角大小。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuTag(label: '默认圆角'),
    CuTag(
      label: '小圆角',
      borderRadius: BorderRadius.circular(4),
    ),
    CuTag(
      label: '大圆角',
      borderRadius: BorderRadius.circular(16),
    ),
  ],
)
```
:::

### 内边距定制
通过 `padding` 属性可自定义标签的内边距。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuTag(label: '默认内边距'),
    CuTag(
      label: '紧凑内边距',
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    ),
    CuTag(
      label: '宽松内边距',
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),
  ],
)
```
:::

## 3. 交互状态

### 可关闭模式
`closable` 属性配合 `onCuose` 回调可实现标签的可关闭功能，组件将在文本后渲染关闭图标并拦截点击事件。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuTag(
      label: '可关闭标签',
      closable: true,
      onCuose: () {},
    ),
    CuTag(
      label: 'Primary 可关闭',
      type: CuColorType.primary,
      closable: true,
      onCuose: () {},
    ),
    CuTag(
      label: 'Success 可关闭',
      type: CuColorType.success,
      closable: true,
      onCuose: () {},
    ),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 可关闭标签组
通过 `Wrap` 组件配合可关闭模式可实现动态标签管理。

:::demo
```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: [
    CuTag(label: '标签1', closable: true, onCuose: () {}),
    CuTag(label: '标签2', closable: true, onCuose: () {}),
    CuTag(label: '标签3', closable: true, onCuose: () {}),
    CuTag(label: '标签4', closable: true, onCuose: () {}),
  ],
)
```
:::

## 5. 高级自定义

支持对颜色、圆角、内边距等样式进行深度覆盖，满足复杂业务场景需求。

:::demo
```dart
Column(
  spacing: 12,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    // 完全自定义样式
    Row(
      spacing: 12,
      children: [
        CuTag(
          label: '深度定制',
          color: Colors.white,
          backgroundColor: Colors.teal,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          borderRadius: BorderRadius.circular(20),
        ),
        CuTag(
          label: '可关闭 + 自定义',
          type: CuColorType.primary,
          closable: true,
          onCuose: () {},
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
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
| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `padding` | `EdgeInsets.symmetric(horizontal: 8, vertical: 4)` | 内边距 |
| `borderRadius` | `CuRadius.smallRadius` | 圆角半径 |
| `fontSize` | `CuFontSize.bodySmall` | 字体大小 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `type` | `CuColorType` | `primary` | 色彩主题类型 |
| `label` | `String?` | — | 标签文本内容 |
| `color` | `Color?` | — | 文本颜色覆盖 |
| `backgroundColor` | `Color?` | — | 背景颜色覆盖 |
| `closable` | `bool` | `false` | 是否可关闭 |
| `onCuose` | `VoidCallback?` | — | 关闭回调函数 |
| `padding` | `EdgeInsets?` | — | 内边距覆盖 |
| `borderRadius` | `BorderRadius?` | — | 圆角覆盖 |

### 内部逻辑优先级
1. **颜色优先级**：若 `color` 非空，则忽略 `type` 派生的文本颜色。
2. **背景色优先级**：若 `backgroundColor` 非空，则忽略 `type` 派生的背景颜色（默认透明度为 `CuAlpha.alpha10`）。
3. **布局优先级**：通过 `padding` 或 `borderRadius` 显式定义的数值优先级高于默认预设。
4. **关闭按钮渲染**：仅当 `closable` 为 `true` **且** `onCuose` 非空时，才渲染关闭图标并绑定点击事件。

---

&gt; **AI Prompt Context**: 关键词：`Tag`, `CuTag`, `标签`。原则：优先使用 `text`；实现可关闭功能时必须同时设置 `closable` 和 `onCuose`；背景色默认透明度为 `CuAlpha.alpha10`。

