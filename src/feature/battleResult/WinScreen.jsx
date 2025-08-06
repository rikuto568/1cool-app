// 今後やること
// もう少し厳密なプロンプト作成
// 装飾
import React from "react";
function WinScreen({ task, estimatedTime }) {
  return (
    <div className="win-screen">
      <h1>🎉Mission Complete🎉</h1>
      <p>あなたは{task}を完了しました</p>
      <p>推定所要時間: {estimatedTime}分</p>
      <p>お疲れ様でした！</p>
    </div>
  );
}

export default WinScreen;
