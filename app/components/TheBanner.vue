<!-- components/TheBanner.vue -->
<script setup lang="ts">
  const { t, locale } = useI18n()
  const currentTextIndex = ref(0)
  const textSizeClass = computed(() => {
    switch (locale.value) {
      case 'zh':
        return 'text-[clamp(1.25rem,min(5vw,3rem),5rem)]'
      case 'ru':
      case 'vi':
        return 'text-[clamp(0.875rem,min(3vw,2rem),3.5rem)]'
      default:
        return 'text-[clamp(1rem,min(3.5vw,2.5rem),4rem)]'
    }
  })

  onMounted(() => {
    const timer = setInterval(() => {
      currentTextIndex.value = (currentTextIndex.value + 1) % 2
    }, 3000)

    onUnmounted(() => {
      if (timer) clearInterval(timer)
    })
  })
</script>

<template>
  <section class="w-full aspect-auto relative z-10 shadow-lg overflow-hidden">
    <!-- <NuxtImg
      src="/images/home/banner.webp"
      width="3500"
      height="470"
      alt="Site Banner"
      fetchpriority="high"
      format="webp"
      quality="90"
      placeholder="blur"
    /> -->
    <NuxtImg
      src="/images/home/banner.webp"
      alt="Site Banner"
      class="w-full h-full object-cover object-center"
      width="3500"
      height="470"
      loading="eager"
      fetchpriority="high"
    />
    <!-- <img
      src="/images/home/banner.webp"
      alt="Site Banner"
      class="w-full h-full object-cover object-center"
      loading="eager"
      fetchpriority="high"
    /> -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/45 backdrop-blur-[2px]"
    >
      <div
        class="absolute inset-0 bg-gradient-radial-to-b from-transparent via-black/10 to-transparent"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"
      ></div>
    </div>
    <div class="absolute inset-0 grid place-items-center">
      <div class="w-full flex flex-col items-center justify-center">
        <Transition
          name="banner-transition"
          mode="out-in"
        >
          <h2
            :key="currentTextIndex"
            :class="[
              'text-white/95 font-medium tracking-wider text-center',
              textSizeClass,
              '[text-shadow:0_2px_4px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2)]',
            ]"
          >
            {{ currentTextIndex === 0 ? t('site.slogon1') : t('site.slogon2') }}
          </h2>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* Banner 文字切换动画 */
  .banner-transition-enter-active,
  .banner-transition-leave-active {
    transition: all 0.4s ease;
    position: absolute;
    width: 100%;
  }

  .banner-transition-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }

  .banner-transition-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
