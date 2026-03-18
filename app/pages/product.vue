<template>
  <div class="w-full flex flex-col gap-6">
    <!-- 响应式布局：桌面端水平，移动端垂直 -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- 左侧轮播图 -->
      <div class="w-full md:w-1/3 md:flex md:flex-col">
        <UCarousel
          v-slot="{ item }"
          :items="bannerImagesRef"
          fade
          arrows
          :prev-icon="prevIcon"
          :next-icon="nextIcon"
          dots
          loop
          :autoplay="{
            delay: () =>
              bannerImagesRef.map((item: BannerItem) =>
                item.type === 'image' ? item.delay || 5000 : item.delay || 50000,
              ),
          }"
          :ui="{
            container: 'transition-[height]',
            prev: 'absolute !left-0 h-[10%] w-[2%] flex items-center justify-center !ring-0 bg-gray-300/60 backdrop-blur-sm hover:bg-gray-300/80 text-gray-400 hover:text-gray-600 shadow-lg hover:shadow-xl transition-all transition-colors rounded-l',
            next: 'absolute !right-0 h-[10%] w-[2%] flex items-center justify-center !ring-0 bg-gray-300/60 backdrop-blur-sm hover:bg-gray-300/80 text-gray-400 hover:text-gray-600 shadow-lg hover:shadow-xl transition-all transition-colors rounded-r',
            dots: 'absolute bottom-2',
            dot: 'w-6 h-1',
          }"
        >
          <template v-if="item.type === 'video'">
            <video
              :src="item.url"
              class="w-full h-full aspect-[16/9] object-contain object-center"
              controls
              autoplay
              muted
              loop
              playsinline
            />
          </template>
          <template v-else-if="item.type === 'youtube'">
            <iframe
              :src="item.url"
              preload="auto"
              loading="lazy"
              class="w-full h-full aspect-[16/9]"
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
            ></iframe>
          </template>
          <template v-else-if="item.type === 'bilibili'">
            <iframe
              :src="item.url"
              preload="auto"
              loading="lazy"
              class="w-full h-full aspect-[16/9]"
              frameborder="0"
              scrolling="no"
              border="0"
              framespacing="0"
              allowfullscreen
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
              referrerpolicy="no-referrer"
            ></iframe>
          </template>
          <template v-else-if="item && typeof item === 'object'">
            <NuxtImg
              :src="item.url"
              :alt="`Banner ${item.id}`"
              class="w-full h-full aspect-[16/9] object-contain object-center"
              loading="eager"
              decoding="sync"
              style="image-rendering: crisp-edges"
            />
          </template>
        </UCarousel>
      </div>

      <!-- 右侧品牌信息 -->
      <div class="w-full md:w-2/3 flex flex-col justify-between rounded-lg">
        <!-- 移动端和桌面端不同的布局 -->
        <div class="flex flex-col gap-6 md:gap-4 h-full">
          <div class="mt-2 md:mt-0">
            <!-- 标题和分享按钮在同一行 -->
            <div class="flex items-center justify-between mb-3 md:mb-4">
              <h2 class="text-2xl md:text-3xl font-bold">
                {{ $t(`nav.products.items.${brand}.label`) }}
              </h2>
              <ShareButtons />
            </div>

            <p class="text-base md:text-lg text-gray-600 mb-6 md:mb-8">{{
              $t(`nav.products.items.${brand}.description`)
            }}</p>
          </div>

          <div class="mt-auto">
            <UTabs
              :key="brand"
              v-model="fuelType"
              :items="fuelTypeItems"
              :content="false"
              :class="[fuelTypeItems.length > 1 && '[&_button]:cursor-pointer']"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 下部分：产品表格 -->
    <ProductsTable
      v-if="brand"
      :brand="brand"
      :fuel-type="fuelType"
    />
  </div>
</template>

