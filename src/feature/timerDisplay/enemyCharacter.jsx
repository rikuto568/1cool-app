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
      <img
        src="/images/enemy.png"
        alt="敵キャラ"
        style={{ width: "50%", height: "50%", objectFit: "cover" }}
      />

      {/* 吹き出し */}
      <div
        style={{
          background: "#fff",
          border: "2px solid #333",
          borderRadius: "16px",
          padding: "12px 16px",
          marginLeft: "16px",
          position: "relative",
          maxWidth: "200px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: "14px" }}>{messages[getMessageIndex()]}</span>

        {/* 吹き出しの三角形（しっぽ） */}
        <div
          style={{
            position: "absolute",
            left: "-14px",
            bottom: "20px",
            width: 0,
            height: 0,
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "16px solid #fff",
          }}
        />
      </div>
    </div>
  );
}

export default EnemyCharacter;
