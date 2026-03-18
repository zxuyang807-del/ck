<script setup lang="ts">
  import { useGeneratorData } from '@/composables/useGeneratorData'
import type { TableColumn } from '@nuxt/ui'
import type { Table } from '@tanstack/vue-table'
import { onMounted, onUnmounted } from 'vue'
import type { PowerGenerator } from '~/types/power-generator'
import PinInputModal from './PinInputModal.vue'

  const { t } = useI18n()

  const USelect = resolveComponent('USelect')
  const UButton = resolveComponent('UButton')
  const UCheckbox = resolveComponent('UCheckbox')

  // 表格状态
  const rowSelection = ref<Record<number, boolean>>({})
  const sorting = ref([])
  const columnFilters = ref([
    {
      id: 'powerRange',
      value: null,
    },
  ])

  // 定义 props
  const props = defineProps<{
    brand: string
    fuelType: string
    // 添加默认列可见性配置
    defaultColumnVisibility?: Record<string, boolean>
  }>()

  // 添加频率选择状态
  const selectedFrequency = ref<'50' | '60'>('50')

  // 从API获取表格数据
  const { data, pending } = useGeneratorData(props, selectedFrequency)

  // 定义表格引用
  const table = useTemplateRef<{ tableApi: Table<PowerGenerator> }>('table')
  const tableContainer = useTemplateRef<HTMLElement>('tableContainer')
  const resizeHandle = useTemplateRef<HTMLElement>('resizeHandle')
  
  // 调整大小相关变量
  const isResizing = ref(false)
  const startY = ref(0)
  const startHeight = ref(0)

  // 添加验证码常量
  const CORRECT_PIN = ['1', '2', '3', '4']

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

  // 定义列可见性状态
  const columnVisibility = ref(props.defaultColumnVisibility || {})

  // 修改列定义
  const columns: TableColumn<PowerGenerator>[] = [
    {
      accessorKey: 'compare',
      header: 'compare-header',
      cell: 'compare-cell',
    },
    {
      accessorKey: 'model',
      header: () => t('table.model'),
    },
    {
      accessorKey: 'powerRange',
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true
        const [min, max] = filterValue.split('-').map(Number)
        const primeKVA = Number(row.original.primeKVA)
        return primeKVA >= min && primeKVA < max
      },
    },
    {
      accessorKey: 'engine',
      header: () => t('table.engine'),
    },
    {
      accessorKey: 'cylinder',
      header: () => t('table.cylinder'),
    },
    {
      accessorKey: 'speedGovernor',
      header: () => t('table.speedGovernor'),
    },
    {
      accessorKey: 'displacement',
      header: () => t('table.displacement'),
    },
    {
      accessorKey: 'cons',
      header: () => t('table.cons'),
    },
    {
      accessorKey: 'emission',
      header: () => t('table.emission'),
    },
    {
      accessorKey: 'all',
      header: 'ALL',
      cell: 'all-cell',
    },
  ]

  // 添加筛选状态
  const filteredData = ref<PowerGenerator[]>([])
  const isFiltered = ref(false)

  // 添加 useToast
  const toast = useToast()

  const overlay = useOverlay()

  // 处理比较按钮点击
  const handleCompare = () => {
    const selectedRows = data.value?.filter((_, index) => rowSelection.value[index]) ?? []

    // 检查选中数量
    if (selectedRows.length < 2) {
      toast.add({
        title: t('table.selectAtLeastTwo'),
        color: 'primary',
        icon: 'i-custom-alert',
      })
      return
    }

    filteredData.value = selectedRows
    isFiltered.value = true
  }

  // 重置筛选
  const handleReset = () => {
    isFiltered.value = false
    rowSelection.value = {}
  }

  // 重置所有筛选条件和选择状态的处理函数
  const handleResetAll = () => {
    if (isFiltered.value || columnFilters.value.some((filter) => filter.value !== null)) {
      // 重置所有筛选条件
      isFiltered.value = false
      rowSelection.value = {}
      columnFilters.value = columnFilters.value.map((filter) => ({
        ...filter,
        value: null,
      }))
    }
  }

  // 处理下载按钮点击
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

  // 调整表格高度的功能
  onMounted(() => {
    if (resizeHandle.value && tableContainer.value) {
      // 鼠标按下事件
      resizeHandle.value.addEventListener('mousedown', (e) => {
        isResizing.value = true
        startY.value = e.clientY
        startHeight.value = tableContainer.value!.offsetHeight
        
        // 添加全局鼠标移动和释放事件
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      })
    }
  })

  // 处理鼠标移动
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.value || !tableContainer.value) return
    
    const deltaY = e.clientY - startY.value
    const newHeight = startHeight.value + deltaY
    
    // 限制高度范围
    if (newHeight >= 300 && newHeight <= 1000) {
      tableContainer.value.style.height = `${newHeight}px`
    }
  }

  // 处理鼠标释放
  const handleMouseUp = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  // 清理事件监听器
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  })
</script>

