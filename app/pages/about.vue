<script setup lang="ts">
  const { t } = useI18n()
  const { locale } = useI18n()
  const route = useRoute()

  // 关于我们的各个部分
  const sections = [
    {
      id: 'company',
      title: 'nav.about.items.company.label',
      description: 'nav.about.items.company.description',
      icon: 'i-custom-building',
      to: `/${locale.value}/about/company`,
    },
    {
      id: 'culture',
      title: 'nav.about.items.culture.label',
      description: 'nav.about.items.culture.description',
      icon: 'i-custom-target',
      to: `/${locale.value}/about/culture`,
    },
    {
      id: 'why',
      title: 'nav.about.items.why.label',
      description: 'nav.about.items.why.description',
      icon: 'i-custom-checkus',
      to: `/${locale.value}/about/why`,
    },
    {
      id: 'honors',
      title: 'nav.about.items.honors.label',
      description: 'nav.about.items.honors.description',
      icon: 'i-custom-award',
      to: `/${locale.value}/about/honors`,
    },
    {
      id: 'news',
      title: 'nav.about.items.news.label',
      description: 'nav.about.items.news.description',
      icon: 'i-custom-news',
      to: `/${locale.value}/about/news`,
    },
    {
      id: 'human-resource',
      title: 'nav.about.items.humanResource.label',
      description: 'nav.about.items.humanResource.description',
      icon: 'i-custom-users',
      to: `/${locale.value}/about/human-resource`,
    },
  ]

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

  // 检查是否是新闻详情页
  const isNewsDetailPage = computed(() => {
    const pathParts = route.path.split('/').filter(Boolean)
    return pathParts.length >= 4 && pathParts[pathParts.length - 2] === 'news'
  })

  // 获取新闻ID（用于读取缓存）
  const newsId = computed(() => {
    if (!isNewsDetailPage.value) return null
    const pathParts = route.path.split('/').filter(Boolean)
    return pathParts[pathParts.length - 1]
  })

  // 使用 useNuxtData 直接读取子页面已缓存的数据
  // 子页面通过 useAsyncData 获取数据后，Nuxt 会自动缓存
  // 这里直接读取缓存，避免重复请求
  const newsDetail = computed(() => {
    if (!isNewsDetailPage.value || !newsId.value) return null
    // 使用与子页面相同的 key 读取缓存
    const cachedData = useNuxtData<NewsItem | null>(`news-${newsId.value}`)
    return cachedData.data.value || null
  })

  // 获取当前页面对应的section
  const currentSection = computed(() => {
    if (route.path === `/${locale.value}/about`) return null
    const pathParts = route.path.split('/').filter(Boolean)
    const currentPath = pathParts[pathParts.length - 1]
    // 如果是新闻详情页、路径包含news，则返回新闻section
    if (isNewsDetailPage.value) {
      return sections.find((section) => section.id === 'news')
    }
    // 否则按原逻辑匹配
    return sections.find((section) => section.id === currentPath)
  })

  // 面包屑导航项
  const breadcrumbItems = computed(() => {
    const items = [
      {
        label: t('nav.home.title'),
        icon: 'i-custom-home',
        to: `/${locale.value}`,
      },
      {
        label: t('nav.about.title'),
        to: `/${locale.value}/about`,
      },
    ]

    if (currentSection.value) {
      items.push({
        label: t(currentSection.value.title),
        to: currentSection.value.to,
      })
    }

    // 如果是新闻详情页且有新闻数据，添加新闻标题
    if (isNewsDetailPage.value && newsDetail.value?.title) {
      items.push({
        label: newsDetail.value.title,
        to: route.path, // 设置为当前路径，表示当前页
      })
    }

    return items
  })
</script>

<template>
  <!-- 如果是根路径 /about，显示概览页面 -->
  <div v-if="$route.path === `/${locale}/about`">
    <div class="about-page">
      <div class="bg-gray-100 dark:bg-gray-800 py-12">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('about.description') }}
          </p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <!-- 关于我们的各个部分卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="section in sections"
            :key="section.id"
            :to="section.to"
            class="bg-white dark:bg-gray-900 rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-4">
              <UIcon
                :name="section.icon"
                class="text-2xl text-primary-600 dark:text-primary-400"
              />
              <h2 class="text-xl font-bold">{{ t(section.title) }}</h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ t(section.description) }}
            </p>
            <div class="flex justify-end">
              <UButton
                color="primary"
                variant="soft"
                size="sm"
                icon="i-custom-arrow-right-1"
                trailing
              >
                {{ t('common.viewMore') }}
              </UButton>
            </div>
          </NuxtLink>
        </div>

        <!-- 公司简介概览 -->
        <div class="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div class="flex items-center gap-3 mb-4">
            <UIcon
              name="i-custom-about"
              class="text-2xl text-primary-600 dark:text-primary-400"
            />
            <h2 class="text-2xl font-bold">{{ t('about.overview.title') }}</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t('about.overview.content') }}
          </p>

          <!-- 公司数据统计 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{
                t('statistics.experience.value')
              }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">{{
                t('statistics.experience.label')
              }}</div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{
                t('statistics.partners.value')
              }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">{{
                t('statistics.partners.label')
              }}</div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{
                t('statistics.professionals.value')
              }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">{{
                t('statistics.professionals.label')
              }}</div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{{
                t('statistics.countries.value')
              }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300">{{
                t('statistics.countries.label')
              }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 否则显示子路由内容 -->
  <div v-else>
    <div class="container mx-auto px-4 py-4">
      <UBreadcrumb :items="breadcrumbItems" />
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped>
  .about-page {
    min-height: calc(100vh - var(--header-height, 5rem));
  }
</style>
