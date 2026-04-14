
&lt;!-- 文档存放路径：e:\TravelFlutter\cool-unix-main\curb_ui\doc\cu_bottom_sheet.md --&gt;

# 底部弹窗组件 (BottomSheet)

`CuBottomSheet` 是 `curb_ui` 库的底部滑入式弹窗组件，基于 `showModalBottomSheet` 实现，集成了操作菜单、单选、多选、语义化选择等多种预设模式，解决了移动端常见的底部交互场景。

---

## 1. 基础用法

### 操作菜单 (Action)
用于快速展示操作列表，点击选项后立即关闭并返回结果，适用于拍照、分享等简单操作场景。

:::demo
```dart
CuButton(
  label: '操作菜单',
  type: CuColorType.primary,
  onTap: () async {
    final result = await CuBottomSheet.action&lt;String&gt;(
      title: '修改头像',
      options: [
        CuListItem(
          title: '从手机相册选择',
          icon: Icons.photo_rounded,
          arrow: false,
          onTap: () =&gt; CuBottomSheet.close('gallery'),
        ),
        CuListItem(
          title: '拍照',
          icon: Icons.camera_alt_rounded,
          arrow: false,
          onTap: () =&gt; CuBottomSheet.close('camera'),
        ),
      ],
    );
  },
)
```
:::

### 标准单选 (Radio)
内置单选组与确认/取消按钮，用户选择后需确认才会返回结果，适用于主题选择、设置切换等场景。

:::demo
```dart
CuButton(
  label: '标准单选',
  plain: true,
  onTap: () async {
    final result = await CuBottomSheet.radio&lt;String&gt;(
      title: '选择主题色',
      value: 'blue',
      options: [
        const CuRadioOption(label: '晴空蓝', value: 'blue'),
        const CuRadioOption(label: '翡翠绿', value: 'green'),
        const CuRadioOption(label: '胭脂红', value: 'red', disabled: true),
      ],
    );
  },
)
```
:::

### 标准多选 (Checkbox)
内置多选组与确认/取消按钮，支持同时选择多个选项，适用于标签筛选、权限配置等场景。

:::demo
```dart
CuButton(
  label: '标准多选',
  plain: true,
  onTap: () async {
    final results = await CuBottomSheet.checkbox&lt;int&gt;(
      title: '选择您的爱好',
      value: [0, 1],
      options: [
        const CuCheckboxOption(label: '运动', value: 0),
        const CuCheckboxOption(label: '阅读', value: 1),
        const CuCheckboxOption(label: '旅游', value: 2),
      ],
    );
  },
)
```
:::

---

## 2. 视觉配置

