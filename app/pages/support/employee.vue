<script setup lang="ts">
  import * as z from 'zod'

  definePageMeta({
    middleware: ['auth'],
  })

  const { clearAuth } = useAuth()
  const { t } = useI18n()

  const handleLogout = async () => {
    clearAuth()
    await navigateTo('/')
  }

  // 表单相关
  const form = useTemplateRef<{
    validate: (options: { name: string }) => Promise<void>
  }>('form')

  // 使用 Zod 定义 schema
  const schema = z.object({
    brand: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.brand.label'),
      }),
    }),
    fuelType: z.string().min(1, {
      message: t('home.search.validation.required', {
        field: t('home.search.fields.fuelType.label'),
      }),
    }),
  })

  // 从 schema 中推导出类型
  type FormState = z.input<typeof schema>

  // 表单状态
  const state = reactive<FormState>({
    brand: 'cummins', // 默认值
    fuelType: 'diesel', // 默认值
  })

  // 获取品牌数据
  const { data: brands } = await useFetch('/api/brand')

  // 计算燃料类型选项
  const fuelTypeOptions = computed(() => {
    const selectedBrand = brands.value?.find((b) => b.name === state.brand)
    return (
      selectedBrand?.type.map((type) => ({
        label: t(`home.search.fields.fuelType.${type}`),
        value: type,
      })) || []
    )
  })

  // 品牌选项
  const brandOptions = computed(
    () =>
      brands.value?.map((brand) => ({
        label: t(`home.search.fields.brand.${brand.name}`),
        value: brand.name,
      })) || [],
  )

  // 监听品牌变化，重置燃料类型
  watch(
    () => state.brand,
    (newBrand) => {
      const brand = brands.value?.find((b) => b.name === newBrand)
      if (brand && !brand.type.includes(state.fuelType) && brand.type.length > 0) {
        state.fuelType = brand.type[0]!
      }
    },
  )

  // 表单字段定义
  const formFields = computed(() => [
    {
      name: 'brand' as keyof FormState,
      label: t('home.search.fields.brand.label'),
      icon: 'i-custom-brand',
    },
    {
      name: 'fuelType' as keyof FormState,
      label: t('home.search.fields.fuelType.label'),
      icon: 'i-custom-gasn',
    },
  ])
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">员工专区</h1>
      <UButton
        color="primary"
        variant="soft"
        icon="i-custom-logout"
        label="退出登录"
        @click="handleLogout"
      />
    </div>

    <!-- 条件查询表单 -->
    <div class="mb-6">
      <UCard class="w-full">
        <template #header>
          <div class="bg-gray-100 dark:bg-gray-800 -m-4 sm:-mx-6 p-4 sm:px-6 rounded-t-lg">
            <h3 class="text-xl font-bold text-center"> 产品查询 </h3>
          </div>
        </template>

        <UForm
          ref="form"
          :schema="schema"
          :state="state"
          class="flex flex-col gap-4"
        >
          <!-- 搜索字段 -->
          <div class="flex gap-4 flex-col md:flex-row">
            <UFormField
              v-for="field in formFields"
              :key="field.name"
              :name="field.name"
              :label="field.label"
              class="grid grid-cols-[auto_1fr] items-center gap-4 md:flex-1"
            >
              <template #label>
                <div class="flex items-center gap-2 w-24">
                  <UIcon
                    :name="field.icon"
                    class="size-5"
                  />
                  {{ field.label }}
                </div>
              </template>

              <USelect
                v-if="field.name === 'brand'"
                v-model="state[field.name]"
                :items="brandOptions"
                class="w-full"
              />
              <USelect
                v-else
                v-model="state[field.name]"
                :items="fuelTypeOptions"
                class="w-full"
              />
            </UFormField>
          </div>
        </UForm>
      </UCard>
    </div>

    <!-- 产品表格 -->
    <div class="mt-6">
      <ProductsTable
        :brand="state.brand"
        :fuel-type="state.fuelType"
        :default-column-visibility="{
          cylinder: false,
          speedGovernor: false,
          displacement: false,
          cons: false,
          emission: false,
        }"
      />
    </div>
  </div>
</template>
