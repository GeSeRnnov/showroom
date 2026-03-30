import { create } from 'zustand'

interface ShopState {
  color: string
  price: number
  balance: number
  setColor: (newColor: string) => void
  spendMoney: (amount: number) => void
}

export const useStore = create<ShopState>((set) => ({
  color: '#ff0000', // Начальный цвет модели (красный)
  price: 5000,      // Цена в Цифровых рублях
  balance: 100, // Стартовый баланс в Цифровых рублях
  setColor: (newColor) => set({ color: newColor }),
  // Функция списания за работу ИИ
  spendMoney: (amount: number) => set((state) => ({ 
    balance: Math.max(0, state.balance - amount) 
  })),
}))