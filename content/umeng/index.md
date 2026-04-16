这是一份为你的 **CurbUI** 项目量身定制的 **友盟 (Umeng) 全模块集成整体配置文档**。它涵盖了从 Android 原生依赖、混淆规则到 Flutter 业务逻辑及隐私合规的完整闭环。

---

# CurbUI 友盟全模块集成技术文档

| 版本 | 日期 | 状态 | 备注 |
| :--- | :--- | :--- | :--- |
| v1.0 | 2026-04-15 | 稳定版 | 适配 Android Kotlin DSL & Flutter |

---

## 一、 Android 原生配置

### 1. 依赖管理 (`android/app/build.gradle.kts`)
使用最新的固定版本号，确保构建的幂等性（不可变性）。

```kotlin
dependencies {
    // 基础组件与统计 (Analytics)
    implementation("com.umeng.umsdk:common:9.9.1") 
    implementation("com.umeng.umsdk:asms:1.8.7")
    implementation("com.umeng.umsdk:uyumao:1.1.4")
    implementation("com.umeng.umsdk:union:3.2.0")

    // 推送 (U-Push) & 性能监控 (APM)
    implementation("com.umeng.umsdk:push:6.7.6")
    implementation("com.umeng.umsdk:apm:2.0.8")

    // 分享 (U-Share) 核心及微信
    implementation("com.umeng.umsdk:share-core:7.3.7")
    implementation("com.umeng.umsdk:share-wx:7.3.7")
    implementation("com.tencent.mm.opensdk:wechat-sdk-android:6.8.24")

    // 微博分享 (注意：必须显式关闭传递依赖以解决 R8 冲突)
    implementation("com.umeng.umsdk:share-sina:7.3.7")
    implementation("io.github.sinaweibosdk:core:13.10.1") {
        isTransitive = false
    }

    // 抖音分享 (依赖本地 libs 目录下的 jar 包)
    implementation("com.bytedance.ies.ugc.aweme:opensdk-china-external:0.1.9.0")
    implementation("com.bytedance.ies.ugc.aweme:opensdk-common:0.1.9.0")
    implementation(files("libs/umeng-share-bytedance-7.3.7.jar"))

    // 智能链路 (U-Link)
    implementation("com.umeng.umsdk:link:2.0.0")
}
```

### 2. 混淆规则 (`android/app/proguard-rules.pro`)
```proguard
# 友盟基础库
-keep class com.umeng.** {*;}
-keep class com.uc.** {*;}
-keep class com.efs.** {*;}
-keepclassmembers class * {
   public <init> (org.json.JSONObject);
}

# 移动安全联盟 (针对 uyumao/asms)
-keep class com.zui.** {*;}
-keep class com.miui.** {*;}
-keep class com.heytap.** {*;}
-keep class com.vivo.** {*;}

# 微信/微博/抖音分享
-keep class com.tencent.mm.** {*;}
-keep class com.sina.** {*;}
-keep class com.bytedance.** {*;}
```

---

## 二、 Native 桥接逻辑 (`UmengHelper.kt`)

为了兼容 Flutter 的多种调用格式，采用分支解析策略，防止 `ClassCastException`。

```kotlin
object UmengHelper {
    fun handleMethodCall(call: MethodCall, result: MethodChannel.Result, context: Context) {
        when (call.method) {
            "preInit", "initUmeng" -> {
                val appKey = call.argument<String>("appKey") ?: ""
                val channel = call.argument<String>("channel") ?: "Umeng"
                if (call.method == "preInit") {
                    UMConfigure.preInit(context, appKey, channel)
                } else {
                    UMConfigure.init(context, appKey, channel, UMConfigure.DEVICE_TYPE_PHONE, "")
                    MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.MANUAL)
                }
                result.success(true)
            }
            "onPageStart", "onPageEnd" -> {
                val pageName = call.arguments as? String
                if (pageName != null) {
                    if (call.method == "onPageStart") MobclickAgent.onPageStart(pageName)
                    else MobclickAgent.onPageEnd(pageName)
                }
                result.success(null)
            }
            "onEvent" -> {
                val eventId = call.argument<String>("eventId")
                val properties = call.argument<Map<String, Any>>("properties")
                val stringMap = properties?.mapValues { it.value.toString() }
                MobclickAgent.onEvent(context, eventId, stringMap)
                result.success(null)
            }
        }
    }
}
```

---

## 三、 Flutter 业务实现

### 1. 服务封装 (`service/service.dart`)
```dart
import 'package:curb_ui/config/index.dart';
import 'package:flutter/services.dart';
import 'package:curb_ui/utils/index.dart';

class CuUmengService {
  static const MethodChannel _channel = MethodChannel('com.curb.ui/umeng');

  // 可以在这里统一管理 Key，或者从环境变量读取
  static const String _appKey = Config.umengAppId;
  static const String _channelName = "GooglePlay";

  /// 预初始化 (App启动就执行，不采集隐私)
  static Future<void> preInit() async {
    await _channel.invokeMethod('preInit', {
      'appKey': _appKey,
      'channel': _channelName,
    });
  }

  /// 正式初始化 (隐私协议确认后执行)
  static Future<void> init() async {
    logger.i('initUmeng');
    await _channel.invokeMethod('initUmeng', {
      'appKey': _appKey,
      'channel': _channelName,
    });
  }

  /// 自定义事件
  static Future<void> onEvent(
    String eventId,
    Map<String, dynamic> properties,
  ) async {
    await _channel.invokeMethod('onEvent', {
      'eventId': eventId,
      'properties': properties,
    });
  }

  /// 页面开始
  static Future<void> onPageStart(String pageName) async {
    await _channel.invokeMethod('onPageStart', pageName);
  }

  /// 页面结束
  static Future<void> onPageEnd(String pageName) async {
    await _channel.invokeMethod('onPageEnd', pageName);
  }
}

```

### 2. 自动化路由监控 (`observer.dart`)
确保页面统计“先结束，后开启”，严格符合友盟状态机。

```dart
class CuRouterObserver extends NavigatorObserver {
  static String? _activePage;

  void _process(Route? route) {
    if (_activePage != null) {
      CuUmengService.onPageEnd(_activePage!);
      _activePage = null;
    }
    final name = route?.settings.name;
    if (name != null) {
      _activePage = name;
      CuUmengService.onPageStart(name);
    }
  }

  @override
  void didPush(Route route, Route? previousRoute) => _process(route);
  
  @override
  void didPop(Route route, Route? previousRoute) => _process(previousRoute);

  @override
  void didReplace({Route? newRoute, Route? oldRoute}) => _process(newRoute);
}
```

---

## 四、 隐私合规流转图

1.  **bootstrap**: 执行 `CuUmengService.preInit()`。
2.  **WelcomePage**: 检测隐私协议状态。
3.  **用户点击同意**: 
    * 调用 `userProvider.setPrivacyAgreed(true)`。
    * 调用 `await CuUmengService.init()`。
    * `pushReplacementNamed(Routes.index.name)`。
4.  **IndexPage**: 进入后，`Observer` 自动触发 `onPageStart('index')`。

---

## 五、 常见排查点 (Troubleshooting)

* **has inited !!!**: 表示 Native 端重复初始化，通过 `_isInitialized` 布尔锁解决。
* **ClassCastException**: 发生在 `onPageStart` 传参时，确保传递的是 `String` 而非 `Map`。
* **UMLog 红色警告**: 页面栈未闭环。检查是否在 `GoRouter` 中为每个路由分配了唯一的 `name`。