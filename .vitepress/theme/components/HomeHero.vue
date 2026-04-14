<template>
  <section class="home-hero">
    <div class="container">
      <div class="main">
        <h1 class="name">
          <span class="clip">CurbUI</span>
        </h1>
        <p class="text">一个精致的 Flutter 设计系统</p>
        <p class="tagline">开箱即用、极致语义化的 Flutter UI 框架</p>

        <div class="actions">
          <a class="action-btn brand" href="/content/introduce/index">快速开始</a>
          <a class="action-btn alt" href="/content/components/index">查看组件</a>
        </div>
      </div>

      <div class="preview">
        <HomePreview />
      </div>
    </div>
  </section>
</template>

<script setup>
import HomePreview from './HomePreview.vue'
</script>

<style scoped>
.home-hero {
  padding: 64px 24px;
}

@media (min-width: 640px) {
  .home-hero { padding: 96px 48px; }
}

@media (min-width: 960px) {
  .home-hero { padding: 128px 64px 0 64px; }
}

.container {
  display: flex;
  flex-direction: column !important;
  margin: 0 auto;
  max-width: 100% !important;
}


.main {
  text-align: center;
}


.name {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.clip {
  background: linear-gradient(120deg, #42a5f5 30%, #ff4081);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

.tagline {
  padding-top: 12px;
  font-size: 18px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}

@media (min-width: 640px) {
  .name, .text { font-size: 64px; }
  .tagline { font-size: 24px; }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding-top: 32px;
}



.action-btn {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  padding: 0 24px;
  line-height: 46px;
  font-size: 14px;
  border-radius: 24px;
}

.brand {
  color: #fff;
  background-color: var(--vp-c-brand-1);
}

.brand:hover { background-color: var(--vp-c-brand-2); }

.alt {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider);
}

.alt:hover { background-color: var(--vp-c-bg-soft); }


</style>