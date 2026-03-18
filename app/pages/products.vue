<script setup lang="ts">
  const { t } = useI18n()
  const route = useRoute()

  // 从 URL 查询参数中获取初始表单状态
  const initialState = {
    operationType: (route.query.operationType as string) || '',
    fuelType: (route.query.fuelType as string) || '',
    frequency: (route.query.frequency as string) || '',
    powerRange: (route.query.powerRange as string) || '',
    brand: (route.query.brand as string) || '',
  }

  // 使用 useGeneratorData 获取数据
  const { data: products, pending } = useGeneratorData(
    {
      brand: initialState.brand,
      fuelType: initialState.fuelType,
      operationType: initialState.operationType,
    },
    ref(initialState.frequency as '50' | '60'),
  )

  // 过滤产品列表
  const filteredProducts = computed(() => {
    if (!products.value) return []

    return products.value.filter((product) => {
      // 只处理功率范围匹配
      let matchPower = true
      if (initialState.powerRange) {
        const power = product.primeKW
        const [min, max] = initialState.powerRange.split('-').map(Number)
        matchPower = power >= (min || 0) && (max ? power <= max : true)
      }

      return matchPower
    })
  })
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 搜索区域 -->
    <section class="mb-8">
      <UCard>
        <TheGeneratorSearch
          layout="horizontal"
          :initial-state="initialState"
        />
      </UCard>
    </section>

    <!-- 加载状态 -->
    <div
      v-if="pending"
      class="flex justify-center py-12"
    >
      <UIcon
        name="i-custom-loader"
        class="size-8 animate-spin text-gray-400"
      />
    </div>

    <!-- 产品列表 -->
    <section v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UCard
          v-for="product in filteredProducts"
          :key="product.model"
          class="flex flex-col p-4 hover:shadow-lg transition-shadow"
        >
          <!-- 型号 -->
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ product.model }}
          </h3>

          <!-- 品牌和发动机信息 -->
          <div class="flex items-center gap-3 mb-3">
            <UIcon
              name="i-custom-brand"
              class="size-5 text-primary-500"
            />
            <span class="text-sm text-gray-600 dark:text-gray-300">{{ product.engine }}</span>
          </div>

          <!-- 燃气类型、频率 -->
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-1">
              <UIcon
                name="i-custom-gasn"
                class="size-4 text-gray-500"
              />
              <span class="text-xs text-gray-500">燃气</span>
            </div>
            <div class="flex items-center gap-1">
              <UIcon
                name="i-custom-fren"
                class="size-4 text-gray-500"
              />
              <span class="text-xs text-gray-500">50Hz</span>
            </div>
          </div>

          <!-- 功率信息 -->
          <div class="space-y-2 mt-auto">
            <!-- 常用功率 -->
            <div
              class="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800"
            >
              <span class="text-sm text-gray-500">常用功率</span>
              <span class="text-sm font-medium">
                {{ product.primeKW }}kW / {{ product.primeKVA }}kVA
              </span>
            </div>
            <!-- 备用功率 -->
            <div
              class="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800"
            >
              <span class="text-sm text-gray-500">备用功率</span>
              <span class="text-sm font-medium">
                {{ String(product.standbyKW) === 'N/A' ? '-' : product.standbyKW }}kW /
                {{ String(product.standbyKVA) === 'N/A' ? '-' : product.standbyKVA }}kVA
              </span>
            </div>
          </div>

          <!-- 查看详情按钮 -->
          <UButton
            color="primary"
            variant="soft"
            class="mt-4 w-full"
            :to="`/products/${product.model}`"
          >
            {{ t('products.viewDetails') }}
          </UButton>
        </UCard>
      </div>

      <!-- 无搜索结果提示 -->
      <div
        v-if="filteredProducts.length === 0"
        class="text-center py-12 text-gray-500"
      >
        {{ t('products.noResults') }}
      </div>
    </section>
  </div>
</template>
