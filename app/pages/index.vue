<script setup lang="ts">
  const { t, locale } = useI18n()

  defineProps<{
    prevIcon?: string
    nextIcon?: string
  }>()

  const cards = computed(() => [
    {
      title: t('home.cards.diesel.title'),
      content: t('home.cards.diesel.content'),
      image: '/images/home/home-card-diesel-generator.webp',
    },
    {
      title: t('home.cards.clean.title'),
      content: t('home.cards.clean.content'),
      image: '/images/home/home-card-clean-energy.webp',
    },
    {
      title: t('home.cards.outdoor.title'),
      content: t('home.cards.outdoor.content'),
      image: '/images/home/home-card-outdoor-cabinets.webp',
    },
    {
      title: t('home.cards.lighthouse.title'),
      content: t('home.cards.lighthouse.content'),
      image: '/images/home/home-card-lighthouse-lighting.webp',
    },
  ])

  const bannerImages = computed(() => {
    const isZh = (locale.value ?? '').toLowerCase().startsWith('zh')

    return isZh
      ? [
          { id: 1, url: '/images/home/banner1.webp' },
          { id: 2, url: '/images/home/banner2.webp' },
          { id: 3, url: '/images/home/banner3.webp' },
        ]
      : [
          { id: 1, url: '/images/home/banner1-en.webp' },
          { id: 2, url: '/images/home/banner2-en.webp' },
          { id: 3, url: '/images/home/banner3-en.webp' },
        ]
  })
</script>

<template>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="flex flex-col rounded-[calc(var(--ui-radius)*2)] shadow-lg overflow-hidden bg-white dark:bg-gray-800"
      >
        <div class="w-full">
        <NuxtImg
          :src="card.image"
          :alt="card.title"
          class="block w-full h-auto"
          width="800"
          height="800"
          loading="lazy"
          decoding="async"
          sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
        />
        </div>
        <div class="flex-1 p-6 flex flex-col">
          <h3 class="text-xl font-semibold mb-2">
            {{ card.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 flex-1">
            {{ card.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- 轮播图 和 机组搜索表单 -->
  <section class="mt-12">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- 轮播图 -->
      <div class="w-full lg:w-2/3">
        <UCarousel
          v-slot="{ item }"
          :items="bannerImages"
          fade
          arrows
          :prev-icon="prevIcon"
          :next-icon="nextIcon"
          dots
          loop
          :autoplay="{ delay: 8000 }"
          :ui="{
            container: 'transition-[height]',
            prev: 'absolute !left-0 h-[10%] w-[2%] flex items-center justify-center !ring-0 bg-gray-300/60 backdrop-blur-sm hover:bg-gray-300/80 text-gray-400 hover:text-gray-600 shadow-lg hover:shadow-xl transition-all transition-colors rounded-l',
            next: 'absolute !right-0 h-[10%] w-[2%] flex items-center justify-center !ring-0 bg-gray-300/60 backdrop-blur-sm hover:bg-gray-300/80 text-gray-400 hover:text-gray-600 shadow-lg hover:shadow-xl transition-all transition-colors rounded-r',
            dots: 'absolute bottom-2',
            dot: 'w-6 h-1',
          }"
        >
          <template v-if="item && typeof item === 'object'">
          <NuxtImg
            :src="item.url"
            :alt="`Banner ${item.id}`"
            class="block w-full h-auto"
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
            sizes="(min-width:1024px) 66vw, 100vw"
          />
          </template>
        </UCarousel>
      </div>
      <!-- 机组搜索表单 -->
      <div class="flex w-full h-auto lg:w-1/3 rounded-[calc(var(--ui-radius)*2)] shadow-lg">
        <TheGeneratorSearch />
      </div>
    </div>
  </section>

  <!-- 公司简介、视频中心、新闻资讯 -->
  <section class="mt-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 公司简介 -->
      <NuxtLink :to="`/${locale}/about/company`" class="group">
        <div class="flex flex-col rounded-[calc(var(--ui-radius)*2)] shadow-lg overflow-hidden bg-white dark:bg-gray-800 h-full hover:shadow-xl transition-shadow">
          <div class="w-full aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/images/about/Goodwind-Power-Company.webp"
              alt="公司简介"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              @error="($event.target as HTMLImageElement) && (($event.target as HTMLImageElement).style.display = 'none')"
            />
          </div>
          <div class="flex-1 p-6 flex flex-col">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {{ t('home.infoSections.about.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 flex-1">
              {{ t('home.infoSections.about.content') }}
            </p>
            <UButton
              color="primary"
              variant="ghost"
              :label="t('home.infoSections.learnMore')"
              class="mt-4 self-start"
            />
          </div>
        </div>
      </NuxtLink>

      <!-- 视频中心 -->
      <NuxtLink :to="`/${locale}/video`" class="group">
        <div class="flex flex-col rounded-[calc(var(--ui-radius)*2)] shadow-lg overflow-hidden bg-white dark:bg-gray-800 h-full hover:shadow-xl transition-shadow">
          <div class="w-full aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/images/about/company-video-cover.webp"
              alt="视频中心"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              @error="($event.target as HTMLImageElement) && (($event.target as HTMLImageElement).style.display = 'none')"
            />
          </div>
          <div class="flex-1 p-6 flex flex-col">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {{ t('home.infoSections.video.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 flex-1">
              {{ t('home.infoSections.video.content') }}
            </p>
            <UButton
              color="primary"
              variant="ghost"
              :label="t('home.infoSections.viewMore')"
              class="mt-4 self-start"
            />
          </div>
        </div>
      </NuxtLink>

      <!-- 新闻资讯 -->
      <NuxtLink :to="`/${locale}/about/news`" class="group">
        <div class="flex flex-col rounded-[calc(var(--ui-radius)*2)] shadow-lg overflow-hidden bg-white dark:bg-gray-800 h-full hover:shadow-xl transition-shadow">
          <div class="w-full aspect-video bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/images/about/latest-news.webp"
              alt="新闻资讯"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              @error="($event.target as HTMLImageElement) && (($event.target as HTMLImageElement).style.display = 'none')"
            />
          </div>
          <div class="flex-1 p-6 flex flex-col">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {{ t('home.infoSections.news.title') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 flex-1">
              {{ t('home.infoSections.news.content') }}
            </p>
            <UButton
              color="primary"
              variant="ghost"
              :label="t('home.infoSections.readMore')"
              class="mt-4 self-start"
            />
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
