import React from "react";

function LoseScreen({ task }) {
  return (
    <div className="lose-screen">
      <h1>😢Mission Failed...😢</h1>
      <p>あなたは{task}を完了できませんでした</p>
      <p>次はもっと頑張りましょう！</p>
    </div>
  );
}

export default LoseScreen;
