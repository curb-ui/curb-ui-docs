
# 应用更新 (CuUpgrade)

`CuUpgrade` 是 `curb_ui` 库的应用更新组件，提供完整的跨平台应用升级解决方案。包含自动版本检测、Android APK 下载安装、iOS App Store 跳转、强制更新等功能。

---

## 1. 基础用法


### 1.1 使用 CuUpgradeDialog 直接调用

通过静态方法 `show()` 直接唤起更新弹窗。

```dart
import 'package:flutter/material.dart';
import 'package:curb_ui/curb_ui.dart';
import 'package:provider/provider.dart';

void checkAppUpdate() {
  final appProvider = context.watch<AppProvider>();
  if (appProvider.hasNewVersion){
    CuUpgradeDialog.show(
      version: appProvider.remoteVersionInfo.version,
      content: appProvider.remoteVersionInfo.log,
      downloadUrl: appProvider.remoteVersionInfo.downloadUrl,
      iosAppId: appProvider.remoteVersionInfo.iosAppId,
      isForce: appProvider.remoteVersionInfo.isForce,
    );
  }
}
```

### 1.2 使用 CuUpgrade 自动检测

在应用入口包裹 `CuUpgrade` 组件，启动时自动检测更新。

```dart
import 'package:curb_ui/curb_ui.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppProvider(),
      child: CuUpgrade(
        autoShowDialog: true,
        child: MyApp(),
      ),
    ),
  );
}
```

---

## 2. 视觉配置 (Visual Config)

### 2.1 强制更新模式

设置 `isForce: true` 启用强制更新，禁用关闭按钮和外部点击。

```dart
CuUpgradeDialog.show(
  version: "2.0.0",
  content: "重要版本更新，必须安装后才能使用",
  downloadUrl: "https://your-server.com/app-v2.0.0.apk",
  isForce: true,
);
```

### 2.2 按钮布局定制

弹窗自动根据更新模式调整按钮布局：
- **普通模式**：显示"稍后提醒"和"立即更新"两个按钮
- **强制模式**：仅显示"立即更新"按钮
- **下载中**：显示加载状态按钮

---

## 3. 交互状态 (Interaction States)

### 3.1 下载进度展示

Android 端自动显示下载进度条和百分比。

```dart
CuUpgradeDialog.show(
  version: "1.5.0",
  content: "新版本特性...",
  downloadUrl: "https://example.com/app-release.apk",
);
// 下载时会自动显示：
// - 线性进度条
// - 状态文本（连接服务器/下载中/下载完成）
// - 百分比数值
```

### 3.2 权限处理

组件内部自动处理 Android 8.0+ 安装权限申请。

```dart
// 权限逻辑已内置，无需手动调用
// 1. 请求 REQUEST_INSTALL_PACKAGES 权限
// 2. 权限被拒绝时提示用户
// 3. 权限通过后开始下载
```

---

## 4. 特殊模式与尺寸 (Patterns &amp; Sizes)

### 4.1 跨平台适配

**Android 模式**：
- 后台下载 APK
- 进度实时回显
- 自动拉起系统安装界面
- FileProvider 安全路径分发

**iOS 模式**：
- 直接跳转 App Store
- 支持 iosAppId 或自定义 URL

```dart
CuUpgradeDialog.show(
  version: "1.0.0",
  content: "跨平台更新演示",
  downloadUrl: "https://your-server.com/app-release.apk",
  iosAppId: "123456789", // iOS 使用 App Store ID
);
```

### 4.2 响应式尺寸

弹窗宽度自适应屏幕：
- 默认宽度：屏幕宽度 × 0.82
- 内容区域最大高度：180px（超出可滚动）
- 内容溢出时自动启用滚动

---

## 5. 高级自定义 (Advanced Customization)

### 5.1 依赖配置

在 `pubspec.yaml` 中添加所需依赖：

```yaml
dependencies:
  dio: ^5.4.0
  path_provider: ^2.1.2
  open_filex: ^4.5.0
  permission_handler: ^11.3.0
  url_launcher: ^6.2.5
```

### 5.2 Android 平台配置

**AndroidManifest.xml** 权限声明：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

**FileProvider 配置**：

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.fileprovider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>
```

**file_paths.xml** 路径映射：

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-path name="external" path="." />
    <cache-path name="cache" path="." />
</paths>
```

### 5.3 iOS 平台配置

**Info.plist** App Store 白名单：

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>https</string><string>itms-apps</string>
</array>
```

---

## 6. 技术规范与逻辑映射 (Technical Spec)

### 6.1 布局约束参考

| 属性 | 数值 | 常量 |
|------|------|------|
| 弹窗宽度 | Screen.width × 0.82 | - |
| 圆角 | CuRadius.largeRadius | - |
| 内容最大高度 | 180px | - |
| 进度条高度 | 6px | - |
| Header 内边距 | 30px (vertical) | - |

### 6.2 属性定义 (API)

#### CuUpgradeDialog.show() 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| version | String | **必需** | 版本号，如 "1.0.2" |
| content | String | **必需** | 更新内容，支持换行 |
| downloadUrl | String | **必需** | APK 下载地址或 App Store URL |
| iosAppId | String? | null | iOS App Store ID（可选） |
| isForce | bool | false | 是否强制更新 |

#### CuUpgrade 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| child | Widget? | null | 子组件 |
| autoShowDialog | bool | true | 初始化时是否自动检测更新 |

### 6.3 内部逻辑优先级

1. **平台判定**：iOS → App Store，Android → 下载安装
2. **权限检查**：Android 先申请安装权限
3. **路径选择**：优先使用外部下载目录，回退到临时目录
4. **下载流程**：连接 → 下载进度 → 完成 → 拉起安装
5. **状态管理**：isDownloading &gt; isForce &gt; userClose

---

## 7. 常见问题与故障排除

### Q: 编译报错 "java.io.IOException: Unable to delete directory"
**原因**：Windows 下 Java 进程占用了 build 缓存。
**解决**：
```bash
stop-process -name java -Force
flutter clean
```

### Q: 唤起安装时报 ResultType.permissionDenied
**原因**：用户未在系统设置中允许"安装未知应用"。
**解决**：组件已集成权限请求，确保按文档配置 AndroidManifest。

### Q: 唤起安装时报 ResultType.error (路径异常)
**原因**：Android 11+ 对外部存储限制较严。
**解决**：组件优先使用私有下载目录，无需 WRITE_EXTERNAL_STORAGE 权限。

---

&gt; **AI Prompt Context**: 关键词：`[CuUpgrade, CuUpgradeDialog, 应用更新, APK下载, App Store]`。原则：优先使用 `[show() 静态方法]`；[Android 端必须配置 FileProvider, iOS 端需配置 LSApplicationQueriesSchemes]。

