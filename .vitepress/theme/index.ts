import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePreview from './components/HomePreview.vue'
import { useRoute } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: any) {
    app.component('HomePreview', HomePreview)
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