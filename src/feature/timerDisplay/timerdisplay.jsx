// ここ名前分かりづらいけど、バトル画面のコンポーネントね

// チャッピーの枠のところに自分のアプリが入って大規模言語モデルと橋渡しをしてもらって
// それを使って計算するみたいな感じで

//レンダリングの後にuseeffectが実行される
import React, { use } from "react"; // Reactをインポート
import { useEffect, useState } from "react";
import EnemyCharacter from "./enemyCharacter.jsx";
import "./timerdisplay.css"; // CSSをインポート

function TimerDisplay({ task, estimatedTime, setGameResult }) {
  const [timeLeft, setTimeLeft] = useState(
    estimatedTime ? estimatedTime * 60 : 0
  );
  // 全体の時間を定義（分母）
  const [totalTime] = useState(estimatedTime ? estimatedTime * 60 : 0);

  // タイマー機能作るよ
  useEffect(() => {
    if (timeLeft <= 0) return;
    // 時間になったらタイマーが止まる
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    // 一秒ずつ減らしていく処理

    return () => clearInterval(timer);
  }, [timeLeft]);
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameResult("lose"); // タイムアップの時の処理
    }
  }, [timeLeft, setGameResult]);
  // 時間がゼロになったときに負け画面に行くための処理を書いてます。

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    // 秒を分に変換する
    const secs = seconds % 60;
    // 残り秒を計算する
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
    //パッドスタートは、残り秒が一桁の時に0をつけるためのもの
    // 例えば、1:05のように表示するための関数
  };

  return (
    <div className="timer-display">
      <header className="timer-header">
        <h1 className="battle-title">バトル開始！</h1>
        <h2 className="task-info">タスク: {task}</h2>
      </header>

      <main className="battle-area">
        <div className="timer-section">
          <div className="timer-text">{formatTime(timeLeft)}</div>
        </div>
        <EnemyCharacter timeLeft={timeLeft} totalTime={totalTime} />
      </main>

      <footer className="action-footer">
        <button
          className="complete-button"
          onClick={() => setGameResult("win")}
        >
          タスク完了！
        </button>
      </footer>
    </div>
  );
}

export default TimerDisplay;
