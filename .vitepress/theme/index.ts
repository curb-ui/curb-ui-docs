import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomePreview from './components/HomePreview.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('HomePreview', HomePreview)
  }
}
