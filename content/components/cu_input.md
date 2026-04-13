
# CuInput 输入框组件 (Input)

`CuInput` 是 `curb_ui` 库的基础表单输入组件，基于 `StatefulWidget` 实现。该组件封装了 `TextField` 并扩展了丰富的功能，支持多种输入类型、前后缀图标、密码显示切换、清除按钮、错误/成功状态反馈等，适用于各类表单输入、搜索框、密码输入等业务场景。

---

## 1. 基础用法

通过 `type` 属性定义输入框的核心输入类型，配合 `placeholder` 属性提供提示文本。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '文本输入'),
    CuInput(type: CuInputType.password, placeholder: '密码输入'),
    CuInput(type: CuInputType.email, placeholder: '邮箱地址'),
    CuInput(type: CuInputType.phone, placeholder: '手机号码'),
    CuInput(type: CuInputType.number, placeholder: '数字输入'),
  ],
)
```
:::

## 2. 视觉配置

### 前后缀图标
支持通过 `prefixIcon` 和 `suffixIcon` 添加前置和后置图标，增强输入框的语义化和交互性。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '搜索', prefixIcon: Icons.search),
    CuInput(placeholder: '用户', prefixIcon: Icons.person),
    CuInput(placeholder: '邮箱', prefixIcon: Icons.email, suffixIcon: Icons.send),
  ],
)
```
:::

### 边框定制
通过 `border` 属性控制是否显示边框，也可以通过 `borderColor`、`focusBorderColor` 和 `errorBorderColor` 自定义边框颜色。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '无边框输入框', border: false),
    CuInput(
      placeholder: '自定义边框颜色',
      borderColor: Colors.purple,
      focusBorderColor: Colors.deepPurple,
    ),
  ],
)
```
:::

### 背景色定制
通过 `backgroundColor` 属性自定义输入框的背景颜色。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '浅色背景', backgroundColor: Colors.grey[100]),
    CuInput(placeholder: '淡蓝背景', backgroundColor: Colors.blue[50]),
  ],
)
```
:::

## 3. 交互状态

### 清除按钮
通过 `clearable` 属性启用清除按钮，当输入框有内容且获得焦点时显示清除按钮。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '可清除输入框', clearable: true, value: '示例文本'),
  ],
)
```
:::

### 密码显示切换
当 `type` 为 `password` 或设置 `password: true` 时，自动显示密码可见性切换按钮。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(password: true, placeholder: '请输入密码'),
  ],
)
```
:::

### 禁用与只读
`disabled` 属性禁用输入框并降低不透明度；`readonly` 属性使输入框只读但保持正常样式。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(placeholder: '禁用状态', disabled: true),
    CuInput(placeholder: '只读状态', readonly: true, value: '不可编辑的文本'),
  ],
)
```
:::

### 错误与成功状态
通过 `error` 和 `success` 属性配合 `errorMessage` 和 `successMessage` 显示状态反馈信息。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(
      placeholder: '邮箱地址',
      error: true,
      errorMessage: '请输入有效的邮箱地址',
    ),
    CuInput(
      placeholder: '用户名',
      success: true,
      successMessage: '用户名可用',
    ),
  ],
)
```
:::

## 4. 尺寸与模式

### 尺寸规格
支持 `small`、`medium`、`large` 三种预设尺寸，对应不同的盒约束。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(size: CuInputSize.small, placeholder: '小尺寸输入框'),
    CuInput(size: CuInputSize.medium, placeholder: '中尺寸输入框'),
    CuInput(size: CuInputSize.large, placeholder: '大尺寸输入框'),
  ],
)
```
:::

### 多行文本模式
通过 `minLines` 和 `maxLines` 配置支持多行文本输入，适用于文本域场景。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(
      placeholder: '请输入详细描述...',
      minLines: 3,
      maxLines: 5,
    ),
  ],
)
```
:::

