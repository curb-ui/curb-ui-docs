
# CuBanner 轮播图组件 (Banner)

`CuBanner` 是 `curb_ui` 库的内容展示组件，基于 `carousel_slider` 实现。该组件封装了图片轮播、指示器显示、自动播放等功能，解决了首页横幅、产品展示、活动推广等业务交互场景。

---

## 1. 基础用法

通过 `CuBannerItem` 定义轮播内容，配置 `CuBannerConfig` 实现基础轮播功能。

:::demo
```dart
final List&lt;CuBannerItem&gt; items = [
  CuBannerItem(
    imageUrl: "https://picsum.photos/800/400?random=1",
    title: "探索未来科技",
    onTap: () {},
  ),
  CuBannerItem(
    imageUrl: "https://picsum.photos/800/400?random=2",
    title: "春季新品上市",
    onTap: () {},
  ),
  CuBannerItem(
    imageUrl: "https://picsum.photos/800/400?random=3",
    title: "加入开发者社区",
    onTap: () {},
  ),
];

CuBanner(
  items: items,
  config: const CuBannerConfig(),
)
```
:::

## 2. 视觉配置

### 指示器类型
支持 `dot`（点指示器）、`number`（数字指示器）和 `none`（无指示器）三种模式。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        indicatorType: CuIndicatorType.dot,
      ),
    ),
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        indicatorType: CuIndicatorType.number,
      ),
    ),
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        indicatorType: CuIndicatorType.none,
      ),
    ),
  ],
)
```
:::

### 圆角与高度定制
通过 `borderRadius` 和 `height` 属性自定义组件的视觉形态。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuBanner(
      items: items,
      config: CuBannerConfig(
        height: 120,
        borderRadius: CuRadius.smallRadius,
      ),
    ),
    CuBanner(
      items: items,
      config: CuBannerConfig(
        height: 200,
        borderRadius: CuRadius.extraLargeRadius,
      ),
    ),
  ],
)
```
:::

## 3. 交互状态

### 自动播放控制
通过 `autoPlay` 和 `autoPlayInterval` 配置自动播放行为。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        autoPlay: true,
        autoPlayInterval: Duration(seconds: 3),
      ),
    ),
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        autoPlay: false,
      ),
    ),
  ],
)
```
:::

## 4. 尺寸与模式

### 视口比例与卡片模式
通过 `viewportFraction` 和 `enlargeCenterPage` 实现卡片式轮播效果。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        viewportFraction: 1.0,
      ),
    ),
    CuBanner(
      items: items,
      config: const CuBannerConfig(
        height: 180,
        viewportFraction: 0.85,
        enlargeCenterPage: true,
      ),
    ),
  ],
)
```
:::

## 5. 高级自定义

支持深度自定义轮播行为，包括自定义高度、圆角、视口比例和放大效果的组合。

:::demo
```dart
CuBanner(
  items: items,
  config: CuBannerConfig(
    height: 220,
    viewportFraction: 0.9,
    enlargeCenterPage: true,
    autoPlay: true,
    autoPlayInterval: const Duration(seconds: 4),
    indicatorType: CuIndicatorType.dot,
    borderRadius: BorderRadius.circular(20),
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考
| 配置项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `height` | `double?` | — | 轮播图高度（可选） |
| `aspectRatio` | `double` | `16 / 9` | 轮播图宽高比（可选） |
| `viewportFraction` | `double` | `1.0` | 视口比例（1.0 为全屏） |
| `borderRadius` | `BorderRadius?` | `CuRadius.mediumRadius` | 圆角半径 |

### 属性定义 (API)

#### CuBannerItem
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `imageUrl` | `String` | — | 图片地址（必需） |
| `title` | `String?` | — | 轮播项标题 |
| `onTap` | `VoidCallback?` | — | 点击回调 |

#### CuBannerConfig
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `height` | `double` | `160.0` | 轮播图高度 |
| `viewportFraction` | `double` | `1.0` | 视口比例 |
| `autoPlay` | `bool` | `true` | 是否自动播放 |
| `autoPlayInterval` | `Duration` | `Duration(seconds: 4)` | 自动播放间隔 |
| `enlargeCenterPage` | `bool` | `true` | 中心放大效果 |
| `indicatorType` | `CuIndicatorType` | `CuIndicatorType.dot` | 指示器类型 |
| `borderRadius` | `BorderRadius?` | — | 自定义圆角 |

#### CuBanner
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `items` | `List&lt;CuBannerItem&gt;` | — | 轮播项列表（必需） |
| `config` | `CuBannerConfig` | `CuBannerConfig()` | 配置对象 |

### 内部逻辑优先级
1. **空列表处理**：若 `items` 为空，组件返回 `SizedBox.shrink()` 不渲染任何内容。
2. **自动播放条件**：自动播放仅在 `autoPlay == true` 且 `items.length &gt; 1` 时生效。
3. **无限滚动**：无限滚动仅在 `items.length &gt; 1` 时启用，否则禁止循环。
4. **指示器位置**：数字指示器固定在右下角，点指示器固定在底部中心。
5. **圆角应用**：`borderRadius` 同时应用于外层容器和内部图片裁剪。

---

&gt; **AI Prompt Context**: 关键词：`Banner`, `CuBanner`, `轮播图`, `Carousel`。原则：优先使用 `CuBannerItem` 定义内容，通过 `CuBannerConfig` 配置行为；`viewportFraction` 小于 1.0 时配合 `enlargeCenterPage` 使用效果更佳；图片地址必须可访问。

