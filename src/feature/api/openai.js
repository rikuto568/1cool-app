const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function askOpenAI(taskDescription) {
  const url = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `「${taskDescription}」をテキパキやる時間を見積もって。
        条件：
        - 普通の大人がやる
        - 集中するけど完璧主義じゃない
        - 少し急がないと間に合わない時間
        - 5~35分の間で答える
        分数で返してください
`,
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  const answer = data.choices[0].message.content;
  // AIが返した答えを数字だけにする記述を下に書くよ
  const match = answer.match(/\d+/);
  const estimatedMinutes = match ? parseInt(match[0], 10) : null;

  return estimatedMinutes; // 数値として返す（失敗したら null）
}

// タスクのプロップスが正しいか確認しなさい
