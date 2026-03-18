<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.items.honors.label') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('nav.about.items.honors.description') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-award"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.honors.label') }}</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ t('about.honors.content') }}
        </p>
        <!-- 这里可以添加更多内容，如荣誉证书展示等 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <!-- 示例荣誉证书项 -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
            <UIcon
              name="i-custom-award"
              class="text-5xl text-primary-500 mb-3"
            />
            <h3 class="text-lg font-semibold mb-2">{{ t('honors.certificates.iso9001.title') }}</h3>
            <p class="text-center text-sm text-gray-600 dark:text-gray-300">
              {{ t('honors.certificates.iso9001.description') }}
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
            <UIcon
              name="i-custom-badge-check"
              class="text-5xl text-primary-500 mb-3"
            />
            <h3 class="text-lg font-semibold mb-2">{{
              t('honors.certificates.industryLeader.title')
            }}</h3>
            <p class="text-center text-sm text-gray-600 dark:text-gray-300">
              {{ t('honors.certificates.industryLeader.description') }}
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
            <UIcon
              name="i-custom-shield"
              class="text-5xl text-primary-500 mb-3"
            />
            <h3 class="text-lg font-semibold mb-2">{{
              t('honors.certificates.safetyProduction.title')
            }}</h3>
            <p class="text-center text-sm text-gray-600 dark:text-gray-300">
              {{ t('honors.certificates.safetyProduction.description') }}
            </p>
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
