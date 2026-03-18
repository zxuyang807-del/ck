<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })

  const { t } = useI18n()

  const series = [
    {
      title: t('solutions.canopy.series.economic.title'),
      image: '/images/solution/canopy/canopy-economic.webp',
      link: '', // 无链接
    },
    {
      title: t('solutions.canopy.series.arc.title'),
      image: '/images/solution/canopy/canopy-arc.webp',
      link: '', // 无链接
    },
    {
      title: t('solutions.canopy.series.compact.title'),
      image: '/images/solution/canopy/canopy-compact.webp',
      link: '/solution/canopy-detail', // 添加链接
    },
    {
      title: t('solutions.canopy.series.super.title'),
      image: '/images/solution/canopy/canopy-super.webp',
      link: '', // 无链接
    },
  ]
</script>

<template>
  <main class="w-full min-h-screen">
    <!-- 顶部图片区域 -->
    <!-- <section class="relative w-full overflow-hidden">
      <NuxtImg
        src="/images/solution/canopy/canopy-hero.webp"
        :alt="t('solutions.canopy.title')"
        class="w-full"
      />
    </section> -->

    <!-- 产品系列展示区域 -->
    <section class="container mx-auto px-4 py-12 md:py-16">
      <h1 class="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
        <UIcon
          name="i-custom-canopy"
          class="text-3xl md:text-4xl"
        />
        {{ t('solutions.canopy.title') }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <template
          v-for="item in series"
          :key="item.title"
        >
          <!-- 有链接的卡片添加NuxtLink -->
          <NuxtLink
            v-if="item.link"
            :to="item.link"
            class="block"
          >
            <UCard class="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <template #header>
                <NuxtImg
                  :src="item.image"
                  :alt="item.title"
                  class="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </template>

              <div class="p-4">
                <h3 class="text-lg font-semibold text-center">{{ item.title }}</h3>
              </div>
            </UCard>
          </NuxtLink>

          <!-- 无链接的卡片保持不变 -->
          <UCard
            v-else
            class="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <template #header>
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </template>

            <div class="p-4">
              <h3 class="text-lg font-semibold text-center">{{ item.title }}</h3>
            </div>
          </UCard>
        </template>
      </div>
    </section>
  </main>
</template>
