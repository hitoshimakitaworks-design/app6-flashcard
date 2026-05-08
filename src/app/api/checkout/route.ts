import { NextResponse } from 'next/server'

// Stripe Checkout セッション作成 API
// 有料化時（NEXT_PUBLIC_ENABLE_PAID=true）に動作するようになる
//
// TODO（有料化時にやること）：
// 1. npm install stripe
// 2. .env.local に STRIPE_SECRET_KEY と NEXT_PUBLIC_STRIPE_PRICE_ID を追加
// 3. 以下のコメントアウトを解除して動作確認

export async function POST() {
  if (process.env.NEXT_PUBLIC_ENABLE_PAID !== 'true') {
    return NextResponse.json({ error: 'Payments not enabled' }, { status: 403 })
  }

  // TODO: 以下のコードを有料化時にアンコメント
  /*
  const stripe = new (await import('stripe')).default(process.env.STRIPE_SECRET_KEY!)

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?upgraded=true`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/`,
  })

  return NextResponse.json({ url: session.url })
  */

  return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
}
