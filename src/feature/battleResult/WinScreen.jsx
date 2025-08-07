// 今後やること
// 意味わからん文字が打たれたときの処理
// 画面が消えちゃったら最初の画面に戻ってしまうこと
// 装飾
import React from "react";
function WinScreen({ task, estimatedTime }) {
  return (
    <div className="win-screen">
      <h1>🎉Mission Complete🎉</h1>
      <p>あなたは{task}を完了しました</p>
      <p>推定所要時間: {estimatedTime}分</p>
      <p>お疲れ様でした！</p>
      <button onClick={resetGame}>🏠 ホームに戻る</button>
    </div>
  );
}

export default WinScreen;
