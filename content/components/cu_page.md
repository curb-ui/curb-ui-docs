
# 页面 (Page)

`CuPage` 是 `curb_ui` 库的基础页面容器组件，基于 Flutter 的 `Scaffold` 实现，集成了 `CuAppBar` 和 `CuRefresh` 等功能，解决了移动端页面布局的标准交互场景。

---

## 1. 基础用法

通过 `title` 和 `body` 属性展示页面的核心布局。

:::demo
```dart
CuPage(
  title: "基础页面",
  body: Column(
    spacing: CuSpacing.medium,
    children: [
      CuText("这是一个基础页面"),
    ],
  ),
)
```
:::

---

## 2. 视觉配置 (Visual Config)

### 背景色定制

通过 `backgroundColor` 属性自定义页面背景色。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    Expanded(
      child: CuCard(
        child: CuText("默认背景色"),
      ),
    ),
    Expanded(
      child: CuCard(
        backgroundColor: CuTheme.of(context).bgColorSecondary,
        child: CuText("自定义背景色"),
      ),
    ),
  ],
)
```
:::

### 隐藏 AppBar

通过 `hideAppBar` 属性隐藏顶部导航栏。

:::demo
```dart
CuPage(
  hideAppBar: true,
  body: Center(
    child: CuText("无 AppBar 页面"),
  ),
)
```
:::

### AppBar 自动背景

通过 `appBarAutoToBackground` 实现滚动时 AppBar 背景色自动变化。

:::demo
```dart
CuPage(
  title: "滚动渐变",
  appBarAutoToBackground: true,
  body: Column(
    spacing: CuSpacing.medium,
    children: List.generate(20, (index) => CuText("内容 $index")),
  ),
)
```
:::

---

## 3. 交互状态 (Interaction States)

### 自定义滚动控制器

通过 `scrollController` 自定义页面滚动控制逻辑。

:::demo
```dart
class DemoState extends State&lt;Demo&gt; {
  final _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return CuPage(
      title: "自定义滚动",
      scrollController: _scrollController,
      body: Column(
        spacing: CuSpacing.medium,
        children: [
          CuText("使用自定义 ScrollController"),
        ],
      ),
    );
  }
}
```
:::

### 禁用自动滚动

通过 `autoScroll: false` 禁止自动包裹滚动视图。

:::demo
```dart
CuPage(
  title: "固定布局",
  autoScroll: false,
  body: Center(
    child: CuText("禁止自动滚动"),
  ),
)
```
:::

---

## 4. 特殊模式与尺寸 (Patterns &amp; Sizes)

### 页面内边距

通过 `padding` 属性自定义页面内边距。

:::demo
```dart
Row(
  spacing: CuSpacing.small,
  children: [
    CuCard(
      padding: CuSpacing.smallAll,
      child: CuText("小内边距"),
    ),
    CuCard(
      padding: CuSpacing.mediumAll,
      child: CuText("中等内边距"),
    ),
    CuCard(
      padding: CuSpacing.largeAll,
      child: CuText("大内边距"),
    ),
  ],
)
```
:::

### 自定义 AppBar

通过 `appBar` 属性传入自定义的 `CuAppBar` 组件。

:::demo
```dart
CuPage(
  appBar: CuAppBar(
    title: "自定义 AppBar",
    leading: CuIcon(CuIconFont.back),
    actions: [
      CuIcon(CuIconFont.more),
    ],
  ),
  body: Center(
    child: CuText("使用自定义 AppBar"),
  ),
)
```
:::

---

## 5. 高级自定义 (Advanced Customization)

### 使用 bodyBuilder

通过 `bodyBuilder` 延迟构建页面内容，获得 `BuildContext`。

:::demo
```dart
CuPage(
  title: "延迟构建",
  bodyBuilder: (context) {
    final theme = CuTheme.of(context);
    return Center(
      child: CuText(
        "主题颜色: ${theme.primaryColor}",
      ),
    );
  },
)
```
:::

### 集成 CuRefresh

当 `body` 为 `CuRefresh` 时，自动保留其滚动能力。

:::demo
```dart
CuPage(
  title: "刷新页面",
  body: CuRefresh(
    onRefresh: () async {},
    child: Column(
      spacing: CuSpacing.medium,
      children: List.generate(20, (index) =&gt; CuText("刷新内容 $index")),
    ),
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射 (Technical Spec)

### 布局约束参考

| 常量名 | 数值 | 说明 |
|--------|------|------|
| CuSpacing.smallAll | EdgeInsets.all(8) | 小内边距 |
| CuSpacing.mediumAll | EdgeInsets.all(16) | 中等内边距（默认） |
| CuSpacing.largeAll | EdgeInsets.all(24) | 大内边距 |

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String? | null | 页面标题 |
| body | Widget? | null | 页面内容 |
| bodyBuilder | Widget Function(BuildContext)? | null | 页面内容构建器 |
| appBar | CuAppBar? | null | 自定义 AppBar |
| hideAppBar | bool | false | 是否隐藏 AppBar |
| appBarAutoToBackground | bool | false | AppBar 滚动时自动变色 |
| backgroundColor | Color? | null | 页面背景色 |
| padding | EdgeInsets | CuSpacing.mediumAll | 页面内边距 |
| autoScroll | bool | true | 是否自动包裹滚动视图 |
| scrollController | ScrollController? | null | 滚动控制器 |
| actions | List&lt;Widget&gt; | const [] | AppBar 右侧操作按钮 |
| showBackButton | bool | true | 是否显示返回按钮 |

### 内部逻辑优先级

1. **AppBar 渲染优先级**：`hideAppBar` &gt; `appBar` &gt; 默认 `CuAppBar`
2. **内容渲染优先级**：`bodyBuilder` &gt; `body` &gt; 空占位
3. **滚动处理优先级**：检测到 `CuRefresh`/`EasyRefresh`/`CustomScrollView`/`SingleChildScrollView` 直接使用 &gt; `autoScroll` 决定是否包裹 `SingleChildScrollView` &gt; 仅添加 `Padding`
4. **控制器管理**：优先使用外部传入的 `scrollController`，内部创建的控制器在 `dispose` 时自动销毁

---

&gt; **AI Prompt Context**: 关键词：`page`、`scaffold`、`appbar`。原则：优先使用 `title` 和 `body`；配合 `CuRefresh` 实现下拉刷新，配合 `CuAppBar` 实现自定义导航栏。
