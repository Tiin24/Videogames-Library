<script setup>
import { ref, watch, onMounted } from 'vue';
import {
  AlignLeft,
  ArrowUp10,
  CodeXml,
  Download,
  Gamepad2,
  Ghost,
  Globe,
  Hash,
  SquareArrowOutUpRight,
  DollarSign
} from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';

const props = defineProps({
  game: { type: Object, required: true },
  loading: { type: Boolean, default: false }
})

const isOpen = ref(false);
const content = ref(null);
const contentHeight = ref(0);

const calculateHeight = () => {
  if (content.value) {
    contentHeight.value = content.value.scrollHeight;
  }
};

onMounted(() => {
  calculateHeight();
});

watch(() => props.game.description, () => {
  calculateHeight();
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex justify-start items-center font-bebas text-3xl tracking-wide font-medium">
        <AlignLeft class="mr-[5px]" />About
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton v-if="loading" class="h-24 mx-auto" />
      <Collapsible v-else v-model:open="isOpen" class="mb-4">
        <div class="relative overflow-hidden transition-all duration-300 ease-in-out"
          :style="{ maxHeight: isOpen ? `${contentHeight}px` : '6rem' }">
          <div
            class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-[hsl(var(--card))] transition-all duration-300 ease-in-out"
            :class="{ 'h-full': !isOpen && contentHeight > 96, 'h-0': isOpen || contentHeight <= 96 }" />
          <div ref="content" v-html="game?.description?.split('Español')[0]" />
        </div>
        <CollapsibleTrigger v-if="contentHeight > 96"
          class="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground capitalize w-full h-9 px-4 py-2 mt-2">
          {{ isOpen ? 'Show less' : 'Read more' }}
        </CollapsibleTrigger>
      </Collapsible>

      <div :class="{
        'grid grid-cols-1 sm:grid-cols-2 gap-4': true,
        'mb-4':
          (game?.platforms?.length ||
            game?.genres?.length ||
            game?.developers?.length ||
            game?.publishers?.length) &&
          (game?.tags?.length || game?.stores?.length || game?.esrb_rating || game?.website),
      }">
        <!-- Platforms -->
        <div v-if="game?.platforms?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <Gamepad2 class="w-[1rem] mr-[5px]" />Platforms
          </p>
          <div class="flex flex-wrap">
            <template v-for="(platform, i) in game.platforms" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { platforms: platform.platform.id } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ platform.platform.name }}
              </router-link>
              <span v-if="i !== game.platforms.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>

        <!-- Genres -->
        <div v-if="game?.genres?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <Ghost class="w-[1rem] mr-[5px]" />Genres
          </p>
          <div class="flex flex-wrap">
            <template v-for="(genre, i) in game.genres" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { genres: genre.slug } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ genre.name }}
              </router-link>
              <span v-if="i !== game.genres.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>

        <!-- Developers -->
        <div v-if="game?.developers?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <CodeXml class="w-[1rem] mr-[5px]" />Developers
          </p>
          <div class="flex flex-wrap">
            <template v-for="(dev, i) in game.developers" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { developers: dev.slug } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ dev.name }}
              </router-link>
              <span v-if="i !== game.developers.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>

        <!-- Publishers -->
        <div v-if="game?.publishers?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <DollarSign class="w-[1rem] mr-[5px]" />Publishers
          </p>
          <div class="flex flex-wrap">
            <template v-for="(pub, i) in game.publishers" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { publishers: pub.slug } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ pub.name }}
              </router-link>
              <span v-if="i !== game.publishers.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>
      </div>

      <div :class="{
        'grid grid-cols-1 gap-4': true,
        'mb-4': (game?.tags?.length || game?.stores?.length) && (game?.esrb_rating || game?.website),
      }">
        <!-- Tags -->
        <div v-if="game?.tags?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <Hash class="w-[1rem] mr-[5px]" />Tags
          </p>
          <div class="flex flex-wrap">
            <template v-for="(tag, i) in game.tags" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { tags: tag.slug } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ tag.name }}
              </router-link>
              <span v-if="i !== game.tags.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>

        <!-- Stores -->
        <div v-if="game?.stores?.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <Download class="w-[1rem] mr-[5px]" />Stores
          </p>
          <div class="flex flex-wrap">
            <template v-for="(store, i) in game.stores" :key="i">
              <router-link :to="{ path: '/advanced-search', query: { stores: store.store.id } }"
                class="font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit">
                {{ store.store.name }}
              </router-link>
              <span v-if="i !== game.stores.length - 1">,&nbsp;</span>
            </template>
          </div>
        </div>
      </div>

      <div :class="{
        'grid grid-cols-1 sm:grid-cols-2 gap-4': true,
        'mb-4': game?.esrb_rating && game?.website,
      }">
        <!-- ESRB Rating -->
        <div v-if="game?.esrb_rating" class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <ArrowUp10 class="w-[1rem] mr-[5px]" />Age rating
          </p>
          <p>{{ game.esrb_rating.name }}</p>
        </div>
      </div>

      <!-- Website -->
      <div v-if="game?.website" class="grid grid-cols-1 gap-4">
        <div class="flex flex-col">
          <p class="flex items-center text-muted-foreground">
            <Globe class="w-[1rem] mr-[5px]" />Website
          </p>
          <Skeleton v-if="loading" class="h-4 w-1/2 mx-auto pb-[18px] !mt-1" />
          <a v-else :href="game.website"
            class="flex justify-start items-center font-medium transition-colors hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
            target="_blank" rel="noopener noreferrer">
            {{ game.website }}
            <SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
