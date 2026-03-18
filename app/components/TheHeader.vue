<script setup lang="ts">
  import { LANGUAGES } from '@/config/languages'
  import type { NavigationMenuItem } from '@nuxt/ui'
  import type { LocaleType } from '~/types/locale-type'

  import PinInputModal from './PinInputModal.vue'

  const route = useRoute()

  const overlay = useOverlay()

  const toast = useToast()

  // 添加验证码常量
  const CORRECT_PIN = ['1', '2', '3', '4']

  const { setAccess, checkAccess } = useAuth()

  // 处理员工访问权限
  const handleEmployeeAccess = async (e: Event) => {
    e.preventDefault()

    // 使用 checkAccess 方法替代直接检查状态
    if (checkAccess()) {
      await navigateTo(`/${locale.value}/support/employee`)
      return
    }

    // 没有权限，显示验证码弹窗
    const modal = overlay.create(PinInputModal, {
      props: {
        correctPin: CORRECT_PIN,
        onSuccess: async () => {
          setAccess(true)
          await navigateTo(`/${locale.value}/support/employee`)
        },
        onError: () => {
          toast.add({
            title: t('auth.verificationFailed'),
            color: 'error',
            icon: 'i-custom-alert',
          })
        },
      },
    })
    modal.open()
  }

  // 1. 语言相关逻辑
  const useLanguage = () => {
    const { locale, t } = useI18n()
    const value = ref(locale.value)
    const route = useRoute()

    // 语言选择器选项
    const items = computed(() => {
      return Object.entries(LANGUAGES).map(([code, lang]) => ({
        label:
          code === locale.value
            ? lang.native
            : `${LANGUAGES[locale.value as keyof typeof LANGUAGES]?.others[code] ?? code} (${lang.native})`,
        value: code,
      }))
    })

    // 语言选择器选项
    const handleLanguageChange = async (newValue: string) => {
      // 更新语言
      locale.value = newValue as LocaleType

      // 获取当前路由信息
      const currentPath = route.fullPath
      const currentLocale = route.path.split('/')[1]

      // 如果当前路径包含语言前缀，则替换它
      if (currentLocale && ['zh', 'en', 'ru', 'vi', 'ar', 'es'].includes(currentLocale)) {
        // 构建新路径，替换语言前缀
        const newPath = currentPath.replace(`/${currentLocale}`, `/${newValue}`)
        // 导航到新路径
        await navigateTo(newPath)
      } else {
        // 如果当前路径没有语言前缀（如首页 "/"），则添加新的语言前缀
        await navigateTo(`/${newValue}${currentPath === '/' ? '' : currentPath}`)
      }
    }

    return {
      locale,
      t,
      value,
      items,
      handleLanguageChange,
    }
  }

  // 2. 主题相关逻辑
  const useTheme = () => {
    const colorMode = useColorMode()
    const isDark = computed({
      get: () => colorMode.value === 'dark',
      set: () => (colorMode.preference = isDark.value ? 'light' : 'dark'),
    })

    return {
      isDark,
    }
  }

  // 3. 品牌与产品相关逻辑
  const useProducts = async () => {
    const { data: brands } = await useFetch('/api/brand')
    const hoveredCategory = ref('')

    // 过滤掉无效的品牌名称
    const dieselBrands = computed(
      () =>
        brands.value?.filter((brand) => brand?.name?.trim() && brand?.type?.includes('diesel')) ||
        [],
    )
    const gasBrands = computed(
      () =>
        brands.value?.filter((brand) => brand?.name?.trim() && brand?.type?.includes('gas')) || [],
    )

    const generateBrandMenuItem = (brandName: string, type: string = 'diesel') => ({
      label: t(`nav.products.items.${brandName}.label`),
      description: t(`nav.products.items.${brandName}.description`),
      icon: `i-custom-${brandName}`,
      to: `/${locale.value}/product?brand=${brandName}&type=${type}`,
      active: route.fullPath.includes(`/${locale.value}/product?brand=${brandName}`),
    })

    // 根据当前的 activeType 计算 activeCategory
    const activeCategory = computed(() => {
      if (activeType.value === 'diesel') return t('products.types.diesel')
      if (activeType.value === 'gas') return t('products.types.gas')
      return ''
    })

    // 将 filteredBrands 移入 useProducts
    const filteredBrands = computed(() => {
      const productsMenu = menuItems.value[2]?.children as NavigationMenuItem[]
      if (!productsMenu) return []
      // 优先使用 hover 的类别，如果没有 hover 则使用激活的类别
      const currentCategory = hoveredCategory.value || activeCategory.value
      if (!currentCategory) {
        return productsMenu[0]?.children || []
      }
      return productsMenu.find((cat) => cat.label === currentCategory)?.children || []
    })

    return {
      hoveredCategory,
      activeCategory,
      dieselBrands,
      gasBrands,
      generateBrandMenuItem,
      filteredBrands,
    }
  }

  // 4. 导航菜单相关逻辑
  const useNavigation = () => {
    const isOpen = ref(false)
    const activeItem = ref('')
    const activeType = ref('')
    const activeNavItem = ref('')

    watch(
      () => route.fullPath,
      (newPath) => {
        isOpen.value = false
        const brandMatch = newPath.match(/brand=([^&]+)/)
        const typeMatch = newPath.match(/type=([^&]+)/)
        activeItem.value = brandMatch ? (brandMatch[1] as string) : ''
        activeType.value = typeMatch ? (typeMatch[1] as string) : ''
      },
      { immediate: true },
    )

    const handleMenuChange = () => {
      hoveredCategory.value = ''
    }

    return {
      isOpen,
      activeItem,
      activeType,
      activeNavItem,
      handleMenuChange,
    }
  }

  // 使用组合式函数
  const { locale, t, value, items, handleLanguageChange } = useLanguage()
  const { isDark } = useTheme()
  const {
    hoveredCategory,
    activeCategory,
    dieselBrands,
    gasBrands,
    generateBrandMenuItem,
    filteredBrands,
  } = await useProducts()
  const { isOpen, activeItem, activeType, activeNavItem, handleMenuChange } = useNavigation()

  // 导航菜单配置
  const menuItems = computed(() => {
    return [
      {
        label: t('nav.home.title'),
        icon: 'i-custom-home',
        to: '/',
      },
      {
        label: t('nav.about.title'),
        icon: 'i-custom-about',
        to: `/${locale.value}/about`,
        children: [
          {
            label: t('nav.about.items.company.label'),
            description: t('nav.about.items.company.description'),
            icon: 'i-custom-building',
            to: `/${locale.value}/about/company`,
          },
          {
            label: t('nav.about.items.culture.label'),
            description: t('nav.about.items.culture.description'),
            icon: 'i-custom-target',
            to: `/${locale.value}/about/culture`,
          },
          {
            label: t('nav.about.items.why.label'),
            description: t('nav.about.items.why.description'),
            icon: 'i-custom-checkus',
            to: `/${locale.value}/about/why`,
          },
          {
            label: t('nav.about.items.honors.label'),
            description: t('nav.about.items.honors.description'),
            icon: 'i-custom-award',
            to: `/${locale.value}/about/honors`,
          },
          {
            label: t('nav.about.items.news.label'),
            description: t('nav.about.items.news.description'),
            icon: 'i-custom-news',
            to: `/${locale.value}/about/news`,
          },
          {
            label: t('nav.about.items.humanResource.label'),
            description: t('nav.about.items.humanResource.description'),
            icon: 'i-custom-users',
            to: `/${locale.value}/about/human-resource`,
          },
        ],
      },
      {
        label: t('nav.products.title'),
        icon: 'i-custom-installing',
        to: `/${locale.value}/generators`,
        slot: 'products',
        children: [
          {
            label: t('products.types.diesel'),
            description: t('nav.products.items.diesel.description'),
            icon: 'i-custom-fuel',
            children:
              dieselBrands.value
                ?.filter((brand) => brand?.name?.trim())
                .map((brand) => generateBrandMenuItem(brand.name, 'diesel'))
                .filter(Boolean) || [],
          },
          {
            label: t('products.types.gas'),
            description: t('nav.products.items.gas.description'),
            icon: 'i-custom-flame',
            children:
              gasBrands.value
                ?.filter((brand) => brand?.name?.trim())
                .map((brand) => generateBrandMenuItem(brand.name, 'gas'))
                .filter(Boolean) || [],
          },
        ],
      },
      {
        label: t('nav.solution.title'),
        icon: 'i-custom-cloud-pak-integration',
        children: [
          {
            label: t('nav.solution.items.container.label'),
            description: t('nav.solution.items.container.description'),
            icon: 'i-custom-box',
          },
          {
            label: t('nav.solution.items.open.label'),
            description: t('nav.solution.items.open.description'),
            icon: 'i-custom-base',
          },
          {
            label: t('nav.solution.items.canopy.label'),
            description: t('nav.solution.items.canopy.description'),
            icon: 'i-custom-canopy',
            to: `/${locale.value}/solution/canopy`,
          },
          {
            label: t('nav.solution.items.mobile.label'),
            description: t('nav.solution.items.mobile.description'),
            icon: 'i-custom-mobile',
          },
          {
            label: t('nav.solution.items.ship.label'),
            description: t('nav.solution.items.ship.description'),
            icon: 'i-custom-ship',
            to: `/${locale.value}/solution/ship`,
          },
          {
            label: t('nav.solution.items.tower.label'),
            description: t('nav.solution.items.tower.description'),
            icon: 'i-custom-tower',
          },
          {
            label: t('nav.solution.items.powerCart.label'),
            description: t('nav.solution.items.powerCart.description'),
            icon: 'i-custom-power-cart',
          },
        ],
      },
      {
        label: t('nav.videoCenter.title'),
        icon: 'i-custom-video',
        to: `/${locale.value}/video`,
      },
      {
        label: t('nav.support.title'),
        icon: 'i-custom-support',
        children: [
          {
            label: t('nav.support.items.public.label'),
            description: t('nav.support.items.public.description'),
            icon: 'i-custom-download',
          },
          {
            label: t('nav.support.items.employee.label'),
            description: t('nav.support.items.employee.description'),
            icon: 'i-custom-lock',
            onSelect: handleEmployeeAccess,
          },
          {
            label: t('nav.support.items.faq.label'),
            description: t('nav.support.items.faq.description'),
            icon: 'i-custom-help',
            to: `/${locale.value}/support/faq`,
          },
        ],
      },
      {
        label: t('nav.contact.title'),
        icon: 'i-custom-contact',
        to: `/${locale.value}/contact`,
      },
    ]
  })
