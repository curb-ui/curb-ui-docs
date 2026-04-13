# CurbUI 组件文档

`CurbUI` 框架提供了丰富的自定义 UI 组件，这些组件基于 Flutter 原生组件开发，提供了统一的视觉风格和交互体验。本文档将帮助您了解和使用 CurbUI 的组件库。

---

## 组件分类

## 1. 基础组件 (Basic)
构建界面的原子级元素，不依赖特定业务场景。

| 组件 | 说明 (Subtitle) | 对应 Demo 路径 | 文档链接 |
| :--- | :--- | :--- | :--- |
| **CuButton** | 按钮 / Button | `demo/button` | [cu_button.md](./cu_button.md) |
| **CuIcon** | 图标 / Icon | `demo/icon` | [cu_icon.md](./cu_icon.md) |
| **CuText** | 文本 / Text | `demo/text` | [cu_text.md](./cu_text.md) |
| **CuTag** | 标签 / Tag | `demo/tag` | [cu_tag.md](./cu_tag.md) |
| **CuDivider** | 分隔线 / Divider | `demo/divider` | [cu_divider.md](./cu_divider.md) |

---

## 2. 表单组件 (Form)
用于数据的录入、选择和校验。

| 组件 | 说明 (Subtitle) | 对应 Demo 路径 | 文档链接 |
| :--- | :--- | :--- | :--- |
| **CuInput** | 输入框 / Input | `demo/input` | [cu_input.md](./cu_input.md) |
| **CuSwitch** | 开关 / Switch | `demo/switch` | [cu_switch.md](./cu_switch.md) |
| **CuRadio** | 单选 / Radio | `demo/radio` | [cu_radio.md](./cu_radio.md) |
| **CuCheckbox** | 多选 / Checkbox | `demo/checkbox` | [cu_checkbox.md](./cu_checkbox.md) |
| **CuMultiSelect** | 多选 / MultiSelect | `demo/multi_select` | [cu_multi_select.md](./cu_multi_select.md) |
| **CuSlider** | 滑块 / Slider | `demo/slider` | [cu_slider.md](./cu_slider.md) |
| **CuUpload** | 上传 / Upload | `demo/upload` | [cu_upload.md](./cu_upload.md) |
| **CuRate** | 评分 / Rate | `demo/rate` | [cu_rate.md](./cu_rate.md) |

---

## 3. 布局与容器 (Layout)
定义页面的骨架结构与导航模式。

| 组件 | 说明 (Subtitle) | 对应 Demo 路径 | 文档链接 |
| :--- | :--- | :--- | :--- |
| **CuAppBar** | 应用栏 / AppBar | `demo/app_bar` | [cu_appbar.md](./cu_appbar.md) |
| **CuPage** | 页面容器 / Scaffold | — | [cu_page.md](./cu_page.md) |
| **CuRefresh** | 刷新 / Refresh | `demo/refresh` | [cu_refresh.md](./cu_refresh.md) |
| **CuTabs** | 标签栏 / Tabs | `demo/tabs` | [cu_tabs.md](./cu_tabs.md) |
| **CuTabbar** | 底部导航栏 / Tabbar | `demo/tabbar` | [cu_tabbar.md](./cu_tabbar.md) |
| **CuBottomSheet** | 底部弹窗 / BottomSheet | `demo/bottom_sheet` | [cu_bottom_sheet.md](./cu_bottom_sheet.md) |

---

## 4. 数据展示 (Data Display)
用于展示信息、媒体内容或操作结果。

