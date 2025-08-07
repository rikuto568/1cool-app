import React from "react";
import "./enemyCharacter.css";

function EnemyCharacter({ timeLeft, totalTime }) {
  const messages = [
    "しっかりやれよー。。。",
    "おい、もっとペースを上げたらどうだ",
    "何をだらだらやってんだ。時間ないぞ！",
    "バカめ、もう手遅れだ！あきらめろ",
    "ざまあみろ！もうすぐ時間切れだ！お前の負け～！！",
  ];

  // 進行度の計算部分
  const progress = totalTime > 0 ? 1 - timeLeft / totalTime : 0;

  function getMessageIndex() {
    if (progress < 0.2) return 0; // 20%未満
    if (progress < 0.4) return 1; // 20%〜40%
    if (progress < 0.6) return 2; // 40%〜60%
    if (progress < 0.8) return 3; // 60%〜80%
    else return 4; // 80%以上
  }
  // 時間に合わせてアニメーションを変化させる
  let animationClass = "enemy-calm";
  if (progress >= 0.8) {
    animationClass = "enemy-angry";
  } else if (progress >= 0.6) {
    animationClass = "enemy-worried";
  }

  return (
    <div className={`enemy-container ${animationClass}`}>
      {/* 敵キャラの画像（固定） */}
      <img src="/images/enemy.png" alt="敵キャラ" className="enemy-image" />

      {/* 吹き出し */}
      <div className="speech-bubble">
        <span className="speech-text">{messages[getMessageIndex()]}</span>
        {/* 吹き出しの三角形（しっぽ） */}
        <div className="speech-tail" />
      </div>
    </div>
  );
}

export default EnemyCharacter;
