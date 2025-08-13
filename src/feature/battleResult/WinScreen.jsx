// 今後やること
//一瞬だけ、見積もられた時間を表示するのをやめる
import React from "react";
import "./WinScreen.css";

function WinScreen({ task, estimatedTime, resetGame, actualTime }) {
  const formatActualTime = (seconds) => {
    if (seconds === null || seconds === undefined) return "";
    const minutes = Math.floor(seconds / 60);
    // 秒数を分だけに変換
    const secs = seconds % 60;
    // 残りを秒に変換
    return `${minutes}分${secs.toString().padStart(2, "0")}秒`;
  };

  return (
    <div className="win-screen">
      <div className="win-content">
        <h1 className="win-title">Mission Complete!</h1>
        <div className="win-details">
          <p className="task-completed">あなたは「{task}」を完了しました</p>
          <p className="time-info">推定所要時間: {estimatedTime}分</p>
          <p>実際にかかった時間：{formatActualTime(actualTime)}</p>
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
