<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.items.culture.label') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('nav.about.items.culture.description') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-target"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.culture.label') }}</h2>
        </div>
        <div class="text-gray-600 dark:text-gray-300 mb-4 space-y-6">
          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
              <UIcon
                name="i-custom-target"
                class="text-primary-500"
              />
              {{ t('about.culture.vision.title') }}
            </h3>
            <p>{{ t('about.culture.vision.content') }}</p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
              <UIcon
                name="i-custom-compass"
                class="text-primary-500"
              />
              {{ t('about.culture.mission.title') }}
            </h3>
            <p>{{ t('about.culture.mission.content') }}</p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
              <UIcon
                name="i-custom-heart"
                class="text-primary-500"
              />
              {{ t('about.culture.values.title') }}
            </h3>
            <p>{{ t('about.culture.values.content') }}</p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
              <UIcon
                name="i-custom-lightbulb"
                class="text-primary-500"
              />
              {{ t('about.culture.philosophy.title') }}
            </h3>
            <p>{{ t('about.culture.philosophy.content') }}</p>
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
