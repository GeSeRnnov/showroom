import { NextResponse } from 'next/server';

/**
 * Обработка POST-запроса для создания заказа
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Имитация логики сохранения в БД или вызова API Цифрового рубля
    console.log('API Order Received:', data);

    return NextResponse.json({ 
      success: true, 
      orderId: `CR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'pending_payment'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body' }, 
      { status: 400 }
    );
  }
}

/**
 * Простая проверка работоспособности API через GET
 */
export async function GET() {
  return NextResponse.json({ 
    service: '3D Shop Order API',
    version: '1.0.0',
    status: 'online' 
  });
}
