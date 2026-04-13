
&lt;!-- 文档存放路径: e:\TravelFlutter\cool-unix-main\curb_ui\doc\cu_tabbar.md --&gt;

# CuTabbar 底部导航栏组件 (Tabbar)

`CuTabbar` 是 `curb_ui` 库的底部导航栏组件，基于 `CuTabs` 封装实现。该组件提供了 `CuTabbar` 和 `CuThreeTabbar` 两种实现，分别用于标准底部导航和特殊设计的三标签导航，支持胶囊模式、垂直布局、自定义样式等多种配置。

---

## 1. 基础用法

通过 `tabList` 传入标签列表，支持文本和图标标签组合。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
    CuTabItem(label: '我的', value: 'profile'),
  ],
  onChange: (value, index, item) {},
)
```
:::

## 2. 视觉配置

### 胶囊模式
通过 `capsule` 属性启用胶囊式滑块指示样式。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
  ],
  capsule: true,
  onChange: (value, index, item) {},
)
```
:::

### 圆角定制
通过 `borderRadius` 自定义导航栏的圆角样式。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
  ],
  borderRadius: CuRadius.roundedRadius,
  onChange: (value, index, item) {},
)
```
:::

### 垂直布局
通过 `vertical` 属性切换标签为垂直排列（图标在上，文本在下）。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home', icon: Icons.home),
    CuTabItem(label: '发现', value: 'discover', icon: Icons.explore),
    CuTabItem(label: '消息', value: 'message', icon: Icons.message),
  ],
  vertical: true,
  onChange: (value, index, item) {},
)
```
:::

## 3. 交互状态

### 初始索引
通过 `initialIndex` 设置默认选中的标签项。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
  ],
  initialIndex: 1,
  onChange: (value, index, item) {},
)
```
:::

### 禁用项
通过 `CuTabItem.disabled` 禁用特定标签项，降低不透明度并拦截点击事件。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message', disabled: true),
    CuTabItem(label: '我的', value: 'profile'),
  ],
  onChange: (value, index, item) {},
)
```
:::

## 4. 特殊模式与尺寸

### CuThreeTabbar 特殊模式
`CuThreeTabbar` 提供了特殊设计的三标签导航栏，带有渐变背景和浮动按钮样式。

:::demo
```dart
CuThreeTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home', icon: Icons.home),
    CuTabItem(label: '发现', value: 'discover', icon: Icons.explore),
    CuTabItem(label: '我的', value: 'profile', icon: Icons.person),
  ],
  initialIndex: 0,
  onChange: (value, index, item) {},
)
```
:::

### 间距定制
通过 `spacing` 属性调整标签项之间的间距。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    CuTabbar&lt;String&gt;(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      capsule: true,
      spacing: 0,
      onChange: (value, index, item) {},
    ),
    CuTabbar&lt;String&gt;(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      capsule: true,
      spacing: 10,
      onChange: (value, index, item) {},
    ),
  ],
)
```
:::

### 字体大小
通过 `fontSize` 自定义标签文本的字体大小。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home'),
    CuTabItem(label: '发现', value: 'discover'),
    CuTabItem(label: '消息', value: 'message'),
  ],
  fontSize: CuFontSize.bodyMedium,
  onChange: (value, index, item) {},
)
```
:::

## 5. 高级自定义

### 颜色定制
支持自定义激活颜色、背景颜色和指示器颜色。

:::demo
```dart
Column(
  spacing: CuSpacing.large,
  children: [
    CuTabbar&lt;String&gt;(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      activeColor: CuTheme.of(context).successColor,
      indicatorColor: CuTheme.of(context).textSecondaryColor,
      backgroundColor: CuTheme.of(context).bgColorPage,
      onChange: (value, index, item) {},
    ),
    CuTabbar&lt;String&gt;(
      tabList: [
        CuTabItem(label: '首页', value: 'home'),
        CuTabItem(label: '发现', value: 'discover'),
        CuTabItem(label: '消息', value: 'message'),
      ],
      capsule: true,
      activeColor: CuTheme.of(context).warningColor,
      onChange: (value, index, item) {},
    ),
  ],
)
```
:::

