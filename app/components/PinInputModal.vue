<script setup lang="ts">
  import wechatQrImage from '@/assets/img/wechat.jpg'

  const pinInput = ref<HTMLElement | null>(null)

  const pinValue = ref<string[] | null>(null)

  const props = defineProps<{
    engine?: string
    correctPin: string[]
    onSuccess?: () => void
    onError?: () => void
  }>()

  // 定义 emit 函数
  const emit = defineEmits(['close'])

  const handleComplete = (value: string[]) => {
    if (value.join('') === props.correctPin.join('')) {
      pinValue.value = null
      // 调用成功回调
      props.onSuccess?.()
      // 关闭模态框
      emit('close')
    } else {
      pinValue.value = null
      // 调用错误回调
      props.onError?.()
      nextTick(() => {
        ;(pinInput.value?.querySelector('input:first-child') as HTMLInputElement)?.focus()
      })
    }
  }
</script>

<template>
  <UModal
    :ui="{ content: 'sm:max-w-md' }"
    :description="$t('download.pinDescription')"
  >
    <template #title>
      <UPopover mode="click">
        <UButton
          :label="$t('download.enterPin')"
          color="neutral"
          variant="subtle"
          class="font-semibold"
        />

        <template #content>
          <div class="p-2 max-w-xs">
            <img
              :src="wechatQrImage"
              alt="WeChat QR Code"
              class="w-full h-auto"
            />
          </div>
        </template>
      </UPopover>
    </template>

    <template #body>
      <div
        ref="pinInput"
        class="flex justify-center p-4"
      >
        <UPinInput
          v-model="pinValue"
          :length="4"
          type="number"
          size="lg"
          :highlight="pinValue?.length === 4"
          @complete="handleComplete"
        />
      </div>
    </template>
  </UModal>
</template>
