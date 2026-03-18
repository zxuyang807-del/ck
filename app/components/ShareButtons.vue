<template>
  <div class="flex flex-wrap gap-2">
    <SocialShare
      v-for="network in ['whatsapp', 'x', 'facebook']"
      :key="network"
      :network="network"
      :styled="true"
      :label="false"
      class="text-white p-4 aspect-square rounded-none"
    />

    <client-only>
      <ChineseShareButtons
        :title="shareTitle"
        :description="shareDescription"
        :url="shareUrl"
        :image="shareImage"
      />
    </client-only>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'

  // 分享信息配置
  const shareTitle = ref(document?.title || '分享标题')
  const shareDescription = ref('分享描述')
  const shareImage = ref('/path/to/your/share-image.jpg')
  const shareUrl = computed(() => (import.meta.client ? window.location.href : ''))
</script>
