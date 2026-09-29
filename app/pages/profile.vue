<template>
    <div>
        <div class="mb-8">
            <h1>Hi {{ user?.username }}!</h1>
            <p>Your instance submissions:</p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <UCard v-for="instance in instances ?? []" :key="instance._id" variant="soft"
                class="flex h-full flex-col bg-teal-500/20 !ring-2 !ring-teal-500/40"
                :ui="{ root: 'divide-teal-500/40', body: 'flex-1 p-0 sm:p-0', footer: 'mt-auto' }">
                <template #header>
                    <div class="flex justify-between">
                        <p class="text-2xl">{{ instance.name }}</p>
                        <p class="text-green-500" v-if="instance.approved">listed</p>
                        <p class="text-yellow-500" v-else>pending approval</p>
                    </div>
                    <UBadge v-for="tag in instance.tags" :label="tag" class="mr-2" />
                </template>
                <NuxtImg :src="instance.banner_url" class="block w-full px-[-1em]" />
                <p class="p-2">{{ instance.description }}</p>
                <template #footer>
                    <NuxtLink :external="true" :to="instance.url" class="text-blue-500 underline">{{ instance.url }}
                    </NuxtLink>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: instances, error, pending, refresh } = useFetch("/api/instances?unapproved=true", {
    transform: (data) => data.filter(instance =>
        instance.user_id === user.value?.fluxerId
    )
})

const { user } = useUserSession()
</script>