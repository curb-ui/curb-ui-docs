<template>
  <div class="home-preview-wrapper">
    <div class="glow-bg"></div>

    <div class="content-container">
      <div class="phone-box">
        <div class="phone-case"
          @mouseenter="lockScroll" @mouseleave="unlockScroll"
            >
          <div class="phone-screen-container">
            <div class="dynamic-island"></div>
            <div class="status-bar">
              <span class="status-time">{{ currentTime }}</span>
              <div class="status-right">📶 <div class="battery-body"></div></div>
            </div>
            
            <div class="phone-content" :class="{ 'is-loading': isLoading }">
              <Transition name="fade">
                <div v-if="isLoading" class="iframe-loader">
                  <div class="spinner"></div>
                  <p>CurbUI Loading...</p>
                </div>
              </Transition>
              <iframe :src="previewUrl" class="preview-iframe" @load="handleIframeLoad"></iframe>
            </div>
            <div class="home-indicator"></div>
          </div>
        </div>
      </div>

      <div class="preview-info-card">
        <div class="info-header">
          <span class="badge">Live Demo</span>
          <h2>立即扫码体验</h2>
          <p>无需安装，扫码即可在真实手机浏览器中查看 CurbUI 交互效果。</p>
        </div>
        
        <div class="qr-showcase">
          <div class="qr-main">
            <img :src="qrCodeUrl" alt="QR Code" />
            <span>移动端预览</span>
          </div>
          <div class="download-links">
            <div class="link-item">
              <span class="icon">📦</span>
              <div>
                <strong>Android APK</strong>
                <p>版本：{{ appInfo.version }}</p>
              </div>
            </div>
            <a :href="appInfo.downloadUrl" class="mini-download-btn">下载 APK →</a>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat"><strong>极致语义</strong><span>零成本上手</span></div>
          <div class="stat"><strong>主题系统</strong><span>一键切换动态色</span></div>
          <div class="stat"><strong>生产级</strong><span>自研核心组件</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted  } from 'vue'
import appInfo from '/public/app/info.json'
const previewUrl = ref("https://curb-ui-preview.vercel.app/")
const isLoading = ref(true)
const currentTime = ref('17:23')
const handleIframeLoad = () => { setTimeout(() => isLoading.value = false, 500) }
const qrCodeUrl = computed(() => `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(previewUrl.value)}`)
// 滚动锁定逻辑
const lockScroll = () => { 
  if (window.innerWidth > 768) document.body.style.overflowY = 'hidden' 
}
const unlockScroll = () => { 
  document.body.style.overflowY = 'overlay' 
}
onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped>
.home-preview-wrapper {
  position: relative;
  padding: 100px 20px;
  margin-top: 40px;
  overflow: hidden;
}

/* 填补空白的核心：背景装饰 */
.glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 600px;
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
  z-index: -1;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px; /* 手机与说明文字的间距 */
}

/* 手机模型样式 */
.phone-box {
  width: 384px;
  flex-shrink: 0;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,0.25));
}

.phone-case {
  background: #1a1a1a;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
}

.phone-screen-container {
  position: relative;
  width: 100%;
  padding-top: 216%;
  background: #fff;
  border-radius: 40px;
  overflow: hidden;
}

/* 右侧信息卡片：解决太空的问题 */
.preview-info-card {
  max-width: 400px;
  text-align: left;
}

.badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.preview-info-card h2 {
  font-size: 32px;
  margin: 16px 0;
  background: linear-gradient(to right, var(--vp-c-text-1), var(--vp-c-brand));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.preview-info-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.qr-showcase {
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
}

.qr-main {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.qr-main img {
  width: 120px;
  height: 120px;
  background: white;
  padding: 8px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.link-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.link-item .icon { font-size: 24px; }
.link-item strong { display: block; font-size: 14px; }
.link-item p { font-size: 12px; margin: 0; }

.mini-download-btn {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white !important;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.stats-row {
  display: flex;
  gap: 30px;
  margin-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

.stat strong { display: block; font-size: 20px; color: var(--vp-c-brand); }
.stat span { font-size: 12px; color: var(--vp-c-text-2); }

/* 移动端适配 */
@media (max-width: 850px) {
  .home-preview-wrapper{
    padding: 30px 0px;
    margin-top: 20px;
  }
  .content-container {
    flex-direction: column;
    gap: 40px;
  }
  .preview-info-card {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stats-row { justify-content: center; }
}

/* 基础通用样式保持... */
.iframe-loader { position: absolute; inset: 0; background: #fff; z-index: 20; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.spinner { width: 30px; height: 30px; border: 2px solid #eee; border-top-color: var(--vp-c-brand); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.preview-iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding-top: 0; }
.dynamic-island { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 80px; height: 24px; background: #000; border-radius: 12px; z-index: 20; }
.status-bar { position: absolute; top: 0; width: 100%; height: 36px; display: flex; justify-content: space-between; padding: 0 20px; align-items: center; font-size: 12px; z-index: 15; color: #000; font-weight: bold; }
.home-indicator { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; background: rgba(0,0,0,0.1); border-radius: 2px; }
</style>