### 确认按钮类型
通过 `confirmType` 属性自定义键盘确认按钮类型，提升用户输入体验。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuInput(
      placeholder: '搜索内容',
      confirmType: CuInputConfirmType.search,
    ),
    CuInput(
      placeholder: '下一步',
      confirmType: CuInputConfirmType.next,
    ),
  ],
)
```
:::

## 5. 高级自定义

支持对文本样式、占位符样式进行深度覆盖，以及自定义输入格式化。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    // 自定义文本样式
    CuInput(
      placeholder: '自定义文本样式',
      textStyle: TextStyle(
        fontWeight: FontWeight.bold,
        color: Colors.blue,
        fontSize: 18,
      ),
    ),
    // 自定义占位符样式
    CuInput(
      placeholder: '自定义占位符样式',
      placeholderStyle: TextStyle(
        color: Colors.grey[400],
        fontStyle: FontStyle.italic,
      ),
    ),
    // 组合使用
    CuInput(
      placeholder: '组合自定义',
      prefixIcon: Icons.lock,
      clearable: true,
      textStyle: TextStyle(color: Colors.purple),
      backgroundColor: Colors.purple[50],
      borderColor: Colors.purple,
      focusBorderColor: Colors.purple[700],
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 尺寸枚举 (`CuInputSize`) | 最小高度 (`minHeight`) |
| :--- | :--- |
| `small` | `CuSize.small` (34.0) |
| `medium` | `CuSize.medium` (42.0) |
| `large` | `CuSize.large` (50.0) |

### 属性定义 (API)

#### 基础属性
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `controller` | `TextEditingController?` | — | 文本控制器 |
| `value` | `String?` | — | 初始值 |
| `type` | `CuInputType` | `CuInputType.text` | 输入类型 |
| `placeholder` | `String?` | — | 占位提示文本 |
| `size` | `CuInputSize` | `CuInputSize.medium` | 尺寸规格 |

#### 图标配置
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `prefixIcon` | `IconData?` | — | 前置图标 |
| `suffixIcon` | `IconData?` | — | 后置图标 |
| `clearable` | `bool` | `false` | 是否显示清除按钮 |

#### 输入类型与安全
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `password` | `bool` | `false` | 是否为密码输入 |
| `autofocus` | `bool` | `false` | 是否自动聚焦 |
| `disabled` | `bool` | `false` | 是否禁用 |
| `readonly` | `bool` | `false` | 是否只读 |
| `maxlength` | `int` | `140` | 最大输入长度 |
| `minLines` | `int` | `1` | 最小行数 |
| `maxLines` | `int?` | `1` | 最大行数 |

#### 视觉样式
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `border` | `bool` | `true` | 是否显示边框 |
| `borderColor` | `Color?` | — | 边框颜色 |
| `focusBorderColor` | `Color?` | — | 聚焦时边框颜色 |
| `errorBorderColor` | `Color?` | — | 错误状态边框颜色 |
| `backgroundColor` | `Color?` | — | 背景颜色 |
| `textStyle` | `TextStyle?` | — | 自定义文本样式 |
| `placeholderStyle` | `TextStyle?` | — | 自定义占位符样式 |

#### 状态反馈
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `error` | `bool` | `false` | 错误状态 |
| `success` | `bool` | `false` | 成功状态 |
| `errorMessage` | `String?` | — | 错误提示信息 |
| `successMessage` | `String?` | — | 成功提示信息 |

#### 事件回调
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `onInput` | `Function(String)?` | — | 输入时回调 |
| `onChange` | `Function(String)?` | — | 值变化时回调 |
| `onFocus` | `Function()?` | — | 获得焦点时回调 |
| `onBlur` | `Function(String)?` | — | 失去焦点时回调 |
| `onConfirm` | `Function()?` | — | 确认时回调 |
| `onCuear` | `Function()?` | — | 清除时回调 |

#### 高级配置
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `confirmType` | `CuInputConfirmType` | `CuInputConfirmType.done` | 确认按钮类型 |
| `confirmHold` | `bool` | `false` | 确认后保持键盘 |
| `adjustPosition` | `bool` | `true` | 自动调整位置 |
| `holdKeyboard` | `bool` | `false` | 保持键盘显示 |
| `precision` | `int` | `0` | 数字精度 |
| `pattern` | `String?` | — | 输入正则匹配模式 |
| `minLength` | `int?` | — | 最小输入长度 |
| `inputFormatters` | `List&lt;TextInputFormatter&gt;?` | — | 输入格式化器 |

### 内部逻辑优先级

1. **状态颜色优先级**：错误状态 &gt; 成功状态 &gt; 聚焦状态 &gt; 默认状态。
2. **后缀操作区优先级**：清除按钮 &gt; 密码切换按钮 &gt; 自定义后置图标。
3. **交互拦截优先级**：`disabled` 状态拦截所有交互；`readonly` 状态仅禁止输入但允许聚焦。
4. **清除按钮显示条件**：`clearable` 为 true，且 `disabled` 为 false，且输入内容不为空，且输入框获得焦点。
5. **尺寸计算**：通过 `size` 枚举映射到 `CuSize` 常量，优先级低于显式传入的尺寸约束。
6. **内容同步**：`value` 属性变化时自动同步到控制器，控制器变化时触发相关回调。

---

&gt; **AI Prompt Context**: 关键词：`Input`, `CuInput`, `输入框`, `表单`。原则：优先使用 `placeholder` 提供友好提示；密码输入必须设置 `password: true`；表单验证配合 `error`/`success` 和相应消息使用；清除按钮功能通过 `clearable: true` 开启；严禁在外部包裹 `TextField` 替代 `CuInput`。
