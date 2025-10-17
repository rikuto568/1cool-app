// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function askOpenAI(taskDescription) {
  // const url = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `あなたはタスク時間見積もりAIです。以下の手順で回答してください：

1. 入力されたテキストが実際のタスク（作業・活動）として妥当かチェック
2. 妥当な場合は時間を見積もり、無効な場合はエラーを返す

妥当なタスクの例：メールの返信、資料作成、掃除、買い物、会議準備
無効な入力の例：意味のない文字列（あああ、123）、記号の羅列、タスクではないもの

回答は必ず以下のJSON形式で返してください：
{
  "isValid": true/false,
  "estimatedMinutes": 数値または null,
  "errorMessage": "エラーメッセージ（無効時のみ）"
}

時間見積もり条件：
- 普通の大人がやる
- 集中するけど完璧主義じゃない  
- 急がないと間に合わない時間
- タスクの内容に応じて柔軟に時間を設定する

時間の目安：
- 簡単・短時間（3-8分）：メール1通返信、書類1枚確認、簡単な片付け
- 中程度（10-20分）：短い資料作成、複数メール処理、部屋の整理整頓
- やや時間がかかる（25-40分）：詳しい資料作成、会議準備、本格的な掃除
- 時間がかかる（45-60分）：レポート作成、プレゼン準備、大掃除

重要：タスクの複雑さと量に応じて、3分から60分の範囲で適切に見積もってください
`,
      },
      {
        role: "user",
        content: `タスク：「${taskDescription}」`,
      },
    ],
    temperature: 0.3,
  };

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    // JSONパースを試行
    try {
      const result = JSON.parse(answer);

      if (!result.isValid) {
        throw new Error(
          result.errorMessage ||
            "有効なタスクを入力してください。例：「メールの返信」「資料作成」"
        );
      }

      if (!result.estimatedMinutes || result.estimatedMinutes < 1) {
        throw new Error(
          "時間の見積もりができませんでした。より具体的なタスクを入力してください。"
        );
      }

      return result.estimatedMinutes;
    } catch (parseError) {
      // JSONパースが失敗した場合は従来の方法でフォールバック
      console.warn("JSON parse failed, falling back to regex:", parseError);

      // 基本的なバリデーション
      if (!taskDescription || taskDescription.trim().length < 2) {
        throw new Error(
          "タスクが短すぎます。具体的な作業内容を入力してください。"
        );
      }

      // 意味のない文字列チェック
      const meaninglessPatterns = [
        /^[あああ]+$/,
        /^[いいい]+$/,
        /^[aaa]+$/i,
        /^[111]+$/,
        /^[!@#$%^&*()]+$/,
      ];

      for (const pattern of meaninglessPatterns) {
        if (pattern.test(taskDescription.trim())) {
          throw new Error(
            "意味のある作業内容を入力してください。例：「メールの返信」「資料作成」"
          );
        }
      }

      // 従来の数字抽出
      const match = answer.match(/\d+/);
      const estimatedMinutes = match ? parseInt(match[0], 10) : null;

      if (!estimatedMinutes) {
        throw new Error(
          "時間の見積もりができませんでした。もう一度お試しください。"
        );
      }

      return estimatedMinutes;
    }
  } catch (error) {
    // ネットワークエラーなど
    throw error;
  }
}

// 使用例
export async function validateAndEstimate(taskInput) {
  try {
    const estimatedTime = await askOpenAI(taskInput);
    return {
      success: true,
      estimatedTime,
      message: `見積もり時間: ${estimatedTime}分`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      suggestion: "例：「メールの返信」「会議資料の作成」「部屋の掃除」など",
    };
  }
}
