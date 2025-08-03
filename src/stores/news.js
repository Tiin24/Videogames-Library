import { defineStore } from 'pinia'
import axios from 'axios'

export const useNewsStore = defineStore('news', {
  state: () => ({
    articles: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchNews() {
      this.loading = true
      this.error = null

      try {
        const encodedUrl = encodeURIComponent('https://www.ign.com/rss/articles/feed')
        const res = await axios.get(`https://api.allorigins.win/get?url=${encodedUrl}`)
        const xmlString = res.data.contents

        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlString, 'text/xml')
        const items = Array.from(xml.getElementsByTagName('item'))

        this.articles = items.map(item => {
          const title = item.getElementsByTagName('title')[0]?.textContent || ''
          const link = item.getElementsByTagName('link')[0]?.textContent || ''
          const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || ''
          const guid = item.getElementsByTagName('guid')[0]?.textContent || ''
          const description = item.getElementsByTagName('description')[0]?.textContent || ''

          // Contenido completo en 'content:encoded' (puede ser null si no existe)
          const contentEncodedNode = item.getElementsByTagName('content:encoded')[0]
          const contentEncoded = contentEncodedNode ? contentEncodedNode.textContent : ''

          // Imagen
          const media = item.getElementsByTagName('media:content')[0]
          const mediaUrl = media?.getAttribute('url')

          return {
            title,
            link,
            pubDate,
            guid,
            description,
            contentEncoded,    // <--- aquí agregas este campo para usarlo luego
            image: mediaUrl || extractFirstImage(description)
          }
        })

        console.log('Noticias cargadas:', this.articles)
      } catch (e) {
        this.error = 'No se pudieron cargar las noticias.'
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
})

function extractFirstImage(html) {
  if (!html) return null
  const match = html.match(/<img[^>]+src="([^">]+)"/i)
  return match ? match[1] : null
}
