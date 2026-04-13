# CuResult 结果反馈组件 (Result)

`CuResult` 用于在页面中心展示操作的结果状态（如成功、失败等）。它提供了一套标准化的视觉方案，包含预设图标、文案排版及操作按钮区。

***

## 1. 基础用法

展示最常见的操作结果。

:::demo

```dart
const CuResult(
  status: CuResultStatus.success,
  title: '提交成功',
  subTitle: '您的申请已提交，请耐心等待审核。',
)
```

:::

## 2. 状态类型 (Status)

支持 `success`, `warning`, `error`, `info`, `notFound`, `empty` 六种内置状态。

:::demo

```dart
Column(
  children: [
    const CuResult(
      status: CuResultStatus.warning,
      title: '账户风险提示',
    ),
    const CuResult(
      status: CuResultStatus.error,
      title: '支付失败',
      subTitle: '请检查您的网络连接或账户余额。',
    ),
  ],
)
```

:::

## 3. 带有操作区 (Extra)

通过 `extra` 属性添加后续操作按钮。

:::demo

```dart
CuResult(
  status: CuResultStatus.success,
  title: '购买成功',
  subTitle: '订单号: 20260407123456',
  extra: Row(
    mainAxisAlignment: MainAxisAlignment.center,
    spacing: CuSpacing.medium,
    children: [
      CuButton(
        label: '查看订单',
        onTap: () {},
      ),
      CuButton(
        label: '返回首页',
        type: CuColorType.light,
        onTap: () {},
      ),
    ],
  ),
)
```

:::

***

## 4. 技术规范与逻辑映射 (Technical Spec)

### 布局约束参考

| 逻辑项   | 引用常量                       | 说明            |
| :---- | :------------------------- | :------------ |
| 标题字号  | `CuFontSize.titleLarge`    | 突出核心反馈信息      |
| 副标题颜色 | `theme.textSecondaryColor` | 弱化描述信息的视觉权重   |
| 默认间距  | `CuSpacing.mediumX`        | 图标与标题之间的呼吸感间距 |

### 属性定义 (API)

| 参数         | 类型               | 默认值    | 说明                          |
| :--------- | :--------------- | :----- | :-------------------------- |
| `status`   | `CuResultStatus` | `info` | 状态类型，决定默认图标和颜色              |
| `title`    | `String?`        | —      | 第一行大标题                      |
| `subTitle` | `String?`        | —      | 第二行描述文字                     |
| `extra`    | `Widget?`        | —      | 底部操作区，建议放置 1-2 个 `CuButton` |
| `icon`     | `Widget?`        | —      | 自定义图标，传入后将覆盖 `status` 默认图标  |
| `iconSize` | `double`         | `80.0` | 默认图标的缩放尺寸                   |

### 内部逻辑优先级

1. **图标渲染**：`icon` (自定义) > `status` (内置枚举)。
2. **404 | empty逻辑**：当状态为 `notFound |  empty` 时，组件会尝试调用 `CuIcon` 加载 SVG 资源，以提供更丰富的视觉体验。
3. **内容对齐**：组件强制 `crossAxisAlignment: Center`，确保在任何容器宽度下内容始终居中。

***

> **AI Prompt Context**: 关键词：`Result`, `CuResult`, `结果页`, `反馈`。调用原则：全屏反馈建议使用 `CuResult`；局部小反馈建议使用 `CuAlert` 或 `CuToast`。对于 `notFound` 状态，请确保 `assets` 中存在对应的 SVG。

