# CuAppBar 导航栏 (AppBar)

`CuAppBar` 是 CurbUI 的核心导航组件，支持状态栏自动适配、滚动渐变动画（Immersive Mode）以及灵活的 Slot 自定义。相比原生组件，它提供了更简单的 `bool` 逻辑来控制视觉分支。

---

## 1. 基础用法

展示最常见的导航形态：标题居中或左对齐，并自动处理返回按钮逻辑。

:::demo
```dart
Column(
  children: [
    // 默认居左标题
    CuAppBar(title: '默认导航'),
    // 居中标题
    CuAppBar(title: '居中标题', centerMiddle: true),
  ],
)
```
:::

## 2. 视觉配置 (Visual Config)

### 区域自定义
通过 `leading`、`middle` 和 `actions` 实现对导航栏三个关键区域的深度定制。

:::demo
```dart
CuAppBar(
  leading: CuButton(icon: Icons.close, text: true, onTap: () {}),
  middle: CuTabs(
    tabList: [
      CuTabItem(label: '消息', value: '1'),
      CuTabItem(label: '电话', value: '2'),
    ],
  ),
  actions: [
    CuButton(icon: Icons.search, text: true, onTap: () {}),
  ],
)
```
:::

### 颜色与样式
支持显式覆盖背景颜色，默认适配主题 `bgColorContainer`。

:::demo
```dart
CuAppBar(
  title: '品牌色彩',
  backgroundColor: CuTheme.of(context).primaryColor,
)
```
:::

## 3. 交互状态 (Interaction States)

### 滚动渐变模式 (Auto-Background)
这是 `CuAppBar` 的进阶功能。通过绑定 `ScrollController`，背景颜色将随滚动深度产生 Alpha 渐变，常用于沉浸式详情页。

:::demo
```dart
// 1. 定义控制器
final scrollController = ScrollController();

// 2. 绑定组件
CuAppBar(
  title: '向下滚动查看效果',
  autoToBackground: true,
  scrollController: scrollController,
)
```
:::

### 返回拦截
通过 `onBackPressed` 属性，开发者可以自定义点击返回键时的业务逻辑（如二次确认）。

:::demo
```dart
CuAppBar(
  title: '保存确认',
  onBackPressed: () {
    CuToast.show('请先保存后再退出');
  },
)
```
:::

## 4. 尺寸与进阶模式 (Sizes & Patterns)

### 自动高度适配
组件内部通过 `Screen.statusBar` 自动获取系统状态栏高度，并叠加 `CuSize.appBarHeight`，无需在外部嵌套 `SafeArea`。

### 操作按钮组 (Actions)
`actions` 属性接收一个 Widget 列表，内部自动应用 `CuSpacing.small` 的水平间距。

:::demo
```dart
CuAppBar(
  title: '多操作场景',
  actions: [
    CuButton(icon: Icons.settings, text: true, onTap: () {}),
    CuButton(icon: Icons.share, text: true, onTap: () {}),
  ],
)
```
:::

## 5. 高级自定义 (Customization)

当 `middle` 被占用时，可以利用 `NavigationToolbar` 内部的 `middleSpacing` 来精细控制元素间距。

:::demo
```dart
CuAppBar(
  middle: Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      CuTag('Beta', type: CuColorType.warning),
      SizedBox(width: CuSpacing.small),
      CuText('实验室功能', level: CuTextLevel.titleMedium),
    ],
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射 (Technical Spec)

### 布局约束表
| 逻辑项 | 引用常量 | 数值/说明 |
| :--- | :--- | :--- |
| 工具栏高度 | `CuSize.appBarHeight` | 固定内容高度 |
| 总高度映射 | `preferredSize` | 状态栏 + `appBarHeight` |
| 水平内边距 | `CuSpacing.extraSmallX` | 容器左右 Padding |
| 按钮间距 | `CuSpacing.small` | Actions 内部 Row 间距 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 标题文本，映射为 `CuText` |
| `autoToBackground` | `bool` | `false` | 开启滚动透明度渐变 |
| `scrollController`| `ScrollController?`| — | 渐变关联的滚动控制器 |
| `backgroundColor` | `Color?` | — | 显式背景色，缺省随主题 |
| `centerMiddle` | `bool` | `false` | 标题是否强制居中显示 |
| `middle` | `Widget?` | — | 自定义中间区，优先级高于 `title` |
| `leading` | `Widget?` | — | 左侧组件，缺省根据路由状态渲染返回键 |
| `actions` | `List<Widget>` | `[]` | 右侧操作按钮列表 |
| `onBackPressed` | `VoidCallback?` | — | 拦截并处理返回逻辑 |
| `showBackButton` | `bool` | `true` | 是否显示返回按钮 |

### 核心逻辑优先级
1. **渲染分支**：若 `autoToBackground` 为 `true` 且 `scrollController` 有效，进入 `AnimatedBuilder` 渲染模式。
2. **内容优先级**：`middle` (Widget) > `title` (String)。
3. **返回键显示**：`leading` 显式指定 > `Navigator.canPop` 自动判断。
4. **渐变阈值**：Alpha 计算基于滚动偏移 `0~200` 线性映射。

---

> **AI Prompt Context**: 关键词：`AppBar`, `导航栏`, `CuAppBar`。调用原则：优先使用 `title`；若需滚动变色效果，必须成对配置 `autoToBackground: true` 与 `scrollController`。