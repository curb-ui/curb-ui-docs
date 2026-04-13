# CuCard 卡片组件 (Card)

`CuCard` 是 `curb_ui` 库的容器组件，基于 `StatelessWidget` 实现。该组件封装了标题、副标题和内容区域的布局，默认应用 `CuTheme` 主题配色，提供了开箱即用的卡片容器解决方案，适用于信息展示、列表项、数据卡片等业务场景。

---

## 1. 基础用法

通过 `title` 和 `subtitle` 属性展示卡片的标题与副标题，通过 `child` 展示卡片内容。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '基础卡片',
      subtitle: '这是一段副标题说明',
      child: CuText('卡片内容区域，支持任意 Widget 组件'),
    ),
    CuCard(
      title: '无副标题卡片',
      child: CuText('简洁版卡片布局'),
    ),
    CuCard(
      child: CuText('纯内容卡片'),
    ),
  ],
)
```
:::

## 2. 视觉配置

### 背景色定制

通过 `backgroundColor` 属性覆盖默认的容器背景色。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '自定义背景色',
      backgroundColor: const Color(0xFFE3F2FD),
      child: CuText('使用自定义背景色的卡片'),
    ),
  ],
)
```
:::

### 阴影定制

通过 `boxShadow` 属性覆盖默认阴影效果。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '小阴影卡片',
      boxShadow: CuShadow.small,
      child: CuText('使用小阴影效果'),
    ),
    CuCard(
      title: '大阴影卡片',
      boxShadow: CuShadow.large,
      child: CuText('使用大阴影效果'),
    ),
  ],
)
```
:::

### 圆角定制

通过 `borderRadius` 属性调整卡片圆角大小。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '小圆角卡片',
      borderRadius: CuRadius.smallRadius,
      child: CuText('使用小圆角效果'),
    ),
    CuCard(
      title: '超大圆角卡片',
      borderRadius: CuRadius.extraLargeRadius,
      child: CuText('使用超大圆角效果'),
    ),
  ],
)
```
:::

## 3. 交互状态

虽然 `CuCard` 本身是静态展示组件，但可以通过嵌套其他交互组件实现交互效果。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '可点击卡片',
      child: Column(
        spacing: CuSpacing.small,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CuText('点击下方按钮进行操作'),
          Row(
            spacing: CuSpacing.small,
            children: [
              CuButton(label: '确认', type: CuColorType.primary, onTap: () {}),
              CuButton(label: '取消', plain: true, onTap: () {}),
            ],
          ),
        ],
      ),
    ),
  ],
)
```
:::

## 4. 尺寸与模式

### 内边距定制

通过 `padding` 属性自定义卡片内容区域的内边距。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      title: '小内边距',
      padding: CuSpacing.smallAll,
      child: CuText('内容区域使用小内边距'),
    ),
    CuCard(
      title: '大内边距',
      padding: CuSpacing.largeAll,
      child: CuText('内容区域使用大内边距'),
    ),
  ],
)
```
:::

### 组合模式

卡片可以与其他组件嵌套组合，实现复杂的布局结构。

:::demo
```dart
CuCard(
  title: '用户信息',
  subtitle: '个人资料卡片',
  child: Column(
    spacing: CuSpacing.medium,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        spacing: CuSpacing.medium,
        children: [
          const CuAvatar(
            url: 'https://via.placeholder.com/48',
            size: CuAvatarSize.large,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CuText('张三', level: CuTextLevel.titleSmall),
              CuText('产品经理', level: CuTextLevel.bodySmall),
            ],
          ),
        ],
      ),
      const CuDivider(),
      Row(
        spacing: CuSpacing.medium,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CuText('粉丝', level: CuTextLevel.captionMedium),
                CuText('1.2k', level: CuTextLevel.titleSmall),
              ],
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CuText('关注', level: CuTextLevel.captionMedium),
                CuText('368', level: CuTextLevel.titleSmall),
              ],
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CuText('作品', level: CuTextLevel.captionMedium),
                CuText('24', level: CuTextLevel.titleSmall),
              ],
            ),
          ),
        ],
      ),
    ],
  ),
)
```
:::

## 5. 高级自定义

展示如何进行深度样式定制和复杂内容组合。

:::demo
```dart
Column(
  spacing: CuSpacing.medium,
  children: [
    CuCard(
      padding: EdgeInsets.zero,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            height: 120,
            decoration: const BoxDecoration(
              color: Color(0xFFE3F2FD),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(CuRadius.large),
                topRight: Radius.circular(CuRadius.large),
              ),
            ),
            child: const Center(
              child: CuIcon(
                CuIcons.image,
                size: 48,
                color: Color(0xFF1976D2),
              ),
            ),
          ),
          Padding(
            padding: CuSpacing.mediumAll,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CuText('图片卡片', level: CuTextLevel.titleMedium),
                CuText('带顶部图片区域的自定义卡片', level: CuTextLevel.bodySmall),
              ],
            ),
          ),
        ],
      ),
    ),
  ],
)
```
:::

---

## 6. 技术规范与逻辑映射

组件内部逻辑与视觉约束遵循以下定义：

### 布局约束参考

| 属性项 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `padding` | `CuSpacing.mediumAll` | 内容区域内边距 (16px) |
| `boxShadow` | `CuShadow.medium` | 容器阴影效果 |
| `borderRadius` | `CuRadius.largeRadius` | 容器圆角 (12px) |
| `backgroundColor` | `CuTheme.bgColorContainer` | 容器背景色 |
| 标题与内容间距 | `CuSpacing.small` | 垂直间距 (8px) |

### 属性定义 (API)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 卡片标题文本 |
| `subtitle` | `String?` | — | 卡片副标题文本 |
| `child` | `Widget?` | — | 卡片内容区域 |
| `padding` | `EdgeInsets?` | `CuSpacing.mediumAll` | 内容区域内边距 |
| `backgroundColor` | `Color?` | `CuTheme.bgColorContainer` | 容器背景色覆盖 |
| `boxShadow` | `List<BoxShadow>?` | `CuShadow.medium` | 容器阴影覆盖 |
| `borderRadius` | `BorderRadiusGeometry?` | `CuRadius.largeRadius` | 容器圆角覆盖 |

### 内部逻辑优先级

1. **内容渲染优先级**：若 `title` 非空则渲染标题，若 `subtitle` 非空则渲染副标题，三者独立互不覆盖。
2. **样式优先级**：显式传入的 `padding`、`backgroundColor`、`boxShadow`、`borderRadius` 优先级高于主题默认值。
3. **布局规范**：卡片内容区域宽度自适应为 `double.infinity`，高度由内容决定。
4. **组件复用**：标题和副标题统一使用 `CuText` 组件，分别应用 `CuTextLevel.titleMedium` 和 `CuTextLevel.captionMedium`。

---

> **AI Prompt Context**: 关键词：`Card`, `CuCard`, `卡片`, `容器`。原则：优先使用 `title` 和 `subtitle` 快速构建卡片标题；复杂内容通过 `child` 自定义；样式定制时使用 `CuTheme`、`CuSpacing`、`CuRadius`、`CuShadow` 等语义化常量；严禁在卡片内部直接使用原生 `Container` 而不遵循主题规范。
