'use client'

import { Shoe } from '@/components/Model'
import { MovingBox } from '@/components/MovingBox'
import Scene from '@/components/Scene'
import { useStore } from '@/store/useStore'
import { createPaymentAction } from '@/app/actions/payment';
import { useState } from 'react'

export default function Home() {
  const { color, price, setColor } = useStore()
  const [isPending, setIsPending] = useState(false);

  const handlePayment = async () => {
    setIsPending(true);
    const result = await createPaymentAction(price);
    if (result.success) {
      alert(`Платеж ${result.transactionId} создан! Перенаправляем на шлюз...`);
      // window.location.href = result.paymentUrl;
    }
    setIsPending(false);
  };


  return (
    <main className="relative h-screen w-screen">
      {/* UI СЛОЙ: Кнопки и цена */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-10">
        <header className="flex justify-between items-start">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Next Gen <br /> <span className="text-blue-500">3D Shop</span>
          </h1>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs uppercase text-gray-400">К оплате (ЦР)</p>
            <p className="text-2xl font-mono font-bold text-green-400">{price} ₽</p>
          </div>
        </header>

        <footer className="pointer-events-auto flex gap-4 bg-black/20 p-6 backdrop-blur-xl rounded-3xl self-center mb-10 border border-white/10">
          <button onClick={() => setColor('#3b82f6')} className="w-12 h-12 rounded-full bg-blue-500 hover:scale-110 transition-transform" />
          <button onClick={() => setColor('#ef4444')} className="w-12 h-12 rounded-full bg-red-500 hover:scale-110 transition-transform" />
          <button onClick={() => setColor('#10b981')} className="w-12 h-12 rounded-full bg-emerald-500 hover:scale-110 transition-transform" />
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-400 transition-colors">
            Оформить Смарт-контракт
          </button>
          <button 
            disabled={isPending}
            onClick={handlePayment}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-green-400 disabled:opacity-50 transition-all"
          >
            {isPending ? 'Связь с банком...' : 'Оплатить через ЦР'}
          </button>
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



// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
