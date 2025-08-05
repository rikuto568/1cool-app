// ここ名前分かりづらいけど、バトル画面のコンポーネントね

// チャッピーの枠のところに自分のアプリが入って大規模言語モデルと橋渡しをしてもらって
// それを使って計算するみたいな感じで

//レンダリングの後にuseeffectが実行される
import { useEffect, useState } from "react";

function TimerDisplay({ task, estimatedTime }) {
  const [timeLeft, setTimeLeft] = useState(
    estimatedTime ? estimatedTime * 60 : 0
  );

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
      <h2>バトル開始！</h2>
      <h2>タスク: {task}</h2>
      <h2>残り時間: {formatTime(timeLeft)}</h2>
      {/* ここに敵キャラを置く */}
    </div>
  );
}

export default TimerDisplay;
