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
        talker.debug('上传成功: ${urls.toString()}');
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
        talker.debug('已选择文件: ${paths.toString()}');
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
          talker.debug('凭证上传: ${urls.toString()}');
        },
      ),
    ],
  ),
)
```
:::

---

## 6. 平台配置说明

为了确保 `CuUpload` 组件在多端（Android, iOS, Web, macOS）顺畅运行，请根据您的目标平台完成以下配置。

### 6.1 Android 配置

针对 Android 13+ (API 33) 的分区存储特性，权限声明需精细化。

**权限声明**：在 `AndroidManifest.xml` 的 `&lt;manifest&gt;` 根标签下添加：

```xml
<uses-permission android:name="android.permission.INTERNET" />

<uses-permission android:name="android.permission.CAMERA" />

<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />

<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
```

**存储特性适配**：在 `application` 标签中启用旧版存储兼容（主要针对 Android 10）：

```xml
<application android:requestLegacyExternalStorage="true" />
```

### 6.2 iOS &amp; macOS 配置

#### iOS 配置

在 `ios/Runner/Info.plist` 中添加以下内容（请务必提供真实的描述文字，否则 Apple 审核可能会拒绝上架）：

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>我们需要访问您的相册以挑选并上传反馈截图。</string>
<key>NSCameraUsageDescription</key>
<string>我们需要使用您的相机拍摄现场照片以进行问题反馈。</string>
<key>NSMicrophoneUsageDescription</key>
<string>我们需要使用您的麦克风以录制反馈视频。</string>

<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
<key>UISupportsDocumentBrowser</key>
<true/>
```

#### macOS 配置

如果你在 Hackintosh 或 Mac 上开发桌面端，需在 `macos/Runner/Debug.entitlements` 中开启沙盒权限：

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

### 6.3 Web 端特别说明

Web 端**不需要**在 `index.html` 配置权限，但有以下限制：

- **拍照功能**：在 Web 端通常回退为文件选择（除非使用特定的 `camera` 插件）。
- **跨域 (CORS)**：如果上传至飞书等第三方接口，请确保后端已配置 CORS 允许您的域名访问。
- **Path 限制**：Web 端无法获取 `file.path`，只能通过 `file.bytes` 进行上传。`CuUpload` 已内部兼容此逻辑。

### 6.4 生产环境混淆 (Proguard)

若开启了 `minifyEnabled true`，请在 `android/app/proguard-rules.pro` 中添加，防止 `file_picker` 和 `image_picker` 被错误混淆：

```pro
# File Picker 混淆保护
-keep class com.mr.flutter.plugin.filepicker.** { *; }

# Image Picker 混淆保护
-keep class io.flutter.plugins.imagepicker.** { *; }

# Dio 混淆保护 (用于上传)
-keep class com.dio.** { *; }
```

### 6.5 权限预检代码建议

在使用 `CuUpload` 前，建议配合 `permission_handler` 进行权限预检，以获得最佳用户体验：

```dart
if (await Permission.camera.request().isGranted) {
  // 唤起 CuUpload
} else {
  CuToast.show("授权失败，请在设置中开启相机权限");
}
```

---

## 7. 常见问题与故障排除

| 现象 | 原因分析 | 解决方案 |
| :--- | :--- | :--- |
| **iOS 闪退** | `Info.plist` 缺少描述键值对 | 检查 `NSPhotoLibraryUsageDescription` 是否拼写正确且不为空。 |
| **Android 13 选图为空** | 缺少 `READ_MEDIA_IMAGES` 权限 | 检查 `compileSdkVersion` 是否已提升至 33。 |
| **上传进度卡在 0%** | 网络代理或文件读取失败 | 检查 `Dio` 拦截器日志；尝试使用 `file.bytes` 替代 `file.path`。 |
| **黑苹果无法拍照** | 模拟器或硬件驱动限制 | 模拟器不支持相机；真机调试请确认黑苹果 USB 摄像头驱动已打好。 |

---

## 8. 技术规范与逻辑映射

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

>&gt; **AI Prompt Context**: 关键词：`Upload`, `CuUpload`, `文件上传`, `图片上传`, `拍照`, `AndroidManifest`, `Info.plist`, `FileProvider`, `Proguard`。原则：优先使用 `config` 配置上传行为；多平台使用需配置对应权限；Web 端自动禁用拍照；错误状态支持点击重试；使用前需完成平台配置。
