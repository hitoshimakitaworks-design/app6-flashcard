import { NextResponse } from 'next/server'

// フィードバック受信 API
// Supabase未設定時はコンソール出力のみ（設定後は自動でDBに保存される）
//
// Supabase feedback テーブルのスキーマ:
//   id          uuid DEFAULT gen_random_uuid() PRIMARY KEY
//   app_name    text NOT NULL
//   message     text NOT NULL
//   url         text
//   processed   boolean DEFAULT false   ← Remote Agentが処理済みにするカラム
//   created_at  timestamptz DEFAULT now()
//
// Supabase SQL Editorで実行:
//   CREATE TABLE feedback (
//     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//     app_name text NOT NULL,
//     message text NOT NULL,
//     url text,
//     processed boolean DEFAULT false,
//     created_at timestamptz DEFAULT now()
//   );

export async function POST(req: Request) {
  const { message, url, appName } = await req.json() as {
    message: string
    url: string
    appName: string
  }

  if (!message?.trim()) {
    return NextResponse.json({ error: 'message required' }, { status: 400 })
  }

  const payload = {
    app_name: appName,
    message: message.trim(),
    url,
    processed: false,
  }

  // Supabase が設定されている場合はDBに保存
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/feedback`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error('[Feedback] Supabase error:', await res.text())
  } else {
    // フォールバック：コンソールに出力（Vercelのログで確認可能）
    console.log('[Feedback received]', JSON.stringify({ ...payload, timestamp: new Date().toISOString() }))
  }

  return NextResponse.json({ ok: true })
}
