&lt;!-- 存储路径: e:\TravelFlutter\cool-unix-main\curb_ui\doc\cu_multi_select.md --&gt;

# 多选组件 (MultiSelect)

`CuMultiSelect` 和 `CuMultiSelectGroup` 是 `curb_ui` 库的列表式多选交互组件，基于 `CuList` 和 `CuListItem` 实现。`CuMultiSelectGroup` 封装了一组 `CuMultiSelectOption`，支持单选和多选两种模式，提供便捷的选中状态管理，适用于表单选择、配置筛选等业务场景。

---

## 1. 基础用法

通过 `CuMultiSelectGroup` 组件快速构建选择列表，传入 `options` 配置选项和 `value` 控制选中状态，默认支持多选模式。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(label: '选项 A', value: 'A'),
    CuMultiSelectOption(label: '选项 B', value: 'B'),
    CuMultiSelectOption(label: '选项 C', value: 'C'),
  ],
  value: ['A'],
  onChange: (value) {
    print('选中值: $value');
  },
)
```
:::

## 2. 视觉配置

### 副标题与图标配置
每个选项支持添加副标题说明和前置图标，可通过 `subtitle`、`subtitleWidget` 和 `leading` 配置。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(
      label: '苹果',
      value: 'apple',
      leading: Icon(Icons.apple),
      subtitle: '新鲜多汁的红苹果',
    ),
    CuMultiSelectOption(
      label: '香蕉',
      value: 'banana',
      leading: Icon(Icons.brunch_dining),
      subtitle: '香甜软糯的香蕉',
    ),
    CuMultiSelectOption(
      label: '葡萄',
      value: 'grape',
      leading: Icon(Icons.games),
      subtitle: '酸甜可口的葡萄',
    ),
  ],
  value: ['apple'],
  onChange: (value) {},
)
```
:::

### 自定义选中图标
通过 `selectedWidget` 和 `unselectedWidget` 自定义选中和未选中状态的图标。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(
      label: '绿色选项',
      value: 'green',
      selectedWidget: Icon(Icons.check_box, color: Colors.green),
    ),
    CuMultiSelectOption(
      label: '蓝色选项',
      value: 'blue',
      selectedWidget: Icon(Icons.check_box, color: Colors.blue),
      unselectedWidget: Icon(Icons.check_box_outline_blank, color: Colors.grey),
    ),
    CuMultiSelectOption(
      label: '红色选项',
      value: 'red',
      selectedWidget: Icon(Icons.check_box, color: Colors.red),
    ),
  ],
  value: ['green'],
  onChange: (value) {},
)
```
:::

## 3. 交互状态

### 禁用状态
通过 `CuMultiSelectOption.disabled` 可单独禁用某个选项，禁用后将改变图标颜色并拦截点击事件。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(label: '启用选项 1', value: '1'),
    CuMultiSelectOption(label: '禁用选项 2', value: '2', disabled: true),
    CuMultiSelectOption(label: '启用选项 3', value: '3'),
  ],
  value: ['1'],
  onChange: (value) {},
)
```
:::

### 单选/多选模式切换
通过 `multiple` 属性切换单选和多选模式，单选模式使用圆形图标，多选模式使用方形复选框图标。

:::demo
```dart
Column(
  spacing: 16,
  children: [
    CuCard(
      title: '单选模式',
      padding: CuSpacing.smallY,
      child: CuMultiSelectGroup&lt;String&gt;(
        multiple: false,
        options: [
          CuMultiSelectOption(label: '选项 1', value: '1'),
          CuMultiSelectOption(label: '选项 2', value: '2'),
          CuMultiSelectOption(label: '选项 3', value: '3'),
        ],
        value: ['1'],
        onChange: (value) {},
      ),
    ),
    CuCard(
      title: '多选模式',
      padding: CuSpacing.smallY,
      child: CuMultiSelectGroup&lt;String&gt;(
        multiple: true,
        options: [
          CuMultiSelectOption(label: '选项 1', value: '1'),
          CuMultiSelectOption(label: '选项 2', value: '2'),
          CuMultiSelectOption(label: '选项 3', value: '3'),
        ],
        value: ['1', '2'],
        onChange: (value) {},
      ),
    ),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 视觉密度调整
通过 `visualDensity` 属性调整列表项的视觉密度，提供更紧凑或宽松的显示效果。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  visualDensity: VisualDensity.compact,
  options: [
    CuMultiSelectOption(label: '紧凑选项 1', value: '1'),
    CuMultiSelectOption(label: '紧凑选项 2', value: '2'),
    CuMultiSelectOption(label: '紧凑选项 3', value: '3'),
  ],
  value: ['1'],
  onChange: (value) {},
)
```
:::

