# CuButton 按钮组件 (Button)

`CuButton` 是 `curb_ui` 库的基础交互组件，基于 `StatefulWidget` 实现。该组件封装了 `AnimatedContainer` 以提供平滑的样式过渡，并集成了 `CuHover` 处理多端交互反馈。

---

## 1. 基础用法

通过 `type` 属性定义组件的视觉基调。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(label: 'Default', onTap: () {}),
    CuButton(label: 'Primary', type: CuColorType.primary, onTap: () {}),
    CuButton(label: 'Success', type: CuColorType.success, onTap: () {}),
    CuButton(label: 'Info', type: CuColorType.info, onTap: () {}),
    CuButton(label: 'Warning', type: CuColorType.warning, onTap: () {}),
    CuButton(label: 'Danger', type: CuColorType.danger, onTap: () {}),
  ],
)
```
:::

## 2. 视觉配置

### 变体模式
支持 `plain`（背景透明带边框）和 `text`（无背景无边框）两种视觉变体。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(label: 'Plain Primary', plain: true, type: CuColorType.primary, onTap: () {}),
    CuButton(label: 'Plain Success', plain: true, type: CuColorType.success, onTap: () {}),
    CuButton(label: 'Text Info', text: true, type: CuColorType.info, onTap: () {}),
  ],
)
```
:::

### 形状定制
通过 `rounded` 属性可将 `BorderRadius` 切换为完全圆角（Capsule Shape）。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(label: 'Standard', type: CuColorType.primary, onTap: () {}),
    CuButton(label: 'Rounded', rounded: true, type: CuColorType.primary, onTap: () {}),
  ],
)
```
:::

## 3. 交互状态

### 禁用与加载
`disabled` 属性降低组件不透明度并拦截事件；`loading` 属性自动渲染 `CircularProgressIndicator` 并同步拦截事件。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(label: 'Disabled', disabled: true, onTap: () {}),
    CuButton(label: 'Loading', loading: true, type: CuColorType.primary, onTap: () {}),
    CuButton(label: 'Custom Loading', loading: true, loadingColor: Colors.orange, onTap: () {}),
  ],
)
```
:::

## 4. 图标与尺寸规格

### 尺寸规格
支持 `small`、`medium`、`large` 三种预设尺寸，对应不同的盒约束与字体大小。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(label: 'Small', size: CuButtonSize.small, onTap: () {}),
    CuButton(label: 'Medium', size: CuButtonSize.medium, onTap: () {}),
    CuButton(label: 'Large', size: CuButtonSize.large, onTap: () {}),
  ],
)
```
:::

### 图标按钮
若仅定义 `icon` 而缺省 `label/child`，组件将进入 **Icon-Only 模式**：其 `width` 将强制等于 `height`。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuButton(icon: Icons.search, type: CuColorType.primary, onTap: () {}),
    CuButton(icon: Icons.add, rounded: true, type: CuColorType.success, onTap: () {}),
    CuButton(icon: Icons.delete, plain: true, type: CuColorType.danger, onTap: () {}),
  ],
)
```
:::

## 5. 高级自定义

支持对文本样式、图标主题以及布局容器进行深度覆盖。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    // 自定义文本与内容
    CuButton(
      onTap: () {},
      textStyle: const TextStyle(fontWeight: FontWeight.bold, letterSpacing: 2),
      child: const Text('CUSTOM CONTENT'),
    ),
    // 自定义图标主题
    CuButton(
      icon: Icons.star,
      label: 'Custom Icon Style',
      iconTheme: const IconThemeData(color: Colors.amber, size: 20),
      onTap: () {},
    ),
    // 布局适配
    Row(
      children: [
        Expanded(
          child: CuButton(type: CuColorType.primary, label: 'Fluid Button', onTap: () {}),
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
| 尺寸枚举 (`CuButtonSize`) | 高度规范 (`height`) | 水平内边距 (`padding`) | 字体大小 (`fontSize`) |
| :--- | :--- | :--- | :--- |
| `small` | `CuSize.small` | `CuSpacing.smallX` | `CuFontSize.bodySmall` |
| `medium` | `CuSize.medium` | `CuSpacing.mediumX` | `CuFontSize.bodyMedium` |
| `large` | `CuSize.large` | `CuSpacing.largeX` | `CuFontSize.bodyMedium` |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String?` | — | 文本内容 |
| `type` | `CuColorType` | `primary` | 色彩主题类型 |
| `size` | `CuButtonSize` | `medium` | 尺寸规格 |
| `icon` | `IconData?` | — | 图标数据 |
| `loading` | `bool` | `false` | 加载状态反馈 |
| `disabled` | `bool` | `false` | 交互禁用状态 |
| `plain` | `bool` | `false` | 启用幽灵按钮模式 |
| `text` | `bool` | `false` | 启用纯文字模式 |
| `rounded` | `bool` | `false` | 启用全圆角模式 |
| `child` | `Widget?` | — | 自定义内容 (覆盖 label) |
| `onTap` | `VoidCallback?` | — | 交互回调函数 |
| `backgroundColor` | `Color?` | — | 背景颜色覆盖 |
| `textStyle` | `TextStyle?` | — | 自定义文本样式覆盖 |
| `iconTheme` | `IconThemeData?` | — | 自定义图标样式覆盖 |

### 内部逻辑优先级
1. **内容优先级**：若 `child` 非空，则忽略 `label` 渲染。
2. **交互优先级**：内部 `_isDisabled` 状态由 `(disabled || loading)` 共同驱动。
3. **尺寸优先级**：通过 `width` 或 `height` 显式定义的数值优先级高于 `size` 预设。
4. **视觉规范**：Icon-Only 模式下强制正方形；Loading 环尺寸基于当前 `fontSize * 0.85` 动态计算。

---

> **AI Prompt Context**: 关键词：`Button`, `CuButton`, `按钮`。原则：优先使用 `label`；执行异步操作时必须绑定 `loading` 标志位以防止二次点击；严禁在外部包裹 `GestureDetector`。