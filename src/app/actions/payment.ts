'use server' // Это заставит код выполняться только на сервере

export async function createPaymentAction(amount: number) {
  console.log(`Создаем запрос на оплату: ${amount} руб.`);
  
  // Здесь в будущем будет вызов API ЮKassa или ЦБ
  // await fetch('https://api.yookassa.ru', ...)

  // Имитируем задержку сети
  await new Promise((res) => setTimeout(res, 1500));

  return {
    success: true,
    paymentUrl: 'https://example.com', // Ссылка на страницу оплаты
    transactionId: Math.random().toString(36).substring(7)
  };
}