<template>
  <div class="relative">
    <div class="flex-1 divide-y divide-(--ui-border-accented) w-full">
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

        <UDropdownMenu
          :items="
            table?.tableApi
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                label: t(`table.${column.id}`),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                  e?.preventDefault()
                },
              }))
          "
          :content="{ align: 'end' }"
        >
          <UButton
            :label="t('table.columns')"
            color="neutral"
            variant="outline"
            trailing-icon="i-custom-chevron-down"
            class="ml-auto"
          />
        </UDropdownMenu>
      </div>

      <div class="relative">
        <div ref="tableContainer" class="flex-1 h-[400px] min-h-[400px] max-h-[800px] overflow-auto">
          <UTable
            ref="table"
            v-model:row-selection="rowSelection"
            v-model:sorting="sorting"
            v-model:column-filters="columnFilters"
            v-model:column-visibility="columnVisibility"
            :columns="columns"
            :data="isFiltered ? filteredData : data"
            :loading="pending"
            sticky
            :ui="{
              base: '',
              td: 'whitespace-nowrap text-center',
              th: 'whitespace-nowrap text-center bg-(--ui-bg)/75 backdrop-blur',
            }"
            class="flex-1 w-full"
          >
        <!-- compare -->
        <template #compare-header>
          <div class="flex items-center justify-center gap-2">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-custom-git-compare"
              :label="isFiltered ? $t('table.reset') : $t('table.compare')"
              @click="isFiltered ? handleReset() : handleCompare()"
            />
          </div>
        </template>
        <!-- compare-cell -->
        <template #compare-cell="{ row }">
          <div class="flex items-center justify-center gap-2">
            <UCheckbox
              :model-value="row.getIsSelected()"
              :aria-label="$t('table.selectRow')"
              @update:model-value="
                (value: boolean | 'indeterminate') => row.toggleSelected(!!value)
              "
            />
          </div>
        </template>

        <!-- powerRange 列标题和过滤器 -->
        <template #powerRange-header>
          <USelect
            :model-value="table?.tableApi?.getColumn('powerRange')?.getFilterValue() as string"
            :items="powerRangeOptions"
            :placeholder="$t('table.powerRange')"
            class="w-3/4 px-2"
            @update:model-value="
              (value: string) => {
                table?.tableApi?.getColumn('powerRange')?.setFilterValue(value)
              }
            "
          />
        </template>

        <!-- powerRange 单元格显示 -->
        <template #powerRange-cell="{ row }">
          <div class="text-sm grid">
            <div class="grid grid-cols-[auto_1fr] gap-1">
              <span class="text-right w-20">{{ $t('table.prime') }}:</span>
              <span>{{ row.original.primeKW }}kW / {{ row.original.primeKVA }}kVA</span>
            </div>
            <div class="grid grid-cols-[auto_1fr] gap-1">
              <span class="text-right w-20">{{ $t('table.standby') }}:</span>
              <span>{{ row.original.standbyKW }}kW / {{ row.original.standbyKVA }}kVA</span>
            </div>
          </div>
        </template>

        <!-- Engine Model 标题 -->
        <!-- <template #engine-header>
          <div class="contents">
            <div class="min-w-fit">
              <div class="text-center py-2">{{ $t('table.engine') }}</div>
              <div
                class="grid grid-cols-[minmax(max-content,1fr)_minmax(max-content,1fr)] min-w-max"
              >
                <div class="py-2 whitespace-nowrap flex items-center justify-center">
                  {{ $t('table.model') }}
                </div>
                <div class="py-2 whitespace-nowrap flex flex-col justify-center">
                  <div>{{ $t('table.cons') }}</div>
                  <div> L/H[100%] </div>
                </div>
              </div>
            </div>
          </div>
        </template> -->

        <!-- Engine Model 单元格 -->
        <!-- <template #engine-cell="{ row }">
          <div class="contents">
            <div class="min-w-fit">
              <div
                class="grid justify-items-center"
                style="grid-template-columns: minmax(max-content, 1fr) minmax(max-content, 1fr)"
              >
                <div class="px-2 whitespace-nowrap flex items-center">
                  {{ row.original.engine }}
                </div>
                <div class="px-2 whitespace-nowrap flex items-center">
                  {{ row.original.cons }}
                </div>
              </div>
            </div>
          </div>
        </template> -->

        <template #cons-header>
          <div class="py-2 whitespace-nowrap flex flex-col justify-center">
            <div>{{ fuelType === 'gas' ? $t('table.oilCons') : $t('table.fuelCons') }}</div>
            <div>{{ fuelType === 'gas' ? 'g/kWh' : 'L/H[100%]' }}</div>
          </div>
        </template>

        <!-- ALL 按钮 -->
        <template #all-header>
          <UButton
            color="primary"
            variant="ghost"
            icon="i-custom-list"
            :label="$t('table.all')"
            @click="handleResetAll"
          />
        </template>

        <!-- 添加 all-cell slot -->
        <template #all-cell="{ row }">
          <div class="flex items-center justify-center gap-2">
            <UButton
              color="primary"
              variant="ghost"
              icon="i-custom-download"
              :label="$t('table.download')"
              @click="handleDownload(row.original.model, row.original.engine)"
            />
          </div>
        </template>
          </UTable>
        </div>
        <!-- 拖动调整手柄 -->
        <div 
          ref="resizeHandle" 
          class="h-2 bg-gray-300 dark:bg-gray-700 cursor-ns-resize w-full"
          style="user-select: none;"
        ></div>
      </div>

      <!-- 添加选择统计 -->
      <div class="px-4 py-3.5 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
        已选择 {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length ?? 0 }} /
        {{ table?.tableApi?.getFilteredRowModel().rows.length ?? 0 }} 行
      </div>
    </div>
  </div>
</template>
