import { useState } from "react";
import MatchingScreen from "./feature/matchingScreen/matchingScreen";
import TaskInput from "./feature/taskInput/taskinput";
import TimerDisplay from "./feature/timerDisplay/timerdisplay";
import { askOpenAI } from "./feature/api/openai";
import React from "react";
function App() {
  const [task, settask] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [error, setError] = useState(null);
  // estimatedTimeはAIが計算したタスクの時間を保存するための状態
  //画面遷移のためのやつ

  async function handleStartMatching() {
    setIsMatching(true);
    try {
      const minutes = await askOpenAI(task);
      setEstimatedTime(minutes);
    } catch (error) {
      console.error(error);
      setError("AIとの通信に失敗しました。もう一度試してください。");
    } finally {
      setIsMatching(false);
      setIsBattleStarted(true);
    }
  }

  let content;
  if (isBattleStarted) {
    content = <TimerDisplay task={task} estimatedTime={estimatedTime} />;
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
  }

  return <div className="App">{content}</div>;
}
export default App;
// 通信エラーの時に相手へ何か表示をする仕様を作る
// estimatedMinutesで取得した値をestimatedTimeに保存してる点に注意ね