| 组件 | 说明 (Subtitle) | 对应 Demo 路径 | 文档链接 |
| :--- | :--- | :--- | :--- |
| **CuImage** | 图片 / Image | `demo/image` | [cu_image.md](./cu_image.md) |
| **CuAvatar** | 头像 / Avatar | `demo/avatar` | [cu_avatar.md](./cu_avatar.md) |
| **CuList** | 列表 / List | `demo/list` | [cu_list.md](./cu_list.md) |
| **CuProgressCircle**| 进度环 / ProgressCircle | `demo/progress` | [cu_progress_circle.md](./cu_progress_circle.md) |
| **CuBanner** | 轮播图 / Banner | `demo/banner` | [cu_banner.md](./cu_banner.md) |
| **CuResult** | 结果 / Result | `demo/result` | [cu_result.md](./cu_result.md) |
| **CuLottie** | 动画 / Lottie | `demo/lottie` | [cu_lottie.md](./cu_lottie.md) |

---

## 5. 交互与反馈 (Interaction)
对用户操作的结果进行提示、指引或阻断。

| 组件 | 说明 (Subtitle) | 对应 Demo 路径 | 文档链接 |
| :--- | :--- | :--- | :--- |
| **CuLoading** | 加载 / Loading | `demo/loading` | [cu_loading.md](./cu_loading.md) |
| **CuToast** | 轻提示 / Toast | `demo/toast` | [cu_toast.md](./cu_toast.md) |
| **CuConfirm** | 确认对话框 / ConfirmDialog | `demo/confirm` | [cu_confirm.md](./cu_confirm.md) |
| **CuDialog** | 对话框 / Dialog | `demo/dialog` | [cu_dialog.md](./cu_dialog.md) |

---

## 组件使用规范

### 1. 导入方式

所有组件都可以通过以下方式导入：

```dart
import 'package:curb_ui/curb_ui.dart';
```

或者单独导入特定组件：

```dart
import 'package:curb_ui/components/cu_button.dart';
import 'package:curb_ui/components/cu_input.dart';
```

### 2. 主题使用

组件默认使用 CurbUI 的主题配置，您可以通过 `CuTheme` 来访问主题数据：

```dart
ColoredBox(color: CuTheme.of(context).primaryColor);
```

### 3. 尺寸和间距

组件使用 CurbUI 提供的尺寸和间距常量，确保界面的一致性：

```dart
CuCard(
  padding: CuSpacing.medium,
  child: CuText('卡片内容'),
);
```

### 4. 国际化支持

所有组件都支持国际化，您可以通过 `context.l10n` 来访问本地化文本：

```dart
CuButton(
  label: context.l10n.submit,
  onTap: () {},
);
```

---

## 最佳实践

1. **保持一致性**：在整个应用中使用相同的组件风格和配置
2. **按需使用**：根据实际需求选择合适的组件
3. **合理组合**：通过组件的组合来构建复杂的界面
4. **自定义扩展**：根据需要扩展组件的功能
5. **性能优化**：对于列表等频繁渲染的场景，使用 `CuKeepAlive` 等组件来优化性能

---

## 示例代码

### 基础布局示例

```dart
CuPage(
  title: '页面标题',
  body: Column(
    spacing: CuSpacing.medium,
    children: [
      CuText('文本内容'),
      CuButton(
        label: '按钮',
        onTap: () {},
      ),
    ],
  ),
);
```

### 表单示例

```dart
CuPage(
  title: '表单',
  body: Column(
    spacing: CuSpacing.medium,
    children: [
      CuInput(
        label: '用户名',
        hintText: '请输入用户名',
      ),
      CuInput(
        label: '密码',
        hintText: '请输入密码',
        obscureText: true,
      ),
      CuCheckbox(
        label: '记住我',
        value: true,
        onChanged: (value) {},
      ),
      CuButton(
        label: '登录',
        onTap: () {},
      ),
    ],
  ),
);
```


### 下拉刷新示例

```dart
CuPage(
  title: '下拉刷新',
  body: CuRefresh(
    child: ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemBuilder: (context, index) => CuList(title: 'Item $index'),
      itemCount: 20,
    ),
    onRefresh: (pagination) async {
      await Future.delayed(const Duration(seconds: 2));
    },
  ),
);
```

---

## 相关文档

- [API 文档](../api/index.md)
- [多语言文档](../locale/index.md)
- [主题文档](../theme/index.md)
- [路由文档](../route/index.md)
