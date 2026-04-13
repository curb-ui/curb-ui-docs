# CuAvatar & CuAvatarGroup 头像组件 (Avatar)

`CuAvatar` 是 CurbUI 的基础图像组件，专门用于展示用户头像、组织图标或占位字符。它支持自动首字母提取、多种形状切换以及层叠式的组展示模式 `CuAvatarGroup`。

---

## 1. 基础用法

展示图片头像、文字头像及默认占位符。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    // 图片头像
    CuAvatar('https://picsum.photos/200'),
    // 文字头像 (自动取首字母)
    CuAvatar(null, label: 'Gemini', backgroundColor: Colors.blue),
    // 默认占位
    CuAvatar(null),
  ],
)
```
:::

## 2. 视觉配置 (Visual Config)

### 形状与边框
支持通过 `isRound` 切换圆形/方圆，或通过 `border` 显式设置描边。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    // 方圆形状
    CuAvatar(
      'https://picsum.photos/203',
      isRound: false,
      borderRadius: BorderRadius.circular(8),
    ),
    // 自定义描边
    CuAvatar(
      'https://picsum.photos/204',
      border: Border.all(color: Colors.red, width: 2),
    ),
  ],
)
```
:::

### 尺寸适配
通过 `size` 参数等比缩放头像。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  crossAxisAlignment: WrapCrossAlignment.center,
  children: [
    CuAvatar('https://picsum.photos/201', size: 32),
    CuAvatar('https://picsum.photos/201', size: 48),
    CuAvatar('https://picsum.photos/201', size: 64),
  ],
)
```
:::

## 3. 头像组模式 (Interaction States)

### 层叠展示 (CuAvatarGroup)
当需要展示一组用户（如共同参与者）时，使用 `CuAvatarGroup` 实现带有重叠感和数量溢出提示（+N）的视觉效果。

:::demo
```dart
CuAvatarGroup(
  size: 40,
  max: 5, // 最多显示 5 个，超出部分显示 +N
  overlap: 15, // 重叠像素宽度
  avatars: List.generate(
    8,
    (i) => CuAvatar('https://i.pravatar.cc/150?u=$i'),
  ),
)
```
:::

## 4. 尺寸与进阶模式 (Sizes & Patterns)

### 溢出策略
`CuAvatarGroup` 内部逻辑会自动计算总宽度。当 `avatars.length > max` 时，最后一个 Slot 会自动渲染为带有剩余数量标识的文字头像。

### 深色适配
在深色背景下，建议通过 `border` 属性设置与背景色一致的描边，以增强头像间的切分感。

:::demo
```dart
Container(
  padding: const EdgeInsets.all(8),
  color: Colors.black87,
  child: CuAvatarGroup(
    size: 32,
    border: Border.all(color: Colors.black87, width: 2),
    avatars: [
      CuAvatar('https://i.pravatar.cc/150?u=1'),
      CuAvatar('https://i.pravatar.cc/150?u=2'),
      CuAvatar('https://i.pravatar.cc/150?u=3'),
    ],
  ),
)
```
:::

---

## 5. 技术规范与逻辑映射 (Technical Spec)

### 布局约束表
| 逻辑项 | 引用常量 | 说明 |
| :--- | :--- | :--- |
| 默认圆角 | `CuRadius.smallRadius` | 非圆形模式下的默认圆角 |
| 默认背景 | `theme.lightColor` | 图片为空时的背景色 |
| 字体大小映射 | `size * 0.45` | 文字头像字号随容器等比缩放 |
| 组步进宽度 | `size - overlap` | 头像组中每个头像占据的实际水平空间 |

### 属性定义 (API) - CuAvatar
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `source` | `String?` | — | 图片 URL，为空则显示文字或占位图 |
| `size` | `double` | `40.0` | 头像宽高尺寸 |
| `isRound` | `bool` | `true` | 是否为正圆 |
| `label` | `String?` | — | 文本，组件会自动提取第一个字符显示 |
| `backgroundColor`| `Color?` | — | 背景颜色 |
| `border` | `BoxBorder?` | — | 外部描边 |

### 属性定义 (API) - CuAvatarGroup
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `avatars` | `List<CuAvatar>`| — | 头像列表 |
| `max` | `int` | `5` | 最大展示数量（含 +N 标识） |
| `overlap` | `double` | `20.0` | 层叠重叠的像素值（正值代表重叠） |
| `border` | `BoxBorder?` | `White-2px` | 内部头像自动应用的描边（用于区分重叠层） |

### 核心逻辑优先级
1. **渲染权重**：`source` (图片) > `label` (文字) > `Icon` (占位图)。
2. **文字处理**：文字头像会自动调用 `.toUpperCase()` 并截取首个字符。
3. **组宽度计算**：`SizedBox` 宽度由 `(步进宽度 * 显示个数) + 修正值` 动态计算，确保在 `Row` 等布局中不产生溢出错误。

---

> **AI Prompt Context**: 关键词：`Avatar`, `CuAvatar`, `头像`, `头像组`。调用原则：优先使用 `source` 传入 URL；在一组头像展示时，务必使用 `CuAvatarGroup` 并配置 `overlap` 以获得最佳视觉重叠感。