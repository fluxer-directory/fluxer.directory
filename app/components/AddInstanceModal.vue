<template>
    <UModal>
        <UButton icon="i-mdi-plus" color="success" variant="subtle" />

        <template #content>
            <div class="p-6">
                <div class="pb-8">
                    <h1>{{ $t('add-instance') }}</h1>
                    <p>{{ $t('add-instance-info') }}</p>
                </div>
                <LazyUForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <LazyUFormField :label="$t('form-name')" name="name">
                        <LazyUInput v-model="state.name" />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-url')" name="url">
                        <LazyUInput v-model="state.url" type="url" />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-banner-url')" name="url">
                        <LazyUInput v-model="state.banner_url" type="url" />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-description')" name="description">
                        <LazyUTextarea v-model="state.description" :rows="4" autoresize />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-language')" name="language">
                        <LazyUSelectMenu v-model="state.language" :items="languages" value-key="value" label-key="label"
                            searchable placeholder="Select a language" />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-tags')" name="tags">
                        <LazyUInputTags v-model="state.tags" placeholder="Add a tag and press Enter" />
                    </LazyUFormField>

                    <LazyUFormField :label="$t('form-email')" name="email">
                        <LazyUInput v-model="state.contact_mail" type="email" />
                    </LazyUFormField>

                    <LazyUButton type="submit">
                        {{ $t('form-submit') }}
                    </LazyUButton>
                </LazyUForm>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import ISO6391 from 'iso-639-1'

const languages = ISO6391.getLanguages(ISO6391.getAllCodes()).map(language => ({
    label: language.name,
    value: language.code
}))

const schema = z.object({
    name: z.string(),
    url: z.string().url('Invalid URL'),
    banner_url: z.string().url('Invalid URL'),
    description: z.string({ required_error: 'A description is required' }).min(8, 'Must be at least 8 characters'),
    language: z.string().refine(ISO6391.validate, 'Select a language'),
    tags: z.array(z.string().min(1, 'Tags cannot be empty')).default([]),
    contact_mail: z.string().email('Invalid email')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    url: undefined,
    banner_url: undefined,
    description: undefined,
    language: undefined,
    tags: [],
    contact_mail: undefined

})

const { data: instances, error, pending, refresh } = useFetch("/api/instances")

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (instances.value?.some(i => i.url == event.data.url)) {
        toast.add({ title: 'Error', description: 'An instance with this URL has already been submitted.', color: 'error' })
        return
    }

    const { error } = await useFetch('/api/instances', {
        method: 'POST',
        body: event.data
    })

    if (!error.value) {
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    } else {
        toast.add({ title: 'Error', description: 'Could not submit the instance.', color: 'error' })
    }
}
</script>