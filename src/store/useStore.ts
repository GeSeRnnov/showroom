import { create } from 'zustand'

interface ShopState {
  color: string
  price: number
  setColor: (newColor: string) => void
}

export const useStore = create<ShopState>((set) => ({
  color: '#ff0000', // Начальный цвет модели (красный)
  price: 5000,      // Цена в Цифровых рублях
  setColor: (newColor) => set({ color: newColor }),
}))