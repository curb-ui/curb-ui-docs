
# CuList 列表组件 (List)

`CuList` 是 `curb_ui` 库的基础列表项组件，基于 `StatelessWidget` 实现。该组件封装了列表项的通用布局与交互，支持图标、标题、副标题、描述、箭头等元素，并集成了 `CuHover` 处理多端交互反馈。`CuListGroup` 是列表分组组件，用于将多个 `CuListItem` 组合成一个带分隔线的列表组。

---

## 1. 基础用法

通过 `CuListItem` 配置组件的基础信息，包括标题、图标和箭头等。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '默认列表项',
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '带图标的列表项',
        icon: Icons.settings,
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '带描述的列表项',
        desc: '详细描述',
        onTap: () {},
      ),
    ),
  ],
)
```
:::

## 2. 视觉配置

### 边框与圆角
支持 `border` 属性添加边框，通过 `borderRadius` 自定义圆角。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '带边框的列表项',
        border: true,
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '自定义圆角',
        borderRadius: CuRadius.largeRadius,
        onTap: () {},
      ),
    ),
  ],
)
```
:::

### 背景与悬停色
通过 `backgroundColor` 和 `hoverColor` 自定义背景色和悬停颜色。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '自定义背景色',
        backgroundColor: Colors.blue.withAlpha(CuAlpha.alpha10),
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '自定义悬停色',
        hoverColor: Colors.orange.withAlpha(CuAlpha.alpha10),
        onTap: () {},
      ),
    ),
  ],
)
```
:::

## 3. 交互状态

### 禁用状态
`disabled` 属性降低组件不透明度并拦截事件。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '可点击列表项',
        icon: Icons.check_circle,
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '禁用列表项',
        icon: Icons.block,
        disabled: true,
        onTap: () {},
      ),
    ),
  ],
)
```
:::

## 4. 尺寸与模式

### 自定义内容区域
支持 `leading` 和 `trailing` 完全自定义首尾内容，以及 `titleWidget` 和 `subtitleWidget` 自定义标题和副标题。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '自定义首尾',
        leading: CuAvatar(url: 'https://example.com/avatar.jpg'),
        trailing: CuTag('标签'),
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        titleWidget: Row(
          children: [
            CuText('自定义标题', level: CuTextLevel.bodyMedium),
            CuSpacing.smallX,
            CuTag('NEW', type: CuColorType.success),
          ],
        ),
        subtitle: '副标题内容',
        onTap: () {},
      ),
    ),
  ],
)
```
:::

### 列表分组
使用 `CuListGroup` 将多个列表项组合成一个带分隔线的列表组。

:::demo
```dart
CuListGroup(
  children: [
    CuListItem(
      title: '分组列表项 1',
      icon: Icons.home,
      onTap: () {},
    ),
    CuListItem(
      title: '分组列表项 2',
      icon: Icons.search,
      onTap: () {},
    ),
    CuListItem(
      title: '分组列表项 3',
      icon: Icons.person,
      onTap: () {},
    ),
  ],
)
```
:::

## 5. 高级自定义

### 自定义间距与密度
通过 `contentPadding` 和 `visualDensity` 自定义内容内边距和视觉密度。

:::demo
```dart
Column(
  spacing: CuSpacing.small,
  children: [
    CuList(
      CuListItem(
        title: '宽松间距',
        contentPadding: CuSpacing.largeX,
        onTap: () {},
      ),
    ),
    CuList(
      CuListItem(
        title: '紧凑间距',
        contentPadding: CuSpacing.smallX,
        onTap: () {},
      ),
    ),
  ],
)
```
:::

### 完全自定义
展示如何通过多个属性进行深度定制。

:::demo
```dart
CuList(
  CuListItem(
    title: '完全自定义',
    subtitle: '这是一个完全自定义的列表项示例',
    icon: Icons.star,
    iconColor: Colors.amber,
    desc: '详情',
    arrow: true,
    border: true,
    backgroundColor: Colors.amber.withAlpha(CuAlpha.alpha10),
    hoverColor: Colors.amber.withAlpha(CuAlpha.alpha20),
    contentPadding: CuSpacing.mediumX,
    onTap: () {},
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考
| 常量 | 数值 | 说明 |
| :--- | :--- | :--- |
| `CuRadius.smallRadius` | `4.0` | 默认圆角 |
| `CuSpacing.mediumX` | `EdgeInsets.symmetric(horizontal: 16)` | 默认内容内边距 |
| `CuAlpha.alpha20` | `51` | 边框透明度 |
| `CuAlpha.alpha10` | `26` | 图标背景透明度 |

### CuListItem 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 标题文本 |
| `titleWidget` | `Widget?` | — | 自定义标题 Widget (覆盖 title) |
| `subtitle` | `String?` | — | 副标题文本 |
| `subtitleWidget` | `Widget?` | — | 自定义副标题 Widget (覆盖 subtitle) |
| `leading` | `Widget?` | — | 自定义左侧内容 (覆盖 icon) |
| `icon` | `IconData?` | — | 图标数据 |
| `iconColor` | `Color?` | — | 图标颜色 |
| `trailing` | `Widget?` | — | 自定义右侧内容 (覆盖 arrow 和 desc) |
| `arrow` | `bool` | `true` | 是否显示箭头 |
| `border` | `bool` | `false` | 是否显示边框 |
| `disabled` | `bool` | `false` | 是否禁用 |
| `hoverColor` | `Color?` | — | 悬停颜色 |
| `backgroundColor` | `Color?` | — | 背景颜色 |
| `contentPadding` | `EdgeInsets?` | — | 内容内边距 |
| `borderRadius` | `BorderRadius?` | — | 圆角半径 |
| `desc` | `String?` | — | 右侧描述文本 |
| `descWidget` | `Widget?` | — | 自定义右侧描述 Widget (覆盖 desc) |
| `onTap` | `VoidCallback?` | — | 点击回调 |
| `visualDensity` | `VisualDensity?` | — | 视觉密度 |

### CuList 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `item` | `CuListItem` | — | 列表项配置对象 (必填) |
| `visualDensity` | `VisualDensity?` | `VisualDensity(vertical: -1.0)` | 视觉密度 |

### CuListGroup 属性定义 (API)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `children` | `List&lt;CuListItem&gt;` | — | 列表项配置列表 (必填) |
| `dividerMargin` | `EdgeInsetsGeometry` | `EdgeInsets.zero` | 分隔线间距 |
| `visualDensity` | `VisualDensity?` | — | 视觉密度 |

### 内部逻辑优先级
1. **内容优先级**：若 `titleWidget` 非空，则忽略 `title` 渲染；若 `subtitleWidget` 非空，则忽略 `subtitle` 渲染；若 `leading` 非空，则忽略 `icon` 渲染；若 `trailing` 非空，则忽略 `arrow` 和 `desc` 渲染。
2. **交互优先级**：内部禁用状态由 `(disabled || onTap == null)` 共同驱动，禁用时会降低不透明度并拦截点击事件。
3. **视觉优先级**：通过 `backgroundColor`、`hoverColor`、`borderRadius`、`contentPadding` 显式定义的数值优先级高于默认值。
4. **布局规范**：`desc` 文本最大宽度为屏幕宽度的 40%，超出时显示省略号；图标默认大小为 20，箭头默认大小为 25-26。

---

&gt; **AI Prompt Context**: 关键词：`List`, `CuList`, `CuListGroup`, `列表`。原则：优先使用 `CuListItem` 配置对象；列表项必须绑定 `onTap` 才会启用交互状态；分组列表使用 `CuListGroup` 自动处理分隔线。

