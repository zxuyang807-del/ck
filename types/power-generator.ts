export interface PowerGenerator {
  id: string
  model: string
  phase: number
  frequency: number
  standbyKVA: number
  standbyKW: number
  primeKVA: number
  primeKW: number
  voltage: number
  engine: string
  cons: number
  brand: string
}
