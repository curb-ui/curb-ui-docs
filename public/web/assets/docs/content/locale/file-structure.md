# 语言文件结构与管理规范

## 目录结构

`CurbUI` 框架的语言文件位于 `lib/locale/l10n/` 目录下，采用 Flutter 标准的国际化文件结构：

```
lib/locale/l10n/
├── app_localizations.dart     # 自动生成的本地化基类
├── app_localizations_en.dart  # 英文实现
├── app_localizations_zh.dart  # 中文实现
├── intl_en.arb                # 英文资源文件
└── intl_zh.arb                # 中文资源文件
```

## arb 文件格式

`.arb` 文件是一种基于 JSON 的资源文件格式，用于存储本地化字符串。

### 基本格式

```json
{
  "@@locale": "zh",
  "appTitle": "CurbUI",
  "aboutApp": "关于应用",
  "setting": "设置",
  "login": "登录",
  "logout": "退出登录"
}
```

### 带参数的字符串

```json
{
  "resendAfter": "{countdown}秒后重发",
  "fileSizeExceeded": "{fileName}超过大小限制"
}
```

### 复数形式

```json
{
  "itemCount": "{count, plural, one {1 项} other {{count} 项}}"
}
```

### 性别相关

```json
{
  "welcomeMessage": "{gender, select, male {欢迎先生} female {欢迎女士} other {欢迎用户}}"
}
```

## 代码生成

Flutter 提供了 `gen-l10n` 工具来自动生成本地化代码。

### 配置 pubspec.yaml

确保 `pubspec.yaml` 文件中包含以下配置：

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: any

flutter:
  generate: true
  assets:
    - lib/locale/l10n/
```

### 运行生成命令

```bash
# 触发官方本地化生成
flutter gen-l10n
# 或者直接运行
flutter pub get
```

## 文件命名规范

- **资源文件**：`intl_<language_code>.arb`，如 `intl_en.arb`、`intl_zh.arb`
- **生成文件**：`app_localizations_<language_code>.dart`，如 `app_localizations_en.dart`、`app_localizations_zh.dart`
- **语言代码**：使用 ISO 639-1 标准的语言代码，如 `en`（英语）、`zh`（中文）

## 最佳实践

1. **保持一致性**：不同语言的 arb 文件应保持相同的键名
2. **使用描述**：为每个键添加描述，便于理解
3. **避免硬编码**：所有用户可见的文本都应通过本地化文件管理
4. **定期同步**：确保不同语言文件的内容保持同步
5. **测试覆盖**：确保所有本地化文本都能正确显示

## 相关文档

- [主文档](./index.md)
- [添加新语言](./add-language.md)
- [复杂国际化场景处理](./complex-scenarios.md)
- [API 使用及规范文档](../api/index.md)
