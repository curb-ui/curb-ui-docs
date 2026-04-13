# 添加新语言指南

本指南将说明如何为 `CurbUI` 框架添加新的语言支持。

## 添加新语言的步骤

### 1. 创建语言资源文件

在 `lib/locale/l10n/` 目录下创建新的语言资源文件，命名格式为 `intl_<language_code>.arb`，其中 `<language_code>` 是 ISO 639-1 标准的语言代码。

例如，添加日语支持：

```
lib/locale/l10n/intl_ja.arb
```

### 2. 编写语言资源文件

在新创建的 arb 文件中添加本地化字符串，确保与其他语言文件保持相同的键名。

示例 `intl_ja.arb` 文件：

```json
{
  "@@locale": "ja",
  "appTitle": "CurbUI",
  "aboutApp": "アプリについて",
  "setting": "設定",
  "login": "ログイン",
  "logout": "ログアウト",
  "contact": "お問い合わせ",
  "helpAndFeedback": "ヘルプとフィードバック",
  "logoutConfirm": "本当にログアウトしますか？",
  "username": "ユーザー名",
  "password": "パスワード",
  "submit": "送信",
  "confirm": "確認",
  "cancel": "キャンセル",
  "error": "エラー",
  "success": "成功",
  "noPermission": "アクセス権限がありません",
  "serviceError": "サービスエラー",
  "notFound": "見つかりません"
}
```

### 3. 运行代码生成命令

使用 Flutter 的 `build_runner` 工具生成本地化代码：

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

执行命令后，会自动生成对应的 `app_localizations_<language_code>.dart` 文件。

### 4. 更新支持的语言列表

在 `lib/locale/index.dart` 文件中更新 `supportedLocales` 列表，添加新的语言：

```dart
static const List<Locale> supportedLocales = [Locale('en'), Locale('zh'), Locale('ja')];
```

### 5. 更新语言切换逻辑

确保语言切换逻辑能够处理新添加的语言：

```dart
// 切换到日语
await CuLocaleManager.setLocale(Locale('ja'));
```

## 语言代码参考

| 语言 | 语言代码 | 资源文件名 |
| :--- | :--- | :--- |
| 英语 | en | intl_en.arb |
| 中文 | zh | intl_zh.arb |
| 日语 | ja | intl_ja.arb |
| 韩语 | ko | intl_ko.arb |
| 法语 | fr | intl_fr.arb |
| 德语 | de | intl_de.arb |
| 西班牙语 | es | intl_es.arb |
| 俄语 | ru | intl_ru.arb |

## 最佳实践

1. **保持键名一致**：确保新语言文件的键名与其他语言文件保持一致
2. **完整翻译**：确保所有字符串都被翻译，避免出现未翻译的文本
3. **测试验证**：添加新语言后，测试确保所有文本都能正确显示
4. **定期同步**：当添加新的字符串时，确保所有语言文件都进行更新
5. **使用专业翻译**：对于生产应用，考虑使用专业的翻译服务

## 常见问题

### 1. 生成的文件没有包含新语言

**原因**：可能是 arb 文件格式不正确或键名不一致。

**解决方案**：
- 检查 arb 文件的格式是否正确
- 确保键名与其他语言文件保持一致
- 重新运行代码生成命令

### 2. 语言切换后文本没有更新

**原因**：可能是没有正确监听语言变化或没有重建 UI。

**解决方案**：
- 确保添加了语言变化监听器
- 语言切换后触发 UI 重建
- 检查 `CuLocaleManager.setLocale()` 是否正确调用

### 3. 新语言不显示

**原因**：可能是没有更新 `supportedLocales` 列表。

**解决方案**：
- 在 `lib/locale/index.dart` 中更新 `supportedLocales` 列表
- 重新运行应用

## 相关文档

- [主文档](./index.md)
- [语言文件结构与管理规范](./file-structure.md)
- [语言切换与持久化](./language-switching.md)
- [API 使用及规范文档](../api/index.md)
