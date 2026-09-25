<template>
  <div>
    <div>
      <h1>{{ $t('title') }}</h1>
      <h1>{{ $t('description') }}</h1>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="instance in instances ?? []" :key="instance._id">
        <template #header>
          <p class="text-2xl">{{ instance.name }}</p>
          <UBadge v-for="tag in instance.tags" :label="tag" />
        </template>
        <p>{{ instance.description }}</p>
        <template #footer>
          <NuxtLink external="true" :to="instance.url" class="text-blue-500 underline">{{ instance.url }}</NuxtLink>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const { data: instances, error, pending, refresh } = useFetch("/api/instances")
</script>