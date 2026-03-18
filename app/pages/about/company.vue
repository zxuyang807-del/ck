<script setup lang="ts">
  import { ref, watch } from 'vue'

  const { t } = useI18n()

  const isModalOpen = ref(false)
  const isVideoLoaded = ref(false)

  const promoVideo = {
    title: t('nav.about.items.company.label'),
    url: 'https://www.youtube.com/embed/bT6Q9kxjf-8?autoplay=1&mute=1&loop=1&playlist=bT6Q9kxjf-8',
  }

  const openVideoModal = () => {
    isVideoLoaded.value = false
    isModalOpen.value = true
  }

  watch(isModalOpen, (open) => {
    if (!open) {
      isVideoLoaded.value = false
    }
  })
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <UPageSection
      orientation="horizontal"
      class="bg-gray-100 dark:bg-gray-800"
      :ui="{
        container: 'mx-auto px-4 !py-8',
      }"
    >
      <template #leading>
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold mb-4">
            {{ t('nav.about.items.company.label') }}
          </h1>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('nav.about.items.company.description') }}
          </p>
        </div>
      </template>

      <template #default>
        <UCard class="shadow-lg">
          <div
            class="relative aspect-video rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 cursor-pointer group"
            @click="openVideoModal"
          >
            <NuxtImg
              src="/images/about/company-video-cover.webp"
              alt="Company promo video cover"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
            >
              <UIcon
                name="i-custom-play"
                class="text-6xl text-white drop-shadow-lg"
              />
            </div>
          </div>
        </UCard>
      </template>
    </UPageSection>

    <UModal
      v-model:open="isModalOpen"
      fullscreen
      :title="promoVideo.title"
    >
      <template #body>
        <div class="h-full flex items-center justify-center overflow-hidden">
          <div class="w-full h-full flex items-center justify-center">
            <div
              v-if="!isVideoLoaded"
              class="w-full h-full flex flex-col items-center justify-center p-0"
            >
              <div
                class="relative w-full h-full bg-gray-900 flex flex-col items-center justify-center"
              >
                <USkeleton class="w-full h-full" />
                <div
                  class="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-linear-to-t from-gray-900/80 to-transparent"
                >
                  <USkeleton class="h-10 w-10 rounded-full" />
                  <div class="flex-1 mx-4">
                    <USkeleton class="h-2 w-full rounded-full" />
                  </div>
                  <USkeleton class="h-8 w-8 rounded-sm" />
                </div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <USkeleton class="h-20 w-20 rounded-full" />
                </div>
              </div>
            </div>
            <iframe
              v-show="isVideoLoaded"
              :src="promoVideo.url"
              class="w-full h-full"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
              @load="isVideoLoaded = true"
              @error="isVideoLoaded = true"
            ></iframe>
          </div>
        </div>
      </template>
    </UModal>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-building"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.company.label') }}</h2>
        </div>
        <div class="text-gray-600 dark:text-gray-300 mb-4">
          <h3 class="text-xl font-semibold mb-2">{{ t('about.company.title') }}</h3>
          <p>{{ t('about.company.content') }}</p>

          <h3 class="text-xl font-semibold mt-6 mb-2">{{ t('about.company.meaningTitle') }}</h3>
          <p>{{ t('about.company.meaning') }}</p>

          <h3 class="text-xl font-semibold mt-6 mb-2">{{ t('about.company.valuesTitle') }}</h3>
          <div class="space-y-2">
            <div class="mt-4 space-y-6">
              <div>
                <h4 class="flex items-center gap-2 text-lg font-medium mb-2">
                  <UIcon
                    name="i-custom-star"
                    class="text-primary-500"
                  />
                  {{ t('about.company.values.excellence.title') }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('about.company.values.excellence.content') }}
                </p>
              </div>

              <div>
                <h4 class="flex items-center gap-2 text-lg font-medium mb-2">
                  <UIcon
                    name="i-custom-flame"
                    class="text-primary-500"
                  />
                  {{ t('about.company.values.passion.title') }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('about.company.values.passion.content') }}
                </p>
              </div>

              <div>
                <h4 class="flex items-center gap-2 text-lg font-medium mb-2">
                  <UIcon
                    name="i-custom-shield"
                    class="text-primary-500"
                  />
                  {{ t('about.company.values.integrity.title') }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('about.company.values.integrity.content') }}
                </p>
              </div>

              <div>
                <h4 class="flex items-center gap-2 text-lg font-medium mb-2">
                  <UIcon
                    name="i-custom-heart"
                    class="text-primary-500"
                  />
                  {{ t('about.company.values.responsibility.title') }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('about.company.values.responsibility.content') }}
                </p>
              </div>

              <div>
                <h4 class="flex items-center gap-2 text-lg font-medium mb-2">
                  <UIcon
                    name="i-custom-handshake"
                    class="text-primary-500"
                  />
                  {{ t('about.company.values.winwin.title') }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('about.company.values.winwin.content') }}
                </p>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-semibold mt-6 mb-2">{{ t('about.company.teamTitle') }}</h3>
          <p>{{ t('about.company.team') }}</p>

          <h3 class="text-xl font-semibold mt-6 mb-2">{{ t('about.company.globalTitle') }}</h3>
          <p>{{ t('about.company.global') }}</p>
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
