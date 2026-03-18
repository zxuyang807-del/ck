<script setup lang="ts">
  const { t, locale } = useI18n()

  // 从API获取新闻数据
  const { data: newsItems } = await useAsyncData('news', () => $fetch('/api/news'))

  // 当前页码
  const currentPage = ref(1)

  const handleNewsClick = async (newsId: string | number) => {
    const targetPath = `/${locale.value}/about/news/${newsId}`
    console.log('Navigating to:', targetPath)
    try {
      console.log('Navigating to:', targetPath)
      await navigateTo(targetPath)
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.items.news.label') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('nav.about.items.news.description') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-news"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.news.label') }}</h2>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          {{ t('about.news.content') }}
        </p>

        <!-- 新闻列表 -->
        <div class="space-y-8">
          <div
            v-for="news in newsItems"
            :key="news.id"
            class="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <div class="md:w-1/3 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div
                  class="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                >
                  <NuxtImg
                    v-if="news.image"
                    :src="news.image"
                    :alt="news.title"
                    class="w-full h-full object-cover"
                  />
                  <UIcon
                    v-else
                    name="i-custom-image"
                    class="text-4xl text-gray-400 dark:text-gray-500"
                  />
                </div>
              </div>
              <div class="md:w-2/3">
                <h3 class="text-xl font-semibold mb-2">{{ news.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ news.date }}</p>
                <p class="text-gray-600 dark:text-gray-300 mb-4">{{ news.summary }}</p>
                <UButton
                  color="primary"
                  variant="soft"
                  size="sm"
                  icon="i-custom-arrow-right-1"
                  trailing
                  @click="handleNewsClick(news.id)"
                >
                  {{ t('news.readMore') }}
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="mt-8 flex justify-center">
          <UPagination
            v-model="currentPage"
            :total="10"
          />
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
