# CuUpload 文件上传组件 (Upload)

`CuUpload` 是 `curb_ui` 库的文件上传组件，基于 `StatefulWidget` 实现。该组件封装了文件选择、拍照、上传进度跟踪等功能，支持多平台（Android、iOS、Web、macOS），并集成了 `CuToast` 和 `CuBottomSheet` 提供友好的用户反馈。

---

## 1. 基础用法

通过 `CuUploadConfig` 配置组件的核心行为，包括文件数量限制、大小限制、多选支持等。

:::demo
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  spacing: CuSpacing.large,
  children: [
    CuText('基础图片上传', level: CuTextLevel.titleSmall),
    CuUpload(
      config: const CuUploadConfig(
        maxCount: 5,
        maxSize: 5.0,
        multiple: true,
        label: "选择图片",
      ),
      onChange: (urls) {
        logger.d('上传成功: ${urls.toString()}');
      },
    ),
  ],
)
```
:::

## 2. 视觉配置

### 自定义图标与文案
通过 `icon` 和 `label` 属性定制上传按钮的视觉表现。

:::demo
```dart
Row(
  spacing: CuSpacing.large,
  children: [
    CuUpload(
      config: CuUploadConfig(
        maxCount: 1,
        label: "上传头像",
        icon: CuIcon(Icons.face_retouching_natural),
      ),
      onChange: (files) {},
    ),
    CuUpload(
      config: CuUploadConfig(
        maxCount: 3,
        label: "添加附件",
        icon: CuIcon(Icons.file_present_rounded),
      ),
      onChange: (files) {},
    ),
  ],
)
```
:::

### 尺寸定制
通过 `width` 和 `height` 属性定制上传项的尺寸。

:::demo
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  spacing: CuSpacing.small,
  children: [
    CuUpload(
      config: const CuUploadConfig(
        width: 120,
        height: 120,
        maxCount: 3,
        label: "大尺寸",
      ),
      onChange: (files) {},
    ),
    CuUpload(
      config: const CuUploadConfig(
        width: 70,
        height: 70,
        maxCount: 6,
        label: "小尺寸",
      ),
      onChange: (files) {},
    ),
  ],
)
```
:::

## 3. 交互状态

### 上传状态反馈
组件内置了上传进度展示、成功/失败状态标识，失败时支持点击重试。

:::demo
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  spacing: CuSpacing.small,
  children: [
    const CuText(
      '支持上传进度展示、失败重试、状态图标标识',
      level: CuTextLevel.captionMedium,
    ),
    CuUpload(
      config: const CuUploadConfig(
        maxCount: 5,
        label: "上传文件",
      ),
      onChange: (urls) {},
    ),
  ],
)
```
:::

### 手动上传模式
通过 `autoUpload: false` 禁用自动上传，允许手动控制上传时机。

:::demo
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  spacing: CuSpacing.small,
  children: [
    CuUpload(
      autoUpload: false,
      config: const CuUploadConfig(
        maxCount: 3,
        label: "选择文件",
      ),
      onChange: (paths) {
        logger.d('已选择文件: ${paths.toString()}');
      },
    ),
    const SizedBox(height: CuSpacing.small),
    CuButton(
      label: '手动上传',
      type: CuColorType.primary,
      onTap: () {
        CuToast.show('执行手动上传');
      },
    ),
  ],
)
```
:::

## 4. 特殊模式与尺寸

### 单选模式（头像上传）
设置 `maxCount: 1` 实现单文件选择，适用于头像上传场景。

:::demo
```dart
Row(
  children: [
    CuUpload(
      config: const CuUploadConfig(
        maxCount: 1,
        label: "更换头像",
        icon: CuIcon(Icons.camera_alt_outlined),
      ),
      onChange: (files) {},
    ),
    const SizedBox(width: CuSpacing.medium),
    Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CuText('点击更换头像', level: CuTextLevel.titleSmall),
          CuText(
            '支持拍照和相册选择',
            level: CuTextLevel.captionMedium,
          ),
        ],
      ),
    ),
  ],
)
```
:::

