<script setup lang="ts">
  const route = useRoute()
  const { locale } = useI18n()

  // 定义新闻项接口
  interface NewsItem {
    id: number | string
    title: string
    date: string
    content: Array<{
      type: 'paragraph' | 'heading' | 'list' | 'image'
      text?: string
      items?: string[]
      src?: string
      alt?: string
      caption?: string
    }>
    image?: string
    summary?: string
  }

  // Get news ID from route params
  const newsId = computed(() => route.params.id)
  console.log('Current news ID:', newsId.value)

  // 打印完整的路由链接
  console.log('Full route link:', route.fullPath)

  // 改进的异步数据获取方式
  // 使用固定的 key 格式，父页面可以通过 useNuxtData 读取缓存
  const { data: newsDetail, error } = useAsyncData<NewsItem | null>(
    () => `news-${newsId.value}`,
    async () => {
      try {
        const newsList = await $fetch<NewsItem[]>('/api/news')
        // 使用 String 转换确保类型一致性
        const news = newsList.find((item) => String(item.id) === String(newsId.value))
        if (!news) {
          console.warn(`News with ID ${newsId.value} not found`)
        }
        return news || null
      } catch (err) {
        console.error('Error fetching news data:', err)
        return null
      }
    },
  )

  // 打印获取的新闻详情
  console.log('Fetched news detail:', newsDetail.value)

  // 处理错误情况
  if (error.value) {
    console.error('Error in useAsyncData:', error.value)
  }
</script>

<template>
  <div class="news-detail">
    <div class="container mx-auto px-4 py-8">
      <!-- 添加加载和错误状态处理 -->
      <div
        v-if="error"
        class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center"
      >
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="text-4xl text-red-500 mb-4"
        />
        <p>加载新闻详情失败，请稍后再试</p>
        <UButton
          class="mt-4"
          :to="`/${locale}/about/news`"
          >返回新闻列表</UButton
        >
      </div>

      <div
        v-else-if="!newsDetail"
        class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-center"
      >
        <UIcon
          name="i-heroicons-exclamation-triangle"
          class="text-4xl text-yellow-500 mb-4"
        />
        <p>未找到该新闻，可能已被删除或移动</p>
        <UButton
          class="mt-4"
          :to="`/${locale}/about/news`"
          >返回新闻列表</UButton
        >
      </div>

      <div
        v-else
        class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
      >
        <!-- 文章内容 -->
        <article
          itemscope
          itemtype="http://schema.org/NewsArticle"
        >
          <h1
            itemprop="headline"
            class="text-3xl font-bold mb-4"
          >
            {{ newsDetail.title }}
          </h1>

          <div class="text-gray-500 dark:text-gray-400 mb-6"> 发布时间：{{ newsDetail.date }} </div>

          <div
            itemprop="articleBody"
            class="prose dark:prose-invert max-w-none"
          >
            <template v-if="Array.isArray(newsDetail.content)">
              <div
                v-for="(block, index) in newsDetail.content"
                :key="index"
              >
                <!-- 段落 -->
                <p
                  v-if="block.type === 'paragraph'"
                  class="mb-4"
                  >{{ block.text }}</p
                >

                <!-- 标题 -->
                <h2
                  v-else-if="block.type === 'heading'"
                  class="text-2xl font-bold my-6"
                  >{{ block.text }}</h2
                >

                <!-- 列表 -->
                <ul
                  v-else-if="block.type === 'list'"
                  class="list-disc pl-6 mb-4"
                >
                  <li
                    v-for="(item, itemIndex) in block.items"
                    :key="itemIndex"
                    >{{ item }}</li
                  >
                </ul>

                <!-- 图片 -->
                <figure
                  v-else-if="block.type === 'image'"
                  class="my-6"
                >
                  <NuxtImg
                    :src="block.src"
                    :alt="block.alt || ''"
                    class="rounded-lg w-full"
                  />
                  <figcaption
                    v-if="block.caption"
                    class="text-sm text-gray-500 mt-2 text-center"
                    >{{ block.caption }}</figcaption
                  >
                </figure>
              </div>
            </template>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .news-detail {
    min-height: calc(100vh - var(--header-height, 5rem));
  }
</style>
