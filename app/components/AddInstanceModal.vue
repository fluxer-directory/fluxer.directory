<template>
    <UModal>
        <UButton icon="i-mdi-plus" color="success" variant="subtle" />

        <template #content>
            <div class="p-6">
                <div class="pb-8">
                    <h1>{{ $t('add-instance') }}</h1>
                    <p>{{ $t('add-instance-info') }}</p>
                </div>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormField :label="$t('form-name')" name="name">
                        <UInput v-model="state.name" />
                    </UFormField>

                    <UFormField :label="$t('form-url')" name="url">
                        <UInput v-model="state.url" type="url" />
                    </UFormField>

                    <UFormField :label="$t('form-banner-url')" name="url">
                        <UInput v-model="state.banner_url" type="url" />
                    </UFormField>

                    <UFormField :label="$t('form-description')" name="description">
                        <UTextarea v-model="state.description" :rows="4" autoresize />
                    </UFormField>

                    <UFormField :label="$t('form-language')" name="language">
                        <USelectMenu v-model="state.language" :items="languages" value-key="value" label-key="label"
                            searchable placeholder="Select a language" />
                    </UFormField>

                    <UFormField :label="$t('form-tags')" name="tags">
                        <UInputTags v-model="state.tags" placeholder="Add a tag and press Enter" />
                    </UFormField>

                    <UFormField :label="$t('form-email')" name="email">
                        <UInput v-model="state.contact_mail" type="email" />
                    </UFormField>

                    <UButton type="submit">
                        {{ $t('form-submit') }}
                    </UButton>
                </UForm>
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