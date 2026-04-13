&lt;!-- 存储路径: e:\TravelFlutter\cool-unix-main\curb_ui\doc\cu_radio.md --&gt;

# 单选框 (Radio)

`CuRadio` 和 `CuRadioGroup` 是 `curb_ui` 库的单选交互组件，基于 Flutter 原生 `RadioListTile` 和 `StatefulWidget` 实现。`CuRadioGroup` 封装了一组 `CuRadioOption`，提供便捷的单选状态管理，支持多种视觉样式和交互状态，适用于表单单选、配置选择等业务场景。

---

## 1. 基础用法

通过 `CuRadioGroup` 组件快速构建单选列表，传入 `options` 配置选项和 `value` 控制选中状态。

:::demo
```dart
CuRadioGroup&lt;String&gt;(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuRadioOption(label: '选项 A', value: 'A'),
    CuRadioOption(label: '选项 B', value: 'B'),
    CuRadioOption(label: '选项 C', value: 'C'),
  ],
  value: 'A',
  onChange: (value) {
    print('选中值: $value');
  },
)
```
:::

## 2. 视觉配置

### 样式变体
支持 `CuRadioStyle.radio`（默认）和 `CuRadioStyle.check` 两种视觉风格，后者以简单的勾选图标作为选中状态。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuCard(
      title: '默认样式 (radio)',
      padding: CuSpacing.smallY,
      child: CuRadioGroup&lt;String&gt;(
        dividerMargin: EdgeInsets.only(left: 40),
        options: [
          CuRadioOption(label: '选项 1', value: '1'),
          CuRadioOption(label: '选项 2', value: '2'),
        ],
        value: '1',
        onChange: (value) {},
      ),
    ),
    CuCard(
      title: '勾选样式 (check)',
      padding: CuSpacing.smallY,
      child: CuRadioGroup&lt;String&gt;(
        options: [
          CuRadioOption(label: '选项 1', value: '1'),
          CuRadioOption(label: '选项 2', value: '2'),
        ],
        value: '1',
        onChange: (value) {},
        style: CuRadioStyle.check,
      ),
    ),
  ],
)
```
:::

### 副标题配置
每个选项支持添加副标题说明，可通过 `subtitle` 或 `subtitleWidget` 配置。

:::demo
```dart
CuRadioGroup&lt;String&gt;(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuRadioOption(
      label: '选项 A',
      value: 'A',
      subtitle: '这是选项 A 的描述信息',
    ),
    CuRadioOption(
      label: '选项 B',
      value: 'B',
      subtitle: '这是选项 B 的描述信息',
    ),
  ],
  value: 'A',
  onChange: (value) {},
)
```
:::

## 3. 交互状态

### 禁用状态
通过 `CuRadioOption.disabled` 可单独禁用某个选项，禁用后将降低透明度并拦截点击事件。

:::demo
```dart
CuRadioGroup&lt;String&gt;(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuRadioOption(label: '启用选项 1', value: '1'),
    CuRadioOption(label: '禁用选项 2', value: '2', disabled: true),
    CuRadioOption(label: '启用选项 3', value: '3'),
  ],
  value: '1',
  onChange: (value) {},
)
```
:::

## 4. 特殊模式与尺寸

### 勾选模式
`CuRadioStyle.check` 模式提供简洁的列表式单选体验，选中项在右侧显示勾选图标。

:::demo
```dart
CuRadioGroup&lt;String&gt;(
  options: [
    CuRadioOption(label: '简约风格', value: 'style1'),
    CuRadioOption(label: '商务风格', value: 'style2'),
    CuRadioOption(label: '科技风格', value: 'style3'),
  ],
  value: 'style1',
  onChange: (value) {},
  style: CuRadioStyle.check,
)
```
:::

## 5. 高级自定义

### 自定义内边距
通过 `contentPadding` 可调整选项的内容内边距。

:::demo
```dart
CuRadioGroup&lt;String&gt;(
  options: [
    CuRadioOption(
      label: '大间距选项',
      value: '1',
      contentPadding: EdgeInsets.all(20),
    ),
    CuRadioOption(
      label: '小间距选项',
      value: '2',
      contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    ),
  ],
  value: '1',
  onChange: (value) {},
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考
| 样式枚举 (`CuRadioStyle`) | 渲染组件 | 分割线配置 |
| :--- | :--- | :--- |
| `radio` | `CuRadio` | `CuDivider` 左侧缩进 40 |
| `check` | `CuList` + `CuListItem` | `CuDivider` 无缩进 |

### 属性定义 (API)

#### CuRadioOption&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String` | — | 选项标签文字 |
| `value` | `T` | — | 选项值，用于标识选项 |
| `disabled` | `bool` | `false` | 是否禁用该选项 |
| `subtitle` | `String?` | — | 副标题文字 |
| `subtitleWidget` | `Widget?` | — | 自定义副标题组件（优先于 subtitle） |
| `contentPadding` | `EdgeInsets?` | — | 内容内边距 |

#### CuRadio&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `item` | `CuRadioOption&lt;T&gt;` | — | 选项配置对象 |

#### CuRadioGroup&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `options` | `List&lt;CuRadioOption&lt;T&gt;&gt;` | — | 选项列表 |
| `value` | `T?` | — | 选中值 |
| `onChange` | `ValueChanged&lt;T&gt;?` | — | 选中值变化回调 |
| `style` | `CuRadioStyle` | `CuRadioStyle.radio` | 视觉样式 |
| `dividerMargin` | `EdgeInsets` | `EdgeInsets.zero` | 分割线边距 |

### 内部逻辑优先级
1. **内容渲染优先级**：`subtitleWidget` 优先于 `subtitle`，若 `subtitleWidget` 非空则忽略 `subtitle`。
2. **样式切换优先级**：`CuRadioStyle.check` 模式下使用 `CuList` 渲染，否则使用 `CuRadio`。
3. **状态同步逻辑**：`didUpdateWidget` 监听 `widget.value` 变化，外部传入新值时自动同步内部状态。
4. **视觉规范**：禁用状态下文字使用 `theme.textDisabledColor`，激活颜色使用 `theme.primaryColor`。
5. **布局约束**：`CuRadio` 默认使用 `CuSpacing.mediumX` 作为内容内边距。

---

&gt; **AI Prompt Context**: 关键词：`Radio`, `CuRadio`, `CuRadioGroup`, `单选框`, `单选`。原则：优先使用 `CuRadioGroup` 管理单选状态；使用 `CuRadioOption` 配置选项；禁用状态下通过 `disabled` 标志位控制。
