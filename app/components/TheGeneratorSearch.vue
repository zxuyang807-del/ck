<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { PropType } from 'vue'
  import * as z from 'zod'

  const { t, locale } = useI18n()

  const form = useTemplateRef<{
    validate: (options: { name: string }) => Promise<void>
  }>('form')

  // 添加错误处理函数
  const validateField = async (fieldName: keyof FormState) => {
    try {
      await form.value?.validate({ name: fieldName })
    } catch {
      // 验证失败是预期的行为，不需要额外处理
    }
  }

  // 使用 Zod 定义 schema
  const schema = z.object({
    operationType: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.operationType.label'),
      }),
    }),
    fuelType: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.fuelType.label'),
      }),
    }),
    frequency: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.frequency.label'),
      }),
    }),
    powerRange: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.powerRange.label'),
      }),
    }),
    brand: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.brand.label'),
      }),
    }),
  })

  // 从 schema 中推导出类型
  type FormState = z.input<typeof schema>

  // 完整定义所有表单字段
  const formFields = computed(() => [
    {
      name: 'operationType',
      label: t('home.search.fields.operationType.label'),
      options: [
        { label: t('home.search.fields.operationType.land'), value: 'land' },
        { label: t('home.search.fields.operationType.ship'), value: 'ship' },
      ],
      icon: 'i-custom-operation',
    },
    {
      name: 'fuelType',
      label: t('home.search.fields.fuelType.label'),
      options: [
        { label: t('home.search.fields.fuelType.diesel'), value: 'diesel' },
        { label: t('home.search.fields.fuelType.gas'), value: 'gas' },
      ],
      icon: 'i-custom-gasn',
    },
    {
      name: 'frequency',
      label: t('home.search.fields.frequency.label'),
      options: [
        { label: t('home.search.fields.frequency.hz50'), value: '50' },
        { label: t('home.search.fields.frequency.hz60'), value: '60' },
      ],
      icon: 'i-custom-fren',
    },
    {
      name: 'powerRange',
      label: t('home.search.fields.powerRange.label'),
      options: [
        { label: t('home.search.fields.powerRange.all'), value: 'all' },
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
      ],
      icon: 'i-custom-range',
    },
    {
      name: 'brand',
      label: t('home.search.fields.brand.label'),
      options: [
        { label: t('home.search.fields.brand.cummins'), value: 'cummins' },
        { label: t('home.search.fields.brand.perkins'), value: 'perkins' },
        { label: t('home.search.fields.brand.mtu'), value: 'mtu' },
        { label: t('home.search.fields.brand.volvo'), value: 'volvo' },
        { label: t('home.search.fields.brand.baudouin'), value: 'baudouin' },
        { label: t('home.search.fields.brand.weichai'), value: 'weichai' },
        { label: t('home.search.fields.brand.yuchai'), value: 'yuchai' },
        { label: t('home.search.fields.brand.hyundai'), value: 'hyundai' },
        { label: t('home.search.fields.brand.mitsubishi'), value: 'mitsubishi' },
        { label: t('home.search.fields.brand.sdec'), value: 'sdec' },
        { label: t('home.search.fields.brand.isuzu'), value: 'isuzu' },
        { label: t('home.search.fields.brand.yangdong'), value: 'yangdong' },
      ],
      icon: 'i-custom-brand',
    },
  ])

  // 更新 props 定义中的类型
  const props = defineProps({
    layout: {
      type: String,
      default: 'vertical',
      validator: (value: string) => ['vertical', 'horizontal'].includes(value),
    },
    initialState: {
      type: Object as PropType<Partial<FormState>>,
      default: () => ({}),
    },
  })

  // 使用 initialState 初始化表单状态
  const state = reactive<Partial<FormState>>({
    operationType: props.initialState.operationType || '',
    fuelType: props.initialState.fuelType || '',
    frequency: props.initialState.frequency || '',
    powerRange: props.initialState.powerRange || '',
    brand: props.initialState.brand || '',
  })

  // 监听运行方式变化
  watch(
    () => state.operationType,
    (newValue) => {
      if (newValue === 'ship') {
        state.fuelType = 'diesel'
        state.frequency = '50'
      }
    },
  )

  // 修改表单提交处理
  const onSubmit = async (event: FormSubmitEvent<FormState>) => {
    try {
      // 将表单数据转换为查询参数
      const query = Object.entries(event.data)
        .filter(([_, value]) => value) // 过滤掉空值
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      // 使用 navigateTo 跳转到产品页
      await navigateTo({
        path: '/products',
        query,
      })
    } catch (error) {
      console.error('提交表单时出错:', error)
    }
  }

  const buttonGroupFields = computed(() =>
    formFields.value.filter((field) =>
      ['operationType', 'fuelType', 'frequency'].includes(field.name),
    ),
  )
  const selectFields = computed(() =>
    formFields.value.filter(
      (field) => !['operationType', 'fuelType', 'frequency'].includes(field.name),
    ),
  )

  // 定义表单字段的顺序
  const fieldOrder = ['operationType', 'fuelType', 'frequency', 'powerRange', 'brand'] as const

  // 使用计算属性来判断字段是否可用
  const isFieldEnabled = computed(() => {
    const result: Record<string, boolean> = {
      [fieldOrder[0]]: true, // 第一个字段永远可用
    }

    // 从第二个字段开始，检查前一个字段是否有值
    for (let i = 1; i < fieldOrder.length; i++) {
      const prevField = fieldOrder[i - 1] as keyof FormState
      const currentField = fieldOrder[i] as keyof FormState
      result[currentField] = Boolean(state[prevField])
    }

    // 特殊处理：如果是船用发电机组，燃料类型和频率固定且不可修改
    if (state.operationType === 'ship') {
      result.fuelType = false
      result.frequency = false
    }

    return result
  })

  // 添加计算属性来确定label宽度
  const labelWidthClass = computed(() => {
    return ['ru', 'vi', 'ar'].includes(locale.value) ? 'w-28' : 'w-24'
  })
