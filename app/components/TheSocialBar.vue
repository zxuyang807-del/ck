<script setup lang="ts">
  import wechatQrImage from '@/assets/img/wechat.jpg'
  import { useWindowScroll, useWindowSize } from '@vueuse/core'

  interface SocialItem {
    id: string
    icon: string
    label: string
    content: string
    type: 'qrcode' | 'text' | 'link'
    link?: string
  }

  const socialItems = ref<SocialItem[]>([
    {
      id: 'phone',
      icon: 'i-custom-social-phone',
      label: '电话咨询',
      content: '+8619708412781',
      type: 'link',
      link: 'tel:+8619708412781',
    },
    {
      id: 'email',
      icon: 'i-custom-social-email',
      label: '邮件咨询',
      content: 'info@goodwindpower.com',
      type: 'link',
      link: 'mailto:info@goodwindpower.com',
    },
    {
      id: 'wechat',
      icon: 'i-custom-social-wechat',
      label: '微信咨询',
      content: wechatQrImage,
      type: 'qrcode',
    },
    {
      id: 'whatsapp',
      icon: 'i-custom-social-whatsapp',
      label: 'WhatsApp',
      content: '+86 197 0841 2781',
      type: 'link',
      link: 'https://wa.me/8619708412781',
    },
    {
      id: 'scrollTop',
      icon: 'i-custom-arrow-up',
      label: '返回顶部',
      content: '返回顶部',
      type: 'text',
    },
  ])

  const activeItem = ref<string | null>(null)

  // 使用 VueUse 的 useScroll 和 useWindowSize
  const { y: scrollY } = useWindowScroll()
  const { height: windowHeight } = useWindowSize()

  // 使用计算属性控制显示逻辑
  const isVisible = computed(() => scrollY.value > windowHeight.value * 0.1)

  // 添加滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
</script>

<template>
  <ClientOnly>
    <Transition name="fade">
      <div
        v-show="isVisible"
        class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
      >
        <div
          v-for="item in socialItems"
          :key="item.id"
          class="relative group"
          @mouseenter="activeItem = item.id"
          @mouseleave="activeItem = null"
          @click="item.id === 'scrollTop' ? scrollToTop() : null"
        >
          <!-- 图标按钮 -->
          <UButton
            :icon="item.icon"
            color="primary"
            variant="solid"
            class="!w-10 !h-10 !p-0 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            :tooltip="item.label"
            :tooltip-placement="'left'"
          />

          <!-- 悬浮内容 -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-x-2 opacity-0"
            enter-to-class="transform translate-x-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform translate-x-0 opacity-100"
            leave-to-class="transform -translate-x-2 opacity-0"
          >
            <div
              v-if="activeItem === item.id"
              class="absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4"
            >
              <!-- 二维码类型 -->
              <template v-if="item.type === 'qrcode'">
                <div class="w-32 h-32">
                  <img
                    :src="item.content"
                    :alt="item.label"
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </template>

              <!-- 链接类型 -->
              <template v-else-if="item.type === 'link'">
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium whitespace-nowrap text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {{ item.content }}
                </a>
              </template>

              <!-- 文本类型 -->
              <template v-else-if="item.type === 'text'">
                <span
                  class="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-200"
                >
                  {{ item.content }}
                </span>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>