### 分割线边距配置
通过 `dividerMargin` 自定义选项之间分割线的边距。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  dividerMargin: EdgeInsets.only(left: 40, right: 16),
  options: [
    CuMultiSelectOption(label: '选项 1', value: '1'),
    CuMultiSelectOption(label: '选项 2', value: '2'),
    CuMultiSelectOption(label: '选项 3', value: '3'),
  ],
  value: ['1'],
  onChange: (value) {},
)
```
:::

## 5. 高级自定义

### 自定义内边距
通过 `contentPadding` 可调整选项的内容内边距。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(
      label: '大间距选项',
      value: '1',
      contentPadding: EdgeInsets.all(20),
    ),
    CuMultiSelectOption(
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

### 完全自定义标题
通过 `titleWidget` 完全自定义选项的标题区域，替代默认的文字标签。

:::demo
```dart
CuMultiSelectGroup&lt;String&gt;(
  options: [
    CuMultiSelectOption(
      value: 'custom1',
      titleWidget: Row(
        children: [
          Icon(Icons.star, color: Colors.amber),
          SizedBox(width: 8),
          CuText('重要选项', fontWeight: FontWeight.bold),
        ],
      ),
    ),
    CuMultiSelectOption(
      value: 'custom2',
      titleWidget: Row(
        children: [
          Icon(Icons.info, color: Colors.blue),
          SizedBox(width: 8),
          CuText('普通选项'),
        ],
      ),
    ),
  ],
  value: ['custom1'],
  onChange: (value) {},
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考
| 属性配置 | 渲染组件 | 默认值 |
| :--- | :--- | :--- |
| `contentPadding` | `EdgeInsets` | `CuSpacing.mediumX` |
| `dividerMargin` | `EdgeInsets` | `EdgeInsets.zero` |
| 图标尺寸 | `Icon` | `24` |

### 属性定义 (API)

#### CuMultiSelectOption&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `String?` | — | 选项标签文字 |
| `value` | `T?` | — | 选项值，用于标识选项 |
| `titleWidget` | `Widget?` | — | 自定义标题组件（优先于 label） |
| `subtitle` | `String?` | — | 副标题文字 |
| `subtitleWidget` | `Widget?` | — | 自定义副标题组件（优先于 subtitle） |
| `leading` | `Widget?` | — | 前置组件（如图标） |
| `trailing` | `Widget?` | — | 后置组件（优先于默认选中图标） |
| `disabled` | `bool` | `false` | 是否禁用该选项 |
| `contentPadding` | `EdgeInsets?` | — | 内容内边距 |
| `selectedWidget` | `Widget?` | — | 自定义选中状态组件 |
| `unselectedWidget` | `Widget?` | — | 自定义未选中状态组件 |

#### CuMultiSelectItem&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `item` | `CuMultiSelectOption&lt;T&gt;` | — | 选项配置对象 |
| `checked` | `bool` | — | 当前选中状态 |
| `multiple` | `bool` | `true` | 是否多选模式 |
| `onTap` | `VoidCallback` | — | 点击回调 |
| `visualDensity` | `VisualDensity?` | — | 视觉密度 |

#### CuMultiSelectGroup&lt;T&gt;
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `options` | `List&lt;CuMultiSelectOption&lt;T&gt;&gt;` | — | 选项列表 |
| `multiple` | `bool` | `true` | 是否多选模式 |
| `value` | `List&lt;T&gt;?` | — | 选中值列表 |
| `onChange` | `void Function(List&lt;T&gt;)?` | — | 选中值变化回调 |
| `dividerMargin` | `EdgeInsetsGeometry` | `EdgeInsets.zero` | 分割线边距 |
| `visualDensity` | `VisualDensity?` | — | 视觉密度 |

### 内部逻辑优先级
1. **内容渲染优先级**：`titleWidget` 优先于 `label`，`subtitleWidget` 优先于 `subtitle`，若自定义组件非空则忽略对应文字属性。
2. **选中图标优先级**：`trailing` 优先于 `selectedWidget`/`unselectedWidget`，若 `trailing` 非空则不渲染默认选中图标。
3. **多选/单选图标切换**：`multiple` 为 `true` 时使用复选框图标（`check_box`/`check_box_outline_blank`），为 `false` 时使用圆形图标（`check_circle_rounded`/`circle_outlined`）。
4. **交互拦截逻辑**：选项禁用时（`item.disabled` 为 true），`_handleItemTap` 直接返回，不执行任何操作。
5. **单选模式逻辑**：单选模式下点击选项时，直接替换选中值列表为当前选项值；多选模式下切换选项的选中状态。
6. **状态同步逻辑**：`didUpdateWidget` 监听 `widget.value` 变化，外部传入新值时自动同步内部状态。
7. **视觉规范**：禁用状态下图标使用 `theme.textDisabledColor`，选中状态使用 `theme.primaryColor`，未选中状态使用 `theme.textSecondaryColor`。

---

&gt; **AI Prompt Context**: 关键词：`MultiSelect`, `CuMultiSelect`, `CuMultiSelectGroup`, `多选`, `列表选择`, `单选`。原则：优先使用 `CuMultiSelectGroup` 管理选中状态；使用 `CuMultiSelectOption` 配置选项；通过 `multiple` 标志位控制单选/多选模式；禁用状态下通过 `disabled` 标志位控制。