<script setup lang="ts">
  const { t, locale } = useI18n()

  const route = useRoute()

  const fuelType = ref('diesel')

  const brand = computed(() => String(route.query.brand || ''))
  const type = computed(() => String(route.query.type || ''))

  // 监听 fuelType 变化，更新路由参数
  watch(fuelType, async (newType) => {
    if (brand.value) {
      await navigateTo({
        query: {
          ...route.query,
          type: newType,
        },
        replace: true,
      })
    }
  })

  onMounted(() => {
    watch(
      [brand, type],
      () => {
        fuelType.value = type.value || 'diesel'
      },
      { immediate: true },
    )
  })

  const hasGas = ref<string[]>(['cummins', 'baudouin', 'weichai', 'yuchai'])
  const hasShip = ref<string[]>(['cummins', 'baudouin', 'sdec', 'zichai'])
  const fuelTypeItems = computed(() => {
    const baseItems = [
      {
        label: t('products.types.diesel'),
        icon: 'i-custom-fuel',
        value: 'diesel',
      },
    ]

    if (hasGas.value.includes(brand.value)) {
      baseItems.push({
        label: t('products.types.gas'),
        icon: 'i-custom-flame',
        value: 'gas',
      })
    }

    if (hasShip.value.includes(brand.value)) {
      baseItems.push({
        label: t('products.types.ship'),
        icon: 'i-custom-ship',
        value: 'ship',
      })
    }

    return baseItems
  })

  // 定义轮播图项的类型
  interface BannerItem {
    id: number
    url: string
    type: 'video' | 'image' | 'youtube' | 'bilibili'
    delay?: number
  }

  const bannerImagesRef = ref<BannerItem[]>([])

  watch(
    brand,
    async () => {
      switch (brand.value) {
        case 'cummins':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-cummins.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1iF6iB8EJe&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/M0caMkEO3m8?playlist=M0caMkEO3m8&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'baudouin':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-baudouin.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1au6iBWEHq&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/stsKJjzWWdI?playlist=stsKJjzWWdI&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'hyundai':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-hyundai.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1kDDfY6EBv&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/VtYqGS1zLZQ?playlist=VtYqGS1zLZQ&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'sdec':
          bannerImagesRef.value = [
            { id: 1, url: '/images/product/brand-sdec.webp', type: 'image' as const, delay: 5000 },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1HRQHYTE4G&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/pNXQ0UhLAXo?playlist=pNXQ0UhLAXo&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'yuchai':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-yuchai.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV16D6vBiEGN&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/pG_DQgJSpR8?playlist=pG_DQgJSpR8&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'weichai':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-weichai.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1f96vBeEQs&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/eAYZstnsDsY?playlist=eAYZstnsDsY&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'mitsubishi':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-mitsubishi.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1DG6iBHEHD&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/QZtjPGvQwvg?playlist=QZtjPGvQwvg&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        case 'googol':
          bannerImagesRef.value = [
            {
              id: 1,
              url: '/images/product/brand-googol.webp',
              type: 'image' as const,
              delay: 5000,
            },
            ...(locale.value === 'zh'
              ? [
                  {
                    id: 2,
                    url: 'https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=BV1eP6iBoE8g&page=1&autoplay=1&mute=1&loop=1&danmaku=0&hideCoverInfo=1&high_quality=1&fjw=0',
                    type: 'bilibili' as const,
                    delay: 50000,
                  },
                ]
              : [
                  {
                    id: 2,
                    url: 'https://www.youtube.com/embed/K1-1sm7Nnw0?playlist=K1-1sm7Nnw0&autoplay=1&mute=1&loop=1',
                    type: 'youtube' as const,
                    delay: 50000,
                  },
                ]),
          ]
          break

        default:
          bannerImagesRef.value = [
            { id: 1, url: '/images/home/banner1.webp', type: 'image', delay: 5000 },
            { id: 2, url: '/images/home/banner2.webp', type: 'image', delay: 5000 },
            { id: 3, url: '/images/home/banner3.webp', type: 'image', delay: 5000 },
          ]
      }
    },
    { immediate: true },
  )

  defineProps<{
    prevIcon?: string
    nextIcon?: string
  }>()
</script>
