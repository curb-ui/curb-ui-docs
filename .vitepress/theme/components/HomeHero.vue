<template>
  <div class="custom-hero-outer">
    <!-- 背景装饰光晕：增加视觉丰富度 -->
    <div class="hero-bg">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
    </div>

    <div class="hero-container">
      <!-- 顶部内容区 -->
      <div class="main-content">
        <div class="badge-row">
          <span class="badge">Next Generation UI Framework</span>
        </div>
        
        <h1 class="brand-name">CurbUI</h1>
        <h2 class="main-title">一个精致的 Flutter 设计系统</h2>
        <p class="tagline">开箱即用、极致语义化的 Flutter UI 框架</p>
        
        <div class="cta-actions">
          <a class="btn-primary" href="/content/introduce/index">
            快速开始
            <span class="icon-arrow">→</span>
          </a>
          <a class="btn-secondary" href="/content/components/index">查看组件</a>
        </div>
      </div>

      <!-- 底部预览区：通过装饰容器消除空洞感 -->
      <div class="preview-section">
        <div class="preview-glass-card">
          <HomePreview />
        </div>
        <!-- 底部渐变遮罩，使预览与下方内容自然过渡 -->
        <div class="bottom-fade"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-hero-outer {
  position: relative;
  padding: 100px 24px 100px 24px;
  background-color: var(--vp-c-bg);
}


/* 文字内容区域优化 */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 80px; 
}

.badge-row {
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  background: rgba(66, 165, 245, 0.1);
  color: #42a5f5;
  border: 1px solid rgba(66, 165, 245, 0.2);
}

.brand-name {
  font-size: 80px;
  font-weight: 900;
  margin: 0;
  letter-spacing: -2px;
  background: linear-gradient(120deg, #42a5f5 30%, #ff4081);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.main-title {
  font-size: 56px;
  font-weight: 800;
  margin: 16px 0;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.tagline {
  font-size: 22px;
  color: var(--vp-c-text-2);
  margin-bottom: 48px;
  line-height: 1.6;
}

/* 按钮样式优化 */
.cta-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #42a5f5, #1e88e5);
  color: white;
  padding: 0 40px;
  height: 56px;
  line-height: 56px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(66, 165, 245, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(66, 165, 245, 0.4);
}

.btn-secondary {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  padding: 0 40px;
  height: 56px;
  line-height: 56px;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft);
}

/* 预览区域：使用玻璃拟态底座消除“太空了”的感觉 */
.preview-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
}

.preview-glass-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  padding: 40px 40px 0 40px;
  box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.05);
}

/* 背景光晕：填充左右空白 */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
}

.glow-1 { top: 10%; left: 15%; width: 400px; height: 400px; background: #42a5f5; }
.glow-2 { top: 20%; right: 10%; width: 500px; height: 500px; background: #ff4081; }
.glow-3 { bottom: 0; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background: #42a5f5; opacity: 0.1; }

/* 响应式调整 */
@media (max-width: 768px) {
  .custom-hero-outer { padding: 20px 10px 10px 10px; }
  .brand-name { font-size: 56px; }
  .main-title { font-size: 36px; }
  .tagline { font-size: 18px; }
  .preview-glass-card { 
    padding: 0;
  }
  .cta-actions { flex-direction: column; width: 100%; max-width: 300px; }
}
</style>