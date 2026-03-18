// 产品分类接口

// 品牌接口
export interface Brand {
  name: string
  type: string[]
}

// 语言配置接口
export interface LanguageConfig {
  native: string
  others: Record<string, string>
}
