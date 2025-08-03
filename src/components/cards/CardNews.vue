<script setup>
import { ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '../ui/dialog'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-vue-next'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const fallbackImage = '/fallback-news.png' // Ajusta si querés

const imageLoaded = ref(false)

function onImageLoad() {
  imageLoaded.value = true
}

function strLimit(text, max) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '...' : text
}

function getFormatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <Dialog>
    <DialogTrigger class="w-full h-full">
      <Card
        class="relative overflow-hidden flex flex-col xl:flex-row justify-start items-center text-center group cursor-pointer w-full h-full">
        <CardHeader class="relative flex flex-col justify-center items-center xl:w-[15rem] xl:h-full p-0 z-20">
          <div class="flex justify-center items-center overflow-hidden w-full h-full relative">
            <img :src="game.image || fallbackImage"
              class="w-full h-full object-cover ease-in-out duration-300 transform group-hover:scale-105 group-focus:scale-105"
              :alt="`Cover of the news ${game.title}`" @load="onImageLoad" />
            <div v-if="!imageLoaded"
              class="picture-loader absolute top-0 left-0 flex justify-center items-center bg-secondary w-full h-full z-10">
              <LoaderCircle class="animate-spin" />
            </div>
          </div>
          <div class="absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-black w-full h-full" />
        </CardHeader>

        <CardContent class="text-center xl:text-start w-full xl:w-[calc(100%-15rem)] p-4 z-20">
          <CardTitle class="font-bold transition-colors group-hover:text-primary group-focus:text-primary">
            {{ strLimit(game.title, 100) }}
          </CardTitle>
          <CardDescription class="text-sm mx-auto mt-1 mb-3">
            {{ getFormatDate(game.pubDate) }}
          </CardDescription>
          <p>{{ strLimit(game.description, 150) }}</p>
        </CardContent>
      </Card>
    </DialogTrigger>

    <DialogContent
      class="max-w-[calc(100%-1rem)] sm:max-w-[calc(50rem)] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ game.title }}</DialogTitle>
        <DialogDescription>{{ getFormatDate(game.pubDate) }}</DialogDescription>
      </DialogHeader>

      <div class="news-content grid gap-4 py-4 overflow-y-auto px-6" v-html="game.contentEncoded"></div>

      <DialogFooter class="p-6 pt-0">
        <DialogClose as-child>
          <Button type="button" variant="secondary">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style>
.news-content h2 {
  margin-top: 2.5rem;
  /* mt-10 */
  scroll-margin-top: 5rem;
  /* scroll-m-20 */
  border-bottom: 2px solid currentColor;
  /* border-b */
  padding-bottom: 0.5rem;
  /* pb-2 */
  font-size: 1.875rem;
  /* text-3xl */
  font-weight: 600;
  /* font-semibold */
  letter-spacing: -0.025em;
  /* tracking-tight */
  transition: color 0.3s ease;
  /* transition-colors */
}

.news-content h2:first-child {
  margin-top: 0;
  /* first:mt-0 */
}

.news-content h3 {
  margin-top: 2rem;
  /* mt-8 */
  scroll-margin-top: 5rem;
  /* scroll-m-20 */
  font-size: 1.5rem;
  /* text-2xl */
  font-weight: 600;
  /* font-semibold */
  letter-spacing: -0.025em;
  /* tracking-tight */
}

.news-content p {
  line-height: 1.75rem;
  /* leading-7 */
}

.news-content p:not(:first-child) {
  margin-top: 1.5rem;
  /* [&:not(:first-child)]:mt-6 */
}

.news-content a {
  font-weight: 500;
  /* font-medium */
  transition: color 0.3s ease;
  /* transition-colors */
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  color: inherit;
}

.news-content a:hover,
.news-content a:focus {
  color: var(--color-primary, #3b82f6);
  /* hover:text-primary */
  outline: none;
}

.news-content ul {
  margin: 1.5rem 0 1.5rem 1.5rem;
  /* my-6 ml-6 */
  list-style-type: disc;
}

.news-content ul>li {
  margin-top: 0.5rem;
  /* [&>li]:mt-2 */
}

.news-content img {
  border-radius: 0.375rem;
  /* rounded-md */
  max-width: 100%;
  height: auto;
}

.news-content blockquote {
  margin-top: 1.5rem;
  /* mt-6 */
  border-left: 2px solid currentColor;
  padding-left: 1.5rem;
  /* pl-6 */
  font-style: italic;
}

/* Ocultar párrafos que siguen a sección con data-transform="divider" */
.news-content section[data-transform="divider"]~p {
  height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
