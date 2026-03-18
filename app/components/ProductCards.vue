<template>
  <div>
    <!-- 频率选择 -->
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UFieldGroup orientation="horizontal">
        <UButton
          color="primary"
          :variant="selectedFrequency === '50' ? 'solid' : 'outline'"
          label="50HZ"
          @click="selectedFrequency = '50'"
        />
        <UButton
          color="primary"
          :variant="selectedFrequency === '60' ? 'solid' : 'outline'"
          label="60HZ"
          @click="selectedFrequency = '60'"
        />
      </UFieldGroup>
    </div>

    <!-- 功率范围筛选 -->
    <div class="px-4 py-2">
      <USelect
        v-model="selectedPowerRange"
        :items="powerRangeOptions"
        :placeholder="t('table.powerRange')"
        class="w-48"
      />
    </div>

    <!-- 产品卡片网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      <div
        v-for="product in filteredProducts"
        :key="product.model"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <!-- 卡片顶部：型号和频率 -->
        <div class="bg-primary text-white p-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">{{ product.model }}</h3>
            <div class="flex gap-2">
              <span class="bg-white text-primary px-2 py-1 rounded text-sm font-semibold">
                {{ selectedFrequency }}Hz
              </span>
              <span class="bg-white text-primary px-2 py-1 rounded text-sm font-semibold">
                3Ph
              </span>
            </div>
          </div>
        </div>

        <!-- 卡片内容 -->
        <div class="p-4">
          <!-- 功率信息 -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600 dark:text-gray-300">主用功率</span>
              <span class="font-semibold">{{ product.primeKW }}kW / {{ product.primeKVA }}kVA</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">备用功率</span>
              <span class="font-semibold">{{ product.standbyKW }}kW / {{ product.standbyKVA }}kVA</span>
            </div>
          </div>

          <!-- 技术参数 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">发动机</span>
              <span class="font-medium">{{ product.engine }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">气缸</span>
              <span class="font-medium">{{ (product as any).cylinder || 'N/A' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">调速器类型</span>
              <span class="font-medium">{{ (product as any).speedGovernor || 'N/A' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">排量</span>
              <span class="font-medium">{{ (product as any).displacement || 'N/A' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">燃油消耗</span>
              <span class="font-medium">{{ product.cons }} L/H[100%]</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300">排放标准</span>
              <span class="font-medium">{{ (product as any).emissionStandard || 'N/A' }}</span>
            </div>
          </div>

          <!-- 下载按钮 -->
          <div class="mt-4">
            <UButton
              color="primary"
              variant="soft"
              class="w-full"
              :icon="'i-heroicons-download-20'"
              @click="handleDownload(product.model, product.engine)"
            >
              {{ t('table.download') }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- 无搜索结果提示 -->
      <div
        v-if="filteredProducts.length === 0"
        class="col-span-full text-center py-12 text-gray-500"
      >
        {{ t('products.noResults') }}
      </div>
    </div>

    <!-- 选择统计 -->
    <div class="px-4 py-3.5 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
      共 {{ filteredProducts.length }} 个型号
    </div>


  </div>
</template>

<script setup lang="ts">
  import { useGeneratorData } from '@/composables/useGeneratorData'
import { computed, ref, resolveComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PinInputModal from './PinInputModal.vue'

  const { t } = useI18n()
  const toast = useToast()
  const overlay = useOverlay()

  const USelect = resolveComponent('USelect')
  const UButton = resolveComponent('UButton')
  const UFieldGroup = resolveComponent('UFieldGroup')

  // 定义 props
  const props = defineProps<{
    brand: string
    fuelType: string
  }>()

  // 频率选择状态
  const selectedFrequency = ref<'50' | '60'>('50')
  // 功率范围选择
  const selectedPowerRange = ref('all')
  // 添加验证码常量
  const CORRECT_PIN = ['1', '2', '3', '4']

  // 从API获取表格数据
  const { data, pending: _pending } = useGeneratorData(props, selectedFrequency)

  // 添加功率范围选项
  const powerRangeOptions = ref([
    { label: t('table.powerRange'), value: 'all' },
    { label: '0-300 kVA', value: '0-300' },
    { label: '300-600 kVA', value: '300-600' },
    { label: '600-900 kVA', value: '600-900' },
    { label: '900-1200 kVA', value: '900-1200' },
    { label: '1200-1500 kVA', value: '1200-1500' },
    { label: '1500-1800 kVA', value: '1500-1800' },
    { label: '1800-2000 kVA', value: '1800-2000' },
    { label: '2000-2500 kVA', value: '2000-2500' },
    { label: '2500-3000 kVA', value: '2500-3000' },
    { label: '3000-3500 kVA', value: '3000-3500' },
    { label: '3500-4000 kVA', value: '3500-4000' },
    { label: '4000-4500 kVA', value: '4000-4500' },
  ])

  // 过滤产品
  const filteredProducts = computed(() => {
    if (!data.value || data.value.length === 0) return []

    return data.value.filter(product => {
      // 功率范围过滤
      if (selectedPowerRange.value !== 'all') {
        const parts = selectedPowerRange.value.split('-')
        if (parts.length === 2) {
          const min = Number(parts[0])
          const max = Number(parts[1])
          const primeKVA = Number(product.primeKVA)
          if (!isNaN(min) && !isNaN(max) && !isNaN(primeKVA)) {
            if (primeKVA < min || primeKVA >= max) return false
          }
        }
      }
      return true
    })
  })

  // 处理下载
  const handleDownload = (model: string, engine: string) => {
    const modal = overlay.create(PinInputModal, {
      props: {
        correctPin: CORRECT_PIN,
        onSuccess: () => {
          // 构建PDF文件名
          const pdfFileName = `${model}-${engine}.pdf`

          // 创建下载链接
          const link = document.createElement('a')
          link.href = `https://img.goodwindpower.com/pdf/${pdfFileName}`
          link.download = pdfFileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          toast.add({
            title: t('download.success', { pdfId: pdfFileName }),
            color: 'success',
            icon: 'i-custom-check',
          })
        },
        onError: () => {
          toast.add({
            title: t('download.error'),
            color: 'error',
            icon: 'i-custom-alert',
          })
        },
      },
    })
    modal.open()
  }
</script>
