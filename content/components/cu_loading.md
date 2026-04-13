根据你提供的文档框架，我结合了 **CurbUI** 最新的 Logo 色调（靛蓝、亮青、活力紫）以及 `CuLoading.show` 全局单例的逻辑，对文档进行了深度完善。

---

# CuLoading 加载组件 (Loading)

`CuLoading` 提供了基于 **CurbUI** 视觉规范的加载反馈方案。它不仅包含用于 UI 局部占位的组件，还内置了基于 `Overlay` 的全局单例调用模式，支持原生质感与多种高性能动效的无缝切换。

---

## 1. 基础用法 (Basic)

最简单的调用方式。局部组件 `CuLoadingView` 默认使用 `circular` (原生圆环) 类型，全局单例 `CuLoading.show` 默认提供防误触遮罩。

:::demo
```dart
// 局部使用
const CuLoadingView(label: '正在加载')

// 全局调用
CuButton(
  label: '开启全局加载',
  onPressed: () => CuLoading.show('处理中...'),
)
```
:::

## 2. 视觉配置 (Visual Config)

### 动画形态 (Styles)
通过 `type` 切换。`circular` 类型应用了 `StrokeCap.round`，在视觉上比原生更圆润。

:::demo
```dart
Row(
  spacing: CuSpacing.large,
  children: [
    // 原生增强型 (建议用于基础加载)
    CuLoadingView(type: CuLoadingType.circular, size: 24),
    // 脉冲缩放 (建议用于 AI 或状态检测)
    CuLoadingView(type: CuLoadingType.pulse, color: Colors.teal),
    // 经典三点 (建议用于轻量级占位)
    CuLoadingView(type: CuLoadingType.threeBounce, size: 20),
  ],
)
```
:::

### 布局与文字排版
支持 `label` 注入，并通过 `vertical` 切换排列方向。在 `vertical: false` 模式下，组件会自动缩小间距以适应行内布局。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    // 纵向组合 (默认)
    CuLoadingView(label: '正在深度计算...', type: CuLoadingType.fadingCube),
    // 横向组合 (适合按钮或列表项)
    CuLoadingView(label: '同步中', vertical: false, size: 18),
  ],
)
```
:::

---

## 3. 全局单例模式 (Global Singleton)

`CuLoading` 提供了一个全局 Overlay 实例，能够阻塞用户交互并显示加载状态。

### 核心功能
* **智能更新**：多次调用 `.show()` 时，若 Loading 已存在，则仅平滑更新文字和类型，不会触发重复动画。
* **自动关闭**：通过 `config.duration` 设置自动消失时间。
* **防抖遮罩**：内置 `ModalBarrier`，开启 `mask: true` 后可防止用户重复点击底层业务按钮。

```dart
// 复杂场景示例：模拟异步步骤
CuLoading.show('准备环境...', type: CuLoadingType.doubleBounce);

await Future.delayed(Duration(seconds: 1));
// 仅更新文字与动画类型，UI 不闪烁
CuLoading.show('正在下载资源 (45%)', type: CuLoadingType.wave);

await Future.delayed(Duration(seconds: 2));
CuLoading.hide();
```

---

## 4. 技术规范 (Technical Spec)

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `type` | `CuLoadingType` | `.circular` | 动画类型：`circular` 为原生风格，其他为 SpinKit 风格 |
| `size` | `double` | `30.0` | 指示器尺寸。`CuLoading` 全局模式下弹窗会自动按比例缩放 |
| `color` | `Color?` | `theme.primary` | 动画与文字颜色。全局模式下默认使用白色反白 |
| `label` | `String?` | — | 提示文本。为 null 时仅渲染动画组件以提升性能 |
| `vertical` | `bool` | `true` | 排列方向。`false` 时使用 `CuSpacing.extraSmall` 间距 |
| `config` | `CuLoadingConfig` | — | 仅用于 `CuLoading.show`，包含背景色、持续时间等高级配置 |

### 设计映射逻辑
1. **对比度策略**：全局 `CuLoading` 默认背景色为 `#262626`（透明度 90%），建议文字颜色保持白色或亮青色以确保可读性。
2. **线条比例**：`circular` 和 `ring` 类型的线宽固定为 `size * 0.1`，确保在 16px 到 120px 之间均能保持视觉平衡。
3. **动画曲线**：全局弹窗进入使用 `Curves.easeOutBack`，退出使用 `reverse()` 动画，提供轻微的回弹感。

---

> **设计语言建议**: 
> * **品牌关联**: 推荐使用主色调 **靛蓝 (`#3A7BD5`)** 作为 Loading 颜色。
> * **场景选型**: 全局同步请求（如登录、支付）强制使用 `CuLoading.show`；局部内容加载（如列表上拉加载）推荐使用 `CuLoadingView` 配合 `threeBounce` 或 `wave`。