# CuText 文本组件 (Text)

`CuText` 是 `curb_ui` 库的基础文本展示组件，基于 `StatelessWidget` 实现。该组件封装了 `Text` 和 `SelectableText`，支持语义化配色、文本格式化、脱敏展示等多种业务场景。

---

## 1. 基础用法

通过 `colorType` 属性展示组件的核心视觉基调。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('Primary Text', colorType: CuColorType.primary),
    CuText('Success Text', colorType: CuColorType.success),
    CuText('Info Text', colorType: CuColorType.info),
    CuText('Warning Text', colorType: CuColorType.warning),
    CuText('Error Text', colorType: CuColorType.error),
  ],
)
```
:::

## 2. 视觉配置

### 颜色定制
支持通过 `color` 属性直接覆盖文本颜色，或通过 `colorType` 使用语义化颜色。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('Custom Color', color: Colors.purple),
    CuText('Secondary Text', colorType: CuColorType.secondary),
    CuText('Primary Text', colorType: CuColorType.primaryText),
  ],
)
```
:::

### 文本等级
通过 `level` 属性定义文本的层级样式，自动应用相应的字体大小和字重。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('Title Large', level: CuTextLevel.titleLarge),
    CuText('Title Medium', level: CuTextLevel.titleMedium),
    CuText('Title Small', level: CuTextLevel.titleSmall),
    CuText('Body Large', level: CuTextLevel.bodyLarge),
    CuText('Body Medium', level: CuTextLevel.bodyMedium),
    CuText('Body Small', level: CuTextLevel.bodySmall),
    CuText('Caption Large', level: CuTextLevel.captionLarge),
    CuText('Caption Medium', level: CuTextLevel.captionMedium),
    CuText('Caption Small', level: CuTextLevel.captionSmall),
  ],
)
```
:::

## 3. 交互状态

### 文本选择
通过 `selectable` 属性启用文本选择功能，用户可以长按选择文本进行复制。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('普通文本（不可选择）'),
    CuText('可选择文本', selectable: true),
    CuText('长按复制此文本', selectable: true, colorType: CuColorType.primary),
  ],
)
```
:::

### 文本省略
通过 `ellipsis` 和 `lines` 属性控制文本溢出时的省略效果。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('这是一段较长的文本，当文本超出一行时会自动省略显示', ellipsis: true, lines: 1),
    CuText('这是一段较长的文本，最多显示两行，超出部分会自动省略。这是第二行文本内容。', ellipsis: true, lines: 2),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 文本类型格式化
支持手机号、姓名、金额、银行卡、邮箱等多种数据类型的自动格式化。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('13800138000', type: CuTextType.phone),
    CuText('张三', type: CuTextType.name),
    CuText(12345.67, type: CuTextType.amount),
    CuText('6222021234567890123', type: CuTextType.card),
    CuText('example@email.com', type: CuTextType.email),
  ],
)
```
:::

### 脱敏展示
配合 `mask` 属性可以对敏感信息进行脱敏展示。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText('13800138000', type: CuTextType.phone, mask: true),
    CuText('张三', type: CuTextType.name, mask: true),
    CuText('6222021234567890123', type: CuTextType.card, mask: true),
    CuText('example@email.com', type: CuTextType.email, mask: true),
  ],
)
```
:::

### 金额格式化
通过 `currency` 和 `precision` 属性自定义金额格式。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText(12345.67, type: CuTextType.amount),
    CuText(12345.67, type: CuTextType.amount, currency: '\$', precision: 2),
    CuText(12345.67, type: CuTextType.amount, currency: '€', precision: 3),
  ],
)
```
:::

## 5. 高级自定义

支持对文本样式进行深度覆盖和自定义。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    CuText(
      '自定义样式文本',
      style: TextStyle(
        fontWeight: FontWeight.w900,
        letterSpacing: 4,
        decoration: TextDecoration.underline,
      ),
    ),
    CuText(
      '超大字号',
      size: 32,
      colorType: CuColorType.primary,
      level: CuTextLevel.titleLarge,
    ),
    CuText(
      '合并样式',
      level: CuTextLevel.bodyMedium,
      style: TextStyle(fontStyle: FontStyle.italic, color: Colors.orange),
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 文本等级 (`CuTextLevel`) | 字体大小 (`CuFontSize`) | 字重 (`fontWeight`) |
| :--- | :--- | :--- |
| `titleLarge` | `CuFontSize.titleLarge` (20) | `FontWeight.bold` |
| `titleMedium` | `CuFontSize.titleMedium` (16) | `FontWeight.bold` |
| `titleSmall` | `CuFontSize.titleSmall` (14) | `FontWeight.bold` |
| `bodyLarge` | `CuFontSize.bodyLarge` (18) | `FontWeight.normal` |
| `bodyMedium` | `CuFontSize.bodyMedium` (16) | `FontWeight.normal` |
| `bodySmall` | `CuFontSize.bodySmall` (14) | `FontWeight.normal` |
| `captionLarge` | `CuFontSize.captionLarge` (15) | `FontWeight.normal` |
| `captionMedium` | `CuFontSize.captionMedium` (13) | `FontWeight.normal` |
| `captionSmall` | `CuFontSize.captionSmall` (12) | `FontWeight.normal` |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `value` | `dynamic` | — | 显示的值（必填） |
| `color` | `Color?` | — | 文本颜色 |
| `colorType` | `CuColorType?` | — | 文本颜色类型 |
| `size` | `double?` | — | 字体大小 |
| `type` | `CuTextType` | `defaultType` | 文本类型 |
| `mask` | `bool` | `false` | 是否开启脱敏 |
| `currency` | `String` | `'¥'` | 金额货币符号 |
| `precision` | `int` | `2` | 金额小数位数 |
| `maskStart` | `int` | `3` | 脱敏起始位置 |
| `maskEnd` | `int` | `4` | 脱敏结束位置 |
| `maskChar` | `String` | `'*'` | 脱敏替换字符 |
| `ellipsis` | `bool` | `false` | 是否省略号 |
| `lines` | `int` | `1` | 最大行数 |
| `selectable` | `bool` | `false` | 是否可选择 |
| `space` | `String?` | — | 显示连续空格 |
| `decode` | `bool` | `false` | 是否解码 |
| `preWrap` | `bool` | `true` | 是否保留单词 |
| `child` | `Widget?` | — | 子组件 |
| `level` | `CuTextLevel` | `bodyMedium` | 文本等级 |
| `style` | `TextStyle?` | — | 自定义文本样式 |
| `textAlign` | `TextAlign?` | — | 文本对齐方式 |

### 内部逻辑优先级
1. **颜色优先级**：`color` > `colorType` > `level` 匹配 > 默认主题色。
2. **内容格式化优先级**：根据 `type` 枚举值对 `value` 进行格式化，手机号、姓名、金额等类型有专门的格式化逻辑。
3. **脱敏逻辑**：仅在 `mask` 为 `true` 且 `type` 为 `phone`/`name`/`card`/`email` 时生效。
4. **组件选择**：`selectable` 为 `true` 时渲染 `SelectableText`，否则渲染 `Text`。
5. **样式合并**：最终样式 = 基础样式（来自 `level`）.copyWith(color, size).merge(style)。
6. **Caption 文本颜色**：`captionLarge`/`captionMedium`/`captionSmall` 等级自动使用 `textTertiaryColor`。

---

> **AI Prompt Context**: 关键词：`Text`, `CuText`, `文本`, `脱敏`, `格式化`。原则：优先使用 `colorType` 而非直接传入 `color`；金额展示必须使用 `type: CuTextType.amount`；敏感信息展示时务必设置 `mask: true`。
