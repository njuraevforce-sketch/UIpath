import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

window.__NFTALT_READY__ = true
if (window.webkit?.messageHandlers?.diary) window.webkit.messageHandlers.diary.postMessage({ action: 'ready' })

// PWA installation/offline caching is enabled only over HTTP(S), not in a bundled file:// WebView.
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' }).catch(() => {
      console.warn('Offline cache unavailable. Entries are still saved locally.');
    });
  });
}
