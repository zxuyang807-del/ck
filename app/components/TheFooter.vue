<script setup lang="ts">
  const { t } = useI18n()
  const socialLinks = [
    {
      name: '微信公众号',
      icon: 'i-mdi-wechat',
      url: '', // 这里可以添加实际的公众号二维码弹窗
    },
    {
      name: '抖音',
      icon: 'i-ri-tiktok-fill',
      url: '', // 替换为实际抖音主页链接
    },
    {
      name: 'B站',
      icon: 'i-ri-bilibili-fill',
      url: 'https://space.bilibili.com/3546868747340208', // 替换为实际B站主页链接
    },
    {
      name: 'YouTube',
      icon: 'i-mdi-youtube',
      url: 'https://www.youtube.com/@GoodwindPower', // 替换为实际YouTube频道链接
    },
  ]
</script>

<template>
  <footer class="w-full mx-auto">
    <USeparator />
    <div class="h-[clamp(3rem,4vw,4rem)] flex items-center justify-between px-4">
      <p class="text-gray-600 text-[clamp(0.75rem,1vw,0.875rem)]">
        {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
      </p>
      <div class="flex items-center gap-4">
        <ULink
          v-for="link in socialLinks"
          :key="link.name"
          :to="link.url"
          :title="link.name"
          target="_blank"
          rel="noopener noreferrer"
          external
          class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
        >
          <UIcon
            :name="link.icon"
            class="w-5 h-5"
          />
        </ULink>
      </div>
    </div>
  </footer>
</template>
