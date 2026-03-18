<template>
  <UPage>
    <!-- 1. Hero Section -->
    <UPageHero
      :title="t('generators.hero.title')"
      :description="t('generators.hero.description')"
      :links="heroLinks"
    />

    <!-- 2. Product Categories -->
    <UPageSection>
      <div class="space-y-12">
        <div
          v-for="category in productCategories"
          :key="category.id"
          class="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center"
        >
          <!-- Left: media -->
          <div class="w-full aspect-video bg-muted rounded-xl overflow-hidden relative">
            <img 
              v-if="category.id === 'diesel'"
              src="/images/product/diesel-generator-set.webp" 
              alt="柴油发电机组"
              class="w-full h-full object-cover"
            />
            <img 
              v-else-if="category.id === 'gas'"
              src="/images/product/gas-generator-set.webp" 
              alt="燃气发电机组"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-sm opacity-60 absolute inset-0 flex items-center justify-center">
              {{ category.mediaPlaceholder }}
            </span>
          </div>

          <!-- Right: content -->
          <div class="space-y-4">
            <h2 class="text-2xl font-semibold text-pretty">
              {{ category.title }}
            </h2>
            <p class="text-sm text-muted-foreground">
              {{ category.description }}
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li
                v-for="point in category.points"
                :key="point"
              >
                {{ point }}
              </li>
            </ul>
            <UButton
              :to="category.ctaTo"
              size="sm"
            >
              {{ category.ctaLabel }}
            </UButton>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- 3. Brand Cards -->
    <UPageSection>
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-2xl font-semibold text-pretty">
          {{ t('generators.brands.sectionTitle') }}
        </h2>
        <p class="text-sm text-muted-foreground">
          {{ t('generators.brands.sectionDescription') }}
        </p>
      </div>

      <UPageGrid
        :cols="{ base: 1, sm: 2, md: 3, lg: 4 }"
        class="mt-6 gap-4"
      >
        <NuxtLink
          v-for="brand in brands"
          :key="brand.name"
          :to="resolveBrandLink(brand)"
          class="h-full"
        >
          <UCard
            class="h-full flex flex-col hover:border-primary transition-colors
              bg-white dark:bg-gray-800
              border-gray-200 dark:border-gray-700
              rounded-lg overflow-hidden"
          >
            <!-- 图片部分 -->
            <div class="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              <img 
                :src="`/images/product/product-${brand.slug}.webp`" 
                :alt="brand.name" 
                class="w-full h-full object-cover"
                @error="const img = $event.target as HTMLImageElement; if (img && img.parentElement) img.parentElement.innerHTML = brand.name.charAt(0).toUpperCase()"
              />
            </div>
            <!-- 内容部分 -->
            <div class="p-4 flex flex-col flex-grow justify-center">
              <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {{ brand.name }}
              </h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ brand.description }}
              </p>
            </div>
          </UCard>
        </NuxtLink>
      </UPageGrid>
    </UPageSection>

    <!-- 4. Solution Cards -->
    <UPageSection>
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-2xl font-semibold text-pretty">
          {{ t('generators.solutions.sectionTitle') }}
        </h2>
        <p class="text-sm text-muted-foreground">
          {{ t('generators.solutions.sectionDescription') }}
        </p>
      </div>

      <UPageGrid
        :cols="{ base: 1, sm: 2, md: 3 }"
        class="mt-6 gap-4"
      >
        <UCard
          v-for="solution in solutions"
          :key="solution.name"
          class="h-full flex flex-col"
        >
          <template #header>
            <p class="font-semibold">
              {{ solution.name }}
            </p>
          </template>
          <p class="text-sm text-muted-foreground">
            {{ solution.description }}
          </p>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- 5. Full-width CTA -->
    <UPageSection>
      <div
        class="bg-primary text-primary-foreground rounded-2xl py-10 px-6 md:px-12 text-center space-y-4"
      >
        <h2 class="text-2xl md:text-3xl font-semibold text-pretty text-white dark:text-black">
          {{ t('generators.cta.title') }}
        </h2>
        <p class="text-sm md:text-base max-w-2xl mx-auto text-white/90 dark:text-black/80">
          {{ t('generators.cta.description') }}
        </p>
        <UButton
          variant="soft"
          class="text-white! dark:text-black! bg-white/10! dark:bg-black/10! hover:bg-white/20! dark:hover:bg-black/20! border-white/30! dark:border-black/30!"
          size="lg"
          to="#contact"
        >
          {{ t('generators.cta.button') }}
        </UButton>
      </div>
    </UPageSection>

    <!-- 6. Key Selling Points -->
    <UPageSection>
      <h2 class="text-2xl font-semibold mb-6 text-pretty">
        {{ t('generators.sellingPoints.title') }}
      </h2>

      <!-- 6.1 High-level selling points -->
      <UPageGrid
        :cols="{ base: 1, md: 2 }"
        class="gap-4 mb-10"
      >
        <UCard
          v-for="point in sellingPoints"
          :key="point.title"
          class="h-full flex flex-col"
        >
          <template #header>
            <p class="font-semibold">
              {{ point.title }}
            </p>
          </template>
          <p class="text-sm text-muted-foreground mb-2">
            {{ point.description }}
          </p>
          <ul
            v-if="point.bullets?.length"
            class="list-disc list-inside space-y-1 text-xs text-muted-foreground"
          >
            <li
              v-for="b in point.bullets"
              :key="b"
            >
              {{ b }}
            </li>
          </ul>
        </UCard>
      </UPageGrid>

      <!-- 6.2 Technical modules -->
      <h3 class="text-xl font-semibold mb-4 text-pretty">
        {{ t('generators.technicalModules.title') }}
      </h3>
      <UPageGrid
        :cols="{ base: 1, md: 2 }"
        class="gap-4"
      >
        <UCard
          v-for="module in technicalModules"
          :key="module.title"
          class="h-full flex flex-col"
        >
          <template #header>
            <p class="font-semibold">
              {{ module.title }}
            </p>
          </template>
          <p class="text-sm text-muted-foreground mb-2">
            {{ module.description }}
          </p>
          <ul
            v-if="module.bullets?.length"
            class="list-disc list-inside space-y-1 text-xs text-muted-foreground"
          >
            <li
              v-for="b in module.bullets"
              :key="b"
            >
              {{ b }}
            </li>
          </ul>
        </UCard>
      </UPageGrid>
    </UPageSection>

    <!-- 7. FAQ -->
    <UPageSection>
      <h2 class="text-2xl font-semibold mb-4 text-pretty">{{ t('generators.faq.title') }}</h2>
      <UTabs
        v-model="faqActive"
        :items="faqTabs"
        :content="false"
        class="mt-2"
      />
      <div class="mt-4">
        <UAccordion
          :items="faqActive === 'general' ? faqGeneral : faqProcurement"
          variant="soft"
        />
      </div>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
  const { locale, t } = useI18n()
  const route = useRoute()

  const heroLinks = computed(() => [
    { label: t('generators.hero.getQuote'), to: '#contact', variant: 'solid' as const },
    { label: t('generators.hero.downloadBrochure'), to: '#brochure', variant: 'ghost' as const },
  ])

  const pageTitle = computed(() => `${t('generators.hero.title')} | Goodwind`)
  const pageDescription = computed(() => t('generators.hero.description'))
  // SEO 元数据配置（随语言切换）
  useHead({
    title: pageTitle,
    meta: [
      { name: 'description', content: pageDescription },
      {
        name: 'keywords',
        content:
          'diesel generator sets, gas generator sets, industrial generators, marine generators, Cummins generators, Perkins generators, MTU generators, Volvo generators, 10kVA to 4125kVA generators',
      },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: `https://goodwindpower.com${route.path}`,
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'twitter:title', content: pageTitle },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://goodwindpower.com${route.path}`,
      },
    ],
  })

  const productCategories = computed(() => [
    {
      id: 'diesel',
      title: t('generators.productCategories.diesel.title'),
      description: t('generators.productCategories.diesel.description'),
      points: [
        t('generators.productCategories.diesel.points.0'),
        t('generators.productCategories.diesel.points.1'),
        t('generators.productCategories.diesel.points.2'),
      ],
      mediaPlaceholder: t('generators.productCategories.diesel.mediaPlaceholder'),
      ctaLabel: t('generators.productCategories.diesel.ctaLabel'),
      ctaTo: '#contact',
    },
    {
      id: 'gas',
      title: t('generators.productCategories.gas.title'),
      description: t('generators.productCategories.gas.description'),
      points: [
        t('generators.productCategories.gas.points.0'),
        t('generators.productCategories.gas.points.1'),
        t('generators.productCategories.gas.points.2'),
      ],
      mediaPlaceholder: t('generators.productCategories.gas.mediaPlaceholder'),
      ctaLabel: t('generators.productCategories.gas.ctaLabel'),
      ctaTo: '#contact',
    },
  ])

  const brandSlugs = [
    'cummins',
    'perkins',
    'mtu',
    'volvo',
    'baudouin',
    'weichai',
    'yuchai',
    'hyundai',
    'mitsubishi',
    'sdec',
    'isuzu',
    'yangdong',
    'zichai',
    'googol',
  ]
  const brandTypes: Record<string, string[]> = {
    cummins: ['diesel', 'gas'],
    perkins: ['diesel'],
    mtu: ['diesel'],
    volvo: ['diesel'],
    baudouin: ['diesel', 'gas'],
    weichai: ['diesel', 'gas'],
    yuchai: ['diesel', 'gas'],
    hyundai: ['diesel'],
    mitsubishi: ['diesel'],
    sdec: ['diesel'],
    isuzu: ['diesel'],
    yangdong: ['diesel'],
    zichai: ['diesel', 'ship'],
    googol: ['diesel'],
  }
  const brands = computed(() =>
    brandSlugs
      .filter(slug => slug !== 'mtu' && slug !== 'isuzu') // 过滤掉MTU和五十铃品牌
      .map((slug) => ({
        name: t(`generators.brands.list.${slug}.name`),
        slug,
        types: brandTypes[slug],
        description: t(`generators.brands.list.${slug}.description`),
      })),
  )

  const resolveBrandLink = (brand: { slug: string; types?: string[] }) => {
    const preferredTypes = brand.types || []
    const type = preferredTypes.includes('diesel')
      ? 'diesel'
      : preferredTypes.includes('gas')
        ? 'gas'
        : preferredTypes[0] || 'diesel'
    return `/${locale.value}/product?brand=${brand.slug}&type=${type}`
  }

  const solutionKeys = ['open', 'container', 'canopy', 'mobile', 'marine', 'lightingTower'] as const
  const solutions = computed(() =>
    solutionKeys.map((key) => ({
      name: t(`generators.solutions.${key}.name`),
      description: t(`generators.solutions.${key}.description`),
    })),
  )

  const sellingPointKeys = ['diverse', 'applications', 'powerRange', 'flexible'] as const
  const sellingPoints = computed(() =>
    sellingPointKeys.map((key) => {
      const base = `generators.sellingPoints.${key}`
      const bullets = key === 'applications' ? [] : [t(`${base}.bullets.0`), t(`${base}.bullets.1`)]
      return {
        title: t(`${base}.title`),
        description: t(`${base}.description`),
        bullets,
      }
    }),
  )

  const technicalModuleKeys = ['engine', 'alternator', 'control', 'cooling'] as const
  const technicalModules = computed(() =>
    technicalModuleKeys.map((key) => {
      const base = `generators.technicalModules.${key}`
      const bullets = key === 'engine' ? [] : [t(`${base}.bullets.0`), t(`${base}.bullets.1`)]
      return {
        title: t(`${base}.title`),
        description: t(`${base}.description`),
        bullets,
      }
    }),
  )

  const faqTabs = computed(() => [
    { id: 'general', value: 'general', label: t('generators.faq.tabs.general') },
    { id: 'procurement', value: 'procurement', label: t('generators.faq.tabs.procurement') },
  ])

  const faqActive = ref('general')

  const faqGeneral = computed(() =>
    [0, 1, 2, 3].map((i) => ({
      label: t(`generators.faq.general.${i}.label`),
      content: t(`generators.faq.general.${i}.content`),
    })),
  )

  const faqProcurement = computed(() =>
    [0, 1, 2, 3, 4, 5].map((i) => ({
      label: t(`generators.faq.procurement.${i}.label`),
      content: t(`generators.faq.procurement.${i}.content`),
    })),
  )

  useSchemaOrg(
    computed(() => [
      {
        '@type': 'WebPage',
        '@id': `https://goodwindpower.com${route.path}#webpage`,
        url: `https://goodwindpower.com${route.path}`,
        name: t('generators.hero.title'),
        description: pageDescription.value,
        inLanguage: locale.value,
        isPartOf: {
          '@id': 'https://goodwindpower.com/#website',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `https://goodwindpower.com${route.path}#brands`,
        name: t('generators.brands.sectionTitle'),
        itemListElement: brands.value.map(
          (brand: { name: string; description: string }, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Brand',
              name: brand.name,
              description: brand.description,
            },
          }),
        ),
      },
      {
        '@type': 'FAQPage',
        '@id': `https://goodwindpower.com${route.path}#faq`,
        mainEntity: [
          ...faqGeneral.value.map((faq: { label: string; content: string }) => ({
            '@type': 'Question',
            name: faq.label,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.content,
            },
          })),
          ...faqProcurement.value.map((faq: { label: string; content: string }) => ({
            '@type': 'Question',
            name: faq.label,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.content,
            },
          })),
        ],
      },
    ]),
  )
</script>
