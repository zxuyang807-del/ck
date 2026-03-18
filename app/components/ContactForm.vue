<template>
  <div :class="['w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md']">
    <UForm
      ref="form"
      :schema="schema"
      :state="formState"
      :class="['w-full', layout === 'horizontal' ? 'space-y-6' : 'space-y-6']"
      @submit="onSubmit"
    >
      <div
        :class="['w-full', layout === 'horizontal' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : '']"
      >
        <UFormField
          :label="t('contact.form.name')"
          name="name"
          class="flex flex-col w-full"
        >
          <template #label>
            <span class="mb-2 font-medium">{{ t('contact.form.name') }}</span>
          </template>
          <UInput
            v-model="formState.name"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('contact.form.email')"
          name="email"
          class="flex flex-col w-full"
        >
          <template #label>
            <span class="mb-2 font-medium">{{ t('contact.form.email') }}</span>
          </template>
          <UInput
            v-model="formState.email"
            type="email"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('contact.form.region')"
          name="region"
          class="flex flex-col w-full"
        >
          <template #label>
            <span class="mb-2 font-medium">{{ t('contact.form.region') }}</span>
          </template>
          <UInput
            v-model="formState.region"
            :placeholder="t('contact.form.regionPlaceholder')"
            class="w-full"
          />
        </UFormField>
      </div>

      <UFormField
        :label="t('contact.form.message')"
        name="message"
        class="flex flex-col w-full"
      >
        <template #label>
          <span class="mb-2 font-medium">{{ t('contact.form.message') }}</span>
        </template>
        <UTextarea
          v-model="formState.message"
          :rows="5"
          class="w-full"
        />
      </UFormField>

      <div class="flex justify-center pt-6">
        <UButton
          type="submit"
          class="w-full md:w-auto px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center"
          :loading="formStatus === 'loading'"
          color="primary"
          size="lg"
        >
          <span class="flex items-center justify-center gap-2">
            <UIcon
              name="i-custom-send"
              class="w-5 h-5"
            />
            {{ t('contact.form.submit') }}
          </span>
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import { useI18n } from 'vue-i18n'
  import { z } from 'zod'

  defineProps<{
    layout?: 'vertical' | 'horizontal'
  }>()

  const { t, locale } = useI18n()
  const toast = useToast()

  interface Web3FormsResponse {
    message: string
    status: number
  }

  interface FormState {
    access_key: string
    subject: string
    name: string
    email: string
    region: string
    message: string
  }

  // 创建验证模式
  const createSchema = () =>
    z.object({
      name: z.string().min(2, t('contact.validation.nameMin')),
      email: z.string().email(t('contact.validation.emailInvalid')),
      region: z.string().min(1, t('contact.validation.regionRequired')),
      message: z.string().min(10, t('contact.validation.messageMin')),
      subject: z.string().min(1, t('contact.validation.subjectRequired')),
      access_key: z.string().min(1, t('contact.validation.accessKeyRequired')),
    })

  // 初始验证模式
  const schema = ref(createSchema())

  // 监听语言变化，更新验证模式
  watch(locale, () => {
    schema.value = createSchema()
  })

  type Schema = z.infer<ReturnType<typeof createSchema>>

  const formState = reactive<FormState>({
    access_key: '7593df13-0c7e-4097-a8b2-325414871359', // 请替换为您的 Web3Forms 访问密钥
    subject: 'New Contact Form Submission',
    name: '',
    email: '',
    region: '',
    message: '',
  })

  const formResult = ref('')
  const formStatus = ref('')
  const form = ref()

  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    try {
      formStatus.value = 'loading'
      formResult.value = t('contact.submitting')

      await $fetch<Web3FormsResponse>('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formState,
      })

      // 重置表单（提前重置，避免影响后续的状态显示）
      formState.name = ''
      formState.email = ''
      formState.region = ''
      formState.message = ''

      // 根据响应更新状态和显示提示
      formStatus.value = 'success' // 直接设置为成功，因为如果到这里说明请求已经成功了
      toast.add({
        title: t('contact.success'),
        color: 'success',
        icon: 'i-custom-check',
      })
    } catch (error) {
      console.error(error)
      formStatus.value = 'error'
      toast.add({
        title: t('contact.error'),
        color: 'error',
        icon: 'i-custom-x',
      })
    } finally {
      // 延迟清除状态
      setTimeout(() => {
        formResult.value = ''
        formStatus.value = ''
      }, 5000)
    }
  }
</script>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

  /* 当按钮处于加载状态时，显示等待光标 */
  .cursor-pointer:disabled {
    cursor: wait;
  }
</style>
