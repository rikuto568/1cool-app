const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function askOpenAI(taskDescription) {
  const url = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `このタスクを、集中して効率的に終わらせるとしたら、何分かかるか見積もってください。できるだけ厳しめに、おおよその分数で答えてください。タスク内容：${taskDescription}
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
