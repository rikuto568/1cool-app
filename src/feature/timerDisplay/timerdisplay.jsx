// ここ名前分かりづらいけど、バトル画面のコンポーネントね

// チャッピーの枠のところに自分のアプリが入って大規模言語モデルと橋渡しをしてもらって
// それを使って計算するみたいな感じで

//レンダリングの後にuseeffectが実行される
import React from "react"; // Reactをインポート
import { useEffect, useState } from "react";
import EnemyCharacter from "./enemyCharacter.jsx";
import "./timerdisplay.css"; // CSSをインポート

function TimerDisplay({ task, estimatedTime, setGameResult }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const existingStart = localStorage.getItem("timerStart");
    const existingDuration = localStorage.getItem("timerDuration");
    if (existingStart && existingDuration) {
      // 既存のタイマーがあれば、残り時間を計算して初期値にする
      const startTime = parseInt(existingStart);
      const duration = parseInt(existingDuration);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      return Math.max(0, duration - elapsed);
    }
    // なければ従来通り
    return estimatedTime ? estimatedTime * 60 : 0;
  });
  // 全体の時間を定義（分母）
  const [totalTime] = useState(estimatedTime ? estimatedTime * 60 : 0);
  // バックグラウンドタイマーを導入するよ

  const [startTime] = useState(() => {
    // まず既存の開始時間をチェック
    const existingStart = localStorage.getItem("timerStart");

    if (existingStart) {
      // 既存の開始時間がある場合はそれを使用
      console.log("🔄 既存のタイマーを継続");
      return parseInt(existingStart);
    } else {
      const start = Date.now();
      // 今の時刻を数字で教えてくれる関数
      localStorage.setItem("timerStart", start.toString());
      localStorage.setItem("timerDuration", (estimatedTime * 60).toString());
      localStorage.setItem("timerTask", task);
      return start;
    }
  });
  // タイマー機能作るよ
  useEffect(() => {
    if (timeLeft <= 0) return;
    // 時間になったらタイマーが止まる
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, estimatedTime * 60 - elapsed);
      setTimeLeft(remaining);
    }, 1000);
    // 一秒ずつ減らしていく処理

    return () => clearInterval(timer);
  }, [timeLeft, startTime, estimatedTime]);
  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("timerStart");
      localStorage.removeItem("timerDuration");
      localStorage.removeItem("timerTask");
      console.log("⏰ バックグラウンドで時間切れになりました");
      setGameResult("lose"); // タイムアップの時の処理
    }
  }, [timeLeft, setGameResult]);
  // 時間がゼロになったときに負け画面に行くための処理を書いてます。

  const handleComplete = () => {
    const start = localStorage.getItem("timerStart") || startTime;
    // タイマーが始まった時刻を取得
    const elapsed = Math.floor((Date.now() - start) / 1000);
    // 今の時間からタイマー開始時刻を引いて経過した秒数を計算
    setGameResult({ result: "win", actualTime: elapsed }); //
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    // 秒を分に変換する
    const secs = seconds % 60;
    // 残り秒を計算する
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
    //パッドスタートは、残り秒が一桁の時に0をつけるためのもの
    // 例えば、1:05のように表示するための関数
  };

  const getTimerClass = (seconds) => {
    if (seconds <= 60) {
      // 1分以下で警告
      return "timer-text warning";
    }
    return "timer-text";
  };

  return (
    <div className="timer-display">
      <header className="timer-header">
        <h1 className="battle-title">バトル開始！</h1>
        <h2 className="task-info">タスク: {task}</h2>
      </header>

      <main className="battle-area">
        <div className="timer-section">
          <div className="digital-timer">
            <div className={getTimerClass(timeLeft)}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <EnemyCharacter timeLeft={timeLeft} totalTime={totalTime} />
      </main>

      <footer className="action-footer">
        <button className="complete-button" onClick={handleComplete}>
          タスク完了！
        </button>
      </footer>
    </div>
  );
}

export default TimerDisplay;
