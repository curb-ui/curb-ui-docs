
# CuSlider 滑块组件 (Slider)

`CuSlider` 是 `curb_ui` 库的基础交互组件，基于 `StatefulWidget` 和 `ValueListenableBuilder` 实现。该组件封装了 `SliderTheme` 以提供统一的视觉样式，并使用 `ValueNotifier` 实现局部刷新优化性能，适用于数值调节、音量控制、亮度调节等业务场景。

---

## 1. 基础用法

通过 `value` 属性设置滑块当前值，配合 `onChange` 回调处理数值变化。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    double _sliderValue = 50.0;
    return CuSlider(
      value: _sliderValue,
      onChange: (val) =&gt; setState(() =&gt; _sliderValue = val),
    );
  },
)
```
:::

## 2. 视觉配置 (Visual Config)

### 颜色定制
通过 `activeColor`、`inactiveColor` 和 `thumbColor` 自定义滑块的颜色方案。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuSlider(
      value: 50,
      activeColor: Colors.green,
      inactiveColor: Colors.green.withAlpha(50),
      thumbColor: Colors.green,
      onChange: (val) {},
    ),
    CuSlider(
      value: 50,
      activeColor: Colors.purple,
      inactiveColor: Colors.purple.withAlpha(50),
      thumbColor: Colors.purple,
      onChange: (val) {},
    ),
  ],
)
```
:::

### 轨道高度定制
通过 `trackHeight` 属性自定义轨道的高度。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuSlider(value: 50, trackHeight: 3.0, onChange: (val) {}),
    CuSlider(value: 50, trackHeight: 8.0, onChange: (val) {}),
    CuSlider(value: 50, trackHeight: 12.0, onChange: (val) {}),
  ],
)
```
:::

### 标签样式
通过 `label` 属性添加说明标签，通过 `labelStyle` 自定义标签样式。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuSlider(
      label: '音量调节',
      value: 60,
      onChange: (val) {},
    ),
    CuSlider(
      label: '亮度调节',
      labelStyle: TextStyle(fontWeight: FontWeight.bold, color: Colors.orange),
      value: 80,
      onChange: (val) {},
    ),
  ],
)
```
:::

## 3. 交互状态 (Interaction States)

### 禁用状态
`disabled` 属性使滑块变为不可交互状态。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuSlider(value: 30, disabled: true),
    CuSlider(value: 70, disabled: true),
  ],
)
```
:::

### 状态切换对比
展示滑块在不同状态下的表现，可拖动切换状态并显示当前值。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    double _sliderValue = 50.0;
    return Column(
      spacing: 8,
      children: [
        CuSlider(
          value: _sliderValue,
          onChange: (val) =&gt; setState(() =&gt; _sliderValue = val),
        ),
        CuText('当前值: ${_sliderValue.toStringAsFixed(0)}'),
      ],
    );
  },
)
```
:::

## 4. 特殊模式与尺寸 (Patterns &amp; Sizes)

### 自定义范围与步长
通过 `min`、`max` 和 `step` 属性自定义滑块的取值范围和步长。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuSlider(
      label: '范围: 0-10, 步长: 1',
      value: 5,
      min: 0,
      max: 10,
      step: 1,
      onChange: (val) {},
    ),
    CuSlider(
      label: '范围: 20-80, 步长: 0.5',
      value: 50,
      min: 20,
      max: 80,
      step: 0.5,
      onChange: (val) {},
    ),
  ],
)
```
:::

### 边距定制
通过 `padding` 属性自定义滑块的边距。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuCard(
      child: CuSlider(
        value: 50,
        padding: EdgeInsets.zero,
        onChange: (val) {},
      ),
    ),
    CuCard(
      child: CuSlider(
        value: 50,
        padding: EdgeInsets.symmetric(horizontal: 24),
        onChange: (val) {},
      ),
    ),
  ],
)
```
:::

## 5. 高级自定义 (Advanced Customization)

展示滑块在实际应用场景中的综合使用，包括回调函数的完整应用。

:::demo
```dart
StatefulBuilder(
  builder: (context, setState) {
    double _volume = 50.0;
    double _brightness = 75.0;
    return CuCard(
      padding: EdgeInsets.all(16),
      child: Column(
        spacing: 24,
        children: [
          Column(
            spacing: 8,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CuText('音量'),
                  CuText('${_volume.toStringAsFixed(0)}%'),
                ],
              ),
              CuSlider(
                value: _volume,
                onChange: (val) =&gt; setState(() =&gt; _volume = val),
                onChangeStart: (val) =&gt; print('开始拖动: $val'),
                onChangeEnd: (val) =&gt; print('结束拖动: $val'),
              ),
            ],
          ),
          Column(
            spacing: 8,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CuText('亮度'),
                  CuText('${_brightness.toStringAsFixed(0)}%'),
                ],
              ),
              CuSlider(
                value: _brightness,
                activeColor: Colors.orange,
                inactiveColor: Colors.orange.withAlpha(50),
                thumbColor: Colors.orange,
                onChange: (val) =&gt; setState(() =&gt; _brightness = val),
              ),
            ],
          ),
        ],
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
| 配置项 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `trackHeight` | `5.0` | 轨道高度 |
| `enabledThumbRadius` | `8.0` | 滑块半径（启用状态） |
| `overlayRadius` | `0` | 覆盖层半径（禁用效果） |
| `labelBottomPadding` | `8.0` | 标签与轨道的间距 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `double` | **required** | 当前滑块值 |
| `onChange` | `Function(double)?` | — | 数值变化回调 |
| `onChangeStart` | `Function(double)?` | — | 开始拖动回调 |
| `onChangeEnd` | `Function(double)?` | — | 结束拖动回调 |
| `min` | `double` | `0.0` | 最小值 |
| `max` | `double` | `100.0` | 最大值 |
| `step` | `double` | `1.0` | 步长 |
| `trackHeight` | `double` | `5.0` | 轨道高度 |
| `activeColor` | `Color?` | — | 激活状态颜色 |
| `inactiveColor` | `Color?` | — | 未激活状态颜色 |
| `thumbColor` | `Color?` | — | 滑块颜色 |
| `disabled` | `bool` | `false` | 是否禁用 |
| `label` | `String?` | — | 说明标签文本 |
| `labelStyle` | `TextStyle?` | — | 说明标签样式 |
| `padding` | `EdgeInsetsGeometry?` | — | 滑块边距 |

### 内部逻辑优先级
1. **值约束优先级**：`value` 会被自动 clamp 到 `[min, max]` 范围内，确保数值合法。
2. **交互优先级**：`disabled` 为 `true` 时，`onChange`、`onChangeStart`、`onChangeEnd` 回调全部置为 `null`，拦截所有交互事件。
3. **颜色优先级**：自定义颜色 `activeColor`、`inactiveColor`、`thumbColor` 优先级高于 `CuTheme` 主题默认颜色。
4. **性能优化**：使用 `ValueNotifier` + `ValueListenableBuilder` 实现局部刷新，避免整个 widget tree 重建。
5. **标签渲染**：`label` 非空时，在滑块上方渲染标题，使用 `CuTextLevel.captionMedium` 文本级别。
6. **数值标签**：拖动时显示数值标签，小数位数根据 `step` 自动计算（`step &gt;= 1.0` 显示 0 位小数，否则显示 1 位）。

---

&gt; **AI Prompt Context**: 关键词：`Slider`, `CuSlider`, `滑块`。原则：优先使用 `onChange` 回调处理数值变化；`value` 必须配合 `setState` 使用以实现双向绑定；禁用状态下必须禁止交互；数值会自动 clamp 到 `[min, max]` 范围内。
