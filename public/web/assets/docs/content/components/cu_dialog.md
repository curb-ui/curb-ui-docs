# CuDialog & CuConfirm 对话框组件 (Dialog & Confirm)

`CuDialog` 是 `curb_ui` 库的通用弹窗容器，基于 `showGeneralDialog` 实现，支持自定义内容与样式；`CuConfirm` 是 `CuDialog` 的扩展，专门用于确认型业务场景，内置确认/取消按钮与状态回调。

---

## 1. 基础用法

### CuDialog 基础弹窗
通过 `title` 和 `content` 展示核心信息，支持静态内容渲染。

:::demo
```dart
CuButton(
  label: '显示简单弹窗',
  onTap: () {
    CuDialog.show(
      content: const Text('这是一个最基础的通用弹窗内容'),
      title: '温馨提示',
    );
  },
)
```
:::

### CuConfirm 基础确认框
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

### CuDialog 关闭按钮位置
通过 `config.closeOutside` 控制关闭按钮在弹窗内部或外部。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '内部关闭',
      onTap: () {
        CuDialog.show(
          content: const Text('关闭按钮位于弹窗右上角'),
          config: const CuDialogConfig(
            showCuose: true,
            closeOutside: false,
          ),
        );
      },
    ),
    CuButton(
      label: '外部关闭',
      onTap: () {
        CuDialog.show(
          content: const Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.card_giftcard, size: 60, color: Colors.orange),
              SizedBox(height: CuSpacing.medium),
              CuText('恭喜获得新手礼包', level: CuTextLevel.titleMedium),
              SizedBox(height: CuSpacing.small),
              CuText('礼包已放入您的账户，请查收。'),
            ],
          ),
          config: const CuDialogConfig(
            showCuose: true,
            closeOutside: true,
          ),
        );
      },
    ),
  ],
)
```
:::

### CuConfirm 布局对齐
通过 `config.center` 控制内容与按钮的对齐方式。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '左对齐 (默认)',
      onTap: () => CuConfirm.show(
        message: '默认模式下，文字和按钮都会向左侧对齐。',
        title: '左对齐',
      ),
    ),
    CuButton(
      type: CuColorType.primary,
      label: '居中模式',
      onTap: () => CuConfirm.show(
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

### CuDialog 遮罩控制
通过 `config.barrierDismissible` 控制点击遮罩是否关闭弹窗。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '可点击遮罩关闭',
      onTap: () {
        CuDialog.show(
          content: const Text('点击背景空白区域即可关闭'),
          title: '提示',
          config: const CuDialogConfig(barrierDismissible: true),
        );
      },
    ),
    CuButton(
      type: CuColorType.error,
      plain: true,
      label: '禁止遮罩点击关闭',
      onTap: () {
        CuDialog.show(
          content: const Text('你必须点击关闭按钮才能离开'),
          title: '温馨提示',
          config: const CuDialogConfig(barrierDismissible: false),
        );
      },
    ),
  ],
)
```
:::

### CuConfirm 危险操作模式
通过 `config.danger` 将确认按钮变为红色警告色，强调操作的不可逆性。

:::demo
```dart
CuButton(
  type: CuColorType.error,
  label: '危险操作',
  onTap: () => CuConfirm.show(
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

---

## 4. 尺寸与模式

### CuDialog 自定义尺寸
通过 `config.width` 控制弹窗宽度，默认自适应屏幕宽度的 85%。

:::demo
```dart
CuButton(
  label: '自定义弹窗宽度',
  onTap: () {
    CuDialog.show(
      content: const Text('这个弹窗的宽度被限制为 300 像素'),
      title: '自定义尺寸',
      config: const CuDialogConfig(width: 300),
    );
  },
)
```
:::

### CuConfirm 按钮可见性控制
通过 `config.showCancel` 和 `config.showConfirm` 控制按钮显示。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      type: CuColorType.dark,
      label: '隐藏取消按钮',
      onTap: () => CuConfirm.show(
        message: '只有确认按钮的对话框，通常用于重要通知。',
        config: const CuConfirmConfig(showCancel: false),
      ),
    ),
    CuButton(
      plain: true,
      label: '纯文本模式',
      onTap: () => CuConfirm.show(message: '不带标题的对话框，显得更加轻量。'),
    ),
  ],
)
```
:::

---

## 5. 高级自定义

