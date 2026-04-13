<!-- 存储路径：/docs/components/cu_toast.md -->

# CuToast 轻提示组件 (Toast)

`CuToast` 是 `curb_ui` 库的轻量级提示组件，基于 `OverlayEntry` 实现全局悬浮层渲染。该组件集成了 `AnimationController` 提供平滑的入场（缩放+淡入）与退场动画，并通过 `CuDialogManage` 管理导航上下文，无需依赖 `BuildContext` 即可在逻辑层直接调用。

## 1. 基础用法

通过 `type` 属性展示组件的核心视觉基调。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: 'Success',
      type: CuColorType.success,
      onTap: () => CuToast.success('提交成功'),
    ),
    CuButton(
      label: 'Error',
      type: CuColorType.error,
      onTap: () => CuToast.error('上传失败'),
    ),
    CuButton(
      label: 'Warning',
      type: CuColorType.warning,
      onTap: () => CuToast.warning('账户余额不足'),
    ),
    CuButton(
      label: 'Info',
      type: CuColorType.info,
      onTap: () => CuToast.info('请阅读并同意协议'),
    ),
  ],
)
```
:::

## 2. 视觉配置 (Visual Config)

### 变体模式
展示 `dark` 和 `light` 等主题变体。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: 'Dark Theme',
      onTap: () => CuToast.show(
        '深色主题',
        config: const CuToastConfig(type: CuToastType.dark),
      ),
    ),
    CuButton(
      label: 'Light Theme',
      type: CuColorType.light,
      onTap: () => CuToast.show(
        '浅色主题',
        config: const CuToastConfig(type: CuToastType.light),
      ),
    ),
  ],
)
```
:::

### 形状/布局定制
展示 `position` 和 `vertical` 等布局定制。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '顶部弹出',
      onTap: () => CuToast.show(
        '欢迎回来！',
        config: const CuToastConfig(position: CuToastPosition.top),
      ),
    ),
    CuButton(
      label: '居中弹出',
      onTap: () => CuToast.show(
        '正在处理中...',
        config: const CuToastConfig(position: CuToastPosition.center),
      ),
    ),
    CuButton(
      label: '底部弹出',
      onTap: () => CuToast.show('默认底部通知'),
    ),
  ],
)
```
:::

## 3. 交互状态 (Interaction States)

展示 `loading` 和 `allowMultiple` 等交互状态。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '多实例并存',
      onTap: () {
        CuToast.show('第一条消息', config: const CuToastConfig(allowMultiple: true));
        Future.delayed(const Duration(milliseconds: 500), () {
          CuToast.show('第二条消息', config: const CuToastConfig(allowMultiple: true, position: CuToastPosition.top));
        });
      },
    ),
    CuButton(
      label: '单实例切换 (清空前一个)',
      type: CuColorType.primary,
      onTap: () => CuToast.show('始终只显示最新的一条', config: const CuToastConfig(allowMultiple: false)),
    ),
    CuButton(
      label: '显示 Loading (3秒后关闭)',
      onTap: () {
        CuToast.loading('加载中...');
        Future.delayed(const Duration(seconds: 3), () {
          CuToast.closeLoading();
        });
      },
    ),
  ],
)
```
:::

## 4. 特殊模式与尺寸 (Patterns & Sizes)

### 特殊模式
展示 `vertical` 等特殊模式。

:::demo
```dart
CuButton(
  label: '垂直成功提示',
  type: CuColorType.success,
  onTap: () => CuToast.success(
    '支付成功',
    config: const CuToastConfig(
      vertical: true,
      position: CuToastPosition.center,
    ),
  ),
)
```
:::

## 5. 高级自定义 (Advanced Customization)

展示如何覆盖默认样式，如 `backgroundColor`、`textColor` 和 `padding` 等。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '自定义颜色',
      onTap: () => CuToast.show(
        '自定义背景和文字颜色',
        config: CuToastConfig(
          backgroundColor: Colors.purple,
          textColor: Colors.white,
          iconColor: Colors.yellow,
        ),
      ),
    ),
    CuButton(
      label: '自定义内边距',
      onTap: () => CuToast.show(
        '自定义内边距的 Toast',
        config: CuToastConfig(
          padding: const EdgeInsets.all(20),
        ),
      ),
    ),
  ],
)
```
:::

## 6. 技术规范与逻辑映射 (Technical Spec)

### 布局约束参考

| 逻辑项 | 引用常量/数值 | 说明 |
| :--- | :--- | :--- |
| 水平模式最小宽度 | `120px` | 确保 Toast 内容有足够的显示空间 |
| 水平模式最小高度 | `46px` | 确保 Toast 内容有足够的显示空间 |
| 垂直模式最小高度 | `100px` | 确保垂直布局下图标和文字有足够的显示空间 |
| 最大宽度限制 | 屏幕宽度 - `100px` | 左右边距各 50px，确保 Toast 不会撑满屏幕 |

### 属性定义 (API)

#### 静态方法 (Static Methods)

| 方法名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `show` | `(String message, {CuToastConfig config})` | 弹出通用 Toast |
| `loading` | `(String? msg, {CuLoadingType type, bool mask})` | 显示全屏 Loading（带可选遮罩） |
| `closeLoading` | `()` | **异步**关闭 Loading 并触发退场动画 |
| `clearAll` | `()` | 立即移除屏幕上所有的普通 Toast 实例 |
| `success/error/info/warning` | `(String msg, {CuToastConfig config})` | 语义化快捷方式 |

#### CuToastConfig 配置项

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `position` | `CuToastPosition` | `.bottom` | 弹出位置：`top`, `center`, `bottom` |
| `type` | `CuToastType` | `.dark` | 预设主题类型 |
| `duration` | `Duration` | `2s` | 自动关闭的倒计时时长 |
| `autoClose` | `bool` | `true` | 是否到达时长后自动关闭 |
| `allowMultiple` | `bool` | `false` | 是否允许同时弹出多个 Toast |
| `vertical` | `bool` | `false` | 是否启用垂直（上下）布局 |
| `showIcon` | `bool` | `true` | 是否渲染图标 |
| `backgroundColor` | `Color?` | — | 覆盖背景色（优先级最高） |
| `textColor` | `Color?` | — | 覆盖文字颜色 |
| `iconColor` | `Color?` | — | 覆盖图标颜色 |
| `padding` | `EdgeInsets?` | — | 自定义容器内边距 |

### 内部逻辑优先级

1. **状态隔离**：每个 Toast 实例由独立的 `_ToastWidgetState` 管理。即便 Overlay 发生刷新（由于其他 Entry 移除），已存在的 Toast 也会通过其持有的 `AnimationController` 状态锁防止重复触发入场动画。
2. **动画组合**：
   * **入场**：透明度 (0.0 -> 1.0) + 弹性缩放 (0.5 -> 1.0)。
   * **退场**：透明度 (1.0 -> 0.0) + 线性缩放 (1.0 -> 0.0)。
3. **约束控制**：
   * 水平模式最小宽度 `120px`，最小高度 `46px`。
   * 垂直模式最小高度 `100px`。
   * 最大宽度限制：屏幕宽度减去 `100px`（左右边距各 50px）。
4. **层级管理**：Toast 使用 `IgnorePointer` 包裹，确保不会拦截底层页面的点击事件；而 Loading 可通过 `mask` 属性开启 `ModalBarrier` 拦截交互。

> **AI Prompt Context**: 关键词：`Toast`, `CuToast`, `轻提示`, `加载中`。原则：优先使用语义化方法 `success/error/info/warning`；特殊场景使用 `loading` 方法，注意在 `finally` 块中调用 `closeLoading()`。