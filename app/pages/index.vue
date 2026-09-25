<template>
  <div>
    <p>hi :3</p>
    <div>
    <UButton v-for="locale in locales" @click="setLocale(locale.code)" class="p-6">
      {{ locale.name }}
    </UButton>
    <h1>{{ $t('title') }}</h1>
    <h1>{{ $t('description') }}</h1>
  </div>
  </div>
</template>


<script setup>
const { locales, setLocale } = useI18n()
</script>