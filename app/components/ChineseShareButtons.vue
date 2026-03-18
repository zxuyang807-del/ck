<template>
  <div class="flex flex-wrap gap-2">
    <!-- 微信分享 -->
    <UPopover
      v-model:open="wechatPopoverOpen"
      arrow
      :content="{
        side: 'top',
        align: 'center',
        sideOffset: 8,
      }"
    >
      <button class="share-btn bg-[#7bc549] cursor-pointer">
        <UIcon
          name="i-custom-wechat"
          class="size-5 text-white"
        />
      </button>

      <template #content>
        <div class="p-4 text-center">
          <ClientOnly>
            <template v-if="isLoading">
              <UIcon
                name="i-custom-loading"
                class="size-10 mx-auto"
              />
            </template>
            <template v-else>
              <img
                :src="qrCodeUrl"
                alt="微信分享二维码"
                class="w-[150px] h-[150px] mx-auto"
              />
              <p class="text-sm mt-2">请使用微信扫码分享</p>
            </template>
          </ClientOnly>
        </div>
      </template>
    </UPopover>

    <!-- 微博分享 -->
    <button
      class="share-btn bg-[#e6162d] cursor-pointer"
      @click="handleShare('weibo')"
    >
      <UIcon
        name="i-mdi-sina-weibo"
        class="size-5 text-white"
      />
    </button>

    <!-- QQ分享 -->
    <button
      class="share-btn bg-[#4081e1] cursor-pointer"
      @click="handleShare('qq')"
    >
      <UIcon
        name="i-mdi-qqchat"
        class="size-5 text-white"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useQrCode } from '@/composables/useQrCode'
  import { computed, ref, watch } from 'vue'

  interface Props {
    title?: string
    description?: string
    url?: string
    image?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    description: '',
    url: '',
    image: '',
  })

  const config = useRuntimeConfig()
  const currentUrl = computed(() => {
    if (import.meta.client) {
      return window.location.href
    }
    return config.public.siteUrl
  })

  // 使用 QR 码 composable
  const { qrCodeUrl, isLoading, loadQrCode } = useQrCode()

  // 微信弹出框状态
  const wechatPopoverOpen = ref(false)

  // 分享链接
  const shareUrls = computed(() => ({
    weibo: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(props.title)}${props.image ? '&pic=' + encodeURIComponent(props.image) : ''}`,
    qq: `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(props.title)}&desc=${encodeURIComponent(props.description)}${props.image ? '&pics=' + encodeURIComponent(props.image) : ''}`,
  }))

  // 处理分享点击
  const handleShare = (type: 'weibo' | 'qq'): void => {
    const url = shareUrls.value[type]
    window.open(url, '_blank', 'width=600,height=500')
  }

  // 监听弹出框状态变化
  watch(wechatPopoverOpen, (newValue) => {
    if (newValue === true && import.meta.client) {
      loadQrCode()
    }
  })
</script>

<style>
  .share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    color: white;
    border-radius: 9999px;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .share-btn:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  .share-btn:active {
    transform: scale(0.95);
  }
</style>
