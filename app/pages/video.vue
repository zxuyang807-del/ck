<script setup lang="ts">
  const { t } = useI18n()

  // 控制弹窗显示
  const isModalOpen = ref(false)
  // 当前选中的视频
  const selectedVideo = ref<(typeof videos)[0] | null>(null)
  // 视频加载状态
  const isVideoLoaded = ref(false)

  // 打开视频弹窗
  const openVideoModal = (video: (typeof videos)[0]) => {
    isVideoLoaded.value = false
    selectedVideo.value = video
    isModalOpen.value = true
  }

  // 监听弹窗关闭
  watch(isModalOpen, (newValue: boolean) => {
    if (!newValue) {
      // 弹窗关闭时重置状态
      isVideoLoaded.value = false
      selectedVideo.value = null
    }
  })

  // 视频分类
  const categories = [
    {
      id: 'company',
      label: t('video.categories.company'),
      icon: 'i-custom-building',
    },
    {
      id: 'diesel',
      label: t('video.categories.diesel'),
      icon: 'i-custom-fuel',
    },
    {
      id: 'ship',
      label: t('video.categories.ship'),
      icon: 'i-custom-ship',
    },
  ]

  // 视频列表
  const videos = [
    {
      id: 1,
      title: 'Goodwind Power Generator - 20 pcs Yuchai container gensets',
      category: 'company',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-20-pcs-Yuchai-container-gensets.webp',
      url: 'https://www.youtube.com/embed/j5TF-ENIanE?autoplay=1&mute=1&loop=1&playlist=j5TF-ENIanE',
    },
    {
      id: 2,
      title: 'Goodwind Power Company',
      category: 'company',
      thumbnail: '/images/thumbnail/Goodwind-Power-Company.webp',
      url: 'https://www.youtube.com/embed/wJtDcfnsipc?autoplay=1&mute=1&loop=1&playlist=wJtDcfnsipc',
    },
    {
      id: 2,
      title: 'Goodwind Power Generator - Shangchai (SDEC) silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Shangchai-(SDEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/V8jYcm9Z9B4?autoplay=1&mute=1&loop=1&playlist=V8jYcm9Z9B4',
    },
    {
      id: 3,
      title: 'Goodwind Power Generator - Cummins silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-silent-series.webp',
      url: 'https://www.youtube.com/embed/273oFKxkE_s?autoplay=1&mute=1&loop=1&playlist=273oFKxkE_s',
    },
    {
      id: 4,
      title: 'Goodwind Power Generator - Yangdong silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Yangdong-silent-series.webp',
      url: 'https://www.youtube.com/embed/eh6yQ58pHs8?autoplay=1&mute=1&loop=1&playlist=eh6yQ58pHs8',
    },
    {
      id: 5,
      title: 'Goodwind Power Generator - Shangchai (SDEC) open series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Shangchai-(SDEC)-open-series.webp',
      url: 'https://www.youtube.com/embed/d5WheC6pRVs?autoplay=1&mute=1&loop=1&playlist=d5WheC6pRVs',
    },
    {
      id: 6,
      title: 'Goodwind Power Generator - Cummins open series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-open-series.webp',
      url: 'https://www.youtube.com/embed/8P8hlX1WrEU?autoplay=1&mute=1&loop=1&playlist=8P8hlX1WrEU',
    },
    {
      id: 7,
      title: 'Goodwind Power Generator - Baudouin marine series',
      category: 'ship',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Baudouin-marine-series.webp',
      url: 'https://www.youtube.com/embed/XslIYRWPAZs?autoplay=1&mute=1&loop=1&playlist=XslIYRWPAZs',
    },
    {
      id: 8,
      title: 'Goodwind Power Generator - Cummins marine series',
      category: 'ship',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-marine-series.webp',
      url: 'https://www.youtube.com/embed/3sgJCvJZ9qM?autoplay=1&mute=1&loop=1&playlist=3sgJCvJZ9qM',
    },
    {
      id: 8,
      title: 'Goodwind Power Generator - Yuchai open series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Yuchai-open-series.webp',
      url: 'https://www.youtube.com/embed/pG_DQgJSpR8?autoplay=1&mute=1&loop=1&playlist=pG_DQgJSpR8',
    },
    {
      id: 9,
      title: 'Goodwind Power Generator - Cummins container genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-container-genset.webp',
      url: 'https://www.youtube.com/embed/mX3kCjGBMjE?autoplay=1&mute=1&loop=1&playlist=mX3kCjGBMjE',
    },
    {
      id: 10,
      title: 'Goodwind Power Generator - Customized Cummins silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Customized-Cummins-silent-series.webp',
      url: 'https://www.youtube.com/embed/7Xl_QOtQOpA?autoplay=1&mute=1&loop=1&playlist=7Xl_QOtQOpA',
    },
    {
      id: 11,
      title: 'Goodwind Power Generator - Trailer silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Trailer-silent-series.webp',
      url: 'https://www.youtube.com/embed/QFqyrqFpg0w?autoplay=1&mute=1&loop=1&playlist=QFqyrqFpg0w',
    },
    {
      id: 12,
      title: 'Goodwind Power Generator - Synchronizing series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Synchronizing-series.webp',
      url: 'https://www.youtube.com/embed/2MTCY1dBVbs?autoplay=1&mute=1&loop=1&playlist=2MTCY1dBVbs',
    },
    {
      id: 13,
      title: 'Goodwind Power Generator - Weichai silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Weichai-silent-series.webp',
      url: 'https://www.youtube.com/embed/JuX53Wiwvb8?autoplay=1&mute=1&loop=1&playlist=JuX53Wiwvb8',
    },
    {
      id: 14,
      title: 'Goodwind Power Generator - Baudouin open series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Baudouin-open-series.webp',
      url: 'https://www.youtube.com/embed/h5tO3dAKQq8?autoplay=1&mute=1&loop=1&playlist=h5tO3dAKQq8',
    },
    {
      id: 15,
      title: 'Goodwind Power Generator - Cummins power vehicle',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-power-vehicle.webp',
      url: 'https://www.youtube.com/embed/37BMtPwupU4?autoplay=1&mute=1&loop=1&playlist=37BMtPwupU4',
    },
    {
      id: 16,
      title: 'Goodwind Power Generator - Cummins silent gensets',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-silent-gensets.webp',
      url: 'https://www.youtube.com/embed/FmcseQP4Xi0?autoplay=1&mute=1&loop=1&playlist=FmcseQP4Xi0',
    },
    {
      id: 17,
      title: 'Goodwind Power Generator - Shangchai (SDEC) open skid series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-Shangchai-(SDEC)-open-skid-series.webp',
      url: 'https://www.youtube.com/embed/LBpiIU9y_H4?autoplay=1&mute=1&loop=1&playlist=LBpiIU9y_H4',
    },
    {
      id: 18,
      title: 'Goodwind Power Generator - Kubota open skid series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Kubota-open-skid-series.webp',
      url: 'https://www.youtube.com/embed/qpeXXKVU47M?autoplay=1&mute=1&loop=1&playlist=qpeXXKVU47M',
    },
    {
      id: 19,
      title: 'Goodwind Power Generator - Cummins (DCEC) silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-(DCEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/aTEO5lVmdG4?autoplay=1&mute=1&loop=1&playlist=aTEO5lVmdG4',
    },
    {
      id: 20,
      title: 'Goodwind Power Generator - Hyundai open skid series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Hyundai-open-skid-series.webp',
      url: 'https://www.youtube.com/embed/u2wDOduxNqM?autoplay=1&mute=1&loop=1&playlist=u2wDOduxNqM',
    },
    {
      id: 21,
      title: 'Goodwind Power Generator - Hyundai BP series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Hyundai-BP-series.webp',
      url: 'https://www.youtube.com/embed/Y8vSaIPLWA0?autoplay=1&mute=1&loop=1&playlist=Y8vSaIPLWA0',
    },
    {
      id: 22,
      title: 'Goodwind Power Generator - 40ft Container series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-40ft-Container-series.webp',
      url: 'https://www.youtube.com/embed/SPbVuJba4GY?autoplay=1&mute=1&loop=1&playlist=SPbVuJba4GY',
    },
    {
      id: 23,
      title: 'Goodwind Power Generator - Tongchai open skid series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Tongchai-open-skid-series.webp',
      url: 'https://www.youtube.com/embed/7ocd73mulrM?autoplay=1&mute=1&loop=1&playlist=7ocd73mulrM',
    },
    {
      id: 24,
      title: 'Goodwind Power Generator - Yuchai container genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Yuchai-container-genset.webp',
      url: 'https://www.youtube.com/embed/M7Fp7VJSnNQ?autoplay=1&mute=1&loop=1&playlist=M7Fp7VJSnNQ',
    },
    {
      id: 25,
      title: 'Goodwind Power Generator - 750kVA Cummins open skid genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-750kVA-Cummins-open-skid-genset.webp',
      url: 'https://www.youtube.com/embed/shZxUbnbv_0?autoplay=1&mute=1&loop=1&playlist=shZxUbnbv_0',
    },
    {
      id: 26,
      title: 'Goodwind Power Generator - Baudouin gensets synchronizing',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Baudouin-gensets-synchronizing.webp',
      url: 'https://www.youtube.com/embed/5Jzat7_6Fzo?autoplay=1&mute=1&loop=1&playlist=5Jzat7_6Fzo',
    },
    {
      id: 27,
      title: 'Goodwind Power Generator - Mitsubishi diesel genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Mitsubishi-diesel-genset.webp',
      url: 'https://www.youtube.com/embed/QZtjPGvQwvg?autoplay=1&mute=1&loop=1&playlist=QZtjPGvQwvg',
    },
    {
      id: 28,
      title: 'Goodwind Power Generator - 500kVA Cummins diesel genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-500kVA-Cummins-diesel-genset.webp',
      url: 'https://www.youtube.com/embed/M0caMkEO3m8?autoplay=1&mute=1&loop=1&playlist=M0caMkEO3m8',
    },
    {
      id: 29,
      title: 'Goodwind Power Generator - 910kVA Cummins diesel genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-910kVA-Cummins-diesel-genset.webp',
      url: 'https://www.youtube.com/embed/xOfYohaFYiw?autoplay=1&mute=1&loop=1&playlist=xOfYohaFYiw',
    },
    {
      id: 30,
      title: 'Goodwind Power Generator - 15kVA Shangchai (SDEC) silent series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-15kVA-Shangchai-(SDEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/kyYM2jfQdfA?autoplay=1&mute=1&loop=1&playlist=kyYM2jfQdfA',
    },
    {
      id: 31,
      title: 'Goodwind Power Generator - Yuchai integrated genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Yuchai-integrated-genset.webp',
      url: 'https://www.youtube.com/embed/iAg53M-R2LY?autoplay=1&mute=1&loop=1&playlist=iAg53M-R2LY',
    },
    {
      id: 32,
      title: 'Goodwind Power Generator - 1250kva Baudouin open type series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-1250kva-Baudouin-open-type-series.webp',
      url: 'https://www.youtube.com/embed/stsKJjzWWdI?autoplay=1&mute=1&loop=1&playlist=stsKJjzWWdI',
    },
    {
      id: 33,
      title: 'Goodwind Power Generator - 500kva Weichai open type series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-500kva-Weichai-open-type-series.webp',
      url: 'https://www.youtube.com/embed/eAYZstnsDsY?autoplay=1&mute=1&loop=1&playlist=eAYZstnsDsY',
    },
    {
      id: 34,
      title: 'Goodwind Power Generator - 1500kva Yuchai container genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-1500kva-Yuchai-container-genset.webp',
      url: 'https://www.youtube.com/embed/k9l9s5fJ_7I?autoplay=1&mute=1&loop=1&playlist=k9l9s5fJ_7I',
    },
    {
      id: 35,
      title: 'Goodwind Power Generator - 3000kva Yuchai genset',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-3000kva-Yuchai-genset.webp',
      url: 'https://www.youtube.com/embed/h2nToH_pnSg?autoplay=1&mute=1&loop=1&playlist=h2nToH_pnSg',
    },
    {
      id: 36,
      title: 'Goodwind Power Generator - Baudouin gas genset series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Baudouin-gas-genset-series.webp',
      url: 'https://www.youtube.com/embed/QmZP0wne9Kg?autoplay=1&mute=1&loop=1&playlist=QmZP0wne9Kg',
    },
    {
      id: 37,
      title: 'Goodwind Power Generator - Googol open type series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Googol-open-type-series.webp',
      url: 'https://www.youtube.com/embed/K1-1sm7Nnw0?autoplay=1&mute=1&loop=1&playlist=K1-1sm7Nnw0',
    },
    {
      id: 38,
      title: 'Goodwind Power Generator - 400kva Shangchai (SDEC) silent series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-400kva-Shangchai-(SDEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/HoH3Fg1HMBE?autoplay=1&mute=1&loop=1&playlist=HoH3Fg1HMBE',
    },
    {
      id: 39,
      title: 'Goodwind Power Generator - 300kva Hyundai silent series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-300kva-Hyundai-silent-series.webp',
      url: 'https://www.youtube.com/embed/cIjDuIwZb-U?autoplay=1&mute=1&loop=1&playlist=cIjDuIwZb-U',
    },
    {
      id: 40,
      title: 'Goodwind Power Generator - Cummins GW-C 28-3763kVA series',
      category: 'diesel',
      thumbnail: '/images/thumbnail/Goodwind-Power-Generator-Cummins-GW-C-28-3763kVA-series.webp',
      url: 'https://www.youtube.com/embed/fDQUkXF2t0g?autoplay=1&mute=1&loop=1&playlist=fDQUkXF2t0g',
    },
    {
      id: 41,
      title: 'Goodwind Power Generator - 125kva Cummins silent trailer series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-125kva-Cummins-silent-trailer-series.webp',
      url: 'https://www.youtube.com/embed/wdBn6HknGVc?autoplay=1&mute=1&loop=1&playlist=wdBn6HknGVc',
    },
    {
      id: 42,
      title: 'Goodwind Power Generator - 45kva Cummins marine diesel genset series',
      category: 'ship',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-45kva-Cummins-marine-diesel-genset-series.webp',
      url: 'https://www.youtube.com/embed/60BmRcOsz0A?autoplay=1&mute=1&loop=1&playlist=60BmRcOsz0A',
    },
    {
      id: 43,
      title: 'Goodwind Power Generator - 125kva Yuchai canopy type diesel genset series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-125kva-Yuchai-canopy-type-diesel-genset-series.webp',
      url: 'https://www.youtube.com/embed/8bVkYP2nMxs?autoplay=1&mute=1&loop=1&playlist=8bVkYP2nMxs',
    },
    {
      id: 44,
      title: 'Goodwind Power Generator - 56kva Cummins silent diesel genset premium series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-56kva-Cummins-silent-diesel-genset-premium-series.webp',
      url: 'https://www.youtube.com/embed/ybmTcKEU3F8?autoplay=1&mute=1&loop=1&playlist=ybmTcKEU3F8',
    },
    {
      id: 45,
      title: 'Goodwind Power Generator - 1375kva Yuchai high voltage diesel genset series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-1375kva-Yuchai-high-voltage-diesel-genset-series.webp',
      url: 'https://www.youtube.com/embed/tHRneDYSGow?autoplay=1&mute=1&loop=1&playlist=tHRneDYSGow',
    },
    {
      id: 46,
      title: 'Goodwind Power Generator - 62.5kva Yuchai silent diesel genset series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-62.5kva-Yuchai-silent-diesel-genset-series.webp',
      url: 'https://www.youtube.com/embed/HrQ3MlwbMX8?autoplay=1&mute=1&loop=1&playlist=HrQ3MlwbMX8',
    },
    {
      id: 47,
      title: 'Goodwind Power Generator - 30kva Shangchai (SDEC) silent series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-30kva-Shangchai-(SDEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/tqqUQsQE_Iw?autoplay=1&mute=1&loop=1&playlist=tqqUQsQE_Iw',
    },
    {
      id: 48,
      title: 'Goodwind Power Generator - 200kva Shangchai (SDEC) silent series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-200kva-Shangchai-(SDEC)-silent-series.webp',
      url: 'https://www.youtube.com/embed/1Qo0mpm9bTI?autoplay=1&mute=1&loop=1&playlist=1Qo0mpm9bTI',
    },
    {
      id: 49,
      title: 'Goodwind Power Generator - 225kva Weichai silent series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-225kva-Weichai-silent-series.webp',
      url: 'https://www.youtube.com/embed/kme_JcLDSys?autoplay=1&mute=1&loop=1&playlist=kme_JcLDSys',
    },
    {
      id: 50,
      title: 'Goodwind Power Generator - 500kva Cummins Open type series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-500kva-Cummins-Open-type-series.webp',
      url: 'https://www.youtube.com/embed/t4WVYdVhbCI?autoplay=1&mute=1&loop=1&playlist=t4WVYdVhbCI',
    },
    {
      id: 51,
      title: 'Goodwind Power Generator - 62.5kva Cummins silent diesel genset premium series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-62.5kva-Cummins-silent-diesel-genset-premium-series.webp',
      url: 'https://www.youtube.com/embed/tp8yb4GIIbE?autoplay=1&mute=1&loop=1&playlist=tp8yb4GIIbE',
    },
    {
      id: 52,
      title: 'Goodwind Power Generator - 125kva Cummins silent diesel genset premium series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-125kva-Cummins-silent-diesel-genset-premium-series.webp',
      url: 'https://www.youtube.com/embed/YD-VNLbpTHE?autoplay=1&mute=1&loop=1&playlist=YD-VNLbpTHE',
    },
    {
      id: 53,
      title: 'Goodwind Power Generator - 900kva Shangchai (SDEC) open type series',
      category: 'diesel',
      thumbnail:
        '/images/thumbnail/Goodwind-Power-Generator-900kva-Shangchai-(SDEC)-open-type-series.webp',
      url: 'https://www.youtube.com/embed/AJvoDgBNbmg?autoplay=1&mute=1&loop=1&playlist=AJvoDgBNbmg',
    },
  ]

  // 当前选中的分类
  const activeCategory = ref('all')

  // 过滤后的视频列表
  const filteredVideos = computed(() => {
    if (activeCategory.value === 'all') return videos
    return videos.filter((video) => video.category === activeCategory.value)
  })
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ t('video.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-400">{{ t('video.description') }}</p>
    </div>

    <!-- 分类选择器 -->
    <div class="flex flex-wrap gap-4 mb-8 justify-center">
      <UButton
        :color="activeCategory === 'all' ? 'primary' : 'neutral'"
        variant="soft"
        @click="activeCategory = 'all'"
      >
        {{ t('video.categories.all') }}
      </UButton>
      <UButton
        v-for="category in categories"
        :key="category.id"
        :color="activeCategory === category.id ? 'primary' : 'neutral'"
        variant="soft"
        @click="activeCategory = category.id"
      >
        <UIcon
          :name="category.icon"
          class="mr-2"
        />
        {{ category.label }}
      </UButton>
    </div>

    <!-- 视频网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="video in filteredVideos"
        :key="video.id"
        class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div
          class="relative aspect-video cursor-pointer"
          @click="openVideoModal(video)"
        >
          <img
            :src="video.thumbnail"
            :alt="video.title"
            class="w-full h-full object-cover"
            loading="eager"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <UIcon
              name="i-custom-play"
              class="text-6xl text-white opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{{ video.title }}</h3>
        </div>
      </div>
    </div>

    <!-- 更多视频链接 -->
    <div class="text-center mt-12">
      <UButton
        color="primary"
        size="lg"
        to="https://www.youtube.com/@GoodwindPower"
        target="_blank"
      >
        {{ t('video.more') }}
        <template #trailing>
          <UIcon name="i-custom-external-link" />
        </template>
      </UButton>
    </div>

    <!-- 视频播放弹窗 -->
    <UModal
      v-model:open="isModalOpen"
      fullscreen
      :title="selectedVideo?.title"
    >
      <template #body>
        <div class="h-full flex items-center justify-center overflow-hidden">
          <div class="w-full h-full flex items-center justify-center">
            <template v-if="selectedVideo">
              <div
                v-if="!isVideoLoaded"
                class="w-full h-full flex flex-col items-center justify-center p-0"
              >
                <!-- 模拟视频播放器界面的骨架屏 -->
                <div
                  class="relative w-full h-full bg-gray-900 flex flex-col items-center justify-center"
                >
                  <!-- 视频区域骨架屏 -->
                  <USkeleton class="w-full h-full" />

                  <!-- 模拟播放控制区 -->
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-gray-900/80 to-transparent"
                  >
                    <!-- 播放按钮 -->
                    <USkeleton class="h-10 w-10 rounded-full" />

                    <!-- 进度条 -->
                    <div class="flex-1 mx-4">
                      <USkeleton class="h-2 w-full rounded-full" />
                    </div>

                    <!-- 全屏按钮 -->
                    <USkeleton class="h-8 w-8 rounded-sm" />
                  </div>

                  <!-- 中央大播放按钮 -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div
                      class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <UIcon
                        name="i-heroicons-play-solid"
                        class="w-10 h-10 text-white ml-1"
                      />
                    </div>
                  </div>

                  <!-- 加载提示 -->
                  <div class="absolute bottom-20 left-0 right-0 text-center">
                    <p class="text-white/80 text-sm">{{ t('video.loading') }}</p>
                  </div>
                </div>
              </div>
              <iframe
                v-show="isVideoLoaded"
                :src="selectedVideo.url"
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
            </template>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