### 文件类型限制
通过 `allowedExtensions` 属性限制允许上传的文件类型。

:::demo
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  spacing: CuSpacing.small,
  children: [
    CuText('文档上传（仅限 PDF/Word）', level: CuTextLevel.titleSmall),
    CuUpload(
      config: const CuUploadConfig(
        maxCount: 2,
        allowedExtensions: ['pdf', 'doc', 'docx'],
        label: "上传文档",
        icon: CuIcon(Icons.description_outlined),
      ),
      onChange: (files) {},
    ),
  ],
)
```
:::

## 5. 高级自定义

### 初始文件
通过 `initialUrls` 属性预填充已上传的文件列表。

:::demo
```dart
CuUpload(
  initialUrls: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
  config: const CuUploadConfig(
    maxCount: 5,
    label: "添加图片",
  ),
  onChange: (urls) {},
)
```
:::

### 完整表单集成
结合 `CuCard` 和 `CuText` 构建完整的表单上传场景。

:::demo
```dart
CuCard(
  title: '凭证上传',
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    spacing: CuSpacing.small,
    children: [
      const CuText(
        '请上传相关凭证，最多5张，单张不超过5MB',
        level: CuTextLevel.captionMedium,
      ),
      const SizedBox(height: CuSpacing.small),
      CuUpload(
        config: const CuUploadConfig(
          maxCount: 5,
          maxSize: 5.0,
          multiple: true,
          label: "选择凭证",
        ),
        onChange: (urls) {
          logger.d('凭证上传: ${urls.toString()}');
        },
      ),
    ],
  ),
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考

| 配置项 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `width` | `90` | 上传项宽度 |
| `height` | `90` | 上传项高度 |
| `maxSize` | `-1` | 单文件大小限制（MB），-1 表示不限制 |
| `maxCount` | `null` | 最大上传数量，null 表示不限制 |

### 属性定义 (API)

#### CuUpload 组件属性

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `config` | `CuUploadConfig` | `const CuUploadConfig()` | 上传配置对象 |
| `onChange` | `Function(List<String>)?` | — | 文件变化回调（autoUpload=true 返回 URLs，false 返回 paths） |
| `autoUpload` | `bool` | `true` | 是否自动上传 |
| `initialUrls` | `List<String>` | `const []` | 初始已上传的文件 URL 列表 |

#### CuUploadConfig 配置属性

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `width` | `double` | `90` | 上传项宽度 |
| `height` | `double` | `90` | 上传项高度 |
| `maxCount` | `int?` | `null` | 最大上传数量 |
| `maxSize` | `double` | `-1` | 单文件大小限制（MB） |
| `allowedExtensions` | `List<String>?` | `null` | 允许的文件扩展名 |
| `icon` | `Widget` | `Icon(Icons.add_a_photo_outlined)` | 上传按钮图标 |
| `label` | `String?` | `null` | 上传按钮文字 |
| `multiple` | `bool` | `false` | 是否支持多选 |
| `enableCamera` | `bool` | `true` | 是否开启拍照功能 |

### 内部逻辑优先级

1. **数量校验优先**：选择文件前先校验 `maxCount`，超出限制时显示提示。
2. **大小校验优先**：文件选择后先校验 `maxSize`，超出限制时显示提示。
3. **自动上传优先**：`autoUpload=true` 时文件选择后立即触发上传，否则仅添加到列表。
4. **相机功能降级**：Web 端自动禁用拍照功能，直接打开文件选择器。
5. **图片预览优先**：支持的图片格式（jpg/jpeg/png/gif/webp）显示预览，其他显示文件图标。
6. **状态渲染优先级**：错误状态 > 上传中 > 成功 > 等待中。

---

> **AI Prompt Context**: 关键词：`Upload`, `CuUpload`, `文件上传`, `图片上传`, `拍照`。原则：优先使用 `config` 配置上传行为；多平台使用需配置对应权限；Web 端自动禁用拍照；错误状态支持点击重试。
