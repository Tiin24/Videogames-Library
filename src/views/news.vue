<script setup>
import ListTemplate from '@/components/template/ListTemplate.vue';
import CardNews from '@/components/cards/CardNews.vue';
import { Newspaper } from 'lucide-vue-next';
import { useNewsStore } from '@/stores/news';

const newsStore = useNewsStore();
</script>

<template>
  <ListTemplate title="Noticias IGN" description="Últimas noticias del sitio oficial de IGN" :icon="Newspaper"
    :cardComponent="CardNews" :itemPropName="'game'" :externalStore="newsStore"
    wrapperClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-4" />
</template>
