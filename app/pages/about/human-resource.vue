<script setup lang="ts">
  const { t } = useI18n()

  // 模拟职位数据
  const jobPositions = ref([
    {
      id: 1,
      title: '销售经理',
      department: '销售部',
      location: '上海',
      type: '全职',
      experience: '3-5年',
    },
    {
      id: 2,
      title: '机械工程师',
      department: '研发部',
      location: '北京',
      type: '全职',
      experience: '5-7年',
    },
    {
      id: 3,
      title: '电气工程师',
      department: '研发部',
      location: '广州',
      type: '全职',
      experience: '3-5年',
    },
    {
      id: 4,
      title: '市场专员',
      department: '市场部',
      location: '上海',
      type: '全职',
      experience: '1-3年',
    },
  ])
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <div class="bg-gray-100 dark:bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4">{{ t('nav.about.items.humanResource.label') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('nav.about.items.humanResource.description') }}
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-custom-users"
            class="text-2xl text-primary-600 dark:text-primary-400"
          />
          <h2 class="text-2xl font-bold">{{ t('nav.about.items.humanResource.label') }}</h2>
        </div>

        <!-- 公司文化与人才理念 -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4">人才理念</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t('about.humanResource.content') }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-3">
                <UIcon
                  name="i-custom-users"
                  class="text-xl text-primary-500"
                />
                <h4 class="font-medium">人才第一</h4>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                我们视人才为企业最宝贵的资源，致力于为员工创造良好的工作环境和发展空间。
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-3">
                <UIcon
                  name="i-custom-graduation-cap"
                  class="text-xl text-primary-500"
                />
                <h4 class="font-medium">持续学习</h4>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                我们鼓励员工不断学习和提升自己，提供各种培训和发展机会。
              </p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div class="flex items-center gap-2 mb-3">
                <UIcon
                  name="i-custom-heart-handshake"
                  class="text-xl text-primary-500"
                />
                <h4 class="font-medium">共同成长</h4>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                员工的成长与公司的发展相辅相成，我们追求员工与企业的共同进步。
              </p>
            </div>
          </div>
        </div>

        <!-- 职位列表 -->
        <div>
          <h3 class="text-xl font-semibold mb-4">招聘职位</h3>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    职位名称
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    部门
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    工作地点
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    工作类型
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    经验要求
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800"
              >
                <tr
                  v-for="job in jobPositions"
                  :key="job.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{
                      job.title
                    }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ job.department }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ job.location }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ job.type }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ job.experience }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <UButton
                      color="primary"
                      variant="soft"
                      size="xs"
                    >
                      申请职位
                    </UButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 text-center">
            <UButton
              color="primary"
              icon="i-custom-mail"
              trailing
            >
              发送简历至 hr@goodwind.com
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .about-page {
    min-height: calc(100vh - var(--header-height, 5rem));
  }
</style>
