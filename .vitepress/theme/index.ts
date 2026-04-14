import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePreview from './components/HomePreview.vue'
import HomeHero from './components/HomeHero.vue'
import { useRoute } from 'vitepress'
import { onMounted, watch, nextTick, h } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: any) {
    app.component('HomePreview', HomePreview)
    app.component('HomeHero', HomeHero)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(HomeHero)
    })
  },
  setup() {
    const route = useRoute()

    const scrollActiveLinkIntoView = () => {
      nextTick(() => {
        const activeLink = document.querySelector('.VPSidebarItem.is-active, .sidebar-nav-item.active, .VPLink.active')
        
        if (activeLink) {
          activeLink.scrollIntoView({
            behavior: 'smooth',
            block: 'center', 
            inline: 'nearest'
          })
        }
      })
    }

    onMounted(() => {
      scrollActiveLinkIntoView()
    })

    // 监听路由路径变化
    watch(
      () => route.path,
      () => {
        scrollActiveLinkIntoView()
      }
    )
  }
}