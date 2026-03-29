import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Здесь в будущем будет логика Цифрового рубля или ЮKassa
    console.log('Данные заказа из 3D-шоурума:', body);

    return NextResponse.json({ 
      success: true, 
      message: 'Заказ успешно создан в системе',
      orderId: Math.random().toString(36).substring(7) 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

// Добавим GET на случай, если ты просто откроешь ссылку в браузере
export async function GET() {
  return NextResponse.json({ status: 'API is working' });
}
