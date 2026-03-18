<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 标题部分 -->
    <h1 class="text-3xl font-bold mb-6 text-center md:text-left">超紧凑型解决方案</h1>

    <!-- 主要内容区域 -->
    <div class="flex flex-col md:flex-row gap-8 mb-36">
      <!-- 左侧文本描述 -->
      <div class="md:w-1/2">
        <p class="text-base mb-4">
          超紧凑型凭借其技术优势、环保特性和运输便利性，成为现代电力供应的优选方案。"静音"、"紧凑"和"经便"，这并非是对传统发电机组的常见描述。
        </p>
        <p class="text-base mb-4">
          但是，我们的全新超紧凑型发电机组体积小、重量轻，便于运输和安装。例如，GOODWIND的GW-YD30型号可在40英尺集装箱中装载24台，高效的运输设计减少了运输成本和运输过程产生的能源消耗及排放。优化的紧凑设计便其适合在海外仓库大量存放和便于安装。
        </p>
        <p class="text-base mb-4">
          新型超紧凑发电机组采用先进的燃烧技术，提高了燃油效益，降低油耗的同时仍可保证高效的电源效率而不影响性能，确保稳定的电力输出。超静音箱体通过优化设计，降低了发动机的噪音和震动，使其运行更加平稳静。这得益于先进的自动电压调节器（AVR）和发动机转速控制。
        </p>
      </div>

      <!-- 右侧图片展示 -->
      <div class="md:w-1/2">
        <NuxtImg
          src="/images/solution/canopy/canopy-compact-01.webp"
          alt="超紧凑型发电机组"
          class="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>

    <!-- 紧凑型设计24台机组 -->
    <div class="mb-36">
      <h2 class="text-xl font-semibold mb-4"
        >紧凑型设计，针对海外运输而优化（可在40英尺高柜集装箱中装载24台机组）</h2
      >
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <NuxtImg
            src="/images/solution/canopy/canopy-compact-02.webp"
            alt="24台机组集装箱正视图"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div class="flex-1">
          <NuxtImg
            src="/images/solution/canopy/canopy-compact-03.webp"
            alt="24台机组集装箱侧视图"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
      <p class="text-sm mt-2 text-gray-600">20KW /30KW : 24 Units *</p>
    </div>

    <!-- 紧凑型设计16台机组 -->
    <div class="mb-12">
      <h2 class="text-xl font-semibold mb-4"
        >紧凑型设计，针对海外运输而优化（可在40英尺高柜集装箱中装载16台机组）</h2
      >
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <NuxtImg
            src="/images/solution/canopy/canopy-compact-04.webp"
            alt="16台机组集装箱正视图"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div class="flex-1">
          <NuxtImg
            src="/images/solution/canopy/canopy-compact-05.webp"
            alt="16台机组集装箱侧视图"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
      <p class="text-sm mt-2 text-gray-600">40KW : 16 Units *</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'default',
  })

  useHead({
    title: '超紧凑型发电机组解决方案 - GOODWIND',
    meta: [
      {
        name: 'description',
        content: '超紧凑型发电机组解决方案，体积小、重量轻，便于运输和安装，高效节能环保',
      },
      { name: 'keywords', content: '超紧凑型发电机组,集装箱运输,高效节能,静音设计,GOODWIND' },
    ],
  })
</script>
