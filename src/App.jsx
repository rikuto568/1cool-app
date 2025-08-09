import { useState } from "react";
import MatchingScreen from "./feature/matchingScreen/matchingScreen";
import TaskInput from "./feature/taskInput/taskinput";
import TimerDisplay from "./feature/timerDisplay/timerdisplay";
import { askOpenAI } from "./feature/api/openai";
import WinScreen from "./feature/battleResult/WinScreen";
import LoseScreen from "./feature/battleResult/LoseScreen";
import React from "react";

function App() {
  const [task, settask] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [error, setError] = useState(null);
  const [gameResult, setGameResult] = useState(null); // 'win' | 'lose' | を入れてそこで処理を変える
  // estimatedTimeはAIが計算したタスクの時間を保存するための状態
  //画面遷移のためのやつ
  function resetGame() {
    settask(""); // "洗濯物をたたむ" → ""
    setIsMatching(false);
    setIsBattleStarted(false);
    setEstimatedTime(null);
    setError(null);
    setGameResult(null); // "win+lose" → null
  }

  async function handleStartMatching() {
    setIsMatching(true);
    try {
      const minutes = await askOpenAI(task);
      setEstimatedTime(minutes);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsMatching(false);
      setIsBattleStarted(true);
    }
  }

  let content;
  if (gameResult === "win") {
    content = (
      <WinScreen
        task={task}
        estimatedTime={estimatedTime}
        resetGame={resetGame}
      />
    );
  } else if (gameResult === "lose") {
    content = <LoseScreen task={task} resetGame={resetGame} />;
  }
  // 勝ち負けのコンポーネントのプロップスは別に入れてもどっちでもいい
  else if (isBattleStarted) {
    content = (
      <TimerDisplay
        task={task}
        estimatedTime={estimatedTime}
        setGameResult={setGameResult}
      />
    );
  } else if (isMatching) {
    content = <MatchingScreen isMatching={isMatching} />;
  } else {
    content = (
      <>
        <TaskInput
          task={task}
          setTask={settask}
          startMatching={handleStartMatching}
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </>
    );
    // 画面遷移の大まかな仕組みはsetState関数で状態を変える → 条件分岐が再評価される → 違う画面が表示されるって感じ
  }

  return <div className="App">{content}</div>;
}
export default App;
// 通信エラーの時に相手へ何か表示をする仕様を作る
// estimatedMinutesで取得した値をestimatedTimeに保存してる点に注意ね
