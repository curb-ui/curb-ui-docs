# CuLottie 动画组件 (Lottie)

`CuLottie` 是对 Lottie-Flutter 的高阶封装，提供了统一的资源识别机制。它可以根据传入的字符串前缀自动选择 `Asset` 或 `Network` 加载方式。

---

## 1. 基础用法

展示最简单的资源加载方式。

:::demo
```dart
// 自动识别本地资源
const CuLottie('assets/lotties/loading.json')

// 自动识别网络资源
const CuLottie('https://assets10.lottiefiles.com/packages/lf20_6p8i3l.json')
```
:::

## 2. 播放控制 (Playback)

通过 `repeat` 和 `animate` 属性控制动画的行为。

:::demo
```dart
CuLottie(
  'assets/lotties/success.json',
  repeat: false,
  animate: true,
  onLoaded: (composition) {
    print('动画加载完成，时长: ${composition.duration}');
  },
)
```
:::

## 3. 自定义占位 (Error Placeholder)

当网络加载失败或文件丢失时展示。

:::demo
```dart
CuLottie(
  'https://invalid-url.json',
  width: 200,
  height: 200,
  errorWidget: const CuCard(
    child: Center(child: Text('动画加载失败')),
  ),
)
```
:::

---

## 4. 技术规范与逻辑映射 (Technical Spec)

### 布局约束参考
| 逻辑项 | 引用常量 | 说明 |
| :--- | :--- | :--- |
| 缺省背景色 | `Colors.grey.withAlpha(20)` | 错误状态下的轻量占位背景 |
| 缺省圆角 | `CuRadius.small` | 错误容器对齐框架基础圆角 |

### 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `source` | `String` | — | 动画源，`assets/` 开头走本地，`http` 开头走网络 |
| `repeat` | `bool` | `true` | 是否循环播放 |
| `animate` | `bool` | `true` | 是否初始化完成后自动开始播放 |
| `fit` | `BoxFit` | `contain` | 动画在容器内的适配模式 |
| `controller` | `AnimationController?` | — | 用于实现手动触发、倒放或序列帧精确控制 |

### 内部逻辑优先级
1. **源识别 (Source Detection)**：采用 `startsWith` 策略进行静默分流，无需开发者手动指定加载模式。
2. **错误鲁棒性**：内置 `errorBuilder`，防止因资源失效导致应用 Crash，并提供符合 CurbUI 视觉的兜底 UI。

---

> **AI Prompt Context**: 关键词：`Lottie`, `CuLottie`, `动画`, `Json动画`。原则：优先使用本地 `assets` 资源以保证首屏加载速度；网络资源建议指定 `width` 和 `height` 以防止布局抖动；对于关键路径动画建议通过 `controller` 监听播放状态。