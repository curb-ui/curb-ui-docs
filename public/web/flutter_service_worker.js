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
"assets/docs/content/api/admin.md": "b38e9844d3507ae08587056a897789bb",
"assets/docs/content/api/code-generation.md": "d8e92a7b1e68822204dab55358e643fb",
"assets/docs/content/api/index.md": "b17fd4323b0e4bc4276ffa75be102ead",
"assets/docs/content/api/models.md": "630da34147a249c32dff9c19413a79e5",
"assets/docs/content/api/services.md": "7ef0a16a127bcac71b365ca2c2829167",
"assets/docs/content/components/cu_appbar.md": "8c9f906237b5d18ef3c854dedd82f7bb",
"assets/docs/content/components/cu_avatar.md": "171d17a12a4c35c178174dde61b3e92f",
"assets/docs/content/components/cu_banner.md": "4dc046a92097c6241b97c897bfbc30c1",
"assets/docs/content/components/cu_bottom_sheet.md": "6b3e27433890ba94f71f0392014c2f49",
"assets/docs/content/components/cu_button.md": "2574604280c4aaf9d31ee0f04f6f14fd",
"assets/docs/content/components/cu_card.md": "bc4412f9a4d766d5fa59011e415662ac",
"assets/docs/content/components/cu_checkbox.md": "a87fd6609122dce60a285c788ebc1126",
"assets/docs/content/components/cu_confirm.md": "93e7c55ef7c1f0d42cfb2a8625f6d3f2",
"assets/docs/content/components/cu_dialog.md": "653f07b9dce399d1b408ba4bf963d953",
"assets/docs/content/components/cu_divider.md": "a75b3bed0b0dd2a79aa4c2494ff020cf",
"assets/docs/content/components/cu_icon.md": "8eeb5adf5034838afeb1976eb45b3ab7",
"assets/docs/content/components/cu_image.md": "cd732f8d9757a7daa943896f0d1c5b98",
"assets/docs/content/components/cu_input.md": "d058b7db3a1d0fc448976d4dcd79a6b1",
"assets/docs/content/components/cu_keep_alive.md": "c53e65c9638e5b2de5b3b5956dbca0c4",
"assets/docs/content/components/cu_list.md": "36b0306571e21a1c66d7f0bddbcc31b2",
"assets/docs/content/components/cu_loading.md": "2cc893cfb66f7a3525a7f3ed9797285c",
"assets/docs/content/components/cu_lottie.md": "a6c5e20d75f31939d88a3b96cd230c70",
"assets/docs/content/components/cu_multi_select.md": "ff4b150cc5aee0848e542918d438ab5d",
"assets/docs/content/components/cu_page.md": "20fc74c220d095136118e813849030ce",
"assets/docs/content/components/cu_progress_circle.md": "98631e09b8b7cfc556622789372136ae",
"assets/docs/content/components/cu_radio.md": "bb18ef9eb1902fa8ba26b2d97c751303",
"assets/docs/content/components/cu_rate.md": "1a33dd973f8d9d7c2e735a1c0bfb5d23",
"assets/docs/content/components/cu_refresh.md": "a5c63bc3f88366a609435b5a1dab1064",
"assets/docs/content/components/cu_result.md": "6963fe71ceb9c407304a83cd887082e8",
"assets/docs/content/components/cu_slider.md": "7f7bfc3e03506d5d40de22c895ad3df3",
"assets/docs/content/components/cu_switch.md": "bd233f75bfb16b3c6a014bf730af3775",
"assets/docs/content/components/cu_tabbar.md": "95210cfbd3c692487484b66589566d2e",
"assets/docs/content/components/cu_tabs.md": "f4bc07372a8bcedda601f7f7690de060",
"assets/docs/content/components/cu_tag.md": "0a1d24b6a208d3d9a8bfe0df4d56dc66",
"assets/docs/content/components/cu_text.md": "3ec7c32b4d65488ddbc3d83bd0a8345c",
"assets/docs/content/components/cu_toast.md": "d3e5c72f05a4830737d55f4fe315fedd",
"assets/docs/content/components/cu_upgrade.md": "d039e16ce6bf2eb9a01af757f4388550",
"assets/docs/content/components/cu_upload.md": "d7694dccc9226784ff1193bd30cf8c2c",
"assets/docs/content/components/index.md": "bb63f4f8febfb3219d5d6bbfe3f83aa0",
"assets/docs/content/locale/add-language.md": "b13f91076b9a106d845a84f1dcf0b4cc",
"assets/docs/content/locale/complex-scenarios.md": "113c0ac171595f9de81331529b26bb75",
"assets/docs/content/locale/file-structure.md": "4844dc3601696d4e8440184ba8eb6180",
"assets/docs/content/locale/index.md": "eaa9dce41bd192e5c6a5586f251f62f5",
"assets/docs/content/locale/language-switching.md": "ff11bacde9e0ab1f613c0271aa128db7",
"assets/docs/content/locale/resource-delegate.md": "c35e8d4497c5ec9b5c8a2bb807d853d3",
"assets/docs/content/route/advanced-features.md": "c0119c651c962c2d40695d9ce7660700",
"assets/docs/content/route/basic-usage.md": "278887a3000ca618159493191938bfc1",
"assets/docs/content/route/best-practices.md": "321bba389caf83adfb3db898c98ee186",
"assets/docs/content/route/index.md": "3a64807669cbce5f4e62cd81df661c01",
"assets/docs/content/theme/color-preview.md": "f022216f84aa8c07de5cb9fe1e57d1c4",
"assets/docs/content/theme/config-structure.md": "554ab642a13e01cc92009906b0bd32dd",
"assets/docs/content/theme/custom-theme.md": "6a2a59833d680a24eac1f8d25cf8be3d",
"assets/docs/content/theme/index.md": "d377ea9f687a71367acadf926769e77e",
"assets/docs/content/theme/theme-color-usage.md": "82aeb88daa7b20b51e6e68e39a8aecb9",
"assets/docs/content/theme/theme-manager.md": "5e11f7020cbcbe42302ea3ae34cd8a45",
"assets/docs/content/theme/theme-switching.md": "ef5b14d6be4eb849e847a719d130431a",
"assets/docs/content/welcome/index.md": "0a540a4d0eb29f85e14cda9166569e19",
"assets/docs/content/welcome/privacy-compliance.md": "fd7559817d16cd93cb0030229b107170",
"assets/FontManifest.json": "d9f3dfed85e59566a1cda4ecbd6d76b3",
"assets/fonts/MaterialIcons-Regular.otf": "9c70670d304a3b5eb8d86d0df9a2ab33",
"assets/NOTICES": "6ae8cdc448c98816610c03c7c23c3692",
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
"flutter_bootstrap.js": "91f2fa3598562290a38dd983821150dd",
"icons/Icon-192.png": "d5ffe0785520a8a71efb1847fd378fbc",
"icons/Icon-512.png": "1be0b56088346c73e46accce8fd4fc63",
"icons/Icon-maskable-192.png": "d5ffe0785520a8a71efb1847fd378fbc",
"icons/Icon-maskable-512.png": "1be0b56088346c73e46accce8fd4fc63",
"index.html": "2a43369f23e0ecc3bb791370fd49d09d",
"/": "2a43369f23e0ecc3bb791370fd49d09d",
"main.dart.js": "9be64fc0f6181493410b7ceb9f77d0c8",
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
