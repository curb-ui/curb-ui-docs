
# 用户协议与隐私政策配置

CurbUI 提供了一套符合国内监管要求的隐私合规集成方案，确保应用在获取任何敏感权限前，已获得用户的明确授权。

## 配置流程

### 1. 协议地址配置
在 `Config` 全局配置类中定义协议的远程 URL。建议托管在 CurbUI 对应的文档服务器或静态网页上。
* **服务协议**：`Config.serviceAgreementUrl`
* **隐私政策**：`Config.privacyPolicyUrl`

### 2. 文案国际化 (L10n)
所有合规文案均需在 `.arb` 文件中定义，严禁硬编码。核心 Key 包括：
* `userAgreement`: 用户协议
* `privacyPolicy`: 隐私政策
* `beforeUsingProduct`: “在使用 {appName} 之前...”
* `agreeAndContinue`: 同意并继续

### 3. 持久化存储
隐私同意状态由 `UserProvider` 配合 `SharedPreferences` 管理。
* **状态检查**：`userProvider.isPrivacyAgreed`
* **状态更新**：`userProvider.setPrivacyAgreed(true)`

## 组件实现规范

### 交互形式
使用 `CuBottomSheet` 承载协议内容。
* **强制性**：设置 `isDismissible: false` 和 `enableDrag: false`，防止用户通过点击背景或下滑规避。
* **引导性**：使用 `Text.rich` 与 `TapGestureRecognizer` 实现协议内链跳转。

### 拒绝逻辑 (二次确认)
根据监管要求，用户点击“拒绝”后，需执行以下逻辑：
1. **风险提示**：弹出 `CuConfirm` 对话框，再次说明不授权的影响。
2. **退出路径**：若用户坚持拒绝，调用 `SystemNavigator.pop()` 安全退出应用。

## 最佳实践 (工程规范)

1. **初始化隔离**：
   严禁在隐私协议同意前初始化：
   * 友盟/统计 SDK
   * 高德/百度地图 SDK
   * 获取设备 ID (IMEI/Android ID) 的任何操作

2. **UI 细节**：
   * 协议链接应使用品牌色 (`theme.primaryColor`) 标识。
   * 弹窗内文本需包含开发者主体信息及必要的数据收集说明。

3. **合规自检**：
   应用首次安装启动，在未点击“同意”前，logcat/控制台不应出现任何第三方 SDK 的初始化日志。

---

> **注意**：CurbUI 的隐私方案旨在提供交互框架，具体的法律条款内容需由开发者根据实际业务逻辑与法务要求自行填充。