</script>

<template>
  <UCard class="w-full h-full flex flex-col">
    <template #header>
      <div class="bg-gray-100 dark:bg-gray-800 -m-4 sm:-mx-6 p-4 sm:px-6 rounded-t-lg">
        <h3 class="text-2xl font-bold text-center">
          {{ t('home.search.title') }}
        </h3>
      </div>
    </template>

    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="flex flex-1 gap-4 pr-10"
      :class="[
        'flex-col', // 默认垂直布局
        props.layout === 'horizontal' ? 'md:flex-row md:flex-wrap pr-0' : '', // 在 md 断点以上时,如果是水平布局则启用
      ]"
      @submit="onSubmit"
    >
      <!-- 搜索字段 -->
      <div
        :class="[
          'flex gap-4 flex-col', // 默认垂直布局
          props.layout === 'horizontal' ? 'md:flex-row md:flex-wrap md:flex-1' : '', // 在 md 断点以上时,如果是水平布局则启用
        ]"
      >
        <UFormField
          v-for="field in buttonGroupFields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :class="[
            'grid grid-cols-[auto_1fr] items-center gap-4', // 默认网格布局
            props.layout === 'horizontal' ? 'md:flex-1 md:min-w-[200px]' : '', // 在 md 断点以上时,如果是水平布局则启用
          ]"
        >
          <template #label>
            <div
              class="flex items-center gap-2"
              :class="labelWidthClass"
            >
              <UIcon
                :name="field.icon"
                class="size-5"
              />
              {{ field.label }}
            </div>
          </template>

          <!-- 为燃料类型和频率使用按钮组 -->
          <UFieldGroup
            class="w-full"
            size="sm"
          >
            <template
              v-for="option in field.options"
              :key="option.value"
            >
              <UButton
                class="flex-1 flex justify-center items-center text-center cursor-pointer"
                :class="[!isFieldEnabled[field.name] && 'cursor-not-allowed opacity-50']"
                :disabled="!isFieldEnabled[field.name]"
                :color="
                  state[field.name as keyof FormState] === option.value ? 'primary' : 'neutral'
                "
                :variant="
                  state[field.name as keyof FormState] === option.value ? 'solid' : 'outline'
                "
                @click="
                  async () => {
                    if (isFieldEnabled[field.name]) {
                      state[field.name as keyof FormState] = option.value
                      await validateField(field.name as keyof FormState)
                    }
                  }
                "
              >
                {{ option.label }}
              </UButton>
            </template>
          </UFieldGroup>
        </UFormField>
        <!-- 其他字段使用下拉框 -->
        <UFormField
          v-for="field in selectFields"
          :key="field.name"
          :name="field.name"
          :class="[
            'grid grid-cols-[auto_1fr] items-center gap-4', // 默认网格布局
            props.layout === 'horizontal' ? 'md:flex-1 md:min-w-[200px]' : '', // 在 md 断点以上时,如果是水平布局则启用
          ]"
        >
          <template #label>
            <div
              class="flex items-center gap-2"
              :class="labelWidthClass"
            >
              <UIcon
                :name="field.icon"
                class="size-5"
              />
              {{ field.label }}
            </div>
          </template>

          <USelect
            v-model="state[field.name as keyof FormState]"
            :items="field.options"
            class="w-full"
            :disabled="!isFieldEnabled[field.name]"
          />
        </UFormField>
      </div>

      <!-- 搜索按钮 -->
      <UButton
        type="submit"
        color="primary"
        :class="[
          'w-full flex items-center justify-center', // 默认样式
          props.layout === 'horizontal' ? 'md:self-end md:w-auto md:px-8' : '', // 在 md 断点以上时,如果是水平布局则启用
        ]"
      >
        {{ t('home.search.submit') }}
      </UButton>
    </UForm>
  </UCard>
</template>