### 语义化选择器 (Select)
支持单选/多选切换，可展示副标题和前置图标，提供更丰富的信息展示能力。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '多选模式',
      type: CuColorType.info,
      onTap: () async {
        final results = await CuBottomSheet.select&lt;int&gt;(
          title: '选择感兴趣的技术',
          multiple: true,
          value: [1],
          options: const [
            CuMultiSelectOption(label: 'Flutter', subtitle: '跨端开发方案', value: 1),
            CuMultiSelectOption(label: 'Rust', subtitle: '系统级安全编程', value: 2),
            CuMultiSelectOption(label: 'Golang', subtitle: '云原生后端语言', value: 3),
          ],
        );
      },
    ),
    CuButton(
      label: '单选模式',
      type: CuColorType.info,
      plain: true,
      onTap: () async {
        final result = await CuBottomSheet.select&lt;String&gt;(
          title: '设置支付方式',
          multiple: false,
          options: const [
            CuMultiSelectOption(
              label: '微信支付',
              value: 'wechat',
              leading: Icon(Icons.wechat, color: Colors.green),
            ),
            CuMultiSelectOption(
              label: '支付宝',
              value: 'alipay',
              leading: Icon(Icons.payment, color: Colors.blue),
            ),
          ],
        );
      },
    ),
  ],
)
```
:::

### 完全自定义内容
通过 `child` 和 `stickyBottom` 实现完全自定义的底部弹窗布局，不受预设模式约束。

:::demo
```dart
CuButton(
  label: '分享组件',
  type: CuColorType.success,
  onTap: () {
    CuBottomSheet.show(
      title: '分享内容到',
      child: Padding(
        padding: CuSpacing.mediumY,
        child: GridView.count(
          shrinkWrap: true,
          crossAxisCount: 4,
          children: [
            _buildShareIcon(Icons.chat_rounded, '微信', Colors.green),
            _buildShareIcon(Icons.camera_rounded, '朋友圈', Colors.orange),
            _buildShareIcon(Icons.alternate_email_rounded, 'QQ', Colors.blue),
            _buildShareIcon(Icons.copy_rounded, '复制链接', Colors.grey),
          ],
        ),
      ),
    );
  },
)
```
:::

---

## 3. 交互状态

### 禁止拖动关闭
通过 `config.enableDrag` 控制是否允许用户通过拖动关闭弹窗。

:::demo
```dart
Row(
  spacing: CuSpacing.medium,
  children: [
    CuButton(
      label: '可拖动关闭',
      onTap: () {
        CuBottomSheet.show(
          title: '默认模式',
          child: Padding(
            padding: CuSpacing.mediumAll,
            child: CuText('向下拖动或点击遮罩可关闭'),
          ),
          config: const CuBottomSheetConfig(enableDrag: true),
        );
      },
    ),
    CuButton(
      type: CuColorType.warning,
      label: '禁止拖动',
      onTap: () {
        CuBottomSheet.show(
          title: '强制停留',
          child: Padding(
            padding: CuSpacing.mediumAll,
            child: CuText('只能通过按钮或代码关闭'),
          ),
          config: const CuBottomSheetConfig(enableDrag: false),
        );
      },
    ),
  ],
)
```
:::

### 禁止点击遮罩关闭
通过 `config.isDismissible` 控制点击遮罩区域是否关闭弹窗。

:::demo
```dart
CuButton(
  type: CuColorType.error,
  plain: true,
  label: '强制操作',
  onTap: () {
    CuBottomSheet.show(
      title: '重要通知',
      stickyBottom: Padding(
        padding: CuSpacing.mediumAll,
        child: CuButton(
          label: '我知道了',
          type: CuColorType.primary,
          onTap: () =&gt; CuBottomSheet.close(),
        ),
      ),
      child: Padding(
        padding: CuSpacing.mediumAll,
        child: CuText('必须点击按钮才能继续操作'),
      ),
      config: const CuBottomSheetConfig(isDismissible: false),
    );
  },
)
```
:::

---

## 4. 尺寸与模式

### 吸底按钮模式
通过 `stickyBottom` 属性实现底部固定按钮区域，内容区域可滚动，适用于表单确认、订单支付等场景。

:::demo
```dart
CuButton(
  type: CuColorType.warning,
  label: '确认订单',
  onTap: () {
    CuBottomSheet.show(
      title: '确认支付',
      stickyBottom: Padding(
        padding: CuSpacing.mediumAll,
        child: CuButton(
          label: '立即支付 ￥199.00',
          type: CuColorType.primary,
          onTap: () =&gt; CuBottomSheet.close(),
        ),
      ),
      child: Column(
        children: [
          const CuListGroup(
            children: [
              CuListItem(title: 'VIP 年度会员', desc: '￥199.00', arrow: false),
              CuListItem(title: '优惠券', desc: '无可用', arrow: true),
            ],
          ),
          const CuDivider(),
          Padding(
            padding: CuSpacing.mediumAll,
            child: CuText(
              '虚拟商品购买后不支持退款，请确认后下单。',
              level: CuTextLevel.captionMedium,
            ),
          ),
        ],
      ),
    );
  },
)
```
:::

### 背景色自定义
通过 `config.backgroundColor` 自定义弹窗背景色，满足深色主题或特殊视觉需求。

:::demo
```dart
CuButton(
  type: CuColorType.dark,
  label: '深色主题',
  onTap: () {
    CuBottomSheet.show(
      title: '深色模式',
      child: Padding(
        padding: CuSpacing.mediumAll,
        child: CuText('自定义背景色的底部弹窗'),
      ),
      config: CuBottomSheetConfig(
        backgroundColor: Colors.grey[900],
      ),
    );
  },
)
```
:::

---

## 5. 高级自定义

### 自定义按钮文案
通过 `confirmText` 和 `cancelText` 自定义确认/取消按钮的文案，支持国际化适配。

:::demo
```dart
CuButton(
  plain: true,
  type: CuColorType.warning,
  label: '自定义按钮',
  onTap: () async {
    final result = await CuBottomSheet.radio&lt;String&gt;(
      title: '删除确认',
      value: 'keep',
      confirmText: '确定删除',
      cancelText: '再想想',
      options: [
        const CuRadioOption(label: '保留文件', value: 'keep'),
        const CuRadioOption(label: '删除文件', value: 'delete'),
      ],
    );
  },
)
```
:::

### 混合布局模式
结合 `child` 和 `stickyBottom`，同时使用自定义内容与预设组件，实现复杂的交互场景。

:::demo
```dart
CuButton(
  type: CuColorType.success,
  label: '混合布局',
  onTap: () {
    CuBottomSheet.show(
      title: '填写信息',
      stickyBottom: Padding(
        padding: CuSpacing.mediumAll,
        child: Row(
          spacing: CuSpacing.medium,
          children: [
            Expanded(
              child: CuButton(
                label: '重置',
                type: CuColorType.info,
                plain: true,
                onTap: () =&gt; CuBottomSheet.close(),
              ),
            ),
            Expanded(
              child: CuButton(
                label: '保存',
                type: CuColorType.primary,
                onTap: () =&gt; CuBottomSheet.close(),
              ),
            ),
          ],
        ),
      ),
      child: Padding(
        padding: CuSpacing.mediumAll,
        child: Column(
          spacing: CuSpacing.medium,
          children: [
            const CuInput(placeholder: '请输入用户名'),
            const CuInput(placeholder: '请输入邮箱'),
          ],
        ),
      ),
    );
  },
)
```
:::

---

## 6. 技术规范与逻辑映射

### 布局约束参考

| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `borderRadius.top` | `20` | 弹窗顶部圆角 |
| `backgroundColor` | `theme.bgColorContainer` | 弹窗背景色 |
| `barrierColor` | `Colors.black54` | 遮罩颜色 |
| `dragIndicator.width` | `36` | 拖动指示器宽度 |
| `dragIndicator.height` | `4` | 拖动指示器高度 |

### 属性定义 (API) - CuBottomSheet

#### show() 方法

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `child` | `Widget?` | — | 弹窗内容区域 |
| `stickyBottom` | `Widget?` | — | 底部固定区域 |
| `config` | `CuBottomSheetConfig` | `CuBottomSheetConfig()` | 弹窗配置 |

#### action() 方法

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `options` | `List&lt;CuListItem&gt;` | **required** | 选项列表 |
| `config` | `CuBottomSheetConfig` | `CuBottomSheetConfig()` | 弹窗配置 |

#### radio() 方法

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `options` | `List&lt;CuRadioOption&lt;T&gt;&gt;` | **required** | 单选选项列表 |
| `value` | `T?` | — | 当前选中值 |
| `style` | `CuRadioStyle` | `CuRadioStyle.radio` | 单选样式 |
| `confirmText` | `String?` | — | 确认按钮文案 |
| `cancelText` | `String?` | — | 取消按钮文案 |
| `config` | `CuBottomSheetConfig` | `CuBottomSheetConfig()` | 弹窗配置 |

#### checkbox() 方法

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `options` | `List&lt;CuCheckboxOption&lt;T&gt;&gt;` | **required** | 多选选项列表 |
| `value` | `List&lt;T&gt;?` | — | 当前选中值列表 |
| `style` | `CheckboxStyle` | `CheckboxStyle.checkbox` | 多选样式 |
| `confirmText` | `String?` | — | 确认按钮文案 |
| `cancelText` | `String?` | — | 取消按钮文案 |
| `config` | `CuBottomSheetConfig` | `CuBottomSheetConfig()` | 弹窗配置 |

#### select() 方法

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | — | 弹窗标题 |
| `options` | `List&lt;CuMultiSelectOption&lt;T&gt;&gt;` | **required** | 选择选项列表 |
| `multiple` | `bool` | `true` | 是否多选模式 |
| `value` | `List&lt;T&gt;?` | — | 当前选中值列表 |
| `confirmText` | `String?` | — | 确认按钮文案 |
| `cancelText` | `String?` | — | 取消按钮文案 |
| `config` | `CuBottomSheetConfig` | `CuBottomSheetConfig()` | 弹窗配置 |

### 属性定义 (API) - CuBottomSheetConfig

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `isDismissible` | `bool` | `true` | 点击遮罩是否关闭 |
| `enableDrag` | `bool` | `true` | 是否允许拖动关闭 |
| `showCloseIcon` | `bool` | `false` | 是否显示关闭图标 |
| `backgroundColor` | `Color?` | — | 弹窗背景色 |
| `forceMaxHeight` | `bool` | `false` | 是否强制最大高度 |
| `autoScroll` | `bool` | `true` | 是否自动滚动 |
| `maxHeight` | `double?` | — | 最大高度 |



### 内部逻辑优先级

1. **模式优先级**：`show` &gt; `action` &gt; `radio` &gt; `checkbox` &gt; `select`，各方法独立封装互不影响。
2. **内容优先级**：`child` 优先于预设组件内容，完全自定义模式不受其他参数影响。
3. **按钮文案优先级**：`confirmText` / `cancelText` 覆盖默认国际化文案。
4. **拖动指示器优先级**：仅当 `enableDrag` 为 `true` 时才渲染拖动指示器。
5. **关闭逻辑优先级**：`isDismissible` 控制遮罩点击，`enableDrag` 控制拖动关闭，两者独立工作。
6. **返回值优先级**：所有带确认按钮的模式，只有点击确认才返回选中值，点击取消返回 `null`。

---

&gt; **AI Prompt Context**: 关键词：`BottomSheet`, `CuBottomSheet`, `底部弹窗`, `操作菜单`, `单选`, `多选`, `语义化选择`。原则：优先使用 `action` 处理简单操作，`radio`/`checkbox` 处理标准选择，`select` 处理带副标题/图标的语义化选择；重要操作必须设置 `isDismissible: false`；自定义内容使用 `show` 配合 `child` 和 `stickyBottom`。

