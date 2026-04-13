
# CuConfirm 确认对话框 (Confirm)

`CuConfirm` 是 `curb_ui` 库的确认型弹窗组件，基于 `showGeneralDialog` 实现，专门用于确认型业务场景，内置确认/取消按钮与状态回调。

---

## 1. 基础用法

通过 `title` 和 `message` 展示确认信息，内置确认/取消按钮，返回 `bool?` 类型结果。

:::demo
```dart
CuButton(
  label: '标准确认框',
  onTap: () async {
    bool? result = await CuConfirm.show(
      message: '这是一个标准确认对话框，点击遮罩不可关闭。',
      title: '提示',
    );
    print('确认结果: $result');
  },
)
```
:::

---

## 2. 视觉配置

### 布局对齐
通过 `config.center` 控制内容与按钮的对齐方式。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '左对齐 (默认)',
      onTap: () =&gt; CuConfirm.show(
        message: '默认模式下，文字和按钮都会向左侧对齐。',
        title: '左对齐',
      ),
    ),
    CuButton(
      type: CuColorType.primary,
      label: '居中模式',
      onTap: () =&gt; CuConfirm.show(
        message: '居中模式下，内容和操作按钮都会水平居中，视觉更加平衡。',
        title: '居中确认',
        config: const CuConfirmConfig(center: true),
      ),
    ),
  ],
)
```
:::

---

## 3. 交互状态

### 危险操作模式
通过 `config.danger` 将确认按钮变为红色警告色，强调操作的不可逆性。

:::demo
```dart
CuButton(
  type: CuColorType.error,
  label: '危险操作',
  onTap: () =&gt; CuConfirm.show(
    message: '此操作不可逆，确定要永久删除该文件吗？',
    title: '高风险操作',
    config: const CuConfirmConfig(
      danger: true,
      confirmText: '彻底删除',
    ),
  ),
)
```
:::

### 遮罩控制
通过 `config.barrierDismissible` 控制点击遮罩是否关闭弹窗。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '可点击遮罩关闭',
      onTap: () {
        CuConfirm.show(
          message: '点击背景空白区域即可关闭',
          title: '提示',
          config: const CuConfirmConfig(barrierDismissible: true),
        );
      },
    ),
    CuButton(
      type: CuColorType.error,
      plain: true,
      label: '禁止遮罩点击关闭',
      onTap: () {
        CuConfirm.show(
          message: '你必须点击按钮才能离开',
          title: '温馨提示',
          config: const CuConfirmConfig(barrierDismissible: false),
        );
      },
    ),
  ],
)
```
:::

---

## 4. 特殊模式与尺寸

### 按钮可见性控制
通过 `config.showCancel` 和 `config.showConfirm` 控制按钮显示。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      type: CuColorType.dark,
      label: '隐藏取消按钮',
      onTap: () =&gt; CuConfirm.show(
        message: '只有确认按钮的对话框，通常用于重要通知。',
        config: const CuConfirmConfig(showCancel: false),
      ),
    ),
    CuButton(
      plain: true,
      label: '纯文本模式',
      onTap: () =&gt; CuConfirm.show(message: '不带标题的对话框，显得更加轻量。'),
    ),
  ],
)
```
:::

---

## 5. 高级自定义

### 自定义按钮文字与回调
通过 `config.confirmText` 和 `config.cancelText` 自定义按钮文案，通过 `onConfirm` 和 `onCancel` 处理业务逻辑。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      plain: true,
      type: CuColorType.warning,
      label: '自定义按钮文字',
      onTap: () =&gt; CuConfirm.show(
        message: '你可以随意修改按钮的标签内容。',
        config: const CuConfirmConfig(
          confirmText: '好哒',
          cancelText: '算了',
        ),
      ),
    ),
    CuButton(
      type: CuColorType.success,
      label: '执行回调',
      onTap: () =&gt; CuConfirm.show(
        message: '点击确定将触发 onConfirm 回调逻辑。',
        onConfirm: () {
          CuToast.success('处理成功');
        },
        onCancel: () {
          CuToast.info('已取消操作');
        },
      ),
    ),
  ],
)
```
:::

### 自定义标题与内容
通过 `titleWidget` 和 `messageWidget` 传入自定义 Widget 来完全控制标题和内容的展示。

:::demo
```dart
CuButton(
  label: '自定义标题与内容',
  onTap: () =&gt; CuConfirm.show(
    titleWidget: Row(
      children: [
        Icon(Icons.warning_amber, color: CuThemeColor.amber, size: 24),
        SizedBox(width: CuSpacing.small),
        CuText('警告', level: CuTextLevel.titleMedium),
      ],
    ),
    messageWidget: Container(
      padding: CuSpacing.mediumAll,
      decoration: BoxDecoration(
        color: CuThemeColor.amber.withOpacity(0.1),
        borderRadius: CuRadius.smallRadius,
      ),
      child: CuText('这是一条自定义内容的警告信息，请谨慎操作。'),
    ),
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考

| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `width` | `Screen.width * 0.76` | 弹窗宽度 |
| `padding` | `CuSpacing.mediumAll` | 弹窗内边距 |
| `backgroundColor` | `theme.bgColorContainer` | 弹窗背景色 |
| `borderRadius` | `CuRadius.mediumRadius` | 弹窗圆角 |
| `barrierColor` | `Colors.black54` | 遮罩颜色 |

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `message` | `String?` | — | 弹窗内容文本 |
| `titleWidget` | `Widget?` | — | 自定义标题组件 |
| `messageWidget` | `Widget?` | — | 自定义内容组件 |
| `onConfirm` | `VoidCallback?` | — | 确认回调 |
| `onCancel` | `VoidCallback?` | — | 取消回调 |
| `config` | `CuConfirmConfig` | `CuConfirmConfig()` | 弹窗配置 |

### 属性定义 (API) - CuConfirmConfig

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `confirmText` | `String?` | — | 确认按钮文字 |
| `cancelText` | `String?` | — | 取消按钮文字 |
| `danger` | `bool` | `false` | 是否为危险操作模式 |
| `barrierDismissible` | `bool` | `false` | 点击遮罩是否关闭 |
| `showCancel` | `bool` | `true` | 是否显示取消按钮 |
| `showConfirm` | `bool` | `true` | 是否显示确认按钮 |
| `center` | `bool` | `false` | 是否居中对齐 |

### 内部逻辑优先级

1. **内容优先级**：`titleWidget` 覆盖 `title`，`messageWidget` 覆盖 `message`。
2. **按钮优先级**：`showCancel` 和 `showConfirm` 分别控制对应按钮的显示。
3. **按钮文案优先级**：`confirmText` 和 `cancelText` 覆盖默认国际化文案。
4. **交互优先级**：`onConfirm` 和 `onCancel` 回调会在返回结果前执行。
5. **关闭逻辑**：默认 `barrierDismissible` 为 `false`，确保用户必须做出选择。

---

&gt; **AI Prompt Context**: 关键词：`Confirm`, `CuConfirm`, `确认框`, `对话框`。原则：优先使用 `title` + `message`；危险操作必须设置 `danger: true`；默认禁止点击遮罩关闭；自定义内容优先使用 `titleWidget` 和 `messageWidget`。
