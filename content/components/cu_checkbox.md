<!-- 存储路径: e:\TravelFlutter\cool-unix-main\curb_ui\doc\cu_checkbox.md -->

# 复选框 (Checkbox)

`CuCheckbox` 和 `CuCheckboxGroup` 是 `curb_ui` 库的多选交互组件，基于 Flutter 原生 `CheckboxListTile` 和 `StatefulWidget` 实现。`CuCheckboxGroup` 封装了一组 `CuCheckboxOption`，提供便捷的多选状态管理，支持多种视觉样式和交互状态，适用于表单多选、配置筛选等业务场景。

---

## 1. 基础用法

通过 `CuCheckboxGroup` 组件快速构建多选列表，传入 `options` 配置选项和 `value` 控制选中状态。

:::demo
```dart
CuCheckboxGroup<String>(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuCheckboxOption(label: '选项 A', value: 'A'),
    CuCheckboxOption(label: '选项 B', value: 'B'),
    CuCheckboxOption(label: '选项 C', value: 'C'),
  ],
  value: ['A'],
  onChange: (value) {
    print('选中值: $value');
  },
)
```
:::

## 2. 视觉配置

### 样式变体
支持 `CheckboxStyle.checkbox`（默认）和 `CheckboxStyle.check` 两种视觉风格，后者以简单的勾选图标作为选中状态。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuCard(
      title: '默认样式 (checkbox)',
      padding: CuSpacing.smallY,
      child: CuCheckboxGroup<String>(
        dividerMargin: EdgeInsets.only(left: 40),
        options: [
          CuCheckboxOption(label: '选项 1', value: '1'),
          CuCheckboxOption(label: '选项 2', value: '2'),
        ],
        value: ['1'],
        onChange: (value) {},
      ),
    ),
    CuCard(
      title: '勾选样式 (check)',
      padding: CuSpacing.smallY,
      child: CuCheckboxGroup<String>(
        options: [
          CuCheckboxOption(label: '选项 1', value: '1'),
          CuCheckboxOption(label: '选项 2', value: '2'),
        ],
        value: ['1'],
        onChange: (value) {},
        style: CheckboxStyle.check,
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
CuCheckboxGroup<String>(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuCheckboxOption(
      label: '选项 A',
      value: 'A',
      subtitle: '这是选项 A 的描述信息',
    ),
    CuCheckboxOption(
      label: '选项 B',
      value: 'B',
      subtitle: '这是选项 B 的描述信息',
    ),
  ],
  value: ['A'],
  onChange: (value) {},
)
```
:::

## 3. 交互状态

### 禁用状态
通过 `CuCheckboxOption.disabled` 可单独禁用某个选项，禁用后将降低透明度并拦截点击事件。

:::demo
```dart
CuCheckboxGroup<String>(
  dividerMargin: EdgeInsets.only(left: 40),
  options: [
    CuCheckboxOption(label: '启用选项 1', value: '1'),
    CuCheckboxOption(label: '禁用选项 2', value: '2', disabled: true),
    CuCheckboxOption(label: '启用选项 3', value: '3'),
  ],
  value: ['1'],
  onChange: (value) {},
)
```
:::

## 4. 特殊模式与尺寸

### 勾选模式
`CheckboxStyle.check` 模式提供简洁的列表式多选体验，选中项在右侧显示勾选图标。

:::demo
```dart
CuCheckboxGroup<String>(
  options: [
    CuCheckboxOption(label: '简约风格', value: 'style1'),
    CuCheckboxOption(label: '商务风格', value: 'style2'),
    CuCheckboxOption(label: '科技风格', value: 'style3'),
  ],
  value: ['style1'],
  onChange: (value) {},
  style: CheckboxStyle.check,
)
```
:::

## 5. 高级自定义

### 颜色与样式定制
通过 `activeColor`、`checkColor`、`titleStyle` 等属性可深度定制复选框的视觉表现。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuCheckbox<String>(
      CuCheckboxOption(label: '自定义颜色', value: 'custom'),
      value: true,
      onChanged: (value) {},
      activeColor: CuTheme.of(context).successColor,
      checkColor: Colors.black,
      titleStyle: TextStyle(fontWeight: FontWeight.bold),
    ),
    CuCheckbox<String>(
      CuCheckboxOption(label: '控制位置', value: 'trailing'),
      value: false,
      onChanged: (value) {},
      controlAffinity: ListTileControlAffinity.trailing,
    ),
  ],
)
```
:::

### 自定义内边距
通过 `contentPadding` 可调整选项的内容内边距。

:::demo
```dart
CuCheckboxGroup<String>(
  options: [
    CuCheckboxOption(
      label: '大间距选项',
      value: '1',
      contentPadding: EdgeInsets.all(20),
    ),
    CuCheckboxOption(
      label: '小间距选项',
      value: '2',
      contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    ),
  ],
  value: ['1'],
  onChange: (value) {},
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考
| 样式枚举 (`CheckboxStyle`) | 渲染组件 | 分割线配置 |
| :--- | :--- | :--- |
| `checkbox` | `CuCheckbox` | `CuDivider` 左侧缩进 40 |
| `check` | `CuList` + `CuListItem` | `CuDivider` 无缩进 |

### 属性定义 (API)

#### CuCheckboxOption&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String` | — | 选项标签文字 |
| `value` | `T` | — | 选项值，用于标识选项 |
| `disabled` | `bool` | `false` | 是否禁用该选项 |
| `subtitle` | `String?` | — | 副标题文字 |
| `subtitleWidget` | `Widget?` | — | 自定义副标题组件（优先于 subtitle） |
| `contentPadding` | `EdgeInsets?` | — | 内容内边距 |

#### CuCheckbox&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `item` | `CuCheckboxOption&lt;T&gt;` | — | 选项配置对象 |
| `value` | `bool` | — | 当前选中状态 |
| `onChanged` | `ValueChanged&lt;bool?&gt;` | — | 状态变化回调 |
| `activeColor` | `Color?` | — | 激活状态颜色 |
| `checkColor` | `Color?` | `Colors.white` | 勾选图标颜色 |
| `titleStyle` | `TextStyle?` | — | 标题文字样式 |
| `controlAffinity` | `ListTileControlAffinity` | `leading` | 复选框位置 |

#### CuCheckboxGroup&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `options` | `List&lt;CuCheckboxOption&lt;T&gt;&gt;` | — | 选项列表 |
| `value` | `List&lt;T&gt;?` | `[]` | 选中值列表 |
| `onChange` | `ValueChanged&lt;List&lt;T&gt;&gt;?` | — | 选中值变化回调 |
| `style` | `CheckboxStyle` | `CheckboxStyle.checkbox` | 视觉样式 |
| `dividerMargin` | `EdgeInsets` | `EdgeInsets.zero` | 分割线边距 |

### 内部逻辑优先级
1. **内容渲染优先级**：`subtitleWidget` 优先于 `subtitle`，若 `subtitleWidget` 非空则忽略 `subtitle`。
2. **样式切换优先级**：`CheckboxStyle.check` 模式下使用 `CuList` 渲染，否则使用 `CuCheckbox`。
3. **交互拦截逻辑**：选项禁用时（`item.disabled` 为 true），`_handleItemTap` 直接返回，不执行任何操作。
4. **状态同步逻辑**：`didUpdateWidget` 监听 `widget.value` 变化，外部传入新值时自动同步内部状态。
5. **视觉规范**：禁用状态下文字使用 `theme.textDisabledColor`，背景色使用 `theme.bgColorContainer`。

---

> **AI Prompt Context**: 关键词：`Checkbox`, `CuCheckbox`, `CuCheckboxGroup`, `复选框`, `多选`。原则：优先使用 `CuCheckboxGroup` 管理多选状态；使用 `CuCheckboxOption` 配置选项；禁用状态下通过 `disabled` 标志位控制。
