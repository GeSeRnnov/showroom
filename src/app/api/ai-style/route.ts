import { generateObject } from 'ai';
import { createOpenAI, openai } from '@ai-sdk/openai'; // Нужен API ключ в .env
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import https from 'https';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// const chatUrl = 'https://gigachat.devices.sberbank.ru'
const chatUrl = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'
const model = 'GigaChat-2'

/**
 * GigaChat-2 — подойдет для решения более простых задач, требующих при этом максимальной скорости работы модели. При этом стоимость работы с моделью ниже, так как для ее работы нужно меньше аппаратных ресурсов.
GigaChat-2-Pro — модель лучше следует сложным инструкциям и может выполнять более комплексные задачи: значительно повысилось качество суммаризации, переписывания и редактирования текстов, ответов на различные вопросы.
GigaChat-2-Max — продвинутая модель для сложных задач, требующих высокого уровня креативности и качества работы.
 */

// GigaChat поддерживает формат OpenAI, поэтому используем createOpenAI
const gigachat = createOpenAI({
  apiKey: process.env.GIGACHAT_CREDENTIALS,
  baseURL: 'https://gigachat.devices.sberbank.ru', // Официальный эндпоинт Сбера
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {

    const agent = new https.Agent({ rejectUnauthorized: false });

     // ШАГ 1: Получаем OAuth токен (как в твоем первом curl)
    const authRes = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': uuidv4(), // Твой RqUID
        'Authorization': `Basic ${process.env.GIGACHAT_CREDENTIALS}`,
      },
      body: new URLSearchParams({ scope: 'GIGACHAT_API_PERS' }),
      // @ts-ignore
      agent: process.env.NODE_ENV === 'development' ? agent : undefined,
    });

    const authData = await authRes.json();
    const accessToken = authData?.access_token;
    if (!accessToken) throw new Error('authorization error')

    // console.log('Token data:', {accessToken})
    const chatRes = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'Ты — колорист. Отвечай ТОЛЬКО одним HEX-кодом цвета (например #FF0000). Без лишних слов.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
      // @ts-ignore
      agent: process.env.NODE_ENV === 'development' ? agent : undefined,
      
    });
    
    // console.log('chatRes0:', {chatRes})
    const chatData = await chatRes.json();
    if (!chatData?.choices?.length) throw new Error('empty choices')
    const color = chatData.choices[0].message?.content?.trim();
    // console.log('chatRes:', {chatData, color})

    return NextResponse.json({ color: color.startsWith('#') ? color : `#${color}` });

  } catch (error) {
    console.error('GigaChat Error:', error);
    return NextResponse.json({ color: '#cccccc', error: 'Ошибка связи с ИИ' });
  }
//   const result = await generateObject({
//     // model: openai('gpt-4o-mini'), // Или GigaChat API через адаптер
//     model: gigachat('GigaChat:latest'), // Или GigaChat API через адаптер
//     schema: z.object({
//     //   color: z.string().describe('HEX color code based on the prompt'),
//     //   reason: z.string().describe('Short explanation why this color was chosen'),
//         color: z.string().describe('HEX color code'),
//         reason: z.string().describe('Brief explanation in Russian'),
//     }),
//     prompt: `Ты — стилист и модельер. Подбери HEX-цвет под запрос: "${prompt}"`,
//   });

//   return NextResponse.json(result.object);


}