<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.items.why.label') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('nav.about.items.why.description') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-checkus"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.why.label') }}</h2>
        </div>
        <div class="text-gray-600 dark:text-gray-300 mb-4">
          <div class="space-y-6">
            <p>{{ t('about.why.content') }}</p>

            <div>
              <h3 class="text-xl font-semibold mb-3">{{
                t('about.why.sections.product.title')
              }}</h3>
              <p class="mb-2">{{ t('about.why.sections.product.content1') }}</p>
              <p>{{ t('about.why.sections.product.content2') }}</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">{{
                t('about.why.sections.service.title')
              }}</h3>
              <p class="mb-2">{{ t('about.why.sections.service.content1') }}</p>
              <p>{{ t('about.why.sections.service.content2') }}</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">{{ t('about.why.sections.vision.title') }}</h3>
              <p class="mb-2">{{ t('about.why.sections.vision.content1') }}</p>
              <p>{{ t('about.why.sections.vision.content2') }}</p>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3">{{ t('about.why.sections.winwin.title') }}</h3>
              <p class="mb-2">{{ t('about.why.sections.winwin.content1') }}</p>
              <p>{{ t('about.why.sections.winwin.content2') }}</p>
            </div>

            <p class="font-semibold">{{ t('about.why.sections.conclusion') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .about-page {
    min-height: calc(100vh - var(--header-height, 5rem));
  }
</style>
