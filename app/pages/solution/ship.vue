<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })

  const { t } = useI18n()
</script>

<template>
  <main class="w-full min-h-screen">
    <!-- 顶部图片区域 -->
    <section class="relative w-full overflow-hidden">
      <img
        src="/images/solution/ship/ship-hero.webp"
        alt="船用发电机组"
        class="w-full"
      />
    </section>

    <!-- 文章内容区域 -->
    <section class="container mx-auto px-4 py-12 md:py-16">
      <article class="prose prose-lg dark:prose-invert max-w-none">
        <h1 class="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <UIcon
            name="i-custom-ship"
            class="text-3xl md:text-4xl"
          />
          {{ t('solutions.ship.title') }}
        </h1>

        <!-- 产品类型 -->
        <div class="mt-12">
          <h2 class="text-3xl font-bold mb-8">{{ t('solutions.ship.types.title') }}</h2>

          <div class="space-y-6">
            <!-- 辅助发电型 -->
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.types.auxiliary.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.types.auxiliary.description') }}
              </p>
            </div>

            <!-- 应急发电型 -->
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.types.emergency.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.types.emergency.description') }}
              </p>
            </div>

            <!-- 通用型集装箱式 -->
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.types.container.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.types.container.description') }}
              </p>
            </div>
          </div>
        </div>

        <!-- 产品特点 -->
        <div class="mt-12">
          <h2 class="text-3xl font-bold mb-8">{{ t('solutions.ship.features.title') }}</h2>

          <div class="space-y-6">
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.features.efficiency.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.features.efficiency.description') }}
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.features.redundancy.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.features.redundancy.description') }}
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.features.control.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.features.control.description') }}
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.features.noise.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.features.noise.description') }}
              </p>
            </div>

            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">{{
                t('solutions.ship.features.certification.title')
              }}</h3>
              <p class="text-gray-700 dark:text-gray-300">
                {{ t('solutions.ship.features.certification.description') }}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>