### CuDialog 完全自定义内容
通过 `contentBuilder` 构建完全自定义的弹窗内容，不受默认布局约束。

:::demo
```dart
CuButton(
  label: '自定义弹窗内容',
  type: CuColorType.warning,
  onTap: () {
    CuDialog.show(
      contentBuilder: (context) {
        return Container(
          width: 300,
          height: 400,
          decoration: BoxDecoration(
            borderRadius: CuRadius.mediumRadius,
          ),
          clipBehavior: Clip.antiAlias,
          child: CuImage(
            'https://picsum.photos/300/400',
            borderRadius: CuRadius.mediumRadius,
          ),
        );
      },
      config: const CuDialogConfig(
        showCuose: true,
        closeOutside: true,
      ),
    );
  },
)
```
:::

### CuConfirm 自定义按钮文字与回调
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
      onTap: () => CuConfirm.show(
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
      onTap: () => CuConfirm.show(
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

---

## 6. 技术规范与逻辑映射

### CuDialog 布局约束参考
| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `width` | `Screen.width * 0.85` | 弹窗宽度 |
| `maxHeight` | `Screen.height * 0.7` | 弹窗最大高度 |
| `backgroundColor` | `theme.bgColorContainer` | 弹窗背景色 |
| `borderRadius` | `CuRadius.largeRadius` | 弹窗圆角 |
| `barrierColor` | `Colors.black.withValues(alpha: 0.5)` | 遮罩颜色 |

### CuConfirm 布局约束参考
| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `width` | `Screen.width * 0.76` | 弹窗宽度 |
| `padding` | `CuSpacing.mediumAll` | 弹窗内边距 |
| `backgroundColor` | `theme.bgColorContainer` | 弹窗背景色 |
| `borderRadius` | `CuRadius.mediumRadius` | 弹窗圆角 |
| `barrierColor` | `Colors.black54` | 遮罩颜色 |

### 属性定义 (API) - CuDialog

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `content` | `Widget?` | — | 弹窗内容 |
| `contentBuilder` | `Widget Function(BuildContext)?` | — | 自定义内容构建器 |
| `config` | `CuDialogConfig` | `CuDialogConfig()` | 弹窗配置 |

### 属性定义 (API) - CuDialogConfig

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `showCuose` | `bool` | `true` | 是否显示关闭按钮 |
| `closeOutside` | `bool` | `false` | 关闭按钮是否在外部 |
| `width` | `double?` | — | 弹窗宽度 |
| `padding` | `EdgeInsetsGeometry?` | — | 弹窗内边距 |
| `barrierDismissible` | `bool` | `true` | 点击遮罩是否关闭 |
| `barrierColor` | `Color?` | — | 遮罩颜色 |
| `backgroundColor` | `Color?` | — | 弹窗背景色 |

### 属性定义 (API) - CuConfirm

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

#### CuDialog 逻辑优先级
1. **内容优先级**：若 `contentBuilder` 非空，则完全忽略默认布局，仅渲染自定义内容。
2. **关闭按钮优先级**：`showCuose` 控制关闭按钮显示，`closeOutside` 控制位置（内/外）。
3. **尺寸优先级**：显式 `config.width` 优先级高于默认自适应宽度。
4. **遮罩逻辑**：`barrierDismissible` 控制点击遮罩行为，`barrierColor` 控制遮罩透明度。

#### CuConfirm 逻辑优先级
1. **内容优先级**：`titleWidget` 覆盖 `title`，`messageWidget` 覆盖 `message`。
2. **按钮优先级**：`showCancel` 和 `showConfirm` 分别控制对应按钮的显示。
3. **按钮文案优先级**：`confirmText` 和 `cancelText` 覆盖默认国际化文案。
4. **交互优先级**：`onConfirm` 和 `onCancel` 回调会在返回结果前执行。
5. **关闭逻辑**：默认 `barrierDismissible` 为 `false`，确保用户必须做出选择。

---

> **AI Prompt Context**: 关键词：`Dialog`, `Confirm`, `CuDialog`, `CuConfirm`, `弹窗`, `确认框`。原则：优先使用 `title` + `content`（CuDialog）或 `title` + `message`（CuConfirm）；危险操作必须设置 `danger: true`；CuConfirm 默认禁止点击遮罩关闭；自定义内容优先使用 `contentBuilder`。
