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
    .map(locale => {
      const localeCode = typeof locale === 'string' ? locale : locale.code
      return nuxtUiLocales[localeCode as keyof typeof nuxtUiLocales]
    })
    .filter(Boolean)
)

const currentLocale = computed({
  get: () => locale.value,
  set: (val: Parameters<typeof setLocale>[0]) => val && setLocale(val)
})

</script>

<template>
  <UApp>
    <UBanner color="success" :title="$t('title')" />
    <UHeader>
      <template #left>
        <p>logo goes here</p>
      </template>

      <template #right>
        <ULocaleSelect v-model="currentLocale" :locales="availableLocales" />
        <UColorModeButton />
        <AddInstanceModal />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage class="px-6" />
    </UMain>

    <USeparator icon="i-mdi-book-open-blank-variant-outline" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          {{ $t('nuxt') }} • {{ $t('disclaimer') }}
        </p>
      </template>

      <template #right>
        <span class="text-sm text-muted flex gap-x-2 items-center">
          <NuxtLink :external="true" to="mailto:contact@fluxer.directory">
            {{ $t('contact') }}
            <UIcon name="i-mdi-email" />
          </NuxtLink>
          •
          <NuxtLink :external="true" to="https://github.com/fluxer-directory/fluxer.directory">
            {{ $t('github') }}
            <UIcon name="i-mdi-github" />
          </NuxtLink>
        </span>
      </template>
    </UFooter>
  </UApp>
</template>
