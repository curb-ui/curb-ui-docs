
# CuKeepAlive 保活组件 (KeepAlive)

`CuKeepAlive` 是 `curb_ui` 库的基础状态保持组件，基于 Flutter 的 `AutomaticKeepAliveClientMixin` 实现。该组件用于在可滚动容器（如 `ListView`、`PageView` 或 `CuTabs`）中保持子组件的状态，防止它们被销毁重建，解决了滚动时组件状态丢失的业务交互场景。

---

## 1. 基础用法

通过包裹需要保持状态的子组件来使用 `CuKeepAlive`。

:::demo
```dart
ListView(
  children: [
    CuKeepAlive(
      child: _StatefulWidgetExample(),
    ),
  ],
)
```
:::

---

## 2. 视觉配置 (Visual Config)

`CuKeepAlive` 是一个纯功能性组件，不提供任何视觉配置。它直接透传子组件进行渲染，不改变子组件的视觉表现。

---

## 3. 交互状态 (Interaction States)

`CuKeepAlive` 不处理任何交互状态，所有交互由子组件自行管理。该组件仅负责保持子组件的状态存活。

:::demo
```dart
class DemoState extends State&lt;Demo&gt; {
  @override
  Widget build(BuildContext context) {
    return CuTabs(
      tabs: const ['Tab 1', 'Tab 2'],
      children: [
        CuKeepAlive(
          child: _TabContent(index: 1),
        ),
        CuKeepAlive(
          child: _TabContent(index: 2),
        ),
      ],
    );
  }
}
```
:::

---

## 4. 特殊模式与尺寸 (Patterns &amp; Sizes)

`CuKeepAlive` 不提供尺寸或模式配置，它完全继承自子组件的尺寸和布局。

### 配合 CuTabs 使用

最常见的使用场景是配合 `CuTabs` 组件，在标签页切换时保持每个标签页内容的状态。

:::demo
```dart
CuTabs(
  tabs: const ['首页', '消息', '我的'],
  children: [
    CuKeepAlive(child: _HomeTab()),
    CuKeepAlive(child: _MessageTab()),
    CuKeepAlive(child: _ProfileTab()),
  ],
)
```
:::

### 配合 ListView 使用

在长列表中保持特定列表项的状态。

:::demo
```dart
ListView.builder(
  itemCount: 10,
  itemBuilder: (context, index) {
    return CuKeepAlive(
      child: _ListItem(index: index),
    );
  },
)
```
:::

---

## 5. 高级自定义 (Advanced Customization)

`CuKeepAlive` 的设计非常简洁，不需要高级自定义。如需控制保活逻辑，可以直接使用 `AutomaticKeepAliveClientMixin` 自定义实现。

:::demo
```dart
class CustomKeepAliveWidget extends StatefulWidget {
  const CustomKeepAliveWidget({required this.child, super.key});

  final Widget child;

  @override
  State&lt;CustomKeepAliveWidget&gt; createState() =&gt; _CustomKeepAliveWidgetState();
}

class _CustomKeepAliveWidgetState extends State&lt;CustomKeepAliveWidget&gt;
    with AutomaticKeepAliveClientMixin {
  bool _keepAlive = true;

  @override
  bool get wantKeepAlive =&gt; _keepAlive;

  void toggleKeepAlive() {
    setState(() {
      _keepAlive = !_keepAlive;
      updateKeepAlive();
    });
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return widget.child;
  }
}
```
:::

---

## 6. 技术规范与逻辑映射 (Technical Spec)

### 布局约束参考

`CuKeepAlive` 不施加任何布局约束，完全透传子组件的布局。

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `child` | `Widget` | — | 需要保持状态的子组件（必填） |

### 内部逻辑优先级

1. **状态保持优先级**：`wantKeepAlive` 始终返回 `true`，确保子组件在可滚动容器中不会被销毁。
2. **渲染优先级**：直接透传 `child` 进行渲染，不添加任何中间布局或视觉包装。
3. **生命周期管理**：通过 `AutomaticKeepAliveClientMixin` 自动处理 Flutter 的状态保持机制，`super.build(context)` 必须被调用以确保 mixin 正常工作。

---

&gt; **AI Prompt Context**: 关键词：`keepalive`、`state`、`pagestate`。原则：优先使用 `CuKeepAlive(child: ...)` 包裹需要保持状态的组件；配合 `CuTabs` 使用时，每个标签页内容都应使用 `CuKeepAlive` 包裹；不要在不需要状态保持的场景中过度使用，避免不必要的内存占用。

