<script setup lang="ts">
  const { t } = useI18n()

  // 使用 props 接收 activeBrand
  const props = defineProps<{
    activeBrand: string
  }>()

  const items = computed(() => [
    {
      label: '柴油发电机组',
      icon: 'i-custom-fuel',
      value: 'diesel',
      content: '',
    },
    {
      label: '燃气发电机组',
      icon: 'i-custom-flame',
      value: 'gas',
      content: '',
    },
    {
      label: '船用发电机组',
      icon: 'i-custom-ship',
      value: 'ship',
      content: '',
    },
  ])

  const brandsByType = {
    diesel: [
      {
        label: t('nav.products.items.cummins.label'),
        description: t('nav.products.items.cummins.description'),
        icon: 'i-custom-cummins',
        value: 'cummins',
      },
      {
        label: t('nav.products.items.weichai.label'),
        description: t('nav.products.items.weichai.description'),
        icon: 'i-custom-weichai',
        value: 'weichai',
      },
      {
        label: t('nav.products.items.sdec.label'),
        description: t('nav.products.items.sdec.description'),
        icon: 'i-custom-sdec',
        value: 'sdec',
      },
    ],
    gas: [],
    ship: [],
  }

  const emit = defineEmits<{
    selectBrand: [{ brand: string }]
  }>()

  // 添加本地状态跟踪当前选中的品牌
  const currentBrand = ref(props.activeBrand)

  const handleBrandSelect = (brand: string) => {
    // 立即更新本地状态
    currentBrand.value = brand
    emit('selectBrand', { brand })
  }
</script>

<template>
  <UAccordion
    :items="items"
    default-value="diesel"
  >
    <template #content="{ item }">
      <div class="space-y-2">
        <UButton
          v-for="brand in brandsByType[item.value as keyof typeof brandsByType]"
          :key="brand.value"
          :icon="brand.icon"
          :label="brand.label"
          :description="brand.description"
          :color="currentBrand === brand.value ? 'primary' : 'neutral'"
          variant="ghost"
          class="w-full justify-start gap-2 px-2"
          @click="handleBrandSelect(brand.value)"
        >
          <template #description>
            <p class="line-clamp-2 text-xs">{{ brand.description }}</p>
          </template>
        </UButton>
      </div>
    </template>
  </UAccordion>
</template>
