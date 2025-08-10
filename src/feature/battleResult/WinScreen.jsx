// 今後やること
// 遊び方使いかた、の説明ボタンを作ろうかな、
// 後利用規約
//一瞬だけ、見積もられた時間を表示するのをやめる
// タイマーに外枠とかを付けて、デジタル時計みたいにする
import React from "react";
import "./WinScreen.css";

function WinScreen({ task, estimatedTime, resetGame }) {
  return (
    <div className="win-screen">
      <div className="win-content">
        <h1 className="win-title">Mission Complete!</h1>
        <div className="win-details">
          <p className="task-completed">あなたは「{task}」を完了しました</p>
          <p className="time-info">推定所要時間: {estimatedTime}分</p>
          <p className="congratulations">お疲れ様でした！</p>
        </div>
        <button className="home-button" onClick={resetGame}>
          🏠 ホームに戻る
        </button>
      </div>
    </div>
  );
}

export default WinScreen;
