export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  toaster: {
    position: 'top-center' as const,
    duration: 2000,
  },
  ui: {
    icons: {
      // 仅覆盖当前需要的箭头图标
      arrowLeft: 'i-custom-arrow-left',
      arrowRight: 'i-custom-arrow-right',
      check: 'i-custom-check',
    },
    colors: {
      primary: 'orange',
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
    },
  },
})
