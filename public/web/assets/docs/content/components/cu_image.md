
# CuImage 图片组件 (Image)

`CuImage` 是 `curb_ui` 库的基础视觉组件，基于 `StatelessWidget` 实现。该组件基于 `Image.asset` 和 `CachedNetworkImage` 封装，统一处理本地资源与网络图片加载，支持缓存管理、缩放交互、自定义占位符等特性，解决了多场景图片展示的业务需求。

---

## 1. 基础用法

通过 `source` 属性传入图片路径，自动识别本地资源（以 `assets/` 开头）或网络资源。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuImage(
      'https://picsum.photos/200',
      width: 200,
      height: 200,
      borderRadius: CuRadius.mediumRadius,
    ),
    CuImage(
      'assets/images/demo.png',
      width: 200,
      height: 200,
      borderRadius: CuRadius.mediumRadius,
    ),
  ],
)
```
:::

## 2. 视觉配置

### 圆角与边框
通过 `borderRadius` 和 `border` 属性定制图片的外观样式。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    CuImage(
      'https://picsum.photos/120',
      width: 120,
      height: 120,
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/120',
      width: 120,
      height: 120,
      borderRadius: CuRadius.largeRadius,
    ),
    CuImage(
      'https://picsum.photos/120',
      width: 120,
      height: 120,
      borderRadius: CuRadius.roundedRadius,
      border: Border.all(color: Colors.blue, width: 2),
    ),
  ],
)
```
:::

### 背景色
通过 `backgroundColor` 属性设置图片容器的背景色。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuImage(
      'https://picsum.photos/100',
      width: 100,
      height: 100,
      backgroundColor: Colors.grey[200],
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/100',
      width: 100,
      height: 100,
      backgroundColor: Colors.blue[50],
      borderRadius: CuRadius.smallRadius,
    ),
  ],
)
```
:::

## 3. 交互状态

### 加载与错误状态
组件内置默认占位符与错误组件，可通过 `placeholder` 和 `errorWidget` 自定义。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuImage(
      'https://invalid-url-for-demo.com/image.jpg',
      width: 200,
      height: 200,
      borderRadius: CuRadius.mediumRadius,
    ),
    CuImage(
      'https://invalid-url-for-demo.com/image.jpg',
      width: 200,
      height: 200,
      borderRadius: CuRadius.mediumRadius,
      errorWidget: Container(
        color: Colors.red[50],
        child: const Center(child: Text('加载失败')),
      ),
    ),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 缩放模式
通过 `enableZoom` 属性启用双指缩放功能。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuText('可缩放图片', size: CuFontSize.bodyMedium),
    CuImage(
      'https://picsum.photos/300',
      width: 300,
      height: 300,
      borderRadius: CuRadius.mediumRadius,
      enableZoom: true,
    ),
  ],
)
```
:::

### 尺寸规格
通过 `width` 和 `height` 精确控制图片尺寸。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  crossAxisAlignment: CrossAxisAlignment.end,
  children: [
    CuImage(
      'https://picsum.photos/80',
      width: 80,
      height: 80,
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/120',
      width: 120,
      height: 120,
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/160',
      width: 160,
      height: 160,
      borderRadius: CuRadius.smallRadius,
    ),
  ],
)
```
:::

### 填充模式
通过 `fit` 属性控制图片的填充方式。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuImage(
      'https://picsum.photos/200/300',
      width: 100,
      height: 100,
      fit: BoxFit.cover,
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/200/300',
      width: 100,
      height: 100,
      fit: BoxFit.contain,
      borderRadius: CuRadius.smallRadius,
    ),
    CuImage(
      'https://picsum.photos/200/300',
      width: 100,
      height: 100,
      fit: BoxFit.fill,
      borderRadius: CuRadius.smallRadius,
    ),
  ],
)
```
:::

## 5. 高级自定义

展示如何深度定制占位符、错误组件及监听加载回调。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuImage(
      'https://picsum.photos/250',
      width: 250,
      height: 250,
      borderRadius: CuRadius.largeRadius,
      placeholder: Container(
        color: Colors.grey[100],
        child: const Center(
          child: CuText('加载中...', size: CuFontSize.captionSmall),
        ),
      ),
      onLoading: () {
        debugPrint('图片开始加载');
      },
      onError: () {
        debugPrint('图片加载失败');
      },
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `source` | `String` | — | 图片资源路径，本地资源以 `assets/` 开头 |
| `width` | `double?` | — | 图片宽度 |
| `height` | `double?` | — | 图片高度 |
| `fit` | `BoxFit?` | `BoxFit.cover` | 图片填充方式 |
| `placeholder` | `Widget?` | — | 自定义加载占位符 |
| `errorWidget` | `Widget?` | — | 自定义错误组件 |
| `borderRadius` | `BorderRadius?` | — | 圆角配置 |
| `border` | `BoxBorder?` | — | 边框配置 |
| `backgroundColor` | `Color?` | — | 背景色 |
| `onLoading` | `VoidCallback?` | — | 加载开始回调 |
| `onError` | `VoidCallback?` | — | 加载失败回调 |
| `enableZoom` | `bool` | `false` | 是否启用双指缩放 |

### 内部逻辑优先级

1. **资源类型判断**：优先判断 `source` 是否以 `assets/` 开头，是则使用 `Image.asset`，否则使用 `CachedNetworkImage`。
2. **空资源处理**：若 `source` 为空字符串，返回指定宽高的空 `SizedBox`。
3. **缩放功能优先级**：`enableZoom` 为 `true` 时，使用 `InteractiveViewer` 包裹图片内容，最大缩放比例 3.0，最小 1.0。
4. **视觉容器优先级**：图片内容被包裹在 `Container` 中，依次应用 `backgroundColor`、`border`、`borderRadius`，再通过 `ClipRRect` 裁剪。
5. **占位符与错误组件优先级**：自定义 `placeholder` 优先于默认占位符；自定义 `errorWidget` 优先于默认错误组件。

---

> **AI Prompt Context**: 关键词：`Image`, `CuImage`, `图片`。原则：优先使用 `source` 传入资源路径；网络图片自动启用缓存；缩放功能通过 `enableZoom` 启用；本地资源必须以 `assets/` 开头。
