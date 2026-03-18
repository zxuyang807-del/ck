<script setup lang="ts">
  const { t, locale } = useI18n()

  // console.log(locale.value)

  // 底部链接组，直接在组件内部定义
  const footerLinks = computed(() => [
    {
      title: t('nav.about.title'),
      links: [
        {
          label: t('nav.about.items.company.label'),
          to: `/${locale.value}/about/company`,
        },
        {
          label: t('nav.about.items.culture.label'),
          to: `/${locale.value}/about/culture`,
        },
        {
          label: t('nav.about.items.why.label'),
          to: `/${locale.value}/about/why`,
        },
        {
          label: t('nav.about.items.honors.label'),
          to: `/${locale.value}/about/honors`,
        },
        {
          label: t('nav.about.items.news.label'),
          to: `/${locale.value}/about/news`,
        },
        {
          label: t('nav.about.items.humanResource.label'),
          to: `/${locale.value}/about/human-resource`,
        },
      ],
    },
    {
      title: t('nav.products.title'),
      links: [
        {
          label: t('nav.products.items.cummins.label'),
          to: `/${locale.value}/product?brand=cummins&type=diesel`,
        },
        {
          label: t('nav.products.items.perkins.label'),
          to: `/${locale.value}/product?brand=perkins&type=diesel`,
        },
        {
          label: t('nav.products.items.mtu.label'),
          to: `/${locale.value}/product?brand=mtu&type=diesel`,
        },
        {
          label: t('nav.products.items.volvo.label'),
          to: `/${locale.value}/product?brand=volvo&type=diesel`,
        },
        {
          label: t('nav.products.items.baudouin.label'),
          to: `/${locale.value}/product?brand=baudouin&type=diesel`,
        },
        {
          label: t('nav.products.items.weichai.label'),
          to: `/${locale.value}/product?brand=weichai&type=diesel`,
        },
        {
          label: t('nav.products.items.yuchai.label'),
          to: `/${locale.value}/product?brand=yuchai&type=diesel`,
        },
        {
          label: t('nav.products.items.hyundai.label'),
          to: `/${locale.value}/product?brand=hyundai&type=diesel`,
        },
        {
          label: t('nav.products.items.mitsubishi.label'),
          to: `/${locale.value}/product?brand=mitsubishi&type=diesel`,
        },
        {
          label: t('nav.products.items.sdec.label'),
          to: `/${locale.value}/product?brand=sdec&type=diesel`,
        },
        {
          label: t('nav.products.items.isuzu.label'),
          to: `/${locale.value}/product?brand=isuzu&type=diesel`,
        },
        {
          label: t('nav.products.items.yangdong.label'),
          to: `/${locale.value}/product?brand=yangdong&type=diesel`,
        },
        {
          label: t('nav.products.items.zichai.label'),
          to: `/${locale.value}/product?brand=zichai&type=diesel`,
        },
        {
          label: t('nav.products.items.googol.label'),
          to: `/${locale.value}/product?brand=googol&type=diesel`,
        },
      ],
    },
    {
      title: t('nav.solution.title'),
      links: [
        {
          label: t('nav.solution.items.container.label'),
          // to: `/${locale.value}/solution/container`,
        },
        {
          label: t('nav.solution.items.open.label'),
          // to: `/${locale.value}/solution/open`,
        },
        {
          label: t('nav.solution.items.canopy.label'),
          to: `/${locale.value}/solution/canopy`,
        },
        {
          label: t('nav.solution.items.mobile.label'),
          // to: `/${locale.value}/solution/mobile`,
        },
        {
          label: t('nav.solution.items.ship.label'),
          to: `/${locale.value}/solution/ship`,
        },
        {
          label: t('nav.solution.items.tower.label'),
          // to: `/${locale.value}/solution/tower`,
        },
        {
          label: t('nav.solution.items.powerCart.label'),
          // to: `/${locale.value}/solution/powerCart`,
        },
      ],
    },
    {
      title: t('nav.support.title'),
      links: [
        {
          label: t('nav.support.items.public.label'),
          // to: `/${locale.value}/support/public`,
        },
        {
          label: t('nav.support.items.employee.label'),
          to: `/${locale.value}/support/employee`,
        },
        {
          label: t('nav.support.items.faq.label'),
          to: `/${locale.value}/support/faq`,
        },
      ],
    },
  ])
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-[var(--main-padding-x)] py-[var(--main-padding-y)] m-8"
  >
    <div
      v-for="group in footerLinks"
      :key="group.title"
      class="flex flex-col gap-4 text-center sm:text-left"
    >
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
        {{ group.title }}
      </h3>
      <ul class="flex flex-col gap-2">
        <li
          v-for="link in group.links"
          :key="link.label"
        >
          <ULink
            :to="link.to"
            class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {{ link.label }}
          </ULink>
        </li>
      </ul>
    </div>
  </div>
</template>
