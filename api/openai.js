export default async function handler(req, res) {
  // ブラウザからのアクセスを許可する設定
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ブラウザの事前確認に応答
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POSTのみ受け付け
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // OpenAIのAPIキーを取得（Vercelの環境変数から）
  const API_KEY = process.env.OPENAI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "APIキーが設定されていません" });
  }

  try {
    // OpenAIに問い合わせ
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // 結果をフロントエンドに返す
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "API request failed" });
  }
}
