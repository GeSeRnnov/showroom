'use client'

import { Shoe } from '@/components/Model'
import { MovingBox } from '@/components/MovingBox'
import Scene from '@/components/Scene'
import { useStore } from '@/store/useStore'
import { createPaymentAction } from '@/app/actions/payment';
import { useState } from 'react'
import { PaymentButton } from '@/components/PaymentButton'
import { AnimatedBalance } from '@/components/AnimatedBalance'

export default function Home() {
  const { balance, price, setColor } = useStore()
  const [input, setInput] = useState('');
  
  const askAI = async () => {
    if (balance < 5) {
      alert("Недостаточно Цифровых рублей на балансе!");
      return;
    }
    const res = await fetch('/api/ai-style', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setColor(data.color); // Кроссовок в 3D мгновенно перекрасится!
    // alert(`AI выбрал цвет: ${data.color} (${data.reason})`);
    // toast
  };

  return (
    <main className="relative h-screen w-screen">
      {/* UI СЛОЙ: Кнопки и цена */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-10">
        <header className="flex justify-between items-start">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Next Gen <br /> <span className="text-blue-500">3D Shop</span>
          </h1>
          <AnimatedBalance value={balance}/>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs uppercase text-gray-400">К оплате (ЦР)</p>
            <p className="text-2xl font-mono font-bold text-green-400">{price} ₽</p>
          </div>
      <div className="pointer-events-auto flex gap-2">
        <input 
          className="bg-white/10 p-2 rounded-lg text-white"
          placeholder="Опиши стиль..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={askAI} className="bg-blue-600 p-2 rounded-lg">Спросить ИИ</button>
      </div>
        </header>

        <footer className="pointer-events-auto flex gap-4 bg-black/20 p-6 backdrop-blur-xl rounded-3xl self-center mb-10 border border-white/10">
          <button onClick={() => setColor('#3b82f6')} className="w-12 h-12 rounded-full bg-blue-500 hover:scale-110 transition-transform" />
          <button onClick={() => setColor('#ef4444')} className="w-12 h-12 rounded-full bg-red-500 hover:scale-110 transition-transform" />
          <button onClick={() => setColor('#10b981')} className="w-12 h-12 rounded-full bg-emerald-500 hover:scale-110 transition-transform" />
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-400 transition-colors">
            Оформить Смарт-контракт
          </button>
          <PaymentButton />
        </footer>
      </div>

      {/* 3D СЛОЙ */}
      <Scene>
        {/* Пока просто куб, который меняет цвет из Zustand */}
        {/* <MovingBox color='green' /> */}
        <Shoe color='green' />
      </Scene>
    </main>
  )
}