</script>

<template>
  <header
    class="sticky top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20 dark:border-black/20"
    :class="['h-[clamp(4rem,6vh,6rem)]']"
  >
    <nav class="w-full h-full mx-auto px-[clamp(1rem,2vw,2rem)] flex items-center justify-between">
      <NuxtLink
        to="/"
        class="flex items-center shrink-0 h-full"
      >
        <img
          src="/images/logo.svg"
          alt="GoodWind Logo"
          class="object-contain h-full max-h-[80%] w-auto md:max-w-[180px] sm:max-w-[140px] max-w-[120px]"
          loading="eager"
          decoding="async"
          style="
            transform: translateZ(0);
            will-change: transform;
            -webkit-font-smoothing: antialiased;
          "
        />
      </NuxtLink>

      <!-- 桌面端导航菜单 -->
      <UNavigationMenu
        v-model="activeNavItem"
        :items="menuItems"
        variant="link"
        orientation="horizontal"
        content-orientation="horizontal"
        class="hidden min-[1280px]:flex items-center gap-[clamp(0.5rem,1.5vw,1.5rem)] flex-1 justify-start px-[clamp(0.5rem,2vw,1.5rem)]"
        :ui="{
          list: 'flex items-center gap-1',
          item: 'text-[clamp(0.875rem,1.2vw,1.125rem)]',
          link: 'gap-[0.35em] flex items-center text-primary dark:text-primary',
          linkLeadingIcon: 'text-[1em] text-primary dark:text-primary',
          linkTrailingIcon: 'ms-auto text-[1em]',
          viewport:
            'fixed overflow-hidden bg-white dark:bg-gray-900 rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow-lg w-[min(calc(100vw-4rem),80rem)]',
          content: 'w-full',
          viewportWrapper: 'absolute top-full left-0 w-full flex justify-start',
          childLinkIcon: 'flex-[0_0_2rem] min-h-[2rem] flex items-center justify-center',
        }"
        @update:model-value="handleMenuChange"
      >
        <template #products-content="{ item }">
          <div class="flex gap-4 p-4">
            <div class="w-1/4 border-r border-gray-200 dark:border-gray-800 pr-4">
              <div class="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">{{
                $t('home.search.fields.fuelType.label')
              }}</div>
              <ul class="space-y-2">
                <li
                  v-for="category in item.children"
                  :key="category.label"
                  class="hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-2 h-18"
                  :class="{
                    'text-primary-700 dark:text-primary-200':
                      activeCategory === category.label ||
                      (category.label === t('products.types.diesel') && activeType === 'diesel') ||
                      (category.label === t('products.types.gas') && activeType === 'gas'),
                  }"
                  @mouseenter="hoveredCategory = category.label"
                >
                  <div class="flex items-center gap-2 h-full">
                    <UIcon
                      :name="category.icon"
                      class="text-2xl w-8 h-8"
                      :class="{
                        'text-primary-700 dark:text-primary-200':
                          activeCategory === category.label ||
                          (category.label === t('products.types.diesel') &&
                            activeType === 'diesel') ||
                          (category.label === t('products.types.gas') && activeType === 'gas'),
                      }"
                    />
                    <span class="font-medium">{{ category.label }}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="w-3/4">
              <div class="font-medium mb-2 text-sm text-gray-500 dark:text-gray-400">品牌列表</div>
              <div class="grid grid-cols-2 gap-3">
                <ULink
                  v-for="brand in filteredBrands"
                  :key="brand.label"
                  :to="brand.to"
                  :active="
                    activeItem === (brand?.to as string)?.split('brand=')[1]?.split('&')[0] &&
                    activeType === (brand?.to as string)?.split('type=')[1]
                  "
                  class="group w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-start gap-2 rounded-lg"
                  @click="activeNavItem = ''"
                >
                  <div class="flex items-center gap-2 w-full">
                    <UIcon
                      :name="brand.icon!"
                      class="flex-[0_0_2rem] min-h-[2rem] flex items-center justify-center text-[clamp(0.875rem,1.1vw,1.125rem)]"
                    />
                    <div class="flex-1">
                      <p class="font-medium">{{ brand.label }}</p>
                      <p class="text-sm line-clamp-2">
                        {{ brand.description }}
                      </p>
                    </div>
                  </div>
                </ULink>
              </div>
            </div>
          </div>
        </template>
      </UNavigationMenu>

      <div class="flex items-center gap-[clamp(0.5rem,1vw,1rem)] shrink-0">
        <!-- 主题切换按钮 -->
        <ClientOnly>
          <UButton
            :icon="isDark ? 'i-custom-moon' : 'i-custom-sun'"
            color="neutral"
            variant="link"
            class="text-[clamp(1rem,1.25vw,1.25rem)]"
            @click="isDark = !isDark"
          />
        </ClientOnly>

        <!-- 语言选择器 -->
        <ClientOnly>
          <USelect
            v-model="value"
            :items="items"
            class="w-fit min-w-[10.5rem]"
            :ui="{
              base: 'h-8',
              value: 'text-sm whitespace-nowrap',
              item: 'text-sm whitespace-nowrap',
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            size="sm"
            @update:model-value="handleLanguageChange"
          />
        </ClientOnly>

        <!-- 移动端菜单 -->
        <USlideover
          v-model:open="isOpen"
          :title="t('site.title')"
          :ui="{
            header: 'text-[clamp(0.875rem,1.1vw,1.125rem)]',
            overlay: 'backdrop-blur-sm',
            content: 'right-0 inset-y-0 w-full max-w-full',
          }"
        >
          <UButton
            class="min-[1280px]:hidden text-[clamp(1.25rem,1.5vw,1.5rem)]"
            icon="i-custom-menu"
            color="primary"
            variant="link"
            @click="isOpen = true"
          />

          <template #body>
            <UNavigationMenu
              variant="link"
              orientation="vertical"
              :items="menuItems"
              class="w-full h-full"
              :ui="{
                childList: 'w-full',
                childLink:
                  'group w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-start gap-2',
                childLinkLabel: 'font-medium text-[1rem]',
                childLinkDescription: 'text-sm text-gray-500 dark:text-gray-400 line-clamp-2',
                childLinkIcon:
                  'flex-[0_0_2rem] min-h-[2rem] min-w-[2rem] flex items-center justify-center shrink-0',
                link: 'group w-full px-4 py-2 text-[clamp(1rem,1.2vw,1.25rem)] hover:bg-gray-100 dark:hover:bg-gray-800 gap-[0.35em] text-primary dark:text-primary',
                linkLabel: 'font-medium text-primary dark:text-primary',
                linkLeadingIcon: 'text-[1em] flex-[0_0_2rem] text-primary dark:text-primary',
                linkTrailingIcon: 'ms-auto',
              }"
            />
          </template>
        </USlideover>
      </div>
    </nav>
  </header>
</template>
