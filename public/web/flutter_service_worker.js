'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "467490eabb8d2dc19d0cf58d9ddbfa7e",
"assets/AssetManifest.bin.json": "2c1e26f33a0af817d0b1e06b76e8e1e2",
"assets/assets/fonts/curb_icons.ttf": "9d7649a40572e7121aaf7e75197604b3",
"assets/assets/images/banner1.jpg": "8c6a41c2845557b32f076085fac6b7fb",
"assets/assets/images/banner2.jpg": "6bfa79ed99997f53f8c6bd7f9a3f1a00",
"assets/assets/images/icon-1.png": "67cbf4b3bc26e12bd58bff77a2c09721",
"assets/assets/images/icon-2.png": "f51dcc2b30671ad8065233ba9c5606e4",
"assets/assets/images/icon-3.png": "adcdae9d55472e78f0791ff8e836ec73",
"assets/assets/images/logo.png": "9f41733d018e81c3899180ebbd0542b1",
"assets/assets/images/tabbar-bg.png": "d2d4910395a837ff7b96284e10d76be2",
"assets/assets/lotties/404.json": "4a61d51cbb1148f2b3a8a3cbbb027f63",
"assets/assets/lotties/aero-plane.json": "f60d8ab6aad5b8f211fef2770f981d73",
"assets/assets/lotties/empty.json": "c3d69c2b24500d6a95dcfe491809cf44",
"assets/assets/lotties/error.json": "2c4bd762831a20cb7b3e318265fe4988",
"assets/assets/lotties/hello.json": "b2334c33eeaa317e11b3a651c7532b9c",
"assets/assets/lotties/info.json": "7f0e5b5e5b5200a7e13274355af467cd",
"assets/assets/lotties/loading.json": "225a297da5abf70e8b332d525bf1609a",
"assets/assets/lotties/running-cat.json": "48cf1c1f5f2b3ca444e91f48ed49e3ce",
"assets/assets/lotties/success.json": "0159beb1ee3280a7c34c6aa5f9ce8b35",
"assets/assets/lotties/warning.json": "21fcb731d9dc7b2b946cf4ea1e28b901",
"assets/assets/svgs/%25E6%25A1%2583%25E5%25AD%2590.svg": "675740a4753afd87d38ddcf13541e8d7",
"assets/assets/svgs/%25E6%25A8%25B1%25E6%25A1%2583.svg": "282b4938ee35892e3b549114c1c5f30d",
"assets/assets/svgs/%25E6%25A9%2598%25E5%25AD%2590.svg": "94f8fc6973aa24e25cd57fd440ff3876",
"assets/assets/svgs/%25E8%258B%25B9%25E6%259E%259C.svg": "a964ba00cb1e6de54984d79670f6e60c",
"assets/assets/svgs/%25E8%258D%2589%25E8%258E%2593.svg": "df95ef7f3d10368a065375a6cafadf82",
"assets/assets/svgs/%25E8%2591%25A1%25E8%2590%2584.svg": "fb6d707ea9d2f3b7eef142544821a866",
"assets/assets/svgs/%25E8%25A5%25BF%25E7%2593%259C.svg": "4433ef0abeaf6bfb3a4f2f9ec8466619",
"assets/assets/svgs/404.svg": "f44cf9ed853aa68366a27b8a42c941e8",
"assets/assets/svgs/back.svg": "6bd69bf8f274e5fd99a3fc73e27e524d",
"assets/assets/svgs/clean.svg": "4a8febaa86686f9a071f412d8ff0d13b",
"assets/assets/svgs/close.svg": "4e064597aaa61a2708e37ecd2b229bc5",
"assets/assets/svgs/customer.svg": "f61d9b162cb7bdc448e3c35f847c8faf",
"assets/assets/svgs/down.svg": "9cd46bf82db5c32992769eb9c44c6471",
"assets/assets/svgs/edit.svg": "e259b9d75bc449237939cf05883b89ae",
"assets/assets/svgs/empty.svg": "80baa760dfea0747956dc2b799a37696",
"assets/assets/svgs/filter.svg": "2139eba07d082b4e9ef2dced2b083efd",
"assets/assets/svgs/off.svg": "12a43f21ca5592d4182e7661051269f2",
"assets/assets/svgs/qrcode.svg": "0abdf95198a1938f97ead1b4bf4cd77d",
"assets/assets/svgs/right.svg": "45d5eadd48c1144f4957a65356190656",
"assets/assets/svgs/search.svg": "2a74cdd5e301f5128eac7246324a9278",
"assets/assets/svgs/setting.svg": "205be3b81da2116413d5e9b8380cbdd9",
"assets/assets/svgs/share.svg": "38eb897385c17423ce662e2c740b807d",
"assets/assets/svgs/tabbar-0.svg": "0d99f1c174b23df8b39c54d3d08b8813",
"assets/assets/svgs/tabbar-1.svg": "87eaebf09a2ef0091f52046feeb7e7c5",
"assets/assets/svgs/tabbar-2.svg": "4ca9b0739c068dd2d62b53828320fb17",
"assets/assets/svgs/time.svg": "628615d8177a7ed01d1602af607f6ffd",
"assets/docs/content/api/admin.md": "39dfca849861706a604fcdb10145b5bb",
"assets/docs/content/api/code-generation.md": "dbc2a111134cbd4503f10b45ae1f5aeb",
"assets/docs/content/api/index.md": "5078c0dc3adff7a41fe2ecc2c8d876eb",
"assets/docs/content/api/models.md": "54c868eccb23c8162bcf1b70d2d6b8da",
"assets/docs/content/api/services.md": "03224e44a024c23cd57cc26f6ae4da6a",
"assets/docs/content/components/cu_appbar.md": "f1327fa889e759a7c8770cd476360168",
"assets/docs/content/components/cu_avatar.md": "21c6f1de8b9dafc21621b33663a8b471",
"assets/docs/content/components/cu_banner.md": "5507cf50be2b371e9f9f2a2ac8839fd2",
"assets/docs/content/components/cu_bottom_sheet.md": "4472428ee1d404f7af69099744b4e6bb",
"assets/docs/content/components/cu_button.md": "73b1457f6087022559228adda3ec40bb",
"assets/docs/content/components/cu_card.md": "8755513dee8992f67b31b14b28ea633c",
"assets/docs/content/components/cu_checkbox.md": "02b0c0e83e22fb2ed7313036b2d515d0",
"assets/docs/content/components/cu_confirm.md": "8b839aca1a1a67bd2f9da17b1b85cc95",
"assets/docs/content/components/cu_dialog.md": "039b762df18136c9964e4b4a2ae1f308",
"assets/docs/content/components/cu_divider.md": "b8fc1c512f1f27c8b3b6b2aa6a9c84cd",
"assets/docs/content/components/cu_icon.md": "6c24a54da3f3f16a20c078f1c0149ff7",
"assets/docs/content/components/cu_image.md": "24567ea2df6a8ac32b6711fab2d52f43",
"assets/docs/content/components/cu_input.md": "488b6ab60c782d6fec334981563047a9",
"assets/docs/content/components/cu_keep_alive.md": "fde8da07673679394fda26cec9bbe902",
"assets/docs/content/components/cu_list.md": "97f36318640880dbee12b950221cfff4",
"assets/docs/content/components/cu_loading.md": "2cc893cfb66f7a3525a7f3ed9797285c",
"assets/docs/content/components/cu_lottie.md": "a6c5e20d75f31939d88a3b96cd230c70",
"assets/docs/content/components/cu_multi_select.md": "3b9cedf67c3d46ca18f5d034a64fabd4",
"assets/docs/content/components/cu_page.md": "77e51faf8d457225bd59645ccb571a23",
"assets/docs/content/components/cu_progress_circle.md": "d1f9273af430f3fc2726c7f4c128d2b2",
"assets/docs/content/components/cu_radio.md": "667b5811a51063b52e5c31e4d81aee3e",
"assets/docs/content/components/cu_rate.md": "8f7432432770defd270e88953a426f9b",
"assets/docs/content/components/cu_refresh.md": "26b8969cc0d86f2258a3ce1bfa255731",
"assets/docs/content/components/cu_result.md": "4a10e8ce5e24635d6cc7991413dfd75e",
"assets/docs/content/components/cu_slider.md": "63271702c9922529a04616901923a2d4",
"assets/docs/content/components/cu_switch.md": "826b4f72073514103780cc893ffc6f08",
"assets/docs/content/components/cu_tabbar.md": "07ba9a4697d641e49cc952c422318fc1",
"assets/docs/content/components/cu_tabs.md": "e3fd4e8df1836542671ab4c9cd1024a5",
"assets/docs/content/components/cu_tag.md": "4f713035eef559677feb7b4fb8db5d25",
"assets/docs/content/components/cu_text.md": "0d782e8a6cab9509f199a5a23b1247f9",
"assets/docs/content/components/cu_toast.md": "f116c5a256d966dedba12409a2e2db61",
"assets/docs/content/components/cu_upgrade.md": "307fb17d4e072fed28ba28eedbe26051",
"assets/docs/content/components/cu_upload.md": "a2ef1ccfcfc42e42775ada8abef4f47f",
"assets/docs/content/components/index.md": "f20fd77b6083d12a9b7cc8c5fe856c98",
"assets/docs/content/locale/add-language.md": "318be96de3226fd76f2424bc87ae3fb6",
"assets/docs/content/locale/complex-scenarios.md": "472835e76b925b5d09555ab9b2a9cc67",
"assets/docs/content/locale/file-structure.md": "8f0d4b3a055927a5335e0ff101e27b4c",
"assets/docs/content/locale/index.md": "69d107cf802e8d6cb5aaafe918c55b6b",
"assets/docs/content/locale/language-switching.md": "a25e98b1ef68cb7c2ad4efdbfb96a59c",
"assets/docs/content/locale/resource-delegate.md": "04716a7257a993d1007d2dad7663d5b0",
"assets/docs/content/route/advanced-features.md": "c0119c651c962c2d40695d9ce7660700",
"assets/docs/content/route/basic-usage.md": "278887a3000ca618159493191938bfc1",
"assets/docs/content/route/best-practices.md": "321bba389caf83adfb3db898c98ee186",
"assets/docs/content/route/index.md": "3a64807669cbce5f4e62cd81df661c01",
"assets/docs/content/theme/color-preview.md": "0cc35e9759d34a00bb44f4488e9dd1bc",
"assets/docs/content/theme/config-structure.md": "1ac1e6ffc9becbddbee91e786c449455",
"assets/docs/content/theme/custom-theme.md": "ebbb2a943729b6323f178e38b3b9b23e",
"assets/docs/content/theme/index.md": "b63a3cd0e4a651ff949e015d9f989b25",
"assets/docs/content/theme/theme-color-usage.md": "124cf6b98d492030a69bd25e8f7d1b6c",
"assets/docs/content/theme/theme-manager.md": "a4344a40c68b3eaaa7d2c5b3d16d5432",
"assets/docs/content/theme/theme-switching.md": "673473731cd21606829d84964639c024",
"assets/docs/content/welcome/index.md": "86a64e8460b7606e486ca9b03d17b9e6",
"assets/docs/content/welcome/privacy-compliance.md": "29cdd995340807ac991709a609b2bec1",
"assets/FontManifest.json": "d9f3dfed85e59566a1cda4ecbd6d76b3",
"assets/fonts/MaterialIcons-Regular.otf": "d2f8a078cef044df4ade210740ef34ef",
"assets/NOTICES": "bb3f7f9e25d43b60502157731fa30a41",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"favicon.png": "ca883daaf7c7caec35024bbb39feeedf",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "f434bbb8d0a210a42264874eb6c3b59f",
"icons/Icon-192.png": "d5ffe0785520a8a71efb1847fd378fbc",
"icons/Icon-512.png": "1be0b56088346c73e46accce8fd4fc63",
"icons/Icon-maskable-192.png": "d5ffe0785520a8a71efb1847fd378fbc",
"icons/Icon-maskable-512.png": "1be0b56088346c73e46accce8fd4fc63",
"index.html": "2a43369f23e0ecc3bb791370fd49d09d",
"/": "2a43369f23e0ecc3bb791370fd49d09d",
"main.dart.js": "c1b0ef0b9b6691a564d448e41150dc68",
"manifest.json": "ce9fefaa15ee5f9f8e5e9d1ff28d31c4",
"version.json": "0a70b296a676687663ecadfcd69d7497"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
