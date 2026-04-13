
# CuIcon 图标组件 (Icon)

`CuIcon` 是 `curb_ui` 库的基础视觉组件，基于 `StatelessWidget` 实现。该组件支持原生 `IconData`、SVG 资源（本地/网络）及图片资源，通过 `CuTheme` 和 `CuFontSize` 提供语义化配置，解决了统一视觉风格和多资源类型适配的业务场景。

---

## 1. 基础用法

通过 `colorType` 属性定义组件的核心视觉基调。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuIcon(Icons.home, colorType: CuColorType.primary),
    CuIcon(Icons.check_circle, colorType: CuColorType.success),
    CuIcon(Icons.info, colorType: CuColorType.info),
    CuIcon(Icons.warning, colorType: CuColorType.warning),
    CuIcon(Icons.error, colorType: CuColorType.error),
    CuIcon(Icons.favorite, colorType: CuColorType.dark),
  ],
)
```
:::

## 2. 视觉配置

### 自定义颜色

通过 `color` 属性可直接覆盖主题语义色，提供精确的颜色定制。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuIcon(Icons.star, color: Colors.amber),
    CuIcon(Icons.palette, color: Colors.purple),
    CuIcon(Icons.cloud, color: Colors.lightBlue),
    CuIcon(Icons.grass, color: Colors.green),
  ],
)
```
:::

### 彩色模式

通过 `colorful` 属性保留 SVG 原有的多色效果，仅适用于 SVG 资源。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuIcon('assets/svgs/apple.svg', size: CuFontSize.iconLarge, colorful: false),
    CuIcon('assets/svgs/apple.svg', size: CuFontSize.iconLarge, colorful: true),
  ],
)
```
:::

## 3. 交互状态

### SVG 资源类型

展示不同类型资源的渲染表现，包括本地 SVG、网络 SVG 和图片资源。

:::demo
```dart
Row(
  spacing: 12,
  children: [
    CuIcon(Icons.shopping_cart, colorType: CuColorType.primary),
    CuIcon('assets/svgs/search.svg', colorType: CuColorType.info),
    CuIcon('assets/images/icon-1.png', width: 30, height: 30),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 尺寸规格

支持通过 `size` 属性使用语义化常量定义尺寸，或通过 `width`/`height` 精确控制。

:::demo
```dart
Row(
  spacing: 12,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    CuIcon(Icons.settings, size: CuFontSize.iconSmall),
    CuIcon(Icons.settings, size: CuFontSize.iconMedium),
    CuIcon(Icons.settings, size: CuFontSize.iconLarge),
    CuIcon(Icons.settings, size: 40),
  ],
)
```
:::

### 资源类型模式

根据传入的 `icon` 参数类型自动适配渲染模式：`IconData` 渲染原生图标、`.svg` 后缀渲染矢量图、其他图片后缀渲染位图。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    Row(
      spacing: 12,
      children: [
        Column(
          spacing: 4,
          children: [
            CuIcon(Icons.mobile_friendly, size: CuFontSize.iconLarge, colorType: CuColorType.primary),
            CuText('IconData', size: CuFontSize.captionSmall),
          ],
        ),
        Column(
          spacing: 4,
          children: [
            CuIcon('assets/svgs/back.svg', size: CuFontSize.iconLarge, colorType: CuColorType.success),
            CuText('SVG', size: CuFontSize.captionSmall),
          ],
        ),
        Column(
          spacing: 4,
          children: [
            CuIcon('assets/images/icon-2.png', width: 30, height: 30),
            CuText('Image', size: CuFontSize.captionSmall),
          ],
        ),
      ],
    ),
  ],
)
```
:::

## 5. 高级自定义

展示如何通过 `width`、`height` 及自定义尺寸进行深度定制。

:::demo
```dart
Column(
  spacing: 12,
  children: [
    // 自定义宽高
    Row(
      spacing: 12,
      children: [
        CuIcon(Icons.aspect_ratio, width: 40, height: 20, colorType: CuColorType.primary),
        CuIcon('assets/svgs/setting.svg', width: 50, height: 30),
      ],
    ),
    // 网络 SVG
    Row(
      spacing: 12,
      children: [
        CuIcon(
          'https://example.com/icon.svg',
          size: CuFontSize.iconLarge,
          colorType: CuColorType.info,
        ),
      ],
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考

| 尺寸常量 (`CuFontSize`) | 尺寸数值 (`size`) | 说明 |
| :--- | :--- | :--- |
| `iconSmall` | `18` | 小图标尺寸 |
| `iconMedium` | `24` | 默认图标尺寸 |
| `iconLarge` | `30` | 大图标尺寸 |

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `icon` | `dynamic` | — | 图标资源，支持 `IconData` 或 `String`（SVG/图片路径） |
| `size` | `double?` | `CuFontSize.iconMedium` | 统一尺寸（宽高相同） |
| `width` | `double?` | — | 自定义宽度，优先级高于 `size` |
| `height` | `double?` | — | 自定义高度，优先级高于 `size` |
| `color` | `Color?` | — | 自定义颜色，优先级高于 `colorType` |
| `colorType` | `CuColorType?` | `CuColorType.dark` | 语义化颜色类型 |
| `colorful` | `bool` | `false` | 是否保留 SVG 原有颜色 |

### 内部逻辑优先级

1. **颜色优先级**：若 `color` 非空，则忽略 `colorType` 配置；默认使用 `CuColorType.dark`。
2. **尺寸优先级**：`width`/`height` 显式定义的数值优先级高于 `size` 预设；SVG 资源默认使用 `size` 同时控制宽高。
3. **资源类型判断**：先判断 `IconData`，再判断 `.svg` 后缀，最后判断图片后缀（`.png`/`.jpg`/`.jpeg`/`.gif`）。
4. **网络 SVG 处理**：自动将 `http://` 升级为 `https://`，并添加无缓存请求头。
5. **彩色模式约束**：`colorful` 仅在 SVG 资源且颜色非透明时生效，此时不应用颜色滤镜。

---

&gt; **AI Prompt Context**: 关键词：`Icon`, `CuIcon`, `图标`。原则：优先使用 `colorType` 语义化配色；SVG 资源推荐使用 `colorful` 保留原效果；网络资源会自动升级为 HTTPS。
