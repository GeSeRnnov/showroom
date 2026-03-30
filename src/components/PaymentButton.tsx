import { createPaymentAction } from "@/app/actions/payment";
import { useStore } from "@/store/useStore";
import { FC, useState } from "react";

export const PaymentButton: FC = () => {
    const [isPending, setIsPending] = useState(false);
    const { price } = useStore()


    const handlePayment = async () => {
      setIsPending(true);
      const result = await createPaymentAction(price);
      if (result.success) {
        alert(`Платеж ${result.transactionId} создан! Перенаправляем на шлюз...`);
        // window.location.href = result.paymentUrl;
      }
      setIsPending(false);
    };
    return <button 
        disabled={isPending}
        onClick={handlePayment}
        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-green-400 disabled:opacity-50 transition-all"
    >
    {isPending ? 'Связь с банком...' : 'Оплатить через ЦР'}
    </button>
    

}