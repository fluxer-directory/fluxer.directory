<template>
  <div>
    <div class="flex min-h-[33vh] flex-col justify-center">
      <h1>{{ $t('title') }}</h1>
      <h1>{{ $t('description') }}</h1>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="instance in instances ?? []" :key="instance._id" variant="soft" class="bg-teal-500/20"
        :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <p class="text-2xl">{{ instance.name }}</p>
          <UBadge v-for="tag in instance.tags" :label="tag" />
        </template>
        <NuxtImg :src="instance.banner_url" class="block w-full px-[-1em]" />
        <p class="p-2">{{ instance.description }}</p>
        <template #footer>
          <NuxtLink :external="true" :to="instance.url" class="text-blue-500 underline">{{ instance.url }}</NuxtLink>
        </template>
      </UCard>
      <UCard variant="outline" class="bg-yellow-500/10" :ui="{ body: 'p-0 sm:p-0' }">
        <template #header>
          <p class="text-2xl">{{ $t('your-instance') }}</p>
          <UBadge :label="$t('new')" />
        </template>
        <NuxtImg src="/images/recursion.webp" class="block w-full px-[-1em]" />
        <p class="p-2">{{ $t('your-description') }}</p>
        <template #footer>
          <NuxtLink :external="true" to="https://fluxer.directory/" class="text-blue-500 underline">
            https://fluxer.directory/
          </NuxtLink>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const { data: instances, error, pending, refresh } = useFetch("/api/instances")
</script>