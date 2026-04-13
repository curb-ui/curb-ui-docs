# CuTabs 标签页组件 (Tabs)

`CuTabs` 是 `curb_ui` 库的内容切换组件，基于 `TabController` 和 `TabBar` 实现。该组件封装了标签切换的常用业务场景，支持水平/垂直布局、下划线/滑块指示、图标标签等多种展示模式。

---

## 1. 基础用法

通过 `tabList` 传入标签列表，支持文本和图标标签。

:::demo
```dart
CuTabs(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
    CuTabItem(label: '我的', value: 'profile'),
  ],
  onChange: (value, item) {},
)
```
:::

## 2. 视觉配置

### 指示器模式
支持 `showLine`（下划线）和 `showSlider`（滑块背景）两种指示器形态。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      showLine: true,
      onChange: (value, item) {},
    ),
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      showSlider: true,
      onChange: (value, item) {},
    ),
  ],
)
```
:::

### 垂直布局
通过 `vertical` 属性切换为垂直方向排列。

:::demo
```dart
Row(
  spacing: CuSpacing.large,
  children: [
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      vertical: true,
      onChange: (value, item) {},
    ),
  ],
)
```
:::

### 填充宽度
通过 `fill` 属性让标签自动填充可用宽度。

:::demo
```dart
CuTabs(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
    CuTabItem(label: '我的', value: 'profile'),
  ],
  fill: true,
  onChange: (value, item) {},
)
```
:::

## 3. 交互状态

### 禁用状态
`CuTabItem.disabled` 降低项不透明度并拦截点击事件。

:::demo
```dart
CuTabs(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message', disabled: true),
    CuTabItem(label: '我的', value: 'profile'),
  ],
  onChange: (value, item) {},
)
```
:::

## 4. 尺寸与模式

### 尺寸规格
支持通过 `height` 自定义标签高度。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
      ],
      height: CuSize.small,
      onChange: (value, item) {},
    ),
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
      ],
      height: CuSize.medium,
      onChange: (value, item) {},
    ),
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
      ],
      height: CuSize.large,
      onChange: (value, item) {},
    ),
  ],
)
```
:::

### 图标模式
支持 `IconData`、`String` 或 `Widget` 类型的图标，可单独或与文本组合显示。

:::demo
```dart
CuTabs(
  tabList: [
    CuTabItem(label: '首页', value: 'home', icon: Icons.home),
    CuTabItem(label: '发现', value: 'discover', icon: Icons.explore),
    CuTabItem(label: '消息', value: 'message', icon: Icons.message),
    CuTabItem(label: '我的', value: 'profile', icon: Icons.person),
  ],
  onChange: (value, item) {},
)
```
:::

## 5. 高级自定义

支持对颜色、圆角、字体等进行深度定制。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      activeColor: CuTheme.of(context).successColor,
      inactiveColor: CuTheme.of(context).textSecondaryColor,
      onChange: (value, item) {},
    ),
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
      ],
      showSlider: true,
      sliderColor: Colors.amber.withAlpha(CuAlpha.alpha20),
      borderRadius: CuRadius.largeRadius,
      onChange: (value, item) {},
    ),
    CuTabs(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
      ],
      fontSize: CuFontSize.bodyLarge,
      onChange: (value, item) {},
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 参数 | 数值参考 | 说明 |
| :--- | :--- | :--- |
| 默认高度 | `CuSize.small` | 标签默认高度 |
| 内边距 | `CuSpacing.mediumX` | 标签内容水平内边距 |
| 图标间距 | `CuSpacing.extraSmall` | 图标与文本间距 |
| 下划线宽度 | 2 | 指示器线条宽度 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `tabList` | `List<CuTabItem<T>>` | — | 标签列表，必填 |
| `controller` | `TabController?` | — | 外部 Tab 控制器 |
| `value` | `T?` | — | 初始选中值 |
| `onChange` | `Function(T, CuTabItem<T>)?` | — | 选中回调 |
| `tabAlignment` | `TabAlignment` | `TabAlignment.center` | 标签对齐方式 |
| `spacing` | `double` | 0 | 标签间距 |
| `activeColor` | `Color?` | — | 激活状态颜色 |
| `inactiveColor` | `Color?` | — | 未激活状态颜色 |
| `showLine` | `bool` | `true` | 是否显示下划线 |
| `showSlider` | `bool` | `false` | 是否显示滑块背景 |
| `sliderColor` | `Color?` | — | 滑块背景颜色 |
| `vertical` | `bool` | `false` | 是否垂直布局 |
| `height` | `double` | `CuSize.small` | 标签高度 |
| `fill` | `bool` | `false` | 是否填充宽度 |
| `fontSize` | `double?` | — | 字体大小 |
| `borderRadius` | `BorderRadius?` | — | 圆角半径 |

### CuTabItem 属性
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String` | — | 标签文本，必填 |
| `value` | `T` | — | 对应值，必填 |
| `icon` | `dynamic` | — | 图标（IconData/String/Widget） |
| `activeIcon` | `dynamic` | — | 激活状态图标 |
| `disabled` | `bool` | `false` | 是否禁用 |

### 内部逻辑优先级
1. **控制器优先级**：优先使用外部 `controller`，若无则自动创建内部控制器。
2. **初始值优先级**：`value` 参数优先于默认的第 0 项选中。
3. **禁用拦截逻辑**：点击禁用项时，自动回退到前一个有效项，不触发 `onChange`。
4. **指示器优先级**：`showSlider` 优先级高于 `showLine`，两者互斥。
5. **图标类型处理**：依次检查 `Widget`、`IconData`、`String` 类型进行渲染。
6. **布局模式**：`fill` 模式下强制 `isScrollable: false`，覆盖 `tabAlignment`。

---

> **AI Prompt Context**: 关键词：`Tabs`, `CuTabs`, `标签页`, `Tab切换`。原则：优先使用 `tabList` 传入 `CuTabItem` 列表；外部控制时传入自定义 `controller`；禁用项通过 `CuTabItem.disabled` 设置，避免外部拦截；滑块模式与下划线模式互斥。
