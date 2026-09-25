<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
})

const title = 'The Fluxer Directory'
const description = 'A place for users to discover self-hosted Fluxer instances and list their own'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

import * as nuxtUiLocales from '@nuxt/ui/locale'
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value
    .map(locale => nuxtUiLocales[typeof locale === 'string' ? locale : locale.code])
    .filter(Boolean)
)

const currentLocale = computed({
  get: () => locale.value,
  set: (val: string) => val && setLocale(val as 'en' | 'de')
})

</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <p>logo goes here</p>
      </template>

      <template #right>
        <ULocaleSelect v-model="currentLocale" :locales="availableLocales" />
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage class="px-6" />
    </UMain>

    <USeparator icon="i-mdi-cat" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • Not affiliated with or endorsed by Fluxer Platform AB
        </p>
      </template>

      <template #right>
        <p>footer right</p>
      </template>
    </UFooter>
  </UApp>
</template>
