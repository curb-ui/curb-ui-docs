# CuRefresh 下拉刷新与加载组件 (Refresh)

`CuRefresh` 是 `curb_ui` 库的列表数据加载组件，基于 `easy_refresh` 实现。该组件封装了下拉刷新、上拉加载以及分页逻辑，支持自定义空状态、自定义头部/尾部指示器，并提供了语义化的配置常量。

---

## 1. 基础用法

通过 `onRefresh` 属性实现下拉刷新功能，`onLoad` 属性实现上拉加载更多功能。

:::demo
```dart
CuRefresh(
  child: ListView.builder(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemBuilder: (context, index) => CuList(title: 'Item $index'),
    itemCount: 20,
  ),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

## 2. 视觉配置

### 自定义头部与尾部
通过 `header` 和 `footer` 属性可自定义刷新和加载的指示器，也可使用 `CuRefreshConfig` 提供的预设配置。

:::demo
```dart
CuRefresh(
  header: CuRefreshConfig.header(context),
  footer: CuRefreshConfig.footer(context),
  child: ListView.builder(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemBuilder: (context, index) => CuList(title: 'Item $index'),
    itemCount: 20,
  ),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
  onLoad: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
  enableLoad: true,
)
```
:::

### 内边距定制
通过 `padding` 属性设置内容区域的内边距，使用 `CuSpacing` 常量保持一致性。

:::demo
```dart
CuRefresh(
  padding: CuSpacing.large,
  child: ListView.builder(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemBuilder: (context, index) => CuCard(child: CuText('Item $index')),
    itemCount: 10,
  ),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

## 3. 交互状态

### 刷新与加载启用控制
通过 `enableRefresh` 和 `enableLoad` 布尔标志位控制是否允许下拉刷新和上拉加载。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuRefresh(
      enableRefresh: false,
      enableLoad: false,
      child: const CuText('刷新和加载均已禁用'),
      onRefresh: (pagination) async {},
    ),
    CuRefresh(
      enableRefresh: true,
      enableLoad: true,
      child: const CuText('刷新和加载均已启用'),
      onRefresh: (pagination) async {
        await Future.delayed(const Duration(seconds: 2));
      },
      onLoad: (pagination) async {
        await Future.delayed(const Duration(seconds: 2));
      },
    ),
  ],
)
```
:::

### 启动时自动刷新
通过 `refreshOnStart` 属性控制组件初始化时是否自动执行刷新操作。

:::demo
```dart
CuRefresh(
  refreshOnStart: true,
  child: ListView.builder(
    shrinkWrap: true,
    physics: const NeverScrollableScrollPhysics(),
    itemBuilder: (context, index) => CuList(title: 'Item $index'),
    itemCount: 20,
  ),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

## 4. 特殊模式与尺寸

### 分页模式
启用 `paging` 模式后，组件将自动管理页码状态，支持返回 `BasePageModel` 类型数据自动处理分页逻辑。

:::demo
```dart
CuRefresh(
  paging: true,
  refreshOnStart: true,
  size: 15,
  child: CustomScrollView(
    slivers: [
      SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) => CuList(title: 'Item $index'),
          childCount: 30,
        ),
      ),
    ],
  ),
  onRefresh: (pagination) async {
    final res = await mockService.page(pagination);
    return res;
  },
  onLoad: (pagination) async {
    final res = await mockService.page(pagination);
    return res;
  },
)
```
:::

### 空状态模式
通过 `isEmpty` 属性或 `_isEmpty` 内部状态展示空状态，可通过 `emptyWidget` 自定义空状态组件。

:::demo
```dart
CuRefresh(
  isEmpty: true,
  emptyWidget: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    spacing: CuSpacing.medium,
    children: [
      CuIcon(
        'assets/svgs/empty.svg',
        size: 120,
        color: Colors.grey.withAlpha(CuAlpha.alpha50),
      ),
      const CuText("暂无数据", level: CuTextLevel.captionMedium),
    ],
  ),
  child: const SizedBox(),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

## 5. 高级自定义

### 自定义内容构建器
通过 `contentBuilder` 自定义内容区域的构建方式，实现更灵活的布局。

:::demo
```dart
CuRefresh(
  contentBuilder: (context) {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      child: Column(
        spacing: CuSpacing.medium,
        children: List.generate(
          10,
          (index) => CuCard(
            child: Padding(
              padding: CuSpacing.medium,
              child: CuText('Custom Item $index'),
            ),
          ),
        ),
      ),
    );
  },
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

### 自定义控制器与滚动控制器
通过 `controller` 和 `scrollController` 实现对刷新和滚动行为的精细控制。

:::demo
```dart
final _refreshController = EasyRefreshController();
final _scrollController = ScrollController();

CuRefresh(
  controller: _refreshController,
  scrollController: _scrollController,
  autoScroll: false,
  child: ListView.builder(
    controller: _scrollController,
    itemBuilder: (context, index) => CuList(title: 'Item $index'),
    itemCount: 50,
  ),
  onRefresh: (pagination) async {
    await Future.delayed(const Duration(seconds: 2));
  },
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 配置项 | 常量值 | 说明 |
| :--- | :--- | :--- |
| 默认内边距 | `CuSpacing.mediumX` | 内容区域默认内边距 |
| 空状态图标尺寸 | `120` | 空状态图标默认尺寸 |
| 触发刷新偏移 | `70` | BuilderHeader 触发偏移量 |
| 默认分页大小 | `15` | 分页模式下默认每页数量 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `child` | `Widget?` | — | 子内容组件（与 contentBuilder 二选一） |
| `contentBuilder` | `Widget Function(BuildContext)?` | — | 内容构建器（与 child 二选一） |
| `padding` | `EdgeInsets` | `CuSpacing.mediumX` | 内容区域内边距 |
| `onRefresh` | `Future<dynamic> Function(PaginationModel)?` | — | 下拉刷新回调 |
| `onLoad` | `Future<dynamic> Function(PaginationModel)?` | — | 上拉加载回调 |
| `controller` | `EasyRefreshController?` | — | 刷新控制器 |
| `header` | `Header?` | — | 自定义刷新头部指示器 |
| `footer` | `Footer?` | — | 自定义加载尾部指示器 |
| `enableRefresh` | `bool` | `true` | 是否启用下拉刷新 |
| `enableLoad` | `bool` | `false` | 是否启用上拉加载 |
| `refreshOnStart` | `bool` | `false` | 初始化时是否自动刷新 |
| `scrollController` | `ScrollController?` | — | 滚动控制器 |
| `autoScroll` | `bool` | `true` | 是否自动包裹 SingleChildScrollView |
| `isEmpty` | `bool` | `false` | 是否显示空状态 |
| `paging` | `bool` | `false` | 是否启用分页模式 |
| `size` | `int` | `15` | 分页模式下每页数量 |
| `emptyWidget` | `Widget?` | — | 自定义空状态组件 |

### 内部逻辑优先级
1. **内容优先级**：`child` 与 `contentBuilder` 必须提供其一，`contentBuilder` 优先级高于 `child`。
2. **空状态优先级**：若 `_isEmpty` 为 `true`，优先渲染空状态组件，忽略子内容。
3. **分页模式优先级**：`paging` 模式下自动管理页码，返回 `BasePageModel` 时自动处理 `noMore` 和空状态。
4. **滚动容器优先级**：若 `child` 为 `SingleChildScrollView` 或 `CustomScrollView`，或 `autoScroll` 为 `false`，则不自动包裹滚动容器。
5. **指示器优先级**：自定义 `header`/`footer` 优先级高于默认实现，`paging` 模式下默认不显示指示器。

---

> **AI Prompt Context**: 关键词：`Refresh`, `CuRefresh`, `下拉刷新`, `上拉加载`, `分页`。原则：优先使用 `paging` 模式处理列表分页；刷新/加载回调返回 `BasePageModel` 自动处理分页逻辑；空状态通过 `emptyWidget` 自定义。
