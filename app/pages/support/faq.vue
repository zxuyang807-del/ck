<script setup lang="ts">
  const { t } = useI18n()

  // FAQ数据 - 使用函数来初始化数据
  const faqs = computed(() => [
    {
      question: t('faq.warranty.question'),
      answer: t('faq.warranty.answer'),
      icon: 'i-custom-shield',
    },
    {
      question: t('faq.global.question'),
      answer: t('faq.global.answer'),
      icon: 'i-custom-globe',
    },
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer'),
      icon: 'i-custom-credit',
    },
    {
      question: t('faq.delivery.question'),
      answer: t('faq.delivery.answer'),
      icon: 'i-custom-truck',
    },
  ])
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ t('faq.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-400">{{ t('faq.description') }}</p>
    </div>

    <!-- FAQ列表 -->
    <div class="max-w-3xl mx-auto space-y-8">
      <div
        v-for="faq in faqs"
        :key="faq.question"
        class="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-start gap-4">
          <UIcon
            :name="faq.icon"
            class="flex-shrink-0 w-6 h-6 text-primary-500"
          />
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {{ faq.question }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