### 图标标签
支持 `IconData`、`String` 或 `Widget` 类型的图标，与文本组合显示。

:::demo
```dart
CuTabbar&lt;String&gt;(
  tabList: [
    CuTabItem(label: '首页', value: 'home', icon: Icons.home),
    CuTabItem(label: '发现', value: 'discover', icon: Icons.explore),
    CuTabItem(label: '消息', value: 'message', icon: Icons.message),
    CuTabItem(label: '我的', value: 'profile', icon: Icons.person),
  ],
  vertical: true,
  onChange: (value, index, item) {},
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 参数 | 数值参考 | 说明 |
| :--- | :--- | :--- |
| 默认高度 | `Screen.tabBarHeight` | 导航栏默认高度 |
| 固定标签高度 | 48 | 单个标签项高度 |
| 默认内边距 | 垂直: 10, 水平: 10 | 标准模式内边距 |
| 胶囊模式内边距 | 垂直: spacing, 水平: 0 | 胶囊模式内边距 |
| 底部安全区 | `Screen.bottomBar` | 适配底部安全区域 |

### CuTabbar 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `tabList` | `List&lt;CuTabItem&lt;T&gt;&gt;` | — | 标签列表，必填 |
| `onChange` | `Function(T, int, CuTabItem&lt;T&gt;)?` | — | 选中回调，返回值、索引和标签项 |
| `initialIndex` | `int?` | 0 | 初始选中索引 |
| `borderRadius` | `BorderRadius?` | — | 导航栏圆角 |
| `backgroundColor` | `Color?` | — | 背景颜色 |
| `indicatorColor` | `Color?` | — | 未激活状态颜色 |
| `activeColor` | `Color?` | — | 激活状态颜色 |
| `vertical` | `bool` | `true` | 是否垂直布局（图标在上） |
| `fontSize` | `double` | `CuFontSize.captionSmall` | 字体大小 |
| `spacing` | `double` | 0 | 标签间距 |
| `capsule` | `bool` | `false` | 是否启用胶囊模式 |

### CuThreeTabbar 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `tabList` | `List&lt;CuTabItem&lt;T&gt;&gt;` | — | 标签列表，必填，建议不超过 3 项 |
| `onChange` | `Function(T, int, CuTabItem&lt;T&gt;)?` | — | 选中回调 |
| `initialIndex` | `int?` | 0 | 初始选中索引 |

### CuTabItem 属性
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String` | — | 标签文本，必填 |
| `value` | `T` | — | 对应值，必填 |
| `icon` | `dynamic` | — | 图标（IconData/String/Widget） |
| `activeIcon` | `dynamic` | — | 激活状态图标 |
| `disabled` | `bool` | `false` | 是否禁用 |

### 内部逻辑优先级
1. **布局模式优先级**：`capsule` 模式优先，启用时自动禁用 `vertical` 并启用滑块指示。
2. **安全区适配**：自动添加 `Screen.bottomBar` 底部内边距，适配全面屏设备。
3. **初始索引逻辑**：`initialIndex` 默认为 0，超出范围时自动回退到 0。
4. **颜色继承**：`activeColor` 优先使用自定义值，否则继承 `CuTheme.primaryColor`。
5. **内部 CuTabs 配置**：标准模式下 `vertical = !capsule &amp;&amp; vertical`，胶囊模式下 `showSlider = true`。
6. **CuThreeTabbar 约束**：标签项强制为正方形 48x48，使用渐变背景，最大宽度 300。

---

&gt; **AI Prompt Context**: 关键词：`Tabbar`, `CuTabbar`, `CuThreeTabbar`, `底部导航`, `标签栏`。原则：优先使用 `tabList` 传入 `CuTabItem` 列表；`CuThreeTabbar` 专门用于三标签特殊设计场景；胶囊模式通过 `capsule` 启用；垂直布局与胶囊模式互斥；自动适配底部安全区无需额外处理。
