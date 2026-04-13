# 复杂国际化场景处理指南

在国际化过程中，除了基本的文本翻译，还需要处理一些复杂的场景，如复数形式、性别差异、日期时间格式等。本指南将说明如何在 `CurbUI` 框架中处理这些复杂的国际化场景。

## 复数形式

### 基本用法

在 `.arb` 文件中使用复数形式语法：

```json
{
  "itemCount": "{count, plural, one {1 项} other {{count} 项}}"
}
```

### 代码中使用

```dart
// 使用复数形式
Text(context.l10n.itemCount(1)); // 1 项
Text(context.l10n.itemCount(5)); // 5 项
```

### 更复杂的复数形式

```json
{
  "messageCount": "{count, plural, 
    zero {没有消息}
    one {1 条消息}
    two {2 条消息}
    few {几条消息}
    many {很多消息}
    other {{count} 条消息}
  }"
}
```

## 性别差异

### 基本用法

在 `.arb` 文件中使用性别选择语法：

```json
{
  "welcomeMessage": "{gender, select, male {欢迎先生} female {欢迎女士} other {欢迎用户}}"
}
```

### 代码中使用

```dart
// 使用性别差异
Text(context.l10n.welcomeMessage('male')); // 欢迎先生
Text(context.l10n.welcomeMessage('female')); // 欢迎女士
Text(context.l10n.welcomeMessage('other')); // 欢迎用户
```

## 日期时间格式

### 基本用法

使用 `intl` 包处理日期时间格式：

```dart
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart';

// 初始化日期时间本地化
await initializeDateFormatting('zh_CN', null);

// 格式化日期
final date = DateTime.now();
final formattedDate = DateFormat.yMMMMd('zh_CN').format(date);
print(formattedDate); // 2024年12月20日

// 格式化时间
final formattedTime = DateFormat.Hms('zh_CN').format(date);
print(formattedTime); // 14:30:45

// 格式化日期时间
final formattedDateTime = DateFormat.yMMMMd('zh_CN').add_Hms().format(date);
print(formattedDateTime); // 2024年12月20日 14:30:45
```

### 与本地化集成

在 `.arb` 文件中添加日期时间格式模板：

```json
{
  "lastUpdatedAt": "最后更新时间：{date}"
}
```

在代码中使用：

```dart
final date = DateTime.now();
final formattedDate = DateFormat.yMMMMd('zh_CN').add_Hms().format(date);
Text(context.l10n.lastUpdatedAt(formattedDate)); // 最后更新时间：2024年12月20日 14:30:45
```

## 数字格式

### 基本用法

使用 `intl` 包处理数字格式：

```dart
import 'package:intl/intl.dart';

// 格式化数字
final number = 123456.78;
final formatter = NumberFormat('#,##0.00', 'zh_CN');
print(formatter.format(number)); // 123,456.78

// 格式化百分比
final percent = 0.75;
final percentFormatter = NumberFormat.percentPattern('zh_CN');
print(percentFormatter.format(percent)); // 75%

// 格式化货币
final currency = 1234.56;
final currencyFormatter = NumberFormat.currency(locale: 'zh_CN', symbol: '¥');
print(currencyFormatter.format(currency)); // ¥1,234.56
```

## 组合使用

### 复数和性别组合

```json
{
  "notificationMessage": "{gender, select, 
    male {先生，您有 {count, plural, one {1 条新消息} other {{count} 条新消息}}}
    female {女士，您有 {count, plural, one {1 条新消息} other {{count} 条新消息}}}
    other {您有 {count, plural, one {1 条新消息} other {{count} 条新消息}}}
  }"
}
```

### 代码中使用

```dart
Text(context.l10n.notificationMessage('male', 1)); // 先生，您有 1 条新消息
Text(context.l10n.notificationMessage('female', 5)); // 女士，您有 5 条新消息
Text(context.l10n.notificationMessage('other', 0)); // 您有 0 条新消息
```

## 最佳实践

1. **使用标准语法**：使用 `intl` 包提供的标准语法处理复数和性别
2. **保持一致性**：在不同语言中保持复数和性别的处理逻辑一致
3. **测试覆盖**：测试不同数值和性别的组合
4. **性能考虑**：对于频繁使用的格式化操作，考虑缓存结果
5. **用户体验**：确保格式化结果符合用户的预期和文化习惯

## 常见问题

### 1. 复数形式在某些语言中不生效

**原因**：不同语言的复数规则不同，有些语言可能只有两种形式（单数和复数）。

**解决方案**：
- 了解目标语言的复数规则
- 在 `.arb` 文件中提供适当的复数形式
- 测试不同语言环境下的显示效果

### 2. 性别差异处理复杂

**原因**：有些语言的性别差异比英语和中文更复杂。

**解决方案**：
- 了解目标语言的性别语法规则
- 在 `.arb` 文件中提供足够的性别选项
- 对于复杂情况，考虑使用更通用的表达

### 3. 日期时间格式不符合预期

**原因**：不同地区的日期时间格式习惯不同。

**解决方案**：
- 使用 `intl` 包的本地化日期时间格式
- 测试不同地区的日期时间显示
- 对于特殊需求，考虑自定义格式

## 相关文档

- [主文档](./index.md)
- [语言文件结构与管理规范](./file-structure.md)
- [添加新语言](./add-language.md)
- [API 使用及规范文档](../api/index.md)
