import React from "react";
import "./LoseScreen.css";
function LoseScreen({ task, resetGame }) {
  return (
    <div className="lose-screen">
      <div className="lose-content">
        <h1 className="lose-title">💀Mission Failed...💀</h1>
        <div className="lose-details">
          <p className="task-failed">
            あなたは「{task}」を完了できませんでした
          </p>
          <p className="encouragement">次はもっと頑張りましょう！</p>
        </div>
        <button className="home-button" onClick={resetGame}>
          🏠 ホームに戻る
        </button>
      </div>
    </div>
  );
}

export default LoseScreen;
