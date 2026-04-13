
# CuSwitch 开关组件 (Switch)

`CuSwitch` 是 `curb_ui` 库的基础交互组件，基于 `StatefulWidget` 和 `CustomPaint` 实现。该组件封装了 `AnimationController` 以提供平滑的开关过渡动画，并支持点击和拖拽两种交互方式，适用于二选一状态切换的业务场景。

---

## 1. 基础用法

通过 `type` 属性展示组件的核心视觉基调。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuSwitch(value: false, onChanged: (val) {}),
    CuSwitch(value: true, onChanged: (val) {}),
  ],
)
```
:::

## 2. 视觉配置 (Visual Config)

### 变体模式
支持 `fill`（默认填充）、`text`（文字标识）、`icon`（图标标识）、`loading`（加载状态）四种视觉变体。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuSwitch(type: CuSwitchType.fill, value: true, onChanged: (val) {}),
    CuSwitch(type: CuSwitchType.text, value: true, onChanged: (val) {}),
    CuSwitch(type: CuSwitchType.icon, value: true, onChanged: (val) {}),
    CuSwitch(type: CuSwitchType.loading, value: true),
  ],
)
```
:::

### 颜色定制
通过 `trackOnColor`、`trackOffColor` 和 `thumbColor` 自定义开关的颜色方案。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuSwitch(
      trackOnColor: Colors.green,
      trackOffColor: Colors.grey,
      thumbColor: Colors.white,
      value: true,
      onChanged: (val) {},
    ),
    CuSwitch(
      trackOnColor: Colors.purple,
      trackOffColor: Colors.grey,
      thumbColor: Colors.white,
      value: true,
      onChanged: (val) {},
    ),
  ],
)
```
:::

## 3. 交互状态 (Interaction States)

### 禁用与加载
`disabled` 属性降低组件不透明度并拦截事件；`loading` 类型自动渲染旋转指示器并同步拦截事件。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuSwitch(disabled: true, value: false),
    CuSwitch(disabled: true, value: true),
    CuSwitch(type: CuSwitchType.loading, value: true),
  ],
)
```
:::

### 状态切换对比
展示开关在不同状态下的表现，可点击切换状态。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    bool _switchValue = false;
    return Row(
      spacing: 12,
      children: [
        Column(
          spacing: 8,
          children: [
            CuSwitch(
              value: _switchValue,
              onChanged: (val) =&gt; setState(() =&gt; _switchValue = val),
            ),
            CuText('${_switchValue ? "开启" : "关闭"}'),
          ],
        ),
      ],
    );
  },
)
```
:::

## 4. 特殊模式与尺寸 (Patterns &amp; Sizes)

### 尺寸规格
支持 `small`、`medium`、`large` 三种预设尺寸。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    Column(
      spacing: 8,
      children: [
        CuSwitch(size: CuSwitchSize.small, value: true, onChanged: (val) {}),
        CuText('Small'),
      ],
    ),
    Column(
      spacing: 8,
      children: [
        CuSwitch(size: CuSwitchSize.medium, value: true, onChanged: (val) {}),
        CuText('Medium'),
      ],
    ),
    Column(
      spacing: 8,
      children: [
        CuSwitch(size: CuSwitchSize.large, value: true, onChanged: (val) {}),
        CuText('Large'),
      ],
    ),
  ],
)
```
:::

### 文字模式定制
在 `text` 类型下，可通过 `openText` 和 `closeText` 自定义开关文本。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuSwitch(
      type: CuSwitchType.text,
      openText: 'ON',
      closeText: 'OFF',
      value: true,
      onChanged: (val) {},
    ),
    CuSwitch(
      type: CuSwitchType.text,
      openText: '是',
      closeText: '否',
      value: false,
      onChanged: (val) {},
    ),
  ],
)
```
:::

## 5. 高级自定义 (Advanced Customization)

展示与列表组件组合的实际应用场景，以及自定义样式能力。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    bool _notifyValue = false;
    bool _soundValue = true;
    return CuCard(
      padding: EdgeInsets.zero,
      child: CuList(
        CuListItem(
          title: '接收通知',
          subtitle: '状态: ${_notifyValue ? "启用" : "禁用"}',
          trailing: CuSwitch(
            value: _notifyValue,
            onChanged: (val) =&gt; setState(() =&gt; _notifyValue = val),
          ),
        ),
        CuListItem(
          title: '声音提醒',
          subtitle: '状态: ${_soundValue ? "开启" : "关闭"}',
          trailing: CuSwitch(
            type: CuSwitchType.text,
            openText: '开',
            closeText: '关',
            value: _soundValue,
            onChanged: (val) =&gt; setState(() =&gt; _soundValue = val),
          ),
        ),
      ),
    );
  },
)
```
:::

---

## 6. 技术规范与逻辑映射 (Technical Spec)

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 尺寸枚举 (`CuSwitchSize`) | 宽度规范 (`width`) | 高度规范 (`height`) | 字体大小 (`fontSize`) |
| :--- | :--- | :--- | :--- |
| `small` | `36.0` | `22.0` | `8.0` |
| `medium` | `45.0` | `28.0` | `10.0` |
| `large` | `54.0` | `34.0` | `12.0` |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `type` | `CuSwitchType` | `CuSwitchType.fill` | 开关类型 |
| `size` | `CuSwitchSize` | `CuSwitchSize.medium` | 尺寸规格 |
| `value` | `bool` | `false` | 开关状态值 |
| `disabled` | `bool` | `false` | 交互禁用状态 |
| `trackOnColor` | `Color?` | — | 开启状态轨道颜色 |
| `trackOffColor` | `Color?` | — | 关闭状态轨道颜色 |
| `thumbColor` | `Color?` | — | 滑块颜色 |
| `onChanged` | `ValueChanged&lt;bool&gt;?` | — | 状态变化回调 |
| `openText` | `String?` | — | 开启状态文本（text模式） |
| `closeText` | `String?` | — | 关闭状态文本（text模式） |

### 内部逻辑优先级
1. **交互优先级**：`disabled` 或 `type == CuSwitchType.loading` 时，组件变为不可交互，点击和拖拽事件被拦截。
2. **动画优先级**：开关状态变化通过 `AnimationController` 驱动，过渡时长为 200ms，曲线为 `Curves.easeInOut`。
3. **颜色优先级**：自定义颜色 `trackOnColor`、`trackOffColor`、`thumbColor` 优先级高于 `CuTheme` 主题默认颜色。
4. **内容优先级**：`type` 决定滑块内容渲染，`text` 模式优先使用 `openText`/`closeText`，缺省为「开/关」；`icon` 模式渲染对勾/叉号图标。
5. **拖拽逻辑**：水平拖拽距离超过 10 像素时，才会触发状态切换，否则恢复原状态。

---

&gt; **AI Prompt Context**: 关键词：`Switch`, `CuSwitch`, `开关`。原则：优先使用 `onChanged` 回调处理状态变化；禁用状态下必须禁止交互；执行异步操作时可使用 `CuSwitchType.loading` 类型提示用户；同时支持点击和拖拽两种交互方式。
