declare module 'vue3-easy-data-table' {
  import type { Component } from 'vue'

  export type Header = {
    text: string
    value: string
    sortable?: boolean
    fixed?: boolean
    width?: number
  }
  export type Item = Record<string, any>

  const EasyDataTable: Component

  // ini penting biar TS kenal slot item-*
  export interface EasyDataTableSlots {
    [slotName: `item-${string}`]: any
  }

  export default EasyDataTable
